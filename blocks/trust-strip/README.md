# Trust Strip Block

## Overview

A row of icon + heading + text trust badges (e.g. shipping speed, delivery coverage, coupons, rewards). Typically placed just below the hero.

## Integration

### Content Model

One row per badge, two cells each:

| Cell | Content | Description |
|------|---------|--------------|
| 1 | icon name | One of: `truck`, `map`, `tag`, `star`. Unrecognized names fall back to `star`. |
| 2 | two paragraphs | First paragraph is the badge heading, second is the description. |

<!-- No configuration keys, URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### User Interaction Flows
1. **Read-only badges**: The block builds a static icon + heading + text tile per row; no interactivity.

### Error Handling
- **Unknown icon name**: falls back to the `star` icon rather than rendering nothing.
