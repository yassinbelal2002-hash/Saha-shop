# Design System Document: High-End Editorial Beauty

## 1. Overview & Creative North Star
**The Creative North Star: "The Modern Alchemist"**
This design system rejects the clinical, cold aesthetic of traditional skincare platforms in favor of a "Cairo-made" editorial warmth. We are building a digital experience that feels like a premium, heavyweight paper magazine. The system breaks the "template" look through **Intentional Asymmetry**—shifting blocks of text slightly off-center and using generous white space to let products "breathe" as if they were museum artifacts.

This is not a generic shop; it is a curated gallery. We prioritize tonal depth over structural lines, creating a soft, tactile experience that mirrors the luxury of the products themselves.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the warmth of Egyptian parchment and desert sands. It is designed to feel "sun-drenched" but sophisticated.

*   **Primary Surface (`surface` / `#fffcf7`):** Use this for the main canvas. It provides a warm, airy foundation.
*   **The "No-Line" Rule:** Explicitly prohibit the use of 1px solid borders to section off large areas of the page. Boundaries must be defined solely through background color shifts. Use `surface-container-low` or `surface-container` to create distinct horizontal sections.
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of physical layers. 
    *   Place a `surface-container-lowest` (#ffffff) card on top of a `surface-container-low` (#fcf9f3) section to create a soft lift. 
    *   Nesting should never feel "boxy"; it should feel like sheets of fine paper stacked on a desk.
*   **Signature Tonal Depth:** While the brand avoids heavy noise or traditional gradients, use the **`surface-variant` (#eae9de)** for subtle "well-lit" areas, such as product detail backgrounds, to provide a sense of professional polish.

---

## 3. Typography: The Editorial Contrast
The typography strategy relies on the tension between the brutalist strength of the headlines and the airy, light touch of the body text.

*   **Display & Headlines (`Space Grotesk 800`):** These are the "hero" elements. Use **tight tracking (-2% to -4%)** and a massive scale jump from body text. Headlines should feel authoritative and modern.
*   **Body (`Inter 300/400`):** Use a **relaxed line height (1.6 - 1.8)**. This is essential for the "Premium Editorial" feel, ensuring the text never feels dense or "utility-first."
*   **Labels (`Inter 600`, All-Caps):** Used for micro-copy and metadata. Apply **wide letter-spacing (0.1rem to 0.15rem)** to differentiate these from body copy and provide a "luxury tag" aesthetic.

---

## 4. Elevation & Depth
In this system, depth is a whisper, not a shout. We move away from traditional shadows to embrace **Tonal Layering**.

*   **The Layering Principle:** Hierarchy is achieved by stacking surface tiers. A `surface-container-highest` element should feel like the most "interactable" or "urgent" layer compared to the base `surface`.
*   **Ambient Shadows:** If a floating element (like a mobile navigation bar or a quick-buy drawer) requires a shadow, it must be an **Ambient Shadow**. Use the `on-surface` color (#383831) at 4% opacity with a blur of 32px and a Y-offset of 8px. It should look like a soft glow of light, not a dark drop shadow.
*   **The "Ghost Border" Fallback:** For input fields or cards where a boundary is functional, use a **Ghost Border**. Apply `outline-variant` (#babab0) at 20% opacity. 100% opaque borders are forbidden as they break the soft, editorial flow.
*   **Glassmorphism:** For overlays and sticky headers, use a semi-transparent `surface` color with a `backdrop-blur` of 12px. This allows the warmth of the layout to bleed through the navigation, maintaining a cohesive "warm mode" experience.

---

## 5. Components

### Buttons
*   **Primary:** Background: `primary` (#695d4a); Text: `on-primary` (#fff6ee). 3px border radius. Padding: 16px 32px.
*   **Secondary:** Background: `transparent`; Border: 1px Ghost Border (`outline-variant` 20%); Text: `primary`.
*   **Tertiary:** Underlined `label-md` text. No container.

### Input Fields
*   **Style:** Minimalist underline or 20% opacity Ghost Border.
*   **States:** On focus, the border transitions to 100% `primary` (#695d4a) width but remains 1px thin. Error states use `error` (#a54731) sparingly in the label text.

### Cards & Lists
*   **Structure:** No divider lines. Separate list items using `16px` to `24px` of vertical white space.
*   **Visuals:** Product cards use `surface-container-lowest` (#ffffff) with no border and the 3px radius.

### Signature Component: The "Editorial Product Tile"
A high-contrast component featuring an image that breaks the container's 3px radius (bleed effect) on one side, paired with a `Space Grotesk` title and a wide-spaced `label-sm` category tag.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. For example, a 15% left margin for headlines and a 25% left margin for the body paragraph below it.
*   **Do** use `surface-container-high` for inactive states or "muted" UI elements.
*   **Do** prioritize high-quality, warm-toned photography. The UI is the frame; the product is the art.

### Don’t
*   **Don’t** use pure black (#000000). Use `text-primary` (#1A1A1A) to keep the contrast high but soft.
*   **Don’t** use traditional "Material Design" shadows or heavy rounded corners. Stick strictly to the **3px (sm/md)** radius for a sharp, tailored look.
*   **Don’t** use dividers to separate sections. If the content needs to be separated, use a color shift to `surface-container-low`.
*   **Don’t** introduce any noise or grain. The "Premium" feel comes from the clinical cleanliness of the parchment colors.