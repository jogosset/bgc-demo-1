# CTA Banner Block

## Overview

A full-width colored band with a heading, supporting text, and a single call-to-action button. Used for section-level prompts like a loyalty program signup. The band's background color is editable without code.

## Integration

### Content Model

**Row 1 (required)**, two cells:

| Cell | Content | Description |
|------|---------|--------------|
| 1 | rich copy | A heading (`<h2>`) and a paragraph |
| 2 | link | A single `<a href>` rendered as the CTA button |

**Optional trailing `[Label]` / `[Value]` settings row** — add after row 1:

| Row label | Value | Effect |
|-----------|-------|--------|
| `Background Color` | any CSS color (e.g. `#35692f`) | Sets the band's background color. The CTA button's own colors (white outline, white-fill-on-hover) are fixed and don't change with this setting, so the button stays legible against any background. |

<!-- No URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### User Interaction Flows
1. **Single CTA**: clicking the button navigates to the authored link's `href`; no in-block state.

### Error Handling
- **No link authored**: the copy still renders; no button is shown.
- **Config row with an empty value cell**: ignored; the background falls back to the default ink color.
