---
name: Bookopedia
description: An online bookstore laid out as a walk along book-fair stalls.
colors:
  banner-red: "#C8332B"
  banner-red-deep: "#A8261F"
  marigold: "#F2B233"
  canopy-green: "#1F5A3A"
  canopy-green-deep: "#174630"
  indigo-cloth: "#2C3E8C"
  turquoise-cloth: "#157780"
  jute-cloth: "#7A4A22"
  rani-pink-cloth: "#C2306C"
  enamel-white: "#FFFFFF"
  daylight-ground: "#F7F6F3"
  signboard-ink: "#1A1412"
  ink-muted: "#5A4E47"
  bamboo: "#C9A35A"
  bamboo-node: "#8E6B2E"
typography:
  display:
    fontFamily: "Anek Bangla, Hind Siliguri, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6.6vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 78"
  headline:
    fontFamily: "Anek Bangla, Hind Siliguri, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 80"
  title:
    fontFamily: "Anek Bangla, Hind Siliguri, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.02
    fontVariation: "'wdth' 85"
  title-sm:
    fontFamily: "Anek Bangla, Hind Siliguri, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.02
    fontVariation: "'wdth' 88"
  signboard:
    fontFamily: "Anek Bangla, Hind Siliguri, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 800
    lineHeight: 1.15
  body:
    fontFamily: "Hind Siliguri, Anek Bangla, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Hind Siliguri, Anek Bangla, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Anek Bangla, Hind Siliguri, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.07em"
  button:
    fontFamily: "Anek Bangla, Hind Siliguri, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    letterSpacing: "0.01em"
rounded:
  board: "3px"
  pole: "7px"
  rivet: "50%"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  section: "clamp(3.5rem, 7vw, 6rem)"
components:
  button-red:
    backgroundColor: "{colors.banner-red}"
    textColor: "{colors.enamel-white}"
    typography: "{typography.button}"
    rounded: "{rounded.board}"
    padding: "0.7rem 1.4rem"
    height: "48px"
  button-red-hover:
    backgroundColor: "{colors.banner-red-deep}"
  button-marigold:
    backgroundColor: "{colors.marigold}"
    textColor: "{colors.signboard-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.board}"
    padding: "0.7rem 1.4rem"
    height: "48px"
  button-marigold-hover:
    backgroundColor: "#F7C356"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.enamel-white}"
    typography: "{typography.button}"
    rounded: "{rounded.board}"
    padding: "0.7rem 1.4rem"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.banner-red}"
  button-sm:
    padding: "0.5rem 1rem"
    height: "44px"
  search-input:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.signboard-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.board}"
    padding: "0.7rem 0.9rem"
    height: "48px"
  signboard:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.signboard-ink}"
    rounded: "{rounded.board}"
  stall-board:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.signboard-ink}"
    typography: "{typography.signboard}"
    rounded: "{rounded.board}"
    padding: "0.7rem 0.8rem"
  stall-board-selected:
    backgroundColor: "{colors.marigold}"
  counter:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.signboard-ink}"
    padding: "clamp(1.25rem, 3vw, 2rem)"
  notice-board:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.signboard-ink}"
    rounded: "{rounded.board}"
    padding: "clamp(2rem, 5vw, 3.75rem)"
---

# Design System: Bookopedia

## Overview

**Creative North Star: "Boi Mela Stalls"**

The site is a lane at a Bangladeshi book fair. Whole sections are dyed cloth: a banner-red field, a canopy-green stall lane, a marigold notice field, then a final red banner. Against those fields stand white enamel signboards, edged in warm ink and hung on flat painted bamboo poles. Strings of triangular bunting run across the top. The lettering is signwriter's paint: Anek Bangla, heavy and condensed, with the Bangla name painted beside the English at equal weight.

The colour is loud and arrives in fields, not in accents. Inside each field, the density comes from the signboards: tight, factual, label-like (ISBN, year, price, stock). Depth comes from physical hanging objects (boards, poles, flags, book covers) with soft, warm, downward shadows, never from glass, glow or layered cards. The cloth carries a faint woven texture, a material and not an ornament.

Motion behaves like cloth and paper, and is driven by the Motion library (`motion/react`) with `MotionConfig reducedMotion="user"`. On load the bunting is hung flag by flag, then sways slowly. A stall's banner unrolls when you choose it, then swings on its pole and settles. Its books are laid on the counter one after another, and the old ones leave quickly. The order-route flags hang in sequence, Pending to Delivered, when the section comes into view. Under reduced motion every element appears in its final state, with no movement.

**Key Characteristics:**
- Page-scale cloth fields in red, canopy green and marigold, separated by full-bleed section changes.
- White enamel signboards: 2-3px ink border, an inset ink keyline, 3px corners.
- Bilingual Bangla and English signboard pairs at equal weight.
- Flat painted bamboo poles and triangular bunting as structural props.
- Six genre cloths keyed per stall and passed in as `--cloth` / `--cloth-ink`.
- Heavy, condensed Anek Bangla display; Hind Siliguri for reading text.

## Colors

A saturated fairground palette: three field cloths, four genre cloths, enamel white, and a warm near-black ink.

### Primary
- **Banner Red** (banner-red): The hero and closing CTA fields, primary buttons, the painted underline on links, the rule between Bangla and English on stall boards, and the notice-board headline. Also the browser theme colour and the text caret.
- **Banner Red Deep** (banner-red-deep): Primary button hover and price figures on white.

### Secondary
- **Marigold** (marigold): The notice-board field, secondary buttons (Search, Create account on red), the selected stall board, text selection, and the focus ring on dark cloth.

### Tertiary
- **Canopy Green** (canopy-green): The stall-lane field, the information-desk sign strip, "in stock" text, and the Delivered flag.
- **Canopy Green Deep** (canopy-green-deep): Scrollbar track in the stall lane on mobile.
- **Genre cloths** (indigo-cloth, turquoise-cloth, jute-cloth, rani-pink-cloth): One per stall (Science Fiction, Documentary, Academic, Biography), with Novel on banner red and History on marigold. They colour the stall banner, the counter's top edge and the mock book covers. Indigo also colours the Processing flag and the focus ring on white boards.

### Neutral
- **Enamel White** (enamel-white): Every signboard, board, counter and input. Text on all dark cloths.
- **Daylight Ground** (daylight-ground): The page ground and the order-route section, the one place the fair shows bare ground between fields.
- **Signboard Ink** (signboard-ink): Body text, board borders, rules, rivets, the bunting string, and the footer field.
- **Ink Muted** (ink-muted): Secondary text on white: authors, fact labels, desk facts, route lede.
- **Bamboo / Bamboo Node** (bamboo, bamboo-node): Painted pole cane and its node bands. Props only, never text or surfaces.

### Named Rules
**The Cloth Field Rule.** Colour is applied as whole-section fields or as a whole stall cloth. A section is one cloth; it does not carry a second cloth as a decorative accent strip.

**The Cloth Ink Rule.** Every cloth declares its ink pair. White on red, green, indigo, turquoise, jute and rani pink; signboard ink on marigold. Never white on marigold.

**The Two Focus Rings Rule.** The focus ring is a 3px marigold outline on cloth fields and switches to indigo inside white boards (signboard, desk, notice, counter), so it is always visible against what sits behind it.

## Typography

**Display Font:** Anek Bangla (with Hind Siliguri, system-ui)
**Body Font:** Hind Siliguri (with Anek Bangla, system-ui)

**Character:** Anek Bangla is the signwriter: weights 500-800, its width axis squeezed to 75-88% for headlines so lines read as painted lettering. Hind Siliguri is the clerk's hand: plain, open, 400-600, for everything that has to be read. Both cover Bangla and Latin, so a bilingual pair never switches family.

### Hierarchy
- **Display** (800, clamp(3rem, 6.6vw, 5.4rem), 0.96, width 78%): The hero headline only, white on banner red.
- **Headline** (800, clamp(2.1rem, 4.2vw, 3.4rem), 1.02, width 80%): Section titles, the notice-board headline, the CTA title.
- **Title** (800, 1.75rem, width 85%): The counter title.
- **Title Small** (800, 1.35rem, width 88%): Book titles on the counter and notice-board rule titles.
- **Signboard** (800, 1.3rem, 1.15): Stall names, Bangla and English, at the same size and weight. Flags use the same pair at 1.6rem.
- **Body** (400, 1.0625rem, 1.6): Reading text, capped at 46-60ch.
- **Lede** (400, 1.15rem, 1.6): The hero lede, max 52ch.
- **Label** (600, 0.78rem, 0.07em, uppercase): Fact names in the book label grid (ISBN, Published, Price, Availability) only.
- **Button** (700, 1.05rem, 0.01em): Buttons and the skip link.

### Named Rules
**The Equal Pair Rule.** Bangla and English names on a signboard or flag are set at the same size and weight, stacked, Bangla first, and parted on stall boards by a 2px banner-red rule. Neither is a caption of the other.

**The Tabular Facts Rule.** ISBNs, years, prices and counts use tabular, lining numerals.

## Layout

A centred 1240px container with fluid gutters (clamp(1rem, 4vw, 2.5rem)). Sections are full-bleed cloth fields with vertical padding of clamp(3.5rem, 7vw, 6rem); the container sits inside them. The hero is a 3fr / 2fr grid (headline, then the desk on poles). The stall lane is a six-column row, then a full-width counter below it holding a two-column label grid. The notice board is capped at 1040px; the order route is four flags hanging from one ink string.

Spacing steps recur at 0.5rem, 1rem, 1.5rem and 2.5rem; ink rules (2px) divide rows instead of spacing alone.

Responsive: at 1080px the stalls go to three columns and the counter to one. At 900px the hero stacks, the desk caps at 560px, the flags go two-up, each with its own string segment, and the notice rules go single column. At 760px the nav wraps to a horizontally scrolling row under an ink rule, and the stall row becomes a horizontal scroll-snap strip with 64%-wide stalls. At 480px search stacks and its button goes full width, flags go single column, and CTA buttons share the row.

## Elevation & Depth

Depth is physical hanging, not interface layering. Boards and poles cast warm, ink-tinted (rgba(26, 20, 18, …)) downward shadows; the larger the board, the deeper the drop. Fields are flat with a faint woven texture. There are no hard offset shadows, glows or blurs.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 3px 10px rgba(26, 20, 18, .22)`): Default for buttons, header signboard, stall boards and poles.
- **Lift Hover** (`box-shadow: 0 6px 16px rgba(26, 20, 18, .28)`): Buttons on hover, with a 2px rise.
- **Hung Board** (`box-shadow: 0 10px 28px rgba(26, 20, 18, .32)`): The information desk on its poles.
- **Counter** (`box-shadow: 0 12px 30px rgba(10, 30, 20, .35)`): The stall counter, tinted toward the canopy green it sits on.
- **Notice** (`box-shadow: 0 14px 34px rgba(90, 55, 0, .3)`): The notice board, tinted toward the marigold field.
- **Book Cover** (`box-shadow: 2px 4px 10px rgba(26, 20, 18, .3)`): Mock covers on the counter.
- **Flag** (`filter: drop-shadow(0 4px 6px rgba(26, 20, 18, .25))`): Order-route flags, which are clipped shapes.

### Named Rules
**The Field-Tinted Shadow Rule.** A large board's shadow is tinted toward the cloth it hangs over (green-black on the lane, brown on marigold), never neutral grey.

## Shapes

Hard-edged and hand-made. Boards have barely softened 3px corners, a 2px (3px on the notice) ink border, and an inset 1px ink keyline drawn 7-10px inside the edge, like a painted enamel sign. Poles are 14px rods with 7px rounding and node bands every 96px (stall frames: 7px rods, 57px nodes). Bunting and route flags are triangles and swallowtails (polygon clip). Cloth hems are 2px dashed white lines 14px in from the edge. Notice boards carry four 9px round ink rivets. Book covers are 2:3 with a darker spine band on the left and 1px/3px corners.

## Components

### Buttons
Painted, solid and tactile.
- **Shape:** 3px corners, 2px ink border, min height 48px (44px small).
- **Primary (red):** Banner red with white text, for account creation in the header.
- **Secondary (marigold):** Marigold with ink text, for Search and for Create account on red fields.
- **Line:** Transparent with a white border and white text, for use on red cloth only; fills white with red text on hover.
- **Hover / Active:** Rises 2px with Lift Hover, settling flat on press; colour, transform and shadow transition over 0.18s on the ease-out curve.

### Links
- **Painted link:** Anek Bangla 600, a 2px banner-red underline offset 4px, thickening to 3px on hover. Used for Sign in, "All … books", quick asks and nav hover.

### Inputs / Fields
- **Style:** White, 2px ink border, 3px corners, 48px tall, body type; placeholder in a muted warm grey.
- **Focus:** The indigo ring (inside a board), offset 1px.

### Navigation
- **Style:** A white enamel signboard strip hanging over the red header field, under the bunting. Wordmark (Anek Bangla 800, width 88%, with a three-flag bunting mark) left; nav links in Anek Bangla 600 with painted-underline hover; auth on the right.
- **Mobile:** Links wrap to a scrolling row below an ink hairline.

### Signboards
White enamel boards (header strip, information desk, notice board) share the ink border, inset keyline and 3px corners. The desk carries a canopy-green sign strip across its top with the Bangla and English names set left and right.

### Stalls and Counter (signature)
Each genre is a button-tab: a white signboard with the bilingual name, framed by two bamboo rods, over a rolled-up cloth banner in the genre colour (only a 1.75rem band shows). Hover lifts the board 2px. Hover (Motion `whileHover`, unselected stalls only) lowers the cloth to a 44px band in 0.2s. Selected, the banner unrolls fully (clip-path, 0.5s, ease-out [0.16, 1, 0.3, 1]), then swings once on its pole (skewX 0 → 3° → −1.5° → 0 over 0.6s, starting 0.2s in, triggered however the stall is chosen) to show the blurb and title count, and the board turns marigold. Rolling back up takes 0.3s. Below the row, the counter is a white board with a 12px top edge in the chosen cloth. On a stall change the old books leave first (0.15s fade, 10px drop), then the new ones are laid in one at a time (spring stiffness 260, damping 24, 80ms stagger after a 0.22s wait for the banner, falling 18px with a 1.5° tilt). Each book is a mock cloth cover beside a fixed label grid: title, author, description, then ISBN, Published, Price, Availability. Stock reads green in stock, red under 5, muted and struck through when out.

### Bunting
An SVG string of triangular flags cycling marigold, green, white, indigo, turquoise, white, with a shallow sag, cropped by the viewport. On load each flag drops into place from its string (scaleY spring, stiffness 320, damping 14, 18ms per flag, capped at 0.65s). Then each flag sways ±5° over 4.2s with staggered delays; the sway pauses off-screen and under reduced motion.

### Order Route Flags
Swallowtail cloth flags hung from a 2px ink string, one per order stage in its cloth (marigold, indigo, red, green), carrying the bilingual stage name. The flags hang in order when the section enters view (once, 25% visible): each falls 28px with an 8° tilt and springs onto the string (stiffness 210, damping 13), 0.22s apart.

## Do's and Don'ts

### Do:
- **Do** set every section as one cloth field (banner red, canopy green, marigold, ink, or daylight ground) and put content on white enamel boards inside it.
- **Do** pair each cloth with its ink: white text on every cloth except marigold, which takes signboard ink.
- **Do** paint Bangla and English names as an equal-weight stack in Anek Bangla 800.
- **Do** keep board edges as a 2px ink border, a 1px inset keyline and 3px corners.
- **Do** tint large board shadows toward the field beneath them.
- **Do** pass genre colour through `--cloth` / `--cloth-ink` rather than new per-genre classes.
- **Do** honour reduced motion: the bunting hang and sway, banner swing, book lay-down and flag hanging all stop; state still changes instantly.
- **Do** keep motion to one cloth-or-paper gesture per moment, so exits are faster than entrances.

### Don't:
- **Don't** use smooth colour-to-colour gradients; hard-stop gradients appear only to draw material (cloth weave, bamboo nodes, book spines).
- **Don't** put white text on marigold.
- **Don't** add icon tiles, rounded cards or pill shapes; containers are signboards, counters and cloths.
- **Don't** use hard offset or neutral grey shadows; shadows are soft, downward and warm.
- **Don't** set a Bangla label as a small caption under English.
