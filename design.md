# Design — Kale İklimlendirme

A locked design system for Kale İklimlendirme corporate HVAC and engineering platform.
Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

## Genre
modern-minimal · architectural-engineering

## Macrostructure Family
- Marketing / Homepage: Dossier & Stat-Led Engineering
  - Asymmetric flagship spotlight (VRF Projelendirme) paired with technical service matrix.
  - Linear engineering milestone timeline (no generic 4-box card-in-card).
  - High-density proof: real project documentation (TCDD Haydarpaşa, Carrier 5'li Multi Inverter, Tablo Adalar) with full metadata, verified locations, and zero truncated text.
  - Zero repetitive section eyebrows.

## Theme Tokens
- `--color-paper`: #ffffff
- `--color-paper-muted`: #f8fafc (slate-50)
- `--color-paper-subtle`: #f1f5f9 (slate-100)
- `--color-ink`: #0a1628 (tok mühendislik laciverti)
- `--color-ink-muted`: #334155 (slate-700)
- `--color-ink-faint`: #64748b (slate-500)
- `--color-rule`: rgba(226, 232, 240, 0.85) (slate-200)
- `--color-accent`: #0284c7 (brand-600 / cobalt engineering blue)
- `--color-accent-hover`: #0369a1 (brand-700)
- `--color-accent-surface`: #f0f9ff (brand-50)
- `--color-accent-border`: rgba(2, 132, 199, 0.25)
- `--radius`: 0.5rem (8px - locked modern engineering corner radius)

## Typography
- Display: 'Plus Jakarta Sans', sans-serif, weight 700 / 800, style normal, tracking -0.025em
- Body: 'Inter', sans-serif, weight 400 / 500 / 600, tabular-nums
- Rules:
  - Never italicize headers for decorative emphasis.
  - Never place uppercase mono eyebrows on every section.
  - Headers are roman (`font-style: normal`).

## Spacing & Grid
- Standard 8-point vertical grid.
- Section padding: `py-16 sm:py-24` on major sections, `py-12 sm:py-16` on compact closures.
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

## Component Disciplines
1. **No Icon-Tile Feature Boxes**: Avoid the 2018 template cliché of an icon sitting inside a colored rounded square at the top-left of every card. Lead directly with technical hierarchy.
2. **No Card-in-Card**: Remove unnecessary outer container borders around metrics or child cards.
3. **No Fabricated Data**: Use only verified company specs (15+ yıl, 500+ proje, 8 yetkili marka, İstanbul geneli mobil servis).
4. **No Ellipses Truncation in Cards**: Project names, locations, and descriptions must read completely.
