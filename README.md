# Our Trips V6.3.1 — Login Hotfix

This is a code-only stabilization release for V6.3.

Fixed:
- Sign In button doing nothing
- Create Account button doing nothing
- Broken open-trip JavaScript
- Broken itinerary grouping JavaScript
- Broken expense-delete JavaScript

The V6.3 Supabase database/storage patch is unchanged. If you already ran `V6.3_SUPABASE_PATCH.sql` successfully, DO NOT run another SQL patch for V6.3.1.

Deploy/replace:
- index.html
- sw.js
- manifest.webmanifest
- icon-192.png
- icon-512.png
- README.md

After deployment, open once with `?v=631` if a phone/browser still shows the broken cached V6.3 build.
