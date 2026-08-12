# Recipe Cards Block

## Overview

A grid of recipe cards, each with a colored icon panel, category eyebrow, title, description, and time/servings meta. Used for inspiration/recipe sections.

## Integration

### Content Model

One row per recipe, two cells each:

| Cell | Content | Description |
|------|---------|--------------|
| 1 | icon name | One of: `peach`, `beef`, `shrimp`. Also picks the art panel's theme (peach→green, beef→deep, shrimp→dark). |
| 2 | up to four paragraphs | In order: eyebrow/category (e.g. "Baking"), recipe title, short description, and a "time · servings" line (e.g. "50 min · Serves 8"). Omit the last paragraph to hide the meta row. |

<!-- No configuration keys, URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### Error Handling
- **Missing time or servings cell**: that meta item is omitted from the card.
- **Unknown theme or icon name**: falls back to the `green` theme / no icon glyph.
