🌐 BoonMind Studio
Premium brands & websites — delivered in days.

Built by Carl Boon — Architect, Designer, Strategist.

BoonMind Studio is a next-generation creative system combining brand identity design, modern web development, narrative architecture, and ultra-fast execution through a bespoke multi-agent workflow.

This repository contains the full production build of the BoonMind Studio website — a high-performance, animation-rich, accessibility-aware, single-page experience showcasing the studio’s capabilities and methodology.

✨ What Makes BoonMind Different

BoonMind Studio operates on a unique principle:

Speed without compromise.

Every project is delivered through a 7-Day Immersion Build, where brand, strategy, design, copy, website, and digital assets are created in a single continuous workflow — not handed off between siloed teams.

This model is supported by:

Cross-domain expertise (design, branding, strategy, business, product, SEO, writing, tech)

A bespoke multi-agent AI system

A rigorous QA methodology inspired by high-reliability industries

A founder-led, business-first approach

The result is simple:

Clients receive world-class branding & websites in days — not months.

🧱 Project Structure
BoonMind-Studio/
│
├── assets/                 # Case study placeholders, OG images
├── fonts/                  # Self-hosted Inter font (woff2)
│   ├── inter-regular.woff2
│   ├── inter-bold.woff2
│   └── inter.css
│
├── favicon-16.png
├── favicon-32.png
├── favicon-256.png
├── favicon.ico
│
├── index.html              # Main page (SPA)
├── style.css               # Design system, layout, components, tokens
├── script.js               # Navigation, GSAP animations, cursor, interactions
├── manifest.json           # PWA + meta info
│
└── README.md               # (this file)


This is a pure static build — no frameworks, no dependencies, no build tools.
Designed for maximum portability and zero deployment friction.

🎨 Design System & UI Architecture

The interface is built on a flexible token-driven design system:

Colors

--black, --soft-black, --charcoal

--white, --off-white, --fog

--electric-blue (accent)

Spacing Tokens

A consistent rhythm using
--space-xs / --space-sm / --space-md / --space-lg / --space-xl.

Typography

Self-hosted Inter (regular + bold).
Optimised for clarity, density, and modern brand tone.

Border Radius Tokens

--radius-sm

--radius-md

--radius-lg

Shadow Tokens

--shadow-card

--shadow-hover

All components — cards, pricing blocks, navigation, sections — inherit from these primitives.

⚡ Motion System & Interactions

The site uses GSAP + ScrollTrigger for buttery-smooth motion:

Hero text entrance

Section fade/slide reveals

Parallax image scrolls

Cursor glow + hover scaling

Navigation slide-in

Smooth progress indicator

FAQ expand/collapse

Animations automatically respect:

prefers-reduced-motion

mobile gesture constraints

CPU throttling

📱 Responsiveness & Accessibility

Fully responsive from 360px → 1920px

Fluid typography with clamp()

Improved mobile menu with scroll-lock

Semantic HTML5

Accessible tab order

Visible focus states for keyboard users

WCAG-friendly contrast ratios

Images lazy-loaded for performance

🔍 SEO & Meta Infrastructure

Included:

Canonical URL

Meta description + keywords

OpenGraph tags

Twitter Card tags

Default OG image (./assets/og-default.jpg)

Manifest.json

Favicon suite

Structured markup (organization + local business ready)

Planned (Phase 2):

FAQ schema

JSON-LD for services

Case-study schema

Automated sitemap generation

🚀 Deployment

This repo is optimised for Netlify, Vercel, GitHub Pages, or any static host.

Netlify Settings

Build command: none

Publish directory: /

Branch: main

Auto-deploy: enabled

No dependencies. No build step. Zero friction.

🛠️ Local Setup

Clone the repo:

git clone https://github.com/CBoon99/BoonMind-Studio.git


Open index.html directly or run a simple server:

npx serve


or

python3 -m http.server

🧩 Roadmap (Studio Website)
Phase 3 — Polish

Global spacing pass

Navigation polish

Mobile hero refinement

Consistent hover states

Phase 4 — Case Studies

Add first live case study

Add interactive cards

Add testimonials

Phase 5 — Content Engine

Blog engine (static)

SEO article templates

Phase 6 — Analytics

Netlify Analytics

Privacy-friendly tracking

🖋️ Author

Carl Boon
Founder, BoonMind Studio
Designer • Strategist • Builder

💬 License

Open for review. Not open for reuse without permission.