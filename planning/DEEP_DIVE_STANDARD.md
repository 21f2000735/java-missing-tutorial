# Deep Dive Standard

Use this standard for chapters that should feel genuinely deep, not only well organized.

Deep content must explain:

- the learner view
- the compiler/runtime view
- the design and tradeoff view

If one of those is missing, the content is still shallow.

## Required Layers

### Layer 1: Plain Explanation

The learner should understand:

- what the concept is
- why it exists
- what problem it solves
- one small example

### Layer 2: Internal Behavior

The learner should understand:

- what the compiler checks
- what happens at runtime
- what Java does not enforce
- what confusion usually comes from that gap

### Layer 3: Design Judgment

The learner should understand:

- when to use the concept
- when not to use it
- what bad API designs look like
- what experienced engineers optimize for

## Required Topic Pattern

For a deep-dive topic, include:

1. `Concept`
2. `Why this exists`
3. `Problem it solves`
4. `Wrong mental model`
5. `Right mental model`
6. `Small example`
7. `Better real-world example`
8. `Step-by-step walkthrough`
9. `What the compiler checks`
10. `What happens at runtime`
11. `Common mistake`
12. `Interview angle`
13. `OCJP angle`
14. `Senior note`
15. `Exercise`
16. `Solution`

## Deep-Dive Trigger Topics

Prioritize this level of depth for:

- generics
- collectors
- synchronization
- virtual threads
- structured concurrency
- modules
- pattern matching

## Anti-Patterns

Do not call content “deep” if it only adds:

- more bullet points
- more trivia
- more syntax variants
- more words without a better mental model
