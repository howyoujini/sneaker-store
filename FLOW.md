# Navigation flow

How the generated `data-nav` wiring connects the screens. The interaction
audit fails the build on a dead end or an unreachable screen; back-affordance
gaps are warnings.

- Screens: 1
- Entry points: Homepage
- Navigation edges: 0

## Dead ends (data-nav points at no screen)
- `Homepage` → "Browse" (no such screen)
- `Homepage` → "Cart" (no such screen)
- `Homepage` → "Product detail" (no such screen)
- `Homepage` → "Browse" (no such screen)
- `Homepage` → "Product detail" (no such screen)
- `Homepage` → "Product detail" (no such screen)
- `Homepage` → "Product detail" (no such screen)
- `Homepage` → "Product detail" (no such screen)

## Edges
