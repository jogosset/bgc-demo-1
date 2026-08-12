# Brand Story Block

## Overview

A heritage/about section: a founding-year seal badge next to story copy, with an optional row of stats (e.g. founding year, states served, generations). Rendered on a solid brand-color background.

## Integration

### Content Model

- **Row 1** (required): two cells — `[year]` `[rich copy]`. The year cell is short text shown inside the seal badge; the copy cell holds a heading and one or more paragraphs.
- **Rows 2+** (optional): two cells each — `[stat value]` `[stat label]`, rendered as a row of stat callouts below the copy.

<!-- No configuration keys, URL parameters, local storage, or events used by this block. -->

## Behavior Patterns

### User Interaction Flows
1. **Read-only section**: no interactive elements; renders the seal, copy, and stats as authored.

### Error Handling
- **No stat rows authored**: the stats row is omitted entirely rather than rendering empty.
