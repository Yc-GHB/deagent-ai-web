# Community gallery assets

Place photos directly in this folder. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

Rename and compress with:

```bash
node scripts/compress-community-gallery.js
```

Then set `GALLERY_COUNT` in `src/components/site-redesign/pages/CommunityPage.tsx` to the new total (`community-01.jpg` … `community-NN.jpg`).
