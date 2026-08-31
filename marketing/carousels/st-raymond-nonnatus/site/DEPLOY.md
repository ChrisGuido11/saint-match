# Deploying the St Raymond Nonnatus asset page

**Nothing here has been deployed.** No Netlify site was created, no credentials
were used, nothing was pushed to any external service. The commands below are
what you would run; deciding to run them is your call.

At the time this was written the environment had **no Netlify credentials of any
kind**: no `NETLIFY_AUTH_TOKEN`, no `netlify` / `ntl` CLI on `PATH`, no
`~/.netlify` or `~/.config/netlify` config, and no `netlify-cli` in the global
npm root. You will need to authenticate before any of this works.

This directory is self-contained — `index.html`, both PNG sets, both ZIPs and the
MP4 — so it deploys as-is with no build step.

---

## Path A — Netlify CLI

Run from the repository root.

```bash
# once, if the CLI is not installed
npm install -g netlify-cli

# authenticate (opens a browser), or export NETLIFY_AUTH_TOKEN instead
netlify login

# create the site and link this directory to it
netlify sites:create --name saint-match-raymond-nonnatus

# draft deploy first — gives you a preview URL to check before going live
netlify deploy --dir marketing/carousels/st-raymond-nonnatus/site

# once the draft looks right
netlify deploy --prod --dir marketing/carousels/st-raymond-nonnatus/site
```

Non-interactive (CI, or if you would rather not run `netlify login`):

```bash
export NETLIFY_AUTH_TOKEN=...     # personal access token
export NETLIFY_SITE_ID=...        # from the site's Site configuration page

netlify deploy --prod \
  --dir marketing/carousels/st-raymond-nonnatus/site \
  --site "$NETLIFY_SITE_ID" \
  --auth "$NETLIFY_AUTH_TOKEN" \
  --message "St Raymond Nonnatus carousel assets"
```

## Path B — connect the Git repository

Continuous deploy on every push to the branch.

1. Netlify dashboard → **Add new site** → **Import an existing project** → GitHub
   → pick this repository.
2. Set the build settings exactly:
   - **Branch to deploy:** `claude/slack-session-w26drb` (or `main` after merge)
   - **Base directory:** `marketing/carousels/st-raymond-nonnatus/site`
   - **Build command:** *(leave empty)*
   - **Publish directory:** `marketing/carousels/st-raymond-nonnatus/site`
3. Deploy. Netlify reads `netlify.toml` from the base directory, so the cache and
   security headers apply automatically.

The base directory matters: the repository root has its own `netlify.toml` for
the main marketing site, which publishes `/site`. Leaving the base directory
blank will deploy that site instead of this one.

---

## Before you go live

- **Fix the absolute URLs in `index.html`.** `og:url`, `og:image`,
  `og:image:secure_url`, `twitter:image` and `<link rel="canonical">` all point
  at `https://saintmatch.app/carousels/st-raymond-nonnatus/`. Replace that origin
  and path with wherever this actually lands, or X and Facebook will scrape the
  wrong host and the preview card will not render. The relative
  `/slides/01-hook.png` fallback keeps the image resolvable in the meantime, but
  several scrapers require a fully-qualified URL.
- Validate the card with the
  [Facebook sharing debugger](https://developers.facebook.com/tools/debug/) and
  by posting the link to a throwaway X account.
- The slides still carry the dashed **Logo** placeholder box. Drop in the Saint
  Match mark and re-run `build.mjs` before this is used publicly.

## Rebuilding the assets

```bash
cd marketing/carousels/st-raymond-nonnatus

# PNGs: slides/ (1080x1351) and slides-vertical/ (1080x1920)
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
node build.mjs

# MP4: needs an ffmpeg with libx264 (the Playwright-bundled one has only
# png and libvpx, so pass a real one)
FFMPEG=/path/to/ffmpeg ./build-video.sh
```

Then re-copy the PNGs, the MP4 and both ZIPs into `site/`.
