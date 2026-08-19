# Our Trips V6 — Cloud Sync

V6 connects the GitHub Pages PWA to Supabase.

Included:
- Email/password signup and sign-in
- Cloud trips
- Private trip membership with join code
- Realtime itinerary, places, spending and checklists
- Mine / Partner / Shared checklists
- Realtime latest couple locations on the map
- Explicit location-sharing toggle
- MYR consolidated spending with Frankfurter FX lookup
- Softer animated weather
- Existing blue/white/red UI and couple icon

IMPORTANT SETUP
1. In Supabase SQL Editor, run `V6_SUPABASE_PATCH.sql` once.
2. Upload the web files to your GitHub Pages repository.
3. Open the app and create your account.
4. Create a cloud trip.
5. Wife creates her own account on her phone and joins using the trip code.

The publishable Supabase key is intentionally client-side. Security depends on the Row Level Security policies you already created plus the V6 SQL patch. Never put a Supabase secret/service-role key in this repository.

Location sharing updates while the PWA is active. iOS can suspend browser/PWA background location updates when the app is not active.
