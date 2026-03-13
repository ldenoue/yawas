#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$ROOT_DIR/dist"
TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

if ! command -v zip >/dev/null 2>&1; then
  echo "zip is required but was not found in PATH" >&2
  exit 1
fi

read_version() {
  local manifest_path="$1"
  ruby -rjson -e 'puts JSON.parse(File.read(ARGV[0]))["version"]' "$manifest_path"
}

stage_common_files() {
  local target_dir="$1"

  cp "$ROOT_DIR/LICENSE" "$target_dir/"
  cp "$ROOT_DIR/README.md" "$target_dir/"
  cp "$ROOT_DIR/localedit.html" "$target_dir/"
  cp "$ROOT_DIR/localedit.js" "$target_dir/"
  cp "$ROOT_DIR/localsearch.html" "$target_dir/"
  cp "$ROOT_DIR/localsearch.js" "$target_dir/"
  cp "$ROOT_DIR/options.html" "$target_dir/"
  cp "$ROOT_DIR/options.js" "$target_dir/"
  cp "$ROOT_DIR/yawas-background.js" "$target_dir/"
  cp "$ROOT_DIR/yawas-content-script.js" "$target_dir/"
  cp "$ROOT_DIR/yawas_error_128.png" "$target_dir/"
  cp "$ROOT_DIR/yawas_off_128.png" "$target_dir/"
  cp "$ROOT_DIR/yawas_on_128.png" "$target_dir/"
}

build_package() {
  local browser="$1"
  local source_manifest="$2"
  local version="$3"
  local stage_dir="$TMP_DIR/$browser"
  local archive_path="$DIST_DIR/yawas-$browser-$version.zip"

  mkdir -p "$stage_dir"
  stage_common_files "$stage_dir"
  cp "$source_manifest" "$stage_dir/manifest.json"

  (
    cd "$stage_dir"
    zip -qr "$archive_path" .
  )

  echo "Created $archive_path"
}

mkdir -p "$DIST_DIR"

chrome_version="$(read_version "$ROOT_DIR/manifest.json")"
firefox_version="$(read_version "$ROOT_DIR/firefox-manifest.json")"

if [[ "$chrome_version" != "$firefox_version" ]]; then
  echo "Manifest versions do not match: chrome=$chrome_version firefox=$firefox_version" >&2
  exit 1
fi

build_package "chrome" "$ROOT_DIR/manifest.json" "$chrome_version"
build_package "firefox" "$ROOT_DIR/firefox-manifest.json" "$firefox_version"
