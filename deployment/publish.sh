#!/bin/zsh
set -euo pipefail

SRC="/Users/xiazhiyuan/Documents/Codex/Flight/restored_webarchive/"
DEST="/Users/xiazhiyuan/.flight-log-web/"

mkdir -p "$DEST"
rsync -a --delete "$SRC" "$DEST"
echo "Published flight log web app to $DEST"
