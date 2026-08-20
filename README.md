# Our Trips V6.3.2 — Itinerary Alignment Hotfix

Fixes the itinerary layout inside the actual PWA:
- checkbox no longer overlaps the time/title
- consistent alignment for time, title, area and notes
- completed items retain the same alignment while turning silver
- Map / Undo / Edit / Delete controls are more compact on phone
- based on the working V6.3.1 login hotfix

No new Supabase SQL is required.

Deploy/replace:
- index.html
- sw.js
- manifest.webmanifest
- icon-192.png
- icon-512.png
- README.md

After GitHub deploys, open once with `?v=632` if an older cached build still appears.
