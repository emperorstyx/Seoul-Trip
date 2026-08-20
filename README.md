# Our Trips V6.3 — Travel Companion Release

## New
- Edit/delete cloud trips
- Expense delete fix + Paid by Shared/member
- Activities auto-sort by time
- Tick Done → silver and moves below unfinished items
- Undo completed activity
- Shared activity notes
- Today / All Days switch
- Simple NOW / NEXT Home line
- Destination local time + Malaysia time
- Optional Today's Progress (OFF by default)
- Optional Leave Reminder (OFF by default)
- Offline indicator
- Post-trip summary
- Travel Documents & Emergency
- Private PDF/image uploads via Supabase Storage
- Version compatibility checking
- Existing realtime sync and couple live-location remain

## Required
Run `V6.3_SUPABASE_PATCH.sql` once in Supabase SQL Editor.

## Deploy to GitHub Pages
Upload/replace:
- index.html
- sw.js
- manifest.webmanifest
- icon-192.png
- icon-512.png
- README.md

Do not upload the SQL patch to GitHub.

After deployment, open once with `?v=63` if a phone still has an older cached build.
