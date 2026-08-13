# Recipe Cards Block

## Overview

A grid of recipe cards, each with an icon or image art panel, category eyebrow, title, description, and time/servings meta. Used for inspiration/recipe sections. The art panel image, card background, and text color are all editable without code.

## Integration

### Content Model

**One row per recipe, two cells each:**

| Cell | Content | Description |
|------|---------|--------------|
| 1 | icon name, or an image | Either type one of: `peach`, `beef`, `shrimp` (also picks the art panel's default color theme: peach→green, beef→deep, shrimp→dark), **or** insert an image from the assets picker to use a real photo instead — the photo fills the art panel and replaces the icon/theme color entirely. |
| 2 | up to four paragraphs | In order: eyebrow/category (e.g. "Baking"), recipe title, short description, and a "time · servings" line (e.g. "50 min · Serves 8"). Omit the last paragraph to hide the meta row. |

**Optional trailing `[Label]` / `[Value]` settings rows** — add either or both after the recipe rows:

| Row label | Value | Effect |
|-----------|-------|--------|
| `Card Background` | any CSS color (e.g. `#fff8ec`) | Sets the background behind each card's text (eyebrow, title, description, meta). |
| `Text Color` | any CSS color | Sets the color of the eyebrow, title, description, and meta text on every card. |

<!-- No URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### Icon vs. image art panel
- **Cell 1 has an image**: the photo covers the whole art panel; the icon glyph and theme color are skipped.
- **Cell 1 has a recognized icon name, no image**: renders the glyph over its default theme color.
- **Cell 1 has an unrecognized name, no image**: falls back to the `green` theme with no glyph.

### Card Background / Text Color
Both are block-wide — they apply to every card the same way, not per-card. Omit either (or both) to keep the default look (white card background, brand-green eyebrow, dark body text).

### Error Handling
- **Missing time or servings cell**: that meta item is omitted from the card.
- **Config rows with an empty value cell**: ignored; the corresponding CSS variable is left unset and the default styling applies.
