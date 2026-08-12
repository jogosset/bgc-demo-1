# Hero V2 Block

## Overview

A bold, two-column hero banner: badge, heading with a highlighted word, lead copy, up to 3 CTA buttons, up to 3 "mode" pills (pickup/delivery/etc.), and a 2×2 grid of colored image tiles with a floating tag pill. Modeled on a red/gold gradient banner design. Everything — text, colors, background, and the four tiles — is editable without code.

## Integration

### Content Model

The block is a list of `[Label]` / `[Value]` rows. All rows are optional except **Heading** — add only the rows a given page needs; omit the rest.

| Row label | Value | Notes |
|-----------|-------|-------|
| `Badge` | text | Small pill above the heading (e.g. "🛒 Pickup · Delivery · In-Store") |
| `Heading` | rich text | The main headline. Select a word/phrase and italicize it (Cmd/Ctrl+I) to render it in the accent gold color, matching the reference design's `<em>` highlight. |
| `Lead` | text | Supporting paragraph under the heading |
| `Primary CTA` | link | Solid red button |
| `Secondary CTA` | link | Solid dark button |
| `Tertiary CTA` | link | Outline button |
| `Mode 1` / `Mode 2` / `Mode 3` | text | Small pills under the CTAs (e.g. "🧺 Free Curbside Pickup") — type the emoji directly as part of the text |
| `Tag` | text | Floating pill on the bottom-left corner of the image grid (e.g. "🔥 Hatch Chile Season is Here") |
| `Background Image` | image | Inserted from the assets picker. Covers the whole block, behind the text. |
| `Background Color` | CSS color | Used when there's no background image (and shows through a transparent image). Falls back to the default red/gold gradient when neither is set. |
| `Text Color` | CSS color | Recolors the heading, lead paragraph, and mode pills (not the buttons, which keep their own contrast-safe styling) |
| `Square 1` … `Square 4` | color text + optional image | See below |

### The four image tiles

Each `Square N` row's value cell can hold:
1. A line of text with a CSS color (e.g. `#2e7d32`) — sets that tile's background.
2. An image, inserted from the assets picker — shown centered on top of the tile as a rounded photo, **while the tile's background color still fills the rest of the square**.

Either part can be omitted. With nothing set, the tile falls back to one of four preset gradient colors (gold, green, red, green) matching the reference design's default look.

## Behavior Patterns

### Background priority
1. **Background Image** present → covers the block; `Background Color` (if also set) shows through any transparent areas of the image.
2. **No image, `Background Color` set** → flat color fill.
3. **Neither set** → default red/gold diagonal gradient.

### Error Handling
- **Missing rows**: each section (badge, lead, CTAs, modes, tag) simply doesn't render if its row is absent — no placeholder text.
- **Square with no color and no image**: falls back to that tile's default preset gradient.
- **Fewer than 3 CTAs or modes authored**: only the authored ones render; layout doesn't leave gaps.
