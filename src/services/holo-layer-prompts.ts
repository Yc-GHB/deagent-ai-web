/**
 * General-purpose prompts for decomposing arbitrary card artwork.
 *
 * Gemini restores only the background and returns aligned black/white mattes.
 * Final foreground colors always come from the uploaded source image.
 */
export const BACKGROUND_PROMPT = `
IMAGE EDITING TASK — RESTORED BACKGROUND PLATE.

Use the supplied image as the only visual reference. Return exactly one full-frame 9:16 background image at the same crop, camera angle, perspective, scale and composition as the reference.

Remove every primary foreground subject, person, character, product, prop, title, caption, logo, badge, decorative frame and editorial overlay. Reconstruct all newly exposed areas as a continuous scene by extending the surrounding environment, lighting, color palette, texture, geometry and depth cues. Hidden areas must be plausibly inpainted; do not leave silhouettes, shadows shaped like the removed subject, rectangular patches, holes, blur smears or duplicated subject fragments.

If the reference is a poster or graphic illustration with little literal scenery, continue its existing abstract background shapes, gradients, patterns and lighting into a coherent empty stage. Do not invent a new focal object, character or readable text.

Output requirements: fully opaque edge-to-edge image; no transparency; no checkerboard; no masks; no borders; no text; no logos; no foreground subject. This is a repaired background plate, not a redesign and not a copy of the complete input image.
`.trim()

export const SUBJECT_MASK_PROMPT = `
IMAGE SEGMENTATION TASK — PRIMARY SUBJECT MATTE.

Return exactly one full-frame 9:16 binary matte aligned pixel-for-pixel with the supplied reference. Preserve the reference crop, position, scale, pose, silhouette and internal holes. Do not move, resize, redraw, simplify or recenter anything.

Paint pure white (#FFFFFF) only where the main foreground subject or focal object exists. Include its physically attached clothing, hair, limbs, accessories and inseparable props. Preserve openings between limbs, handles, hair, transparent gaps and other negative spaces as black. Include multiple subjects only when they clearly form one primary focal group.

Paint pure black (#000000) everywhere else: scenery, floor, cast shadows, platforms, poster background, secondary decorative figures, typography, logos, labels, badges, sparkles, graphic accents, panels and decorative frames. Text printed directly on the focal object may remain part of the subject; floating or editorial text must be excluded.

Output requirements: black-and-white mask only; hard black background; clean antialiased white subject edge; no color; no gray scenery; no checkerboard; no transparency; no captions; no border; no visualization of the original art.
`.trim()

export const OVERLAY_MASK_PROMPT = `
IMAGE SEGMENTATION TASK — TYPOGRAPHY AND GRAPHIC OVERLAY MATTE.

Return exactly one full-frame 9:16 binary matte aligned pixel-for-pixel with the supplied reference. Preserve the exact crop, position, scale and layout. Do not move, resize, redraw or reinterpret any element.

Paint pure white (#FFFFFF) only where authored foreground graphic overlays exist: floating titles, captions, logos, badges, labels, interface panels, ornamental lines, decorative card frames and clearly editorial sparkles or symbols that visually sit above the artwork. Keep all disconnected letters and small decorative pieces.

Paint pure black (#000000) for the main subject, product, character, scenery, lighting, environmental texture, cast shadows, platforms and background shapes. Text physically printed on the focal object belongs to the subject and must be black here. If the reference contains no separate graphic overlays, return an entirely black image.

Output requirements: black-and-white mask only; hard black background; clean antialiased white overlay shapes; no color; no checkerboard; no transparency; no newly invented text; no rendered copy of the source image.
`.trim()
