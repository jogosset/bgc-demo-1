# CTA Banner Block

## Overview

A full-width colored band with a heading, supporting text, and a single call-to-action button. Used for section-level prompts like a loyalty program signup.

## Integration

### Content Model

A single row with two cells:

| Cell | Content | Description |
|------|---------|--------------|
| 1 | rich copy | A heading (`<h2>`) and a paragraph |
| 2 | link | A single `<a href>` rendered as the CTA button |

<!-- No configuration keys, URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### User Interaction Flows
1. **Single CTA**: clicking the button navigates to the authored link's `href`; no in-block state.

### Error Handling
- **No link authored**: the copy still renders; no button is shown.
