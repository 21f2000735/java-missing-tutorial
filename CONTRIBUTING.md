# Contributing

## Start Here

1. Read [README.md](README.md) for the repo shape.
2. Read [planning/AUTHORING_GUIDE.md](planning/AUTHORING_GUIDE.md) before adding a new topic.
3. Read [planning/TOPIC_QUALITY_RUBRIC.md](planning/TOPIC_QUALITY_RUBRIC.md) and [planning/CHAPTER_QUALITY_CHECKLIST.md](planning/CHAPTER_QUALITY_CHECKLIST.md) before sending a PR.

## Repo Shape

- keep the root small
- keep planning and roadmap docs under [planning/](planning/README.md)
- keep Java learning content under `src/main/java/com/learning/javamissing`
- keep the site app under `site/`
- keep generated site output under `docs/`

## Adding A Topic

1. Choose the right `secXX_*` section and `chXX_*` chapter.
2. Add the Java example under `topics/<topic_slug>/<ConceptName>.java`.
3. Add `TopicGuide.md` when the topic needs a stronger hook, compare table, visual, or version note.
4. Update the chapter guide and chapter revision sheet if the new topic changes study order or revision points.
5. Keep the example runnable and focused on one concept.

## Naming Rules

- recommended class name limit: `32`
- hard class name limit: `40`
- recommended topic folder limit: `28`
- hard topic folder limit: `42`
- recommended full package limit: `120`
- hard full package limit: `140`

Run the naming validator before pushing:

```bash
python3 scripts/validate_naming.py
```

## Local Checks

Build the content manifest and site:

```bash
npm run build
```

If you changed non-preview Java chapters, you can do a targeted compile locally:

```bash
javac --release 23 -d /tmp/java-missing-check $(find src/main/java -name '*.java' | sort)
```

For preview-feature chapters, use JDK 25 with `--enable-preview`.

## Pull Requests

- explain what section/chapter/topic changed
- mention whether the change is for fresher clarity, interview depth, OCJP coverage, or modern Java coverage
- mention any new visual, compare page, or guide page added
- keep examples original; do not copy book prose or copyrighted practice content
