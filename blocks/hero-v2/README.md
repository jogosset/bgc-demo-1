# Hero V2 Block

## Overview

A bold, two-column hero banner: heading with a highlighted word, lead copy, up to 3 CTA buttons, an optional badge and mode pills, and a 2×2 grid of colored image tiles with a floating tag. Modeled on a red/gold gradient banner design. Everything — text, colors, background, and the four tiles — is editable without code.

## Integration

### Content Model

**Row 1 (required) is the main content row and works exactly like the site's default Hero block** — type directly, no special labels needed:

| Cell | Content |
|------|---------|
| 1 | A heading, one or more lead paragraphs, and CTA links — authored the normal way for this site: wrap a link in **bold** for a solid red button, *italic* for an outline button, or ***bold italic*** for a solid dark button. Italicize a word inside the heading itself (not a link) to highlight it in gold. |
| 2 | (optional) A background image, inserted from the assets picker. Covers the whole block, behind everything else. |

**Rows 2+ are optional `[Label]` / `[Value]` settings rows** — add only the ones a page needs:

| Row label | Value | Notes |
|-----------|-------|-------|
| `Badge` | text | Small pill above the heading (e.g. "Pickup · Delivery · In-Store") |
| `Modes` | one paragraph per pill | Small pills under the CTAs (e.g. "🧺 Free Curbside Pickup") — type the emoji directly as part of the text, one pill per paragraph, up to 3 |
| `Tag` | text | Floating pill on the bottom-left corner of the image grid (e.g. "🔥 Hatch Chile Season is Here") |
| `Squares` | up to 4 images | Inserted from the assets picker, one after another in this cell. In order, they fill the 2×2 tile grid top-left → bottom-right. Fewer than 4 is fine — remaining tiles stay plain color. |
| `Square Colors` | up to 4 CSS colors, comma-separated | e.g. `#F2A900, #2E7D32, #D71920, #4CAF50`. Sets each tile's background color, in the same order as `Squares`. A tile's color always shows — an image sits centered on top of it, it doesn't replace it. |
| `Background Color` | CSS color | Used when there's no background image (and shows through a transparent one). Falls back to the default red/gold gradient when neither is set. |
| `Text Color` | CSS color | Recolors the heading, lead paragraph, and mode pills (not the buttons, which keep their own contrast-safe styling) |

## Behavior Patterns

### Background priority (the whole block)
1. **Row 1, cell 2 has an image** → covers the block; `Background Color` (if set) shows through any transparent areas.
2. **No image, `Background Color` set** → flat color fill.
3. **Neither set** → default red/gold diagonal gradient.

### The four tiles vs. the background
The 2×2 tile grid (`Squares` / `Square Colors`) is a separate decorative element from the block's own background — think of it as a card floating in the right column. A tile keeps its assigned (or default preset) color even after an image is added to it.

### Error Handling
- **No CTA links authored, or not bold/italic**: a plain (unformatted) link stays a plain text link — it won't become a button. This matches the site-wide convention.
- **`Squares` has fewer than 4 images / `Square Colors` has fewer than 4 colors**: remaining tiles fall back to one of four preset gradient colors (gold, green, red, green).
- **Missing optional rows** (`Badge`, `Modes`, `Tag`, etc.): that section simply doesn't render — no placeholder text.
