#!/bin/bash

set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"

python3 "$root/scripts/validate_naming.py"
python3 "$root/scripts/validate_guide_structure.py"
"$(cd "$(dirname "$0")" && pwd)/bundle_chapter_guides.sh"
