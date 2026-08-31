#!/usr/bin/env bash
#
# One-command deploy for the St Raymond Nonnatus carousel asset page.
#
#   NETLIFY_AUTH_TOKEN=nfp_... ./deploy.sh
#
# What it does:
#   1. checks prerequisites (token, node/npx, curl)
#   2. deploys this directory to Netlify production
#   3. rewrites the Open Graph / Twitter URLs in index.html to the real
#      deployed origin, then re-deploys so the corrected tags are live
#   4. verifies the live site (HTML, both PNG sets, a zip, the mp4, og:image)
#
# Environment:
#   NETLIFY_AUTH_TOKEN  required. Netlify -> User settings -> Applications ->
#                       Personal access tokens -> New access token.
#   NETLIFY_SITE_ID     optional. Deploy into an existing site instead of
#                       creating a new one (Site configuration -> Site ID).
#   SITE_NAME           optional. Name for a newly created site.
#                       Default: saint-match-raymond-nonnatus
#   SKIP_OG_REWRITE     optional. Set to 1 to skip the og: rewrite and the
#                       second deploy (single deploy, tags left as-is).
#
# The token is read from the environment only. Never commit it, and never
# write it into a file inside the repository.

set -euo pipefail

# Always operate on this script's own directory. This matters: the repository
# root has its own netlify.toml that publishes /site (the main marketing site),
# so `deploy --dir=.` from the wrong cwd would push the wrong site entirely.
cd "$(dirname "$0")"
SITE_DIR="$(pwd)"

SITE_NAME="${SITE_NAME:-saint-match-raymond-nonnatus}"
SKIP_OG_REWRITE="${SKIP_OG_REWRITE:-0}"
NETLIFY_CLI="netlify-cli@latest"
DEPLOY_MESSAGE="St Raymond Nonnatus carousel assets"

# The placeholder origin baked into index.html before a real deploy exists.
GUESSED_BASE="https://saintmatch.app/carousels/st-raymond-nonnatus/"

TMPDIR_RUN="$(mktemp -d)"
trap 'rm -rf "$TMPDIR_RUN"' EXIT

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
info() { printf '  %s\n' "$*"; }
fail() { printf '\n\033[31merror:\033[0m %s\n' "$*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# 1. Preflight
# ---------------------------------------------------------------------------

if [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
  cat >&2 <<'EOF'
error: NETLIFY_AUTH_TOKEN is not set.

Create a personal access token:
  Netlify dashboard -> User settings -> Applications -> Personal access tokens
  -> New access token. Copy it (it is shown once).

Then run, from anywhere:
  NETLIFY_AUTH_TOKEN=nfp_xxxxxxxx ./deploy.sh

Do not commit the token. Pass it on the command line or export it in your
shell; it is read from the environment only.
EOF
  exit 1
fi

if ! command -v node >/dev/null 2>&1 || ! command -v npx >/dev/null 2>&1; then
  fail "node and npx are required (the Netlify CLI runs on Node).
Install Node 18+ from https://nodejs.org or via your package manager
(brew install node / nvm install --lts), then re-run this script."
fi

command -v curl >/dev/null 2>&1 || fail "curl is required for the verification step."

[ -f "$SITE_DIR/index.html" ] || fail "index.html not found in $SITE_DIR — is this the right directory?"

bold "St Raymond Nonnatus — deploy"
info "directory: $SITE_DIR"
info "node:      $(node --version)"
if [ -n "${NETLIFY_SITE_ID:-}" ]; then
  info "site:      existing (NETLIFY_SITE_ID=${NETLIFY_SITE_ID})"
else
  info "site:      new, name '${SITE_NAME}'"
fi
echo

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

# Strip ANSI escapes so greps and JSON parsing are not defeated by colour.
strip_ansi() {
  sed -e 's/\x1b\[[0-9;]*[a-zA-Z]//g' -e 's/\r$//'
}

# Pull a string field out of the first JSON object found on stdin.
json_field() {
  node -e '
    let s = "";
    process.stdin.on("data", d => (s += d)).on("end", () => {
      const a = s.indexOf("{"), b = s.lastIndexOf("}");
      if (a === -1 || b <= a) return;
      let obj;
      try { obj = JSON.parse(s.slice(a, b + 1)); } catch (e) { return; }
      for (const k of process.argv.slice(1)) {
        if (typeof obj[k] === "string" && obj[k]) { process.stdout.write(obj[k]); return; }
      }
    });
  ' "$@"
}

# Create a site when we were not given one. Sets NETLIFY_SITE_ID.
create_site() {
  local out="$TMPDIR_RUN/create.out" rc=0
  info "creating Netlify site '${SITE_NAME}'..."
  set +e
  npx --yes "$NETLIFY_CLI" sites:create --name "$SITE_NAME" --json >"$out" 2>"$TMPDIR_RUN/create.err"
  rc=$?
  set -e
  if [ "$rc" -ne 0 ]; then
    strip_ansi <"$TMPDIR_RUN/create.err" >&2 || true
    fail "could not create a Netlify site named '${SITE_NAME}'.
Site names are globally unique and team selection may be ambiguous. Either:
  SITE_NAME=some-other-unique-name ./deploy.sh
or create the site in the dashboard and re-run with:
  NETLIFY_SITE_ID=<site id> ./deploy.sh"
  fi
  NETLIFY_SITE_ID="$(strip_ansi <"$out" | json_field site_id id)"
  [ -n "$NETLIFY_SITE_ID" ] || fail "site was created but no site id could be parsed from:
$(strip_ansi <"$out")"
  export NETLIFY_SITE_ID
  info "created site id ${NETLIFY_SITE_ID}"
}

# Deploy the current directory. Echoes the live URL on stdout.
DEPLOY_URL=""
deploy() {
  local label="$1" out="$TMPDIR_RUN/deploy.out" err="$TMPDIR_RUN/deploy.err" rc=0
  info "deploying (${label})..."
  set +e
  npx --yes "$NETLIFY_CLI" deploy \
    --dir=. \
    --prod \
    --json \
    --message "$DEPLOY_MESSAGE" \
    --site "$NETLIFY_SITE_ID" \
    >"$out" 2>"$err"
  rc=$?
  set -e

  if [ "$rc" -ne 0 ]; then
    echo "--- netlify stdout ---" >&2; strip_ansi <"$out" >&2 || true
    echo "--- netlify stderr ---" >&2; strip_ansi <"$err" >&2 || true
    fail "netlify deploy failed (exit ${rc}). Raw output above."
  fi

  local clean="$TMPDIR_RUN/deploy.clean"
  strip_ansi <"$out" >"$clean"

  # Preferred: the --json payload. url is the production URL for --prod.
  local url
  url="$(json_field url deploy_ssl_url ssl_url deploy_url <"$clean" || true)"

  # Fallback: scrape the human-readable output.
  if [ -z "$url" ]; then
    url="$(grep -Ei 'website url|unique deploy url|deploy url' "$clean" \
           | grep -Eo 'https://[A-Za-z0-9._~:/?#@!$&()*+,;=%-]+' \
           | head -n 1 || true)"
  fi
  if [ -z "$url" ]; then
    url="$(grep -Eo 'https://[A-Za-z0-9.-]+\.netlify\.app[A-Za-z0-9._~/-]*' "$clean" \
           | head -n 1 || true)"
  fi

  case "$url" in
    https://*) : ;;
    *)
      echo "--- netlify output ---" >&2; cat "$clean" >&2
      fail "could not parse a deploy URL from the Netlify CLI output (above).
Refusing to continue with an unknown URL."
      ;;
  esac

  url="${url%/}"
  DEPLOY_URL="$url"
  info "live at ${DEPLOY_URL}"
}

# Rewrite the og:/twitter: URLs in index.html to $1 (a base URL, no trailing
# slash). Idempotent: the rewrite is anchored on tag names and always sets the
# whole content="..." value, so running it twice produces identical output.
rewrite_og() {
  local base="$1/" src="$SITE_DIR/index.html" tmp="$TMPDIR_RUN/index.html"

  awk -v base="$base" '
    # Replace the now-stale "fix these before deploying" comment block, once.
    # After the first pass the trigger line is gone, so this is idempotent.
    /<!-- Open Graph \/ Twitter\. Replace the origin/ {
      print "<!-- Open Graph / Twitter. Absolute URLs are rewritten to the live"
      print "     deploy origin by deploy.sh; re-run it if the origin changes. -->"
      skipping = 1
    }
    skipping { if (/-->/) skipping = 0; next }

    # Drop the duplicate relative og:image fallback and its comment. A relative
    # OG URL does not resolve for most scrapers, and two og:image tags are
    # ambiguous — keep exactly one, absolute.
    /<!-- absolute-path fallback -->/ { next }
    /property="og:image"/ && $0 !~ /content="https?:\/\// { next }

    {
      line = $0
      # Exact-quote anchors: og:image does not match og:image:type/width/
      # height/alt, and twitter:image does not match twitter:image:alt.
      if (line ~ /property="og:url"/) {
        sub(/content="[^"]*"/, "content=\"" base "\"", line)
      } else if (line ~ /property="og:image"/ ||
                 line ~ /property="og:image:secure_url"/ ||
                 line ~ /name="twitter:image"/) {
        sub(/content="[^"]*"/, "content=\"" base "slides/01-hook.png\"", line)
      } else if (line ~ /rel="canonical"/) {
        sub(/href="[^"]*"/, "href=\"" base "\"", line)
      }
      print line
    }
  ' "$src" >"$tmp"

  [ -s "$tmp" ] || fail "og rewrite produced an empty index.html — aborting, original left untouched."

  # Sanity: exactly one og:image, and it is absolute.
  local n
  n="$(grep -c 'property="og:image"' "$tmp" || true)"
  [ "$n" = "1" ] || fail "og rewrite left ${n} og:image tags (expected 1) — aborting, original left untouched."
  grep -q "property=\"og:image\" content=\"${base}slides/01-hook.png\"" "$tmp" \
    || fail "og rewrite did not produce the expected absolute og:image — aborting, original left untouched."

  cat "$tmp" >"$src"
}

# ---------------------------------------------------------------------------
# 2. Deploy
# ---------------------------------------------------------------------------

if [ -z "${NETLIFY_SITE_ID:-}" ]; then
  create_site
fi

deploy "first pass"
BASE_URL="$DEPLOY_URL"

# ---------------------------------------------------------------------------
# 3. Rewrite Open Graph tags to the real origin, then re-deploy
# ---------------------------------------------------------------------------

if [ "$SKIP_OG_REWRITE" = "1" ]; then
  echo
  info "SKIP_OG_REWRITE=1 — leaving index.html untouched, no second deploy."
  info "og: tags still point at ${GUESSED_BASE}"
  OG_REWRITTEN=0
else
  echo
  info "rewriting og:/twitter: URLs to ${BASE_URL}/ ..."
  rewrite_og "$BASE_URL"
  info "index.html updated"
  deploy "with corrected og: tags"
  BASE_URL="$DEPLOY_URL"
  OG_REWRITTEN=1
fi

# ---------------------------------------------------------------------------
# 4. Verify the live site
# ---------------------------------------------------------------------------

echo
bold "Verifying ${BASE_URL}"
printf '  %-34s %-6s %-26s %s\n' "PATH" "STATUS" "CONTENT-TYPE" "RESULT"

FAILURES=0

# check <path> <expected content-type substring>
check() {
  local path="$1" want="$2" url code ctype result
  if [ -z "$path" ]; then url="$BASE_URL/"; else url="$BASE_URL/$path"; fi

  # No -f here: we want the status line even when the request 404s.
  local resp
  resp="$(curl -sSL -o /dev/null -w '%{http_code} %{content_type}' "$url" 2>/dev/null || true)"
  code="${resp%% *}"
  ctype="${resp#* }"
  [ -n "$code" ] || code="---"

  if [ "$code" = "200" ] && printf '%s' "$ctype" | grep -qiE -- "$want"; then
    result="PASS"
  else
    result="FAIL (want 200 + $want)"
    FAILURES=$((FAILURES + 1))
  fi
  printf '  %-34s %-6s %-26s %s\n' "/${path}" "$code" "${ctype:--}" "$result"
}

check ""                                   "text/html"
check "slides/01-hook.png"                 "image/png"
check "slides-vertical/01-hook.png"        "image/png"
check "st-raymond-nonnatus-slides-4x5.zip" "zip|octet-stream"
check "st-raymond-nonnatus-vertical.mp4"   "video/mp4"

# The og:image the live HTML actually advertises must itself resolve as a PNG.
OG_LIVE="$(curl -fsSL "$BASE_URL/" 2>/dev/null \
  | grep -o 'property="og:image" content="[^"]*"' \
  | head -n 1 | sed 's/.*content="//; s/"$//' || true)"

if [ "$SKIP_OG_REWRITE" = "1" ]; then
  printf '  %-34s %-6s %-26s %s\n' "og:image (live HTML)" "-" "-" "SKIP (SKIP_OG_REWRITE=1)"
  info "advertised og:image: ${OG_LIVE:-<none found>}"
elif [ -z "$OG_LIVE" ]; then
  printf '  %-34s %-6s %-26s %s\n' "og:image (live HTML)" "---" "-" "FAIL (no og:image in HTML)"
  FAILURES=$((FAILURES + 1))
else
  og_resp="$(curl -sSL -o /dev/null -w '%{http_code} %{content_type}' "$OG_LIVE" 2>/dev/null || true)"
  og_code="${og_resp%% *}"
  og_ctype="${og_resp#* }"
  if [ "$og_code" = "200" ] && printf '%s' "$og_ctype" | grep -qi 'image/png'; then
    printf '  %-34s %-6s %-26s %s\n' "og:image (live HTML)" "$og_code" "$og_ctype" "PASS"
  else
    printf '  %-34s %-6s %-26s %s\n' "og:image (live HTML)" "${og_code:----}" "${og_ctype:--}" "FAIL"
    FAILURES=$((FAILURES + 1))
  fi
  info "advertised og:image: ${OG_LIVE}"
fi

echo
if [ "$FAILURES" -ne 0 ]; then
  fail "${FAILURES} verification check(s) failed. The deploy is live but not healthy."
fi

# ---------------------------------------------------------------------------
# 5. Done
# ---------------------------------------------------------------------------

bold "All checks passed."
echo
bold "  ->  ${BASE_URL}/"
echo
if [ "${OG_REWRITTEN}" = "1" ]; then
  cat <<EOF
  index.html was rewritten in place (og:url, og:image, og:image:secure_url,
  twitter:image, canonical) and the duplicate relative og:image was removed.
  Commit it so the repository matches what is live:

      git add marketing/carousels/st-raymond-nonnatus/site/index.html
      git commit -m "Point carousel page og: tags at the live deploy"

EOF
fi
if [ -n "${NETLIFY_SITE_ID:-}" ]; then
  info "Reuse this site next time with: NETLIFY_SITE_ID=${NETLIFY_SITE_ID} ./deploy.sh"
fi
