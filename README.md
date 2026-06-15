# Portfolio site

A clean, static portfolio for Power BI / BI analytics work. Plain HTML + CSS, no build
step, hosted on GitHub Pages. Drop in real screenshots and copy as they are produced.

## Structure

```
.
├── index.html                 # Landing: hero, about, project cards
├── css/styles.css             # Single stylesheet (light + dark mode)
├── projects/
│   ├── logistics-demo.html    # Synthetic logistics demo
│   └── operations-demo.html   # Synthetic operations demo
├── assets/
│   ├── favicon.svg
│   └── img/
│       └── placeholder-16x9.svg   # Reusable screenshot placeholder
├── .nojekyll                  # Tell GitHub Pages to serve files as-is
├── .gitignore
└── README.md
```

## Preview locally

From the repo root (any one of these):

```bash
# Python 3 (no install needed)
python -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Swapping in real assets

1. Export each Power BI screen as PNG (16:9 reads best).
2. Save it under `assets/img/`, e.g. `assets/img/logi-overview.png`.
3. In the relevant HTML file, change the placeholder `src` to your file and update the
   `alt` text and `<figcaption>`. Each placeholder has a `<!-- TODO -->` note next to it.
4. Fill in the `TODO` items in the footer (email, LinkedIn, GitHub) and the About section.

## Deploy to GitHub Pages (user site)

1. Create a repo on GitHub named exactly `<username>.github.io`.
2. From this folder: add the remote, then push to `main`.
3. In the repo, **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main` / root. Save.
4. The site goes live at `https://<username>.github.io/` within a minute or two.

## Data-safety checklist (run before every public publish)

These dashboards are scrubbed for permanent public display. Before committing new
screenshots or Excel sources, confirm:

- [ ] Data is **regenerated, not lightly edited** — same column names, all-new values. No nudged-real numbers.
- [ ] After re-pointing the source: **full refresh**, then confirm no old rows linger in any table.
- [ ] Revealing **metadata stripped** — table/column/measure names, descriptions, filenames.
- [ ] Every **drillthrough, tooltip, and "See records"** path audited — they surface fields not visible on the page.
- [ ] No `.pbix`/`.pbit` source files committed (the `.gitignore` blocks these by default).
