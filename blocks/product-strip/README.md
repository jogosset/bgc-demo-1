# Product Strip Block

## Overview

A horizontally scrolling row of featured product cards (name, unit, price, optional badge). Used for merchandising sections like "Fresh this week."

## Integration

### Content Model

One row per product, up to five cells each:

| Cell | Content | Description |
|------|---------|--------------|
| 1 | icon name | One of: `peach`, `tomato`, `shrimp`, `beef`, `bread`, `corn`, `carton`. Unrecognized names render no icon glyph. |
| 2 | text | Product name |
| 3 | text | Unit (e.g. "per lb", "4 ears") |
| 4 | text | Price |
| 5 | text (optional) | Badge label (e.g. "Peak season"); omit the cell or leave empty to skip the badge |

<!-- No configuration keys, URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### User Interaction Flows
1. **Horizontal scroll**: Cards overflow horizontally with CSS scroll-snap; no JS-driven carousel controls.

### Error Handling
- **Missing badge cell**: badge is simply omitted from that card.
- **Unknown icon name**: card renders without an icon glyph rather than erroring.
