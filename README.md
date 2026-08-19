# Our Trips V6.2 — Stable Couple Build

V6.2 keeps the working V6.1 Supabase cloud trip and Seoul import, and fixes the PWA update/cache problem.

## What changed
- Network-first loading for app HTML, so GitHub Pages updates should no longer stay stuck on an old screen.
- Old app caches are removed automatically when V6.2 activates.
- Service-worker update checks bypass the HTTP cache.
- In-app “Update now” notice when a newer service worker is ready.
- Existing Supabase cloud sync, couple trip codes, realtime itinerary/Places/expenses/checklists, location sharing, weather, map and MYR conversion are retained.

## Deploy
Upload/replace:
- index.html
- sw.js
- manifest.webmanifest
- icon-192.png
- icon-512.png
- README.md

You do NOT need to run V6_SUPABASE_PATCH.sql again if V6/V6.1 SQL already succeeded.

For this one upgrade from V6.1 to V6.2, open the GitHub Pages site once with `?v=62` if the installed/browser app is still showing the old cached version. After V6.2 takes control, future releases should update normally.
