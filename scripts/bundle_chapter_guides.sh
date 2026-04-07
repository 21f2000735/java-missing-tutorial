#!/bin/bash

set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
base="$root/src/main/java/com/learning/javamissing"
output="$root/planning/BOOK_MANUSCRIPT.md"

to_title() {
  local value="$1"
  value="${value#sec[0-9][0-9]_}"
  value="${value#ch[0-9][0-9]_}"
  value="${value//_/ }"
  printf '%s' "$value" | perl -pe 's/\b(\w)/\U$1/g'
}

{
  echo "# Java Missing Book Manuscript"
  echo
  echo "Generated from section guides and chapter guides."
  echo

  for section_dir in "$base"/sec[0-9][0-9]_*; do
    [[ -d "$section_dir" ]] || continue
    section_name="$(basename "$section_dir")"
    echo "## $(to_title "$section_name")"
    echo

    section_guide="$section_dir/SectionGuide.md"
    if [[ -f "$section_guide" ]]; then
      sed '1d' "$section_guide"
      echo
    fi

    for chapter_dir in "$section_dir"/ch[0-9][0-9]_*; do
      [[ -d "$chapter_dir" ]] || continue
      chapter_name="$(basename "$chapter_dir")"
      echo "### $(to_title "$chapter_name")"
      echo

      chapter_guide="$chapter_dir/ChapterGuide.md"
      if [[ -f "$chapter_guide" ]]; then
        sed '1d' "$chapter_guide"
      else
        echo "Chapter guide missing."
      fi
      echo

      chapter_revision="$chapter_dir/ChapterRevision.md"
      if [[ -f "$chapter_revision" ]]; then
        echo "#### Revision"
        echo
        sed '1d' "$chapter_revision"
      fi
      echo
    done
  done
} > "$output"

echo "Wrote $output"
