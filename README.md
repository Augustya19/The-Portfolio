# Augustya's portfolio

React + Vite. `npm install`, then `npm run dev` to work locally or `npm run build` to build.

## Adding a project to Design Work

Open `src/content/design-work.json` and add an entry with the project's link:

```json
{
  "title": "My New Project",
  "category": "Illustration",
  "link": "https://www.behance.net/gallery/123456789/My-New-Project"
}
```

- `category` is one of `Illustration`, `UI/UX` or `Branding`.
- For `UI/UX` projects you can add `"description": "A short line"`. It shows as the handwritten caption. Illustration and Branding cards show no caption.
- The order in the file is the order on the page.

That's all. You don't need an image.

### How the thumbnail appears

Before every build (`npm run build`, and every Vercel deploy), `scripts/fetch-thumbnails.mjs` opens each link, reads the page's preview image (the same image a link preview shows), shrinks it to 800px wide, and saves it in `public/thumbs/`. Any site that has link previews works, including Behance, Dribbble and Figma Community.

- If a link can't be reached, the build still finishes. That card keeps its previous thumbnail, or shows a coloured placeholder with the title.
- On Behance, the preview image is the project's first image, which may differ from the cover crop on your profile.
- If a thumbnail crops badly, add `"focus": "50% 70%"` (horizontal, vertical) to move the crop.
- To use your own picture instead, put it in `public/` and add `"image": "my-cover.jpg"` to the entry (a full URL also works).
- To pull every thumbnail again, for example after changing a cover, run `npm run thumbs -- --refresh`.

## Case studies

Case studies live in `src/data.ts` (`caseStudies`). Those with `featured: true` appear as the big folders; all of them appear in "View all case studies".
