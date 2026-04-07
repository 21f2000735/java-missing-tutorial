# Visual Lesson Standard

Use this standard for topics where a learner benefits from seeing the internal working before reading the code.

This is especially important for:

- JVM internals
- string pool and memory topics
- class loading
- collections internals
- concurrency flow
- thread coordination
- request lifecycle
- retry and idempotency flows
- cache and search architecture

## Core Rule

For internal-working topics, the first teaching move should usually be:

1. show the picture
2. explain what to notice
3. show the code
4. explain why Java or the system needs this design

Do not spend five sections describing the mechanism before the learner sees the shape.

## Preferred Order

For visual-first topics, follow this sequence inside the lesson:

1. one-screen diagram
2. what the picture means
3. runnable code
4. walkthrough from picture to code
5. problem solved
6. tradeoffs and mistakes

The picture should reduce confusion, not decorate the page.

## Diagram Types To Prefer

- block diagram
- memory layout
- object/reference flow
- request flow
- thread/task timeline
- state transition diagram
- cache lookup path
- before/after comparison diagram

## Asset Format

- prefer `.svg` for diagrams
- use `.png` only when SVG is impractical
- keep labels readable on desktop and mobile
- keep one main idea per image

## Front Matter

When a topic should enforce a diagram, add this to `TopicGuide.md` front matter:

```md
visual: required
visual_asset: TopicDiagram.svg
```

When a diagram is helpful but not mandatory:

```md
visual: recommended
```

Allowed values:

- `required`
- `recommended`
- `none`

## What Makes A Good Diagram

A good diagram should answer at least one of these quickly:

- where does the object live?
- what happens first, next, and last?
- what part is shared and what part is isolated?
- what is cached and what is recomputed?
- what state changes when the request is retried?

If the learner still cannot explain the mechanism after seeing the picture, the diagram is too vague.

## Avoid

- decorative diagrams with no clear teaching purpose
- too many arrows and labels on one image
- repeating the diagram idea again in three renamed sections
- showing code first when the main confusion is structural

## Validation Rule

If `visual: required` is set:

- the guide must contain at least one local markdown image
- the referenced asset must exist in the same topic folder

That rule should be enforced automatically.
