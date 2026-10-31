#!/usr/bin/env bash
# Host the resume PDF outside this repo (secret gist as base64 text) and point
# GitHub Actions at the raw URL. Gists reject binary uploads, so we store .b64.
#
# Usage:
#   ./scripts/sync-resume-pdf.sh [path-to-pdf]
# Default PDF: content/RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf
#              or ~/Downloads/RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PDF="${1:-}"
if [ -z "$PDF" ]; then
  if [ -f content/RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf ]; then
    PDF="content/RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf"
  elif [ -f "$HOME/Downloads/RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf" ]; then
    PDF="$HOME/Downloads/RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf"
  else
    echo "Usage: $0 /path/to/resume.pdf" >&2
    exit 1
  fi
fi

if [ ! -f "$PDF" ]; then
  echo "PDF not found: $PDF" >&2
  exit 1
fi

# Keep a local copy for quartz preview (gitignored).
mkdir -p content
dest="content/RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf"
pdf_abs="$(cd "$(dirname "$PDF")" && pwd)/$(basename "$PDF")"
dest_abs="$(cd content && pwd)/RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf"
if [ "$pdf_abs" != "$dest_abs" ]; then
  cp "$PDF" "$dest"
fi

b64_name="RexfordMachu_SRE_SWE_ObservabilityEngineer.pdf.b64"
b64_tmp="$(mktemp)"
trap 'rm -f "$b64_tmp"' EXIT
base64 < "$dest" > "$b64_tmp"

echo "Creating secret gist (base64 text; gh default is secret)…"
gist_url="$(gh gist create \
  -d "machugram.github.io private resume PDF b64 (deploy only — not for linking)" \
  -f "$b64_name" < "$b64_tmp")"

gist_id="${gist_url##*/}"
owner="$(gh api user -q .login)"
raw_url="https://gist.githubusercontent.com/${owner}/${gist_id}/raw/${b64_name}"

for i in 1 2 3 4 5; do
  if curl -fsSIL "$raw_url" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "Setting repo secret RESUME_PDF_URL…"
printf '%s' "$raw_url" | gh secret set RESUME_PDF_URL

echo "Done."
echo "  gist: $gist_url"
echo "  raw:  $raw_url"
echo "  local preview: $dest (gitignored)"
echo "Re-run this script whenever you replace the PDF."
