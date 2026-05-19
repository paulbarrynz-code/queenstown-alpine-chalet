# Adding Images & Content

## To add images to a room

1. **Drop the image file** into the matching folder inside `public/images/`:

   ```
   public/images/lounge/
   public/images/kitchen/
   public/images/master-bedroom/
   public/images/rumpus/
   public/images/bedroom-3/
   public/images/bathroom/
   public/images/outdoor/
   ```

2. **Open** `src/data/rooms.ts`

3. **Find the room** you want to update and add an entry to its `images` array:

   ```ts
   images: [
     { src: "your-filename.jpg", caption: "Optional label shown on hover" },
     { src: "another-image.jpg", caption: "Tile selection concept" },
   ],
   ```

4. **Save the file** — the page updates automatically in the browser.

## To update a room description

Edit the `description` field for that room in `src/data/rooms.ts`.

## To run locally

```bash
npm run dev
```

Then open http://localhost:3000

## To deploy (Vercel)

1. Push this folder to a GitHub repository
2. Go to vercel.com, import the repo
3. Click Deploy — it will be live in ~1 minute
4. Every time you push changes, Vercel auto-redeploys

## Image tips

- JPG or WebP work best for photos
- Aim for under 2MB per image for fast loading
- Landscape (4:3 ratio) images look best in the grid
