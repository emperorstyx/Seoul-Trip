/* Our Trips: data helpers shared by the app and local regression tests. */
(function (root) {
  'use strict';
  const sections = ['itinerary', 'places', 'expenses', 'checks', 'members', 'locations', 'emergency', 'documents'];

  function emptyCloud() {
    return Object.fromEntries(sections.map(key => [key, []]));
  }

  function mergeCloud(previous, results) {
    const data = { ...previous }, failed = [];
    sections.forEach((key, i) => {
      const result = results[i];
      if (result?.status === 'fulfilled' && !result.value?.error && Array.isArray(result.value?.data)) {
        data[key] = result.value.data;
      } else {
        // A failed read is not an empty table. Keep the last successful snapshot.
        failed.push(key);
      }
    });
    return { data, failed };
  }

  function datesBetween(start, end) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start || '') || !/^\d{4}-\d{2}-\d{2}$/.test(end || '')) return [];
    const first = Date.parse(start + 'T00:00:00Z'), last = Date.parse(end + 'T00:00:00Z');
    if (!Number.isFinite(first) || !Number.isFinite(last) || last < first) return [];
    if (new Date(first).toISOString().slice(0, 10) !== start || new Date(last).toISOString().slice(0, 10) !== end) return [];
    const count = Math.round((last - first) / 86400000) + 1;
    if (count > 3660) return []; // Reject malformed ranges rather than hanging the UI.
    return Array.from({ length: count }, (_, i) => new Date(first + i * 86400000).toISOString().slice(0, 10));
  }

  function buildDays(trip, itinerary, sortTime) {
    const byDate = new Map(datesBetween(trip.start_date, trip.end_date).map((date, i) => [date, { date, title: 'Day ' + (i + 1), items: [] }]));
    for (const item of itinerary) {
      const date = item.day_date || '';
      if (!byDate.has(date)) byDate.set(date, { date, title: item.day_title || 'Day plan', items: [] });
      const day = byDate.get(date);
      if (!day.items.length && item.day_title) day.title = item.day_title;
      day.items.push(item);
    }
    return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date)).map(day => ({
      ...day,
      items: day.items.slice().sort((a, b) => Number(!!a.completed) - Number(!!b.completed) || sortTime(a.activity_time) - sortTime(b.activity_time) || (a.sort_order || 0) - (b.sort_order || 0))
    }));
  }

  function createScopedLoader(read, apply, onError = () => {}) {
    let scope = { key: null, task: null, again: false };
    return {
      activate(key) { scope = { key, task: null, again: false }; },
      refresh() {
        const current = scope;
        if (!current.key) return Promise.resolve(false);
        if (current.task) {
          current.again = true;
          return current.task;
        }
        current.task = (async () => {
          let ok = false;
          do {
            current.again = false;
            try {
              const result = await read(current.key);
              if (scope !== current) return false;
              ok = apply(result, current.key) !== false;
            } catch (error) {
              if (scope !== current) return false;
              onError(error, current.key);
              ok = false;
            }
          } while (scope === current && current.again);
          return ok;
        })().finally(() => { current.task = null; });
        return current.task;
      }
    };
  }

  function createActionGuard() {
    const pending = new Set();
    return {
      get busy() { return pending.size > 0; },
      async run(key, action) {
        if (pending.has(key)) return false;
        pending.add(key);
        try { return await action(); }
        finally { pending.delete(key); }
      }
    };
  }

  const api = { sections, emptyCloud, mergeCloud, datesBetween, buildDays, createScopedLoader, createActionGuard };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OurTripsCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
