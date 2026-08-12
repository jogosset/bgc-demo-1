# Hero Block

## Overview

The full-width banner at the top of a page: an optional background picture, heading, body copy, and CTA link. Extended to let authors set a background color and text color without editing code.

## Integration

### Content Model

Normal hero content (picture, heading, paragraphs, CTA link) is unchanged. Two additional **optional** rows may be appended after the main content, each a `[Setting]` / `[Value]` pair:

| Row label | Value | Effect |
|-----------|-------|--------|
| `Background Color` | any CSS color (e.g. `#35692f`, `rebeccapurple`) | Sets the block's background color. Shows through wherever there's no background picture, or behind a transparent picture. |
| `Text Color` | any CSS color | Sets the color of the heading and paragraph text (not the CTA button, which keeps the site's button styling for contrast). |

Both rows are optional and can be added independently. Omit either (or both) to keep the existing default look (background picture only, heading text colored via the theme's `--background-color` token).

<!-- No URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### Background Picture vs. Background Color
- **Picture present**: renders as before, positioned to cover the block.
- **Background Color row present, no picture**: the block's background is the given color.
- **Both present**: the picture renders on top of the color (useful as a fallback color while the image loads, or for transparent images).

### Error Handling
- **Config rows with an empty value cell**: ignored; the corresponding CSS variable is left unset and the default styling applies.
- **Invalid CSS color value**: the browser ignores the invalid value and falls back to the default (transparent background / theme text color).
