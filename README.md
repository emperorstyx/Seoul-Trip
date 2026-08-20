# Our Trips V6.5

UI cleanup release.

Changes:
- Places categories simplified:
  - Food + Café -> Restaurant
  - Camping + Hotel -> Stay
- Existing old records remain compatible:
  - old Food/Café items appear under Restaurant
  - old Camping/Hotel items appear under Stay
- Fixed itinerary checkbox alignment using a dedicated grid column, so the tick no longer overlaps the activity time/title on desktop or mobile.
- V6.4 planner workflow is retained.

No new Supabase SQL is required.

Deploy/replace the usual web files. If an old cached build remains, open once with `?v=65`.
