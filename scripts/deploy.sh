#!/usr/bin/env bash
#
# Build the docs and publish them to the directory nginx serves for
# openkey.openselfhosting.com, so the live site reflects the working tree.
#
# Usage: scripts/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

TARGET="${OPENKEY_DOCS_ROOT:-/home/asim/www/openselfhosting/openkey}"

if [[ ! -d "$TARGET" ]]; then
  echo "deploy: target $TARGET does not exist" >&2
  exit 1
fi

echo "deploy: building"
npm run build

DIST=".vitepress/dist"

# Content-hashed asset filenames, so the whole directory can be replaced without
# stranding a stale reference. Everything else is copied over in place.
echo "deploy: publishing to $TARGET"
rm -rf "$TARGET/assets"
cp -a "$DIST/." "$TARGET/"

echo "deploy: done — https://openkey.openselfhosting.com"