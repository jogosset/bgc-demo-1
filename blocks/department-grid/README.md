# Department Grid Block

## Overview

A grid of department/category tiles, each linking to a category page. The first two authored rows render as wide tiles (they span extra columns on tablet/desktop); the rest render as standard tiles.

## Integration

### Content Model

One row per department, two cells each:

| Cell | Content | Description |
|------|---------|--------------|
| 1 | icon name | One of: `peach`, `shrimp`, `bread`, `milk`, `jar`, `cup`, `flower`, `heart`, `paw`. Unrecognized names fall back to `jar`. |
| 2 | link or text | A link (`<a href>`) becomes the tile's destination and label; plain text renders as a non-clickable label pointing to `#`. |

<!-- No configuration keys, URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### Wide Tiles
- **First two rows**: rendered with the `department-grid-tile--wide` modifier, spanning more grid columns from the 600px breakpoint up.
- **Remaining rows**: rendered as standard single-column tiles.

### Error Handling
- **Unknown icon name**: falls back to the `jar` icon.
- **No link authored**: tile still renders with text label, href defaults to `#`.
