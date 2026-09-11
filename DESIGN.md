# Design System: Maghanim

## Overview

A compact masthead leads into a centered gold Arabic mark, cream headline, description, and large gold coin rising from the bottom of the opening. Deep green remains dominant. The two supporting sections use ruled solution rows and a light governance panel. This records the effective styles in app/globals.css and components in app/page.tsx, including final cascade overrides.

## Colors

- Deep background: #022e27; emerald: #043b32; gold: #ddbd73; primary text: #f7f1df; secondary text: #bbcdc3; rules: #ffffff24.
- The opening gradient passes through #105647, #054036, and #022e27. Geometric texture opacity is 0.055.
- Governance uses #e9e8db with dark-green headings, #465d50 copy, and #6f795f seal lines.

## Typography

Bodoni Moda provides English display headings; Manrope provides interface and body copy. Arabic uses Noto Naskh Arabic with no heading letter spacing. Fonts load through Google Fonts.

- Hero: clamp(38px, 3.5vw, 50px), weight 600, line-height 1.05, tracking -0.035em, centered within 850px. Description: 14px.
- Section headings: clamp(36px, 3.5vw, 50px), weight 500, line-height 1.15. Supporting copy is generally 12–14px with paragraph line-height 1.85. Navigation is 10px, weight 600, uppercase, with 0.12em tracking.
- At 700px and below: hero clamp(32px, 8.3vw, 42px), Arabic hero 36px, section headings 38px, hero description 12px.

## Layout

The content wrapper is min(1280px, calc(100% - 112px)), changing to 32px gutters at 1000px and 20px at 700px. The masthead has separate 40px desktop gutters, 88px height, and a 136px wordmark at the start edge; mobile uses 20px gutters, 76px height, and a 112px wordmark.

The hero is a centered vertical flex composition, 740px high with 42px top padding. A 62 × 47px Arabic symbol precedes the headline, description, and actions. The coin follows the controls in normal flow with a 32px top margin, 550px width, and an 80vw maximum; the opening crops its lower edge. At 1550px and above, the hero is 790px high with 60px top padding and a 620px coin. At 700px and below, it remains 740px high with 38px top padding and a 430px coin capped at 105vw. The superseded orbit, coin caption, and hero foot are hidden.

Sections use 112px vertical padding, reduced to 70px on mobile. Solutions pair a two-column introduction with three ruled rows. Governance pairs a geometric seal with text and three principle rows. Both become single-column at 700px. Contact stacks vertically on mobile and the footer wraps.

## Elevation & Depth

The gradient, faint geometry, and isolated coin provide depth. The coin has a 0 28px 30px #001f2090 drop shadow and a 1.2-second entrance animation. Content surfaces stay flat. Reduced-motion preferences disable animations, transitions, and smooth scrolling.

## Shapes

Buttons have 3px corners. Thin rules organize solutions, principles, and the footer. The governance seal combines concentric circles and rotated squares.

## Components

- Assets: /wordmark.png provides the cream header/footer mask; /brand-symbol-mask.png provides the gold Arabic hero mask; /coin-hero.png supplies the coin; /geometry.svg supplies the background texture. Preserve supplied lettering and coin engraving.
- Actions: gold fill, deep-green text, 54px minimum height, 16px × 24px padding, and #f0d38f hover fill. Hero buttons use 42px minimum height, 10px × 18px padding, and 11px text. Text links use stroked arrows and turn gold on hover.
- Navigation: four section anchors and an English/Arabic switch. Mobile navigation opens beneath the masthead; selecting an anchor or pressing Escape closes it. Language switching updates document language and direction and reverses action arrows.
- Accessibility: 2px gold focus outlines with 6px offset, a focus-revealed skip link, and an expanded state on the mobile menu. The contact button reveals a localized coming-soon status message.

## Do's and Don'ts

- Do preserve the centered hero hierarchy, compact masthead, green field, and partially cropped coin.
- Do keep artwork below the controls and preserve readable spacing in both languages.
- Do extend the existing ruled rows and restrained geometry.
- Don't restore the superseded split hero, orbital rings, or hero foot labels.

## Coin sizing update
The hero now grows with its content rather than using a fixed clipping height. The full coin is visible at 400px on desktop and 300px on mobile, capped at 76vw, with bottom padding and 28px separation from the controls.
