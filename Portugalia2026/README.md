# Portugalia 2026 — website

A static website generated from `Portugalia2026.docx` and the trip photos, ready to publish on GitHub Pages. No build step, no dependencies — it's plain HTML/CSS/JS.

## Folder structure

```
website/
├── index.html                     ← homepage (title, intro, 7 chapter cards)
├── .nojekyll                      ← tells GitHub Pages to skip Jekyll processing (keep this file)
├── assets/
│   ├── css/style.css              ← all styling (colors, spacing, layout)
│   └── js/lightbox.js             ← click-to-enlarge photo viewer
└── chapters/
    ├── porto-i-okolice/
    │   ├── index.html             ← chapter text + photos
    │   └── images/
    │       ├── thumbs/01.jpg …    ← small photos shown inline with the text
    │       └── large/01.jpg …     ← larger photos shown when a thumbnail is clicked
    ├── lizbona/
    ├── wybrzeze-i-alentejo/
    ├── casa-do-rio-coimbra-i-ponownie-ocean/
    ├── batalha-sintra-i-cascais/
    ├── podroz-kulinarna/
    └── portugalia-refleksje/
```

Each chapter folder is self-contained: its own `index.html` and its own `images/thumbs` + `images/large`. Photos are numbered `01.jpg`, `02.jpg`, … — originally assigned in chronological order, but the number is just a stable file name now: which photo appears in which paragraph, and in what order, has been hand-arranged to match the story rather than kept strictly chronological. New photos added later simply get the next free number for their chapter, regardless of when they were taken. The homepage cover photo for each chapter is normally `thumbs/01.jpg`, but can point at any numbered photo in that chapter (Porto i okolice, for example, uses `02.jpg` as its cover).

Image sizes: thumbnails are scaled to a maximum of 800px on the longer side (what you see inline in the text). The "large" version behind each thumbnail is scaled to about 40% of the original photo's dimensions — big enough to enjoy, much lighter than the multi-megabyte camera originals. All GPS/EXIF metadata was stripped from both versions for privacy.

## How the pages work

- **Homepage → chapter**: clicking a chapter's cover photo or title opens that chapter's page (`chapters/<slug>/index.html`).
- **Inside a chapter, thumbnail → enlarged photo**: clicking any inline photo opens it in a full-screen viewer (the "large" version). Use the on-screen arrows, the ← → keyboard keys, or swipe/tap to move between photos in that chapter; click outside the photo or press Esc to close.
- **Prev / Next** links at the bottom of each chapter page move to the neighbouring chapter, in the same order as the homepage.

## Publishing to GitHub Pages

1. Create a new GitHub repository (public, since GitHub Pages needs a public repo unless you have GitHub Pro/Team/Enterprise).
2. Copy everything **inside** this `website` folder (including the hidden `.nojekyll` file) into the root of that repository — not the `website` folder itself, just its contents.
3. Commit and push:
   ```
   git init
   git add -A
   git commit -m "Portugalia 2026 website"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
4. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
5. After a minute or two your site will be live at `https://<your-username>.github.io/<repo-name>/`.

If you'd rather add this into an existing repository instead of creating a new one, you can keep it in a `docs/` folder there — just rename `website` to `docs`, commit it at the repo root, and choose folder `/docs` in the Pages settings instead.

## Making small manual changes

Everything is plain text/HTML, so you can edit it with any text editor (VS Code, Notepad, etc.) and re-upload/push the changed files.

**Edit the story text** — open `chapters/<slug>/index.html` and edit the text inside the `<p>…</p>` paragraphs directly. The intro text on the homepage lives inside `<div class="intro-card">…</div>` in `index.html`.

**Change a chapter's cover photo** — the cover shown on the homepage is set by the `src` of that chapter's `<img class="cover" ...>` in the homepage `index.html`. Just point it at a different `chapters/<slug>/images/thumbs/NN.jpg` — no file renaming needed.

**Add or remove a photo** — drop a new image into a chapter's `images/thumbs/` and `images/large/` folders (name it with the next free number for that chapter, e.g. `13.jpg` if the highest existing number is `12`), then add a matching line in that chapter's `index.html` in whichever paragraph's photo block it belongs to, copying the pattern of an existing one:
```html
<a class="thumb" href="images/large/13.jpg" data-group="lizbona" data-alt="Lizbona">
  <img src="images/thumbs/13.jpg" alt="Lizbona" loading="lazy">
</a>
```
Keep `data-group` equal to the chapter's slug so the photo viewer's arrows include it. If you add a photo yourself, resize it first (roughly 800px wide for the thumb, and about 40% of the original size for the "large" version) so the site stays fast — any image editor or an online resizer works. To remove a photo, delete both files and the matching `<a class="thumb">…</a>` block.

**Reorder chapters or change the Prev/Next links** — the chapter order on the homepage is the order of the `<article class="chapter-card">` blocks in `index.html`; reorder them there. Each chapter page's `chapters-nav` links at the bottom point to specific neighbouring chapters, so update those `href`s too if you change the order.

**Change colours / fonts / spacing** — everything is controlled from the variables at the top of `assets/css/style.css` (the `:root { … }` block), e.g. `--accent`, `--bg`, `--radius-lg`. Changing a value there updates the whole site.

**Bigger changes** (many new photos, a new chapter, re-processing all images at once) are easiest done by asking Claude to regenerate the site — the original `Portugalia2026.docx` and the chapter photo folders next to `website/` are still all that's needed.
