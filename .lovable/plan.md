# Mr. Biriyaniwala — scroll-driven food website (recreating your video)

## What you'll get
A dark, cinematic one-page site where scrolling drives the animation, matching the video:

1. **Top bar** — logo "Mr. Biriyaniwala", links (The Dum, Order, Menu, Tandoor, Visit), opening hours, "Call to Order" button.
2. **Pinned dish showcase (8 dishes)** — the screen stays still while you scroll; each scroll step swaps to the next dish:
   - Big number (01–08), dish name in serif with gold italic second word, short description, price, "On the menu" link.
   - Large realistic dish photo floating in the centre (steam, splashes, flying spices), with zoom/rotate/fade transitions between dishes.
   - Huge glowing cream-to-gold word at the bottom (Biriyani, Makhani, Tandoori, Seekh, Tikka, Paneer, Naan, Lassi).
   - Right side "The Table" list highlighting the current dish, a rotating badge, and a progress line "Scroll to serve the next dish".
   - Dishes: Chicken Dum Biryani $21.90, Butter Chicken $22.90, Tandoori Chicken $16.90, Lamb Seekh Kebab $18.90, Paneer Tikka $17.90, Dal Makhani, Garlic Butter Naan $5.50, Mango Lassi $7.50.
3. **Two moving word strips** — "Dum Pukht · Saffron · Ek Plate Aur · Basmati · Ghee…" sliding in opposite directions as you scroll.
4. **Process section** — "Ninety minutes we will never let us skip." with steps (01 Marinate, 02 Layer, 03 Seal the Dum…) and food photos sliding sideways.
5. **Finale** — giant "BIRIYANI" letters filled with food imagery, fading in out of the darkness, then a visit/contact footer.

## Notes
- Dish images will be newly generated realistic photos on black backgrounds (not cut from your video), so they look close but not pixel-identical.
- Phone layout stacks text above the dish and keeps the scroll animation.
- Address, phone and hours are placeholders — send the real ones anytime.

## Technical details
- GSAP + ScrollTrigger (pinning, scrubbed timelines) and Lenis smooth scroll, loaded client-side only.
- Fonts: a heavy display serif (e.g. "Recoleta"-style via Google "Fraunces"/"Young Serif"), "Instrument Serif" italic, "JetBrains Mono" for small labels.
- Dark warm palette tokens (near-black brown background, cream, saffron gold) in styles.css.
- Components: Header, DishShowcase, Marquee, ProcessSection, Finale, Footer in src/components; index route rewritten with proper page title/description.
- ~10 generated images (8 dishes + process shots) in src/assets.
