# Recipe Cards Block

## Overview

A grid of recipe cards, each with a colored icon panel, category eyebrow, title, description, and time/servings meta. Used for inspiration/recipe sections.

## Integration

### Content Model

One row per recipe, seven cells each:

| Cell | Content | Description |
|------|---------|--------------|
| 1 | theme | One of: `green`, `deep`, `dark` — controls the icon panel's background color. Unrecognized values fall back to `green`. |
| 2 | icon name | One of: `peach`, `beef`, `shrimp`. Unrecognized names render no icon glyph. |
| 3 | text | Eyebrow/category label (e.g. "Baking") |
| 4 | text | Recipe title |
| 5 | text | Short description |
| 6 | text (optional) | Time (e.g. "50 min"); omit to hide |
| 7 | text (optional) | Servings (e.g. "Serves 8"); omit to hide |

<!-- No configuration keys, URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### Error Handling
- **Missing time or servings cell**: that meta item is omitted from the card.
- **Unknown theme or icon name**: falls back to the `green` theme / no icon glyph.
