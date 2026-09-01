#!/usr/bin/env bash
#
# Build the vertical cut for YouTube Shorts (and as a video fallback for
# TikTok / Reels, which also accept native photo carousels — see README).
#
# Source frames are slides-vertical/*.png, which already carry the
# blurred-and-darkened 9:16 fill produced by build.mjs. Run build.mjs first.
#
#   ./build-video.sh
#   FFMPEG=/path/to/ffmpeg ./build-video.sh
#
# Needs an ffmpeg with libx264. The ffmpeg bundled with Playwright will NOT
# work: it only ships png and libvpx encoders.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FFMPEG="${FFMPEG:-ffmpeg}"

# Note: capture first. Piping straight into `grep -q` makes grep exit early,
# SIGPIPEs ffmpeg, and `pipefail` then reports the whole pipeline as failed.
encoders="$("$FFMPEG" -hide_banner -encoders 2>/dev/null || true)"
if [[ "$encoders" != *libx264* ]]; then
  echo "error: '$FFMPEG' has no libx264 encoder. Set FFMPEG=/path/to/a/full/ffmpeg." >&2
  exit 1
fi

SRC="$HERE/slides-vertical"
OUT="$HERE/st-raymond-nonnatus-vertical.mp4"

HOLD=4.0        # seconds each still is on screen before the dissolve starts
XF=0.6          # cross-dissolve duration
# 5 stills, 4 dissolves: 5*4.0 - 4*0.6 = 17.6s

FILES=(01-hook 02-maxim 03-challenge 04-prayer 05-invocation)

args=()
for f in "${FILES[@]}"; do
  args+=(-loop 1 -t "$HOLD" -i "$SRC/$f.png")
done

# Normalise each still, then chain xfade dissolves.
filter=""
for i in "${!FILES[@]}"; do
  filter+="[$i:v]format=yuv420p,fps=30,setsar=1[v$i];"
done

prev="v0"
for i in 1 2 3 4; do
  # Each completed segment shortens the timeline by one dissolve length, so
  # the i-th dissolve starts at i*(HOLD-XF).
  off=$(python3 -c "print(round($i*($HOLD-$XF), 3))")
  out="x$i"
  filter+="[$prev][v$i]xfade=transition=fade:duration=$XF:offset=$off[$out];"
  prev="$out"
done
filter="${filter%;}"

"$FFMPEG" -y -hide_banner -loglevel error \
  "${args[@]}" \
  -filter_complex "$filter" \
  -map "[$prev]" \
  -an \
  -c:v libx264 -profile:v high -preset slow -crf 18 \
  -pix_fmt yuv420p -movflags +faststart \
  "$OUT"

echo "wrote $OUT"
# `ffmpeg -i` with no output always exits non-zero; that is not a failure here.
info="$("$FFMPEG" -hide_banner -i "$OUT" 2>&1 || true)"
grep -E "Duration|Stream" <<<"$info" || true
