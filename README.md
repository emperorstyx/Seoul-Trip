# Our Trips V6.7.1 — Layout Hotfix

Fixes the V6.7 HTML nesting bug that caused the Settings/More content to appear below every tab.

Changes:
- Rebuilt the More section with valid HTML structure.
- Settings now stays only inside the More tab.
- Checklist remains its own tab.
- Trip map remains on Home.
- Removed duplicate Cloud/Account elements.
- Service-worker cache bumped to V6.7.1.
- No new Supabase SQL is required beyond the V6.7 profile patch.

Deploy the usual PWA files. If V6.7 is cached, open once with `?v=671`.
