# kale-iklimlendirme

Production web application and lead-generation platform built for Kale İklimlendirme (industrial & commercial HVAC engineering).

- **Production URL**: https://www.kaleiklimlendirme.com.tr
- **Architecture**: Static Site Generation (SSG) with Partial Hydration (Islands)
- **Lighthouse Scores**: 100 SEO, 96 Best Practices, 95 Accessibility

---

## Technical Overview

High-performance, zero-maintenance static platform designed for sub-second page loads, automated edge delivery, and structured local search visibility. Replaces traditional CMS overhead with a git-driven content layer and headless form pipelines.

### Core Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Astro 5.4 | Zero client-side JS by default, static HTML generation |
| Runtime UI | React 19 | Isolated client islands (`client:idle`, `client:visible`) |
| Styling | Tailwind CSS 3.4 | Atomic utilities, purged production bundles |
| Components | Radix UI + Preline 2.7 | Accessible dialogs, accordions, and focus traps |
| Image Pipeline | Sharp | Build-time WebP conversion, responsive `<picture>` srcset |
| Asset Delivery | `astro-compressor` | Build-time pre-compression (Brotli, Gzip, Zstandard) |
| Hosting | Vercel Edge Network | Anycast CDN, automatic SSL, atomic git deployments |

---

## Architecture & Engineering Highlights

### 1. Partial Hydration Strategy (Islands Architecture)
Client-side JavaScript is strictly scoped to interactive leaf nodes:
- `FastQuoteModal.tsx`: Hydrated via `client:idle` to eliminate main-thread blocking during initial paint.
- `FaqAccordion.tsx`: Hydrated via `client:visible` (IntersectionObserver trigger).
- Global layout and static pages ship 0 KB framework runtime.

### 2. Performance & LCP Optimization
- **Responsive WebP Assets**: Hero background served via dual-density `<picture>` element (53 KB mobile / 148 KB desktop), replacing legacy 890 KB JPEG.
- **Resource Hints**: Preconnect to `fonts.gstatic.com` and `fetchpriority="high"` preload on above-the-fold media.
- **Non-blocking Fonts**: Asynchronous stylesheet loading via media swap technique (`media="print" onload="this.media='all'"`).
- **Pre-compressed Artifacts**: Dist directory outputs pre-built `.br`, `.gz`, and `.zst` files for immediate byte-range streaming.

### 3. Structured Data & Technical SEO (100/100)
- **Linked Data (JSON-LD)**: Rich schema graphs covering `@type: HVACBusiness`, `@type: Service`, `@type: Article`, and `@type: BreadcrumbList`.
- **Local SEO**: Standardized NAP (Name, Address, Phone) aligning canonical DOM with Google Business Profile.
- **Sitemap & Robots**: Automated `sitemap-index.xml` compilation, filtered 404 exclusions, and programmatic `/robots.txt` API route.
- **Social Graph**: Validated OpenGraph (1200x630) and Twitter Card tags.

### 4. Telemetry & Conversion Pipeline
- **Event Dispatcher**: Global DOM listener pushing `phone_call_click` and `whatsapp_click` to `window.dataLayer` and `gtag`.
- **Lead Capture**: Async form handler delivering typed lead payloads to Web3Forms and optional webhook gateways without page navigation. Dispatches `generate_lead` conversion events upon success.

---

## Directory Structure

```text
kale-iklimlendirme/
├── public/
│   ├── images/              # Optimized static media assets
│   ├── favicon.ico
│   ├── llms.txt             # AI agent crawler reference
│   └── site.webmanifest
├── src/
│   ├── assets/              # Global styling tokens
│   ├── components/
│   │   ├── sections/        # Domain-specific page sections
│   │   ├── ui/              # Reusable React & Astro primitives
│   │   ├── Header.astro     # Global navigation with mobile drawer
│   │   ├── Footer.astro     # Footer with localized schema links
│   │   └── Meta.astro       # Head manager (SEO, OpenGraph, JSON-LD)
│   ├── content/
│   │   ├── projects/        # Markdown-driven HVAC project case studies
│   │   └── services/        # Markdown-driven HVAC service specifications
│   ├── content.config.ts    # Strict Zod schema validation for collections
│   ├── data_files/
│   │   └── company.json     # Single source of truth for business metadata
│   ├── layouts/
│   │   └── MainLayout.astro # Base HTML shell with GTM/GA4 hooks
│   ├── pages/               # File-based routing engine
│   └── utils/
│       ├── navigation.ts    # Navigation tree definition
│       └── notifications.ts # Lead formatters and submission dispatchers
├── astro.config.mjs         # Integrations, trailing slash, compression rules
└── tailwind.config.mjs      # Design tokens, color system, font stacks
```

---

## Content Schema (Zod Validation)

Project case studies and service definitions are enforced at compile time via `astro:content`:

```typescript
// src/content.config.ts
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    icon: z.string(),
    order: z.number().default(99),
    features: z.array(z.string()).default([]),
  }),
});
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone repository
git clone https://github.com/oguzgucuk/kale-iklimlendirme.git
cd kale-iklimlendirme

# Install dependencies
pnpm install
```

### Development

```bash
# Start local development server
pnpm dev
```

### Production Build

```bash
# Typecheck content, build static pages, pre-compress outputs
pnpm build

# Preview production build locally
pnpm preview
```

---

## Environment Variables

Configure in `.env` or deployment dashboard:

```bash
# Lead notification gateway (Web3Forms Access Key)
PUBLIC_WEB3FORMS_KEY=

# Google Analytics / Google Ads conversion tracking (Optional)
PUBLIC_GA_ID=

# Google Tag Manager Container ID (Optional)
PUBLIC_GTM_ID=

# Background WhatsApp dispatch options (Optional)
PUBLIC_CALLMEBOT_API_KEY=
PUBLIC_CALLMEBOT_PHONE=
PUBLIC_WHATSAPP_WEBHOOK_URL=
```

---

## License

Private repository. Copyright (c) Kale İklimlendirme. All rights reserved.
