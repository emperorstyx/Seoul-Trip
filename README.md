# Our Trips V6.12

An improvement release based on the saved V6.11 app. This package uses your existing Supabase project, shared trips and PWA setup.

## What improved

- **Reliable cloud refresh:** failed reads keep the last successfully loaded details. Responses from a trip you have left are ignored, including when you leave and reopen the same trip. Bursts of live updates are combined into fewer refreshes.
- **Stable expense entry:** your selected currency and payer survive cloud updates. Duplicate taps on the main save actions are ignored while a save is running. Failed saves keep your entries in the open page.
- **Complete itinerary:** All Days shows every trip date, including days with no activities. Dates remain consistent across device timezones and daylight-saving changes. Upcoming activities take priority over unfinished activities from earlier days.
- **Clear connection status:** the app reports incomplete refreshes and interrupted live updates, provides Refresh, and reloads cloud details after reconnecting or returning to the app.
- **Safer updates:** a newly installed service worker does not automatically reload the page. Update Now checks for a pending save and unsaved entries. Only app assets are handled by the service worker; cloud, authentication and document requests stay on the network.
- **Easier mobile controls:** larger checklist action targets, Move up / Move down alongside drag reorder, corrected checklist tab highlighting, focus outlines and reduced-motion support.
- **Other fixes:** profile-image zoom now affects the saved crop; documents open their window before requesting the signed link; changing trips stops the previous location watch; late weather responses cannot replace the new trip's weather; trip names, notes and map links handle special characters correctly.

## Install the update

1. Keep a copy of your existing site files.
2. Upload these files together to the same folder on your current host:
   - `index.html`
   - `trip-core.js` — required by this release
   - `sw.js`
   - `manifest.webmanifest`
   - `icon-192.png` and `icon-512.png`
3. Open the usual app URL while connected. If prompted, choose **Update now** after saving your entries.
4. Check **More → App & Cloud → Version 6.12**.

This is a ready-to-upload package; creating it does not update your hosted app. Keep the current URL so your existing sign-in configuration and PWA scope continue to match.

## Database compatibility

V6.12 adds no tables, columns or new SQL migration. The existing V6.11 shared-expense policy file is included unchanged as `supabase-v6.11.sql`. If you already applied it, you do not need to run it again. Existing database access policies still govern which records each trip member can see or change.

## Offline and save behavior

Loaded trip details remain in memory while the page stays open. Drafts remain in the current page after a failed save; they are not stored permanently or automatically retried. Reconnect and tap Save. Closing the page can lose unsaved entries, and opening the app offline may require reconnecting for sign-in libraries and cloud data.

A connection failure during a write can leave the server result uncertain. Check the refreshed trip before retrying. The save guard prevents duplicate taps in this page; it does not provide server-side deduplication across devices.

## Validation

Run with Node.js 20 or later:

```sh
node --test tests/regression.test.cjs
```

15 local regression checks passed. They exercise cloud failures and trip-switch races, combined refreshes, date handling, expense selections and saves, location scope, update behavior, escaped itinerary text, service-worker request handling and the complete trip render path.

JavaScript syntax, inline handlers, local assets, manifest and unique HTML IDs were also checked. These are local checks with mocked services. Authenticated Supabase writes, real-device display and the hosted deployment were not tested.
