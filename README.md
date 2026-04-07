# Java Missing Tutorial

This repo is a chapter-based Java learning library for two goals:

- OCJP preparation
- modern Java learning up to the latest release line

The content style should stay simple, clear, and beginner-friendly, even when the topic is advanced.
The examples should also stay useful for an experienced Java engineer who cares about correctness, tradeoffs, and maintainability.

## Fresher-First Rule

Every chapter should be understandable to a college fresher.

That means:

- explain one idea at a time
- use plain English before technical jargon
- show runnable code before abstract theory
- explain the output after each important example
- avoid assuming industry experience
- define difficult words when they appear for the first time
- prefer short examples over clever examples
- connect advanced ideas back to simple mental models
- use examples from real situations like orders, students, payments, reports, carts, users, and notifications
- prefer examples the learner can imagine seeing in an internship or first job

## Content Model

This repo should not use separate `Exercise` and `Solution` files anymore.
Each concept should have one topic file only.
Chapter notes should be bundled so learners do not have to open too many markdown files.

```text
src/main/java/com/learning/javamissing/
  secXX_section_name/
    chXX_topic_name/
      ChapterGuide.md
      RunChapter.java
      RunAllTopics.java
      topics/
        concept_name/
          ConceptName.java
```

## What Goes In One Topic File

Each topic file should cover one concept completely in one place.

Recommended structure inside `ConceptName.java`:

1. short concept overview
2. one clear example
3. one better example
4. common mistakes
5. OCJP exam traps
6. interview questions with answers
7. one exercise
8. explained solution

The code should be:

- simple to read
- original wording, not copied from books
- realistic enough to teach tradeoffs
- tied to a real-world situation, not abstract placeholder values unless the topic truly needs them
- small enough to understand quickly
- strong enough to help with interviews and exam prep
- easy enough that a fresher can follow it without hidden assumptions

## Example Rule

Every topic should answer these three questions clearly:

- What real problem are we solving?
- Why is this Java feature useful here?
- What output should the learner expect and why?

Examples should usually come from simple real domains:

- shopping cart
- student result system
- order processing
- user profile
- payment or billing
- report generation
- notification sending
- inventory lookup

Avoid examples that feel disconnected from real work, such as random words or numbers with no business meaning, unless the concept is so small that a domain example would add noise.

## Chapter Rules

Every chapter should include:

- `ChapterGuide.md` for theory, quiz, interview questions, sources, Effective Java mapping, and charts
- `ChapterRevision.md` for one-page recap, mistakes, interview prompts, and OCJP checks
- runnable topic files with real code examples
- `RunChapter.java` for quick chapter navigation

## Sections

The curriculum should now use a finer section model so major areas can grow independently.

- `Section 1: Fundamentals`
- `Section 2: Collections`
- `Section 3: Generics`
- `Section 4: Streams And Functional Style`
- `Section 5: Multithreading And Concurrency`
- `Section 6: Design Patterns`
- `Section 7: Principles And SOLID`
- `Section 8: Internal Of JVM`
- `Section 9: Hidden Java Features`
- `Section 10: Reflection And Metadata`
- `Section 11: Exception Handling`
- `Section 12: Networking`
- `Section 13: IO And Data Access`
- `Section 14: Famous Design Problems`
- `Section 15: Clean Code And Refactoring`
- `Section 16: Core Data, Time, And Text`
- `Section 17: Language Modeling And Modern Types`
- `Section 18: Architecture And Integration`
- `Section 19: Testing And Quality`
- `Section 20: Data Structures And Complexity`

The source tree now follows this finer section layout.
The full section map lives in [CURRICULUM.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/CURRICULUM.md).

## Effective Java Coverage

The repo should cover all 90 items from *Effective Java, 3rd Edition* over time, but not by copying the book structure or text.

Use the book as guidance for topic coverage, design quality, and best practices. Keep the teaching language simpler than the book.

The official publisher pages show that the 3rd edition is organized into 12 chapters and 90 items:

- [Pearson Effective Java page](https://www.pearson.com/en-us/subject-catalog/p/effective-java/P200000000138/9780134685991)
- [InformIT Effective Java page](https://www.informit.com/store/effective-java-9780134686097)

## OCJP Book Usage

OCJP preparation books can be used as reference material for:

- exam topic coverage
- trick questions
- common distractors
- practice patterns

But examples and explanations in this repo should be written in original language.

## Current Direction

The repo uses Gradle for the build.
Some chapters use Java 25 preview APIs such as `StructuredTaskScope`, so both compile and run paths must use `--enable-preview` with JDK 25. In Java 25, structured concurrency examples use `StructuredTaskScope.open(...)` with `Joiner` policies instead of the older `ShutdownOnSuccess` and `ShutdownOnFailure` nested classes.

The repo now uses book-style naming:

- sections use `secXX_*`
- chapters inside each section use `chXX_*`
- chapter numbering restarts inside each section

Long-term curriculum planning is tracked in [ROADMAP_099.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/ROADMAP_099.md).
Section-level grouping is tracked in [CURRICULUM.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/CURRICULUM.md).
Book-style reading order is tracked in [BOOK.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/BOOK.md).
The combined manuscript can be generated with `scripts/build_book.sh` and is written to [BOOK_MANUSCRIPT.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/BOOK_MANUSCRIPT.md).
The content manifest and copied markdown/source tree can be generated with `scripts/build_site.sh`.
The React + Bootstrap static site is built with `npm run build` and written to [docs/index.html](/Users/indiadelhi/repo/career/java-missing-tutorial/code/docs/index.html).
Use `npm run dev` for local development. The site fetches markdown, JSON, and Java source files, so opening `index.html` directly with `file://` is not reliable.
Detailed authoring rules are tracked in [AUTHORING_GUIDE.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/AUTHORING_GUIDE.md).
Topic quality is checked against [TOPIC_QUALITY_RUBRIC.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/TOPIC_QUALITY_RUBRIC.md).
Book sources are tracked in [TOP_20_BOOKS.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/TOP_20_BOOKS.md).
Chapter completion is checked against [CHAPTER_QUALITY_CHECKLIST.md](/Users/indiadelhi/repo/career/java-missing-tutorial/code/CHAPTER_QUALITY_CHECKLIST.md).
