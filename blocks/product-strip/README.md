# Product Strip Block

## Overview

A horizontally scrolling row of merchandising deal cards: a product photo with a colored badge pill, bold product name, sale price (with an optional strikethrough original price), and an "Add to Cart" button. Modeled on a "This week's deals" promo strip design.

Note: the eyebrow label, heading, and "View All Deals" button that typically sit above the strip are regular page content (a paragraph, a heading, and a button) authored directly above the block — they are not part of this block.

## Integration

### Content Model

**One row per product, two cells each:**

| Cell | Content | Description |
|------|---------|--------------|
| 1 | a product image | Insert from the assets picker. The image sits alone in the card's photo area — that area intentionally has no background color, just the image. (Falls back to a simple icon glyph if a row has no image, for backward compatibility — see icon names below.) |
| 2 | up to four paragraphs | In order: product name (bold), price. Then, in either order, up to two more optional lines: an **original price** written like `$3.99` (rendered with a strikethrough next to the sale price) and/or a **badge label** (any other text, e.g. "SAVE $2", "BOGO", "Fresh Today" — shown as a red pill over the top-left of the photo). Include one, both, or neither. |

**Optional trailing `[Label]` / `[Value]` settings row** — add after the product rows:

| Row label | Value | Effect |
|-----------|-------|--------|
| `Card Background` | any CSS color (e.g. `#fff8ec`) | Sets the background behind each card's text area (name, price, button). Does not affect the photo area, which has no background color by design. |

<!-- No URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### Distinguishing original price from badge
Whichever of the (up to two) optional trailing lines starts with `$` is treated as the strikethrough original price; the other is treated as the badge label. This means badge text should generally avoid starting with a `$` sign.

### Image vs. icon fallback
- **Cell 1 has an image**: shown as-is, centered in the photo area.
- **Cell 1 has one of these icon names, no image**: `peach`, `tomato`, `shrimp`, `beef`, `bread`, `corn`, `carton` — renders that glyph instead.
- **Cell 1 has an unrecognized name, no image**: no glyph, empty photo area.

### "Add to Cart"
The button is decorative — it doesn't add anything to a real cart. This block is for editorial/merchandising strips, not live commerce data.

### User Interaction Flows
1. **Horizontal scroll**: Cards overflow horizontally with CSS scroll-snap; no JS-driven carousel controls.

### Error Handling
- **Missing original price and/or badge**: whichever is omitted simply doesn't render.
- **Config row with an empty value cell**: ignored; the corresponding CSS variable is left unset and the default styling applies.
