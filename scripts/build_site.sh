#!/bin/bash

set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
source_root="$root/src/main/java/com/learning/javamissing"
site_root="$root/public"
content_root="$site_root/content"
library_root="$content_root/library"
meta_root="$content_root/meta"
data_root="$site_root/data"
manifest_file="$data_root/site.json"
site_url="https://21f2000735.github.io/java-missing-tutorial"

resource_files=(
  "README.md"
  "planning/BOOK.md"
  "planning/CURRICULUM.md"
  "planning/ROADMAP_099.md"
  "planning/TOP_20_BOOKS.md"
  "planning/AUTHORING_GUIDE.md"
  "planning/INTERVIEW_TOPIC_TEMPLATE.md"
  "planning/CERTIFICATION_TOPIC_TEMPLATE.md"
  "planning/VISUAL_LESSON_STANDARD.md"
  "planning/CHAPTER_QUALITY_CHECKLIST.md"
  "planning/TOPIC_QUALITY_RUBRIC.md"
  "planning/DEEP_DIVE_STANDARD.md"
  "planning/BOOK_MANUSCRIPT.md"
  "planning/JAVA_7_TO_25.md"
  "planning/JAVA_MIGRATION_GUIDES.md"
  "planning/HIGH_DEMAND_JAVA_TOPICS.md"
  "planning/COMPANY_QUESTION_BANK.md"
  "planning/INTERVIEW_PROBLEM_APPROACH.md"
  "planning/INTERVIEW_INDEX.md"
  "planning/COMPARE_COLLECTIONS.md"
  "planning/COMPARE_STREAMS.md"
  "planning/COMPARE_CONCURRENCY.md"
  "planning/TOPIC_COVERAGE_MAP.md"
  "planning/OCJP_TRACK.md"
  "planning/INTERVIEW_TRACK.md"
  "planning/MODERN_JAVA_TRACK.md"
)

python3 "$root/scripts/validate_naming.py"
python3 "$root/scripts/validate_guide_structure.py"
python3 "$root/scripts/validate_repetition.py"
python3 "$root/scripts/validate_visual_lessons.py"

json_escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

to_title() {
  local value="$1"
  value="${value#sec[0-9][0-9]_}"
  value="${value#ch[0-9][0-9]_}"
  value="${value//_/ }"
  perl -e '$v=join(" ",@ARGV); $v =~ s/\b(\w)/\U$1/g; print $v' -- "$value"
}

chapter_title() {
  local chapter_dir="$1"
  local guide="$chapter_dir/ChapterGuide.md"
  local title
  title="$(sed -n '1s/^# \(.*\) Learning Kit$/\1/p' "$guide")"
  if [[ -n "$title" ]]; then
    printf '%s' "$title"
  else
    to_title "$(basename "$chapter_dir")"
  fi
}

topic_guide_exists() {
  local topic_dir="$1"
  [[ -f "$topic_dir/TopicGuide.md" ]]
}

topic_title() {
  local java_file="$1"
  local value
  value="$(basename "$java_file" .java)"
  printf '%s' "$value" | perl -pe 's/([a-z0-9])([A-Z])/$1 $2/g'
}

write_json_string() {
  printf '"%s"' "$(json_escape "$1")"
}

copy_content_tree() {
  rm -rf "$library_root" "$meta_root" "$data_root" "$site_root/assets"
  mkdir -p "$library_root" "$meta_root" "$data_root"

  find "$source_root" -type f \( -name '*.md' -o -name '*.java' -o -name '*.svg' -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.webp' \) | while read -r file; do
    relative="${file#$source_root/}"
    mkdir -p "$library_root/$(dirname "$relative")"
    cp "$file" "$library_root/$relative"
  done

  for file in "${resource_files[@]}"; do
    relative="${file#planning/}"
    mkdir -p "$meta_root/$(dirname "$relative")"
    cp "$root/$file" "$meta_root/$relative"
  done
}

generate_manifest() {
  local section_count chapter_count topic_count
  section_count="$(find "$source_root" -mindepth 1 -maxdepth 1 -type d -name 'sec*' | wc -l | tr -d ' ')"
  chapter_count="$(find "$source_root" -mindepth 2 -maxdepth 2 -type d -name 'ch*' | wc -l | tr -d ' ')"
  topic_count="$(find "$source_root" -mindepth 5 -maxdepth 5 -type f -name '*.java' | wc -l | tr -d ' ')"

  {
    echo '{'
    printf '  "siteTitle": %s,\n' "$(write_json_string "Java Missing Book")"
    printf '  "repoRoot": %s,\n' "$(write_json_string "$root")"
    printf '  "generatedAt": %s,\n' "$(write_json_string "$(date -u +%FT%TZ)")"
    echo '  "stats": {'
    printf '    "sections": %s,\n' "$section_count"
    printf '    "chapters": %s,\n' "$chapter_count"
    printf '    "topics": %s\n' "$topic_count"
    echo '  },'
    echo '  "resources": ['

    local first_resource=1
    for file in "${resource_files[@]}"; do
      [[ $first_resource -eq 1 ]] || echo ','
      first_resource=0
      relative="${file#planning/}"
      slug="$(basename "${file%.md}")"
      title="$(printf '%s' "$slug" | tr '_' ' ')"
      printf '    {"slug": %s, "title": %s, "sourcePath": %s, "contentPath": %s, "type": "markdown"}' \
        "$(write_json_string "$slug")" \
        "$(write_json_string "$title")" \
        "$(write_json_string "$file")" \
        "$(write_json_string "content/meta/$relative")"
    done
    echo
    echo '  ],'
    echo '  "sections": ['

    local first_section=1
    for section_dir in "$source_root"/sec*; do
      [[ -d "$section_dir" ]] || continue
      [[ $first_section -eq 1 ]] || echo ','
      first_section=0

      local section_slug section_source section_guide_content section_title_value
      section_slug="$(basename "$section_dir")"
      section_source="src/main/java/com/learning/javamissing/$section_slug/SectionGuide.md"
      section_guide_content="content/library/$section_slug/SectionGuide.md"
      section_title_value="$(to_title "$section_slug")"

      echo '    {'
      printf '      "slug": %s,\n' "$(write_json_string "$section_slug")"
      printf '      "title": %s,\n' "$(write_json_string "$section_title_value")"
      printf '      "guide": {"sourcePath": %s, "contentPath": %s},\n' \
        "$(write_json_string "$section_source")" \
        "$(write_json_string "$section_guide_content")"
      echo '      "chapters": ['

      local first_chapter=1
      for chapter_dir in "$section_dir"/ch*; do
        [[ -d "$chapter_dir" ]] || continue
        [[ $first_chapter -eq 1 ]] || echo ','
        first_chapter=0

        local chapter_slug chapter_title_value chapter_rel
        chapter_slug="$(basename "$chapter_dir")"
        chapter_title_value="$(chapter_title "$chapter_dir")"
        chapter_rel="$section_slug/$chapter_slug"

        echo '        {'
        printf '          "slug": %s,\n' "$(write_json_string "$chapter_slug")"
        printf '          "title": %s,\n' "$(write_json_string "$chapter_title_value")"
        printf '          "guide": {"sourcePath": %s, "contentPath": %s},\n' \
          "$(write_json_string "src/main/java/com/learning/javamissing/$chapter_rel/ChapterGuide.md")" \
          "$(write_json_string "content/library/$chapter_rel/ChapterGuide.md")"
        printf '          "revision": {"sourcePath": %s, "contentPath": %s},\n' \
          "$(write_json_string "src/main/java/com/learning/javamissing/$chapter_rel/ChapterRevision.md")" \
          "$(write_json_string "content/library/$chapter_rel/ChapterRevision.md")"
        printf '          "runChapter": {"sourcePath": %s, "contentPath": %s},\n' \
          "$(write_json_string "src/main/java/com/learning/javamissing/$chapter_rel/RunChapter.java")" \
          "$(write_json_string "content/library/$chapter_rel/RunChapter.java")"
        printf '          "runAllTopics": {"sourcePath": %s, "contentPath": %s},\n' \
          "$(write_json_string "src/main/java/com/learning/javamissing/$chapter_rel/RunAllTopics.java")" \
          "$(write_json_string "content/library/$chapter_rel/RunAllTopics.java")"
        echo '          "topics": ['

        local first_topic=1
        for topic_dir in "$chapter_dir"/topics/*; do
          [[ -d "$topic_dir" ]] || continue
          java_file="$(find "$topic_dir" -maxdepth 1 -type f -name '*.java' | sort | sed -n '1p')"
          [[ -n "$java_file" ]] || continue
          [[ $first_topic -eq 1 ]] || echo ','
          first_topic=0
          local topic_slug topic_java topic_title_value topic_source topic_content
          local topic_guide_source="" topic_guide_content=""
          topic_slug="$(basename "$topic_dir")"
          topic_java="$(basename "$java_file")"
          topic_title_value="$(topic_title "$java_file")"
          topic_source="src/main/java/com/learning/javamissing/$chapter_rel/topics/$topic_slug/$topic_java"
          topic_content="content/library/$chapter_rel/topics/$topic_slug/$topic_java"

          if topic_guide_exists "$topic_dir"; then
            topic_guide_source="src/main/java/com/learning/javamissing/$chapter_rel/topics/$topic_slug/TopicGuide.md"
            topic_guide_content="content/library/$chapter_rel/topics/$topic_slug/TopicGuide.md"
            printf '            {"slug": %s, "title": %s, "sourcePath": %s, "contentPath": %s, "concept": %s, "guide": {"sourcePath": %s, "contentPath": %s}}' \
              "$(write_json_string "$topic_slug")" \
              "$(write_json_string "$topic_title_value")" \
              "$(write_json_string "$topic_source")" \
              "$(write_json_string "$topic_content")" \
              "$(write_json_string "$(to_title "$topic_slug")")" \
              "$(write_json_string "$topic_guide_source")" \
              "$(write_json_string "$topic_guide_content")"
          else
            printf '            {"slug": %s, "title": %s, "sourcePath": %s, "contentPath": %s, "concept": %s}' \
            "$(write_json_string "$topic_slug")" \
            "$(write_json_string "$topic_title_value")" \
            "$(write_json_string "$topic_source")" \
            "$(write_json_string "$topic_content")" \
            "$(write_json_string "$(to_title "$topic_slug")")"
          fi
        done

        echo
        echo '          ]'
        echo -n '        }'
      done

      echo
      echo '      ]'
      echo -n '    }'
    done

    echo
    echo '  ]'
    echo '}'
  } > "$manifest_file"
}

copy_content_tree
generate_manifest
node "$root/scripts/render_resource_pages.mjs"

touch "$site_root/.nojekyll"

cat > "$site_root/robots.txt" <<EOF
User-agent: *
Allow: /

Sitemap: $site_url/sitemap.xml
EOF

cat > "$site_root/sitemap.xml" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>$site_url/</loc></url>
  <url><loc>$site_url/guides/ocjp-track/</loc></url>
  <url><loc>$site_url/guides/interview-track/</loc></url>
  <url><loc>$site_url/guides/modern-java-track/</loc></url>
  <url><loc>$site_url/guides/java-7-to-25/</loc></url>
  <url><loc>$site_url/guides/java-migration-guides/</loc></url>
  <url><loc>$site_url/guides/high-demand-java-topics/</loc></url>
  <url><loc>$site_url/guides/interview-problem-approach/</loc></url>
  <url><loc>$site_url/guides/company-question-bank/</loc></url>
  <url><loc>$site_url/guides/compare-collections/</loc></url>
  <url><loc>$site_url/guides/compare-streams/</loc></url>
  <url><loc>$site_url/guides/compare-concurrency/</loc></url>
  <url><loc>$site_url/topics/list-set-map/</loc></url>
  <url><loc>$site_url/topics/stream-pipeline/</loc></url>
  <url><loc>$site_url/topics/collectors/</loc></url>
  <url><loc>$site_url/topics/threads/</loc></url>
  <url><loc>$site_url/topics/virtual-threads/</loc></url>
  <url><loc>$site_url/topics/stack-heap-and-references/</loc></url>
  <url><loc>$site_url/topics/handling-payment-failures/</loc></url>
  <url><loc>$site_url/topics/http-client-basics/</loc></url>
  <url><loc>$site_url/topics/arraylist-growth-and-lookup/</loc></url>
  <url><loc>$site_url/topics/hashmap-buckets-and-collisions/</loc></url>
</urlset>
EOF

echo "Wrote $manifest_file"
