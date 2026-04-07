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

For a deep-dive topic, keep the standard topic order and deepen the middle of the lesson:

1. `Why This Exists`
2. `The Pain Before It`
3. `Java Creator Mindset`
4. `How You Might Invent It`
5. `Naive Attempt`
6. `Why It Breaks`
7. `Final Java Solution`
8. `Code`
9. `Walkthrough`
10. `Mental Model`
11. `Mistakes`
12. `Tradeoffs`
13. `Use / Avoid`
14. `Summary`

Inside those sections, make sure the topic still covers:

- wrong mental model
- right mental model
- compiler checks
- runtime behavior
- interview angle
- OCJP angle
- senior note
- exercise and explained solution

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
