<div align="center">

# BoonMind Studio  
Premium brands & websites — delivered in days.

</div>

---

## 1. Executive Summary
BoonMind Studio is Carl Boon’s architect-led, multi-agent creative system. This repository contains the production-ready marketing site: a single-page narrative experience with premium motion, bespoke workflow visualization, and a comprehensive services breakdown. The stack is intentionally minimal (pure HTML/CSS/JS) so deployments are instant and vendor-agnostic.

---

## 2. Highlights
- **Narrative hero** with orbital cursor + progress indicator.
- **Architect System™ workflow**: vertical, token-driven, hover-to-reveal process map.
- **GSAP micro-interactions** honoring `prefers-reduced-motion`.
- **Unified design system** (color/spacing/radius/shadow tokens).
- **SEO-ready head**: canonical, OG/Twitter, manifest, favicon suite, local font preloads.
- **Accessibility-first markup**: aria controls, keyboard support, visible focus, tooltips.

---

## 3. Project Structure
```
BoonMind-Studio/
├─ assets/                 # OG image + case-study placeholders
├─ fonts/                  # Self-hosted Inter (regular/bold)
├─ Brand Docs/             # Guidelines + logo marks
├─ favicon-*.png / .ico    # Touch + browser icons
├─ index.html              # Main page
├─ style.css               # Tokens, layout, components
├─ script.js               # GSAP, cursor, mobile menu, FAQ logic
├─ manifest.json           # Minimal PWA manifest
└─ README.md               # This document
```
No build tools. Serve `index.html` directly or via any static host.

---

## 4. Design System
| Token Group      | Values / Notes                                                                     |
|------------------|-------------------------------------------------------------------------------------|
| Colors           | `--black`, `--charcoal`, `--soft-black`, `--white`, `--silver`, `--electric-blue`   |
| Spacing          | `--space-xs` → `--space-xxl` (0.5rem → 5rem)                                        |
| Typography       | Inter Tight + Inter (self-hosted), `clamp()` sizing for hero + sections             |
| Radius           | `--radius-sm`, `--radius-lg` used across buttons/cards/panel corners                |
| Shadows          | `--shadow-card`, `--shadow-hover` unified for elevation and hover states            |
| Layout           | `.container` capped at `var(--max-width-desktop)` with adaptive padding             |

Workflow diagram extends this system with panel gradients, connector lines, and tooltip micro-animations.

---

## 5. Motion System
- GSAP 3 + ScrollTrigger (CDN).
- `initGsapAnimations()` guards against missing CDN + `prefers-reduced-motion`.
- Section reveals, stat counters, and workflow nodes animate only when present.
- Custom cursor trails smooth-follow; disabled on small screens / reduced motion.
- Mobile menu uses slide + opacity transitions with body scroll locking.

---

## 6. SEO & Metadata
| Item               | Status |
|--------------------|--------|
| `<title>` & description | ✅ |
| Canonical (`https://www.boonmindstudio.io/`) | ✅ |
| OpenGraph/Twitter tags | ✅ (same OG image placeholder in `/assets`) |
| Manifest + favicons + apple touch | ✅ |
| Local font preloads | ✅ |
| Schema JSON-LD | ❌ (not in current scope; add once content final) |

Robots/Netlify headers are not part of this repo; configure at deploy target.

---

## 7. Accessibility
- Semantic headings, section landmarks, and descriptive copy.
- Nav/menu buttons have `aria-label`, `aria-controls`, `aria-expanded`.
- FAQ uses `<button>` with `aria-expanded` toggling.
- Workflow nodes are focusable (`tabindex="0"`) with tooltips that dismiss on blur.
- Focus states visible on all interactive elements; color contrast meets AA.
- `prefers-reduced-motion` disables heavy animations + cursor trails.

---

## 8. Local Development
```bash
# Clone
git clone https://github.com/CBoon99/BoonMind-Studio.git
cd BoonMind-Studio

# Serve (option A)
npx serve .

# Serve (option B)
python3 -m http.server
```
Open `http://localhost:5000` (or whichever port your server uses). No build step required.

---

## 9. QA / Pre-Launch Checklist
### Layout & Structure
- [ ] Test hero, workflow, pricing, and timeline across 320 / 375 / 768 / 1024 / 1440 / 1920 widths.
- [ ] Confirm `.container` alignment is consistent in every section.
- [ ] Scan for any unused or legacy classes (should be none).

### Workflow Diagram
- [ ] Panel centered with 40–60px padding.
- [ ] Vertical stages + horizontal content alignment.
- [ ] Connector line and node glow visible.
- [ ] Hover/focus tooltip + scale (1.04) smooth on desktop + keyboard.

### Motion & Interaction
- [ ] `prefers-reduced-motion` disables GSAP + cursor gracefully.
- [ ] Smooth scroll guard works (no errors on placeholder links).
- [ ] Mobile menu: aria attributes update, body scroll lock releases on close.
- [ ] Cursor doesn’t block clicks; hides on touch devices.

### Performance
- [ ] Run Lighthouse (desktop + mobile). Aim for <1.5s interactive on 4G.
- [ ] Confirm `loading="lazy"` on case-study images + OG asset size ~1200×630.
- [ ] Remove console logs if shipping to production (currently only hero Easter egg).

### SEO
- [ ] Validate OG image loads (Netlify CDN path).
- [ ] If adding schema later, test via https://validator.schema.org.

### Accessibility
- [ ] Keyboard traversal: nav, workflow nodes, FAQ, pricing buttons, footer links.
- [ ] Tooltips should not trap focus or require hover to dismiss.

### Links
- [ ] Primary CTA → `mailto:[email protected]`
- [ ] Secondary CTA → `https://cal.com/boonmindstudio/intro-call`
- [ ] Footer social placeholders replaced when live handles available.

### Cross-Browser
Test on actual devices/browsers (not possible in this sandbox):
- iOS Safari + Chrome
- Android Chrome
- macOS Safari/Chrome
- Windows Chrome/Edge
Include slow-network/throttling tests before go-live.

---

## 10. Deployment
Recommended: **Netlify**
- Build command: _none_
- Publish directory: `/`
- Environment: default
- Ensure OG image path matches final domain.

Other options (Vercel, GitHub Pages) work identically—just serve the root.

---

## 11. Roadmap / Enhancements
1. **Schema JSON-LD** (Organization + FAQ).
2. **Case-study gallery** with real assets + video loops.
3. **Content engine** (MDX/Notion sync) for thought leadership posts.
4. **Netlify Functions** for lead capture + analytics instrumentation.
5. **Automated linting** (HTMLHint/Stylelint) via GitHub Actions once npm access is available server-side.

---

## 12. Credits & License
Designed, written, and engineered by **Carl Boon**.  
© BoonMind Studio. All rights reserved.  
No redistribution of design or copy without explicit permission.