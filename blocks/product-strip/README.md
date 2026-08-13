# Product Strip Block

## Overview

A horizontally scrolling row of featured product cards (photo or icon, bold name, unit, price, optional badge). Used for merchandising sections like "Fresh this week."

## Integration

### Content Model

One row per product, two cells each:

| Cell | Content | Description |
|------|---------|--------------|
| 1 | icon name, or an image | Either type one of: `peach`, `tomato`, `shrimp`, `beef`, `bread`, `corn`, `carton` for a simple icon, **or** insert an image from the assets picker to show a real product photo instead — the photo fills a square panel and replaces the icon entirely. |
| 2 | up to four paragraphs | In order: product name (rendered bold), unit (e.g. "per lb"), price, optional badge label (e.g. "Peak season"). Omit the fourth paragraph to skip the badge. |

<!-- No configuration keys, URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### Icon vs. photo
- **Cell 1 has an image**: the photo fills the card's art panel; the icon glyph is skipped.
- **Cell 1 has a recognized icon name, no image**: renders the glyph in the round tinted circle.
- **Cell 1 has an unrecognized name, no image**: card renders without an icon glyph.

### User Interaction Flows
1. **Horizontal scroll**: Cards overflow horizontally with CSS scroll-snap; no JS-driven carousel controls.

### Error Handling
- **Missing badge cell**: badge is simply omitted from that card.
- **Unknown icon name, no image**: card renders without an icon glyph rather than erroring.
