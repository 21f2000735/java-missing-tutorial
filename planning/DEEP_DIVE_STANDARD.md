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

For a deep-dive topic, keep the same six-block topic order and deepen the middle of the lesson:

1. `Topic / Problem`
2. `Intuition`
3. `Small Code Snippet`
4. `Internal Working`
5. `Comparison With Other`
6. `Famous Company Interview Question`

Inside those sections, make sure the topic still covers:

- wrong mental model where useful
- right mental model where useful
- compiler checks
- runtime behavior
- interview angle
- OCJP angle
- senior note
- exercise and explained solution

`Internal Working` should do the job that used to be split across `How You Might Invent It` and `Mental Model`:

- it can show the invention path from pressure to design
- it can show the durable picture the reader should retain after the walkthrough
- if the same sentences would work in a separate section, keep them here instead of renaming them

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
