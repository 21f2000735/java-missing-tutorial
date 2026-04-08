# Resource Page Template

Use this template for repeatable markdown resources that behave like blog/reference pages on the site.

This is the right template for:

- roadmap pages
- compare pages
- revision indexes
- migration guides
- “how to use this site” reference pages

This is **not** the right template for:

- runnable Java topics
- interview-topic lessons
- certification-topic revision lessons

Use the topic templates for those.

## Why This Template Exists

Resource pages were starting to drift into different shapes:

- some opened with context
- some jumped straight into bullets
- some had no “who is this for” section
- some had no next-step guidance

That makes the site feel inconsistent even when the content is good.

This template gives every repeatable reference page the same spine:

1. what this page is for
2. who should read it
3. the main content blocks
4. what to do next

## Required Page Shape

Every new resource page should follow this order:

```md
# <Page Title>

One short paragraph that explains what this page helps with.

## Why This Page Exists

- explain the problem this page solves
- explain why this information is grouped here
- explain when a learner should use it

## Who Should Use This

- fresher / interview prep / certification prep / migration / working developer
- mention the exact situation where this page is useful

## How To Use This Page

1. first step
2. second step
3. next move after reading

## Core Content

### Block 1

Main explanation, list, comparison, or roadmap item.

### Block 2

Main explanation, list, comparison, or roadmap item.

### Block 3

Main explanation, list, comparison, or roadmap item.

## Common Mistakes

- mistake 1
- mistake 2
- mistake 3

## Recommended Next Step

Tell the learner exactly where to go next:

- section
- chapter
- topic
- track
```

## Writing Rules

- keep the intro to one short paragraph
- prefer 3 to 5 major sections, not 12 tiny headings
- every page must include `How To Use This Page`
- every page must include `Recommended Next Step`
- comparison pages should end with a “use this when” summary
- roadmap pages should end with an ordered sequence, not a loose list
- index pages should optimize for scanning, not long prose
- avoid turning resource pages into book chapters

## Section Guidance

### Why This Page Exists

Answer:

- what confusion this page removes
- why this content is grouped together
- why the learner should care now

### Who Should Use This

Be concrete. Examples:

- “Use this when you have 7 days before a Java interview.”
- “Use this after collections and streams already feel stable.”
- “Use this when moving from Java 8-era habits to Java 21+.”

### How To Use This Page

Tell the learner what order to follow.
Do not make them invent their own sequence.

### Core Content

Choose one of these consistent shapes:

- roadmap
- comparison
- checklist
- grouped reference
- migration sequence

Do not mix all five in one page unless there is a strong reason.

### Recommended Next Step

Always link the page back into the learning system.
Good next steps usually point to:

- one track
- one section
- one chapter
- one runnable topic

## Example Starter

```md
# Compare Collections

Use this page when you know the collection names but still hesitate over which one fits the problem.

## Why This Page Exists

Collections questions are common in interviews and daily coding, but the real confusion is usually about tradeoffs:
ordering, duplicates, lookup speed, and update cost.

## Who Should Use This

- learners preparing for interview questions on List, Set, and Map
- developers who keep defaulting to `ArrayList` without checking the access pattern

## How To Use This Page

1. read the quick comparison table first
2. check the “use this when” summary
3. open the linked runnable topic if one choice still feels fuzzy

## Core Content

### List

...

### Set

...

### Map

...

## Common Mistakes

- choosing by familiarity instead of access pattern
- ignoring ordering requirements
- ignoring duplicate rules

## Recommended Next Step

Open `List, Set, Map` in the collections section and run the example.
```
