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

## Path A — `./deploy.sh` (recommended)

One command. Creates the site, deploys, rewrites the Open Graph URLs to the real
origin, re-deploys, then verifies every asset is actually reachable.

```bash
NETLIFY_AUTH_TOKEN=nfp_xxxxxxxx ./deploy.sh
```

Get the token from **Netlify → User settings → Applications → Personal access
tokens → New access token**. It is shown once.

The script runs from its own directory no matter where you invoke it from, so
`marketing/carousels/st-raymond-nonnatus/site/deploy.sh` from the repo root works
identically to `./deploy.sh` from inside this folder.

What it does, in order:

1. Checks for `NETLIFY_AUTH_TOKEN`, `node`/`npx` and `curl`, and exits with a
   clear message if anything is missing.
2. Creates a Netlify site (or reuses `NETLIFY_SITE_ID`) and deploys this
   directory with `netlify deploy --dir=. --prod`.
3. Parses the live URL out of the CLI's `--json` output — and refuses to
   continue, printing the raw output, if it cannot find one.
4. Rewrites `og:url`, `og:image`, `og:image:secure_url`, `twitter:image` and
   `<link rel="canonical">` in `index.html` to the real deployed origin, deletes
   the duplicate relative `og:image` fallback, then **re-deploys** so the
   corrected tags are live. The rewrite is anchored on tag names and is
   idempotent — running the script twice does not stack or corrupt anything.
5. Verifies the live site: the HTML, `slides/01-hook.png`,
   `slides-vertical/01-hook.png`, a ZIP and the MP4 must all return 200 with a
   sensible `content-type`, and the `og:image` URL advertised by the live HTML
   must itself return 200 `image/png`. Prints a pass/fail table and exits
   non-zero if anything failed.
6. Prints the final URL and reminds you to commit the `index.html` change.

### Environment variables

| Variable | Required | Meaning |
| --- | --- | --- |
| `NETLIFY_AUTH_TOKEN` | yes | Personal access token. Read from the environment only. |
| `NETLIFY_SITE_ID` | no | Deploy into an existing site (Site configuration → Site ID) instead of creating one. The script prints this after a first run so you can reuse it. |
| `SITE_NAME` | no | Name for a newly created site. Default `saint-match-raymond-nonnatus`. Netlify site names are globally unique, so pick another if creation fails. |
| `SKIP_OG_REWRITE` | no | Set to `1` to deploy once and leave `index.html` alone (no OG rewrite, no second deploy). |

Redeploying to the same site later:

```bash
NETLIFY_AUTH_TOKEN=nfp_xxxxxxxx NETLIFY_SITE_ID=abc123... ./deploy.sh
```

### Keep the token out of the repository

Supply the token as an environment variable — on the command line, exported in
your shell, or from your OS keychain / CI secret store. **Never commit it.** The
root `.gitignore` ignores `.env` and `.env*.local` at any depth, plus the
`.netlify/` state directory the CLI creates here, so neither a local env file nor
CLI state can slip into a commit. Nothing in this directory should ever contain
the token itself.

---

## Path B — manual Netlify CLI

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

Going this route, you must fix the OG URLs in `index.html` yourself — see
**Before you go live** below. `./deploy.sh` does it for you.

## Path C — connect the Git repository

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

---

## The base-directory trap

The base directory matters: the repository root has its own `netlify.toml` for
the main marketing site, which publishes `/site`. Leaving the base directory
blank — or running `netlify deploy --dir=.` from the repository root — will
deploy **that** site instead of this one. This is exactly why `deploy.sh` starts
with `cd "$(dirname "$0")"`.

## Before you go live

- **Fix the absolute URLs in `index.html`.** `og:url`, `og:image`,
  `og:image:secure_url`, `twitter:image` and `<link rel="canonical">` all point
  at `https://saintmatch.app/carousels/st-raymond-nonnatus/`. Replace that origin
  and path with wherever this actually lands, or X and Facebook will scrape the
  wrong host and the preview card will not render. There is also a duplicate
  relative `og:image` (`/slides/01-hook.png`) that should be deleted — a relative
  OG URL does not resolve for most scrapers, and two `og:image` tags are
  ambiguous. **`./deploy.sh` does all of this automatically**; only paths B and C
  need you to do it by hand. Either way, commit the resulting `index.html` so the
  repository matches what is live.
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
