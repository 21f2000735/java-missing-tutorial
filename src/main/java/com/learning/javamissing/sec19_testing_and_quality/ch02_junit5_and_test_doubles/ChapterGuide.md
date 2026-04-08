# JUnit 5 And Test Doubles Learning Kit

## Why This Chapter Exists

This chapter covers the testing tools and habits usually needed in real teams after the first “assert one value” examples.

## The Pain Before It

Many learners know the idea of a test but still do not know lifecycle hooks, parameterized tests, or how to isolate collaborators cleanly.

## Java Creator Mindset

- JUnit 5 lifecycle ideas
- parameterized tests
- test doubles, stubbing, and verification
- how Mockito fits into this mental model
- code coverage as a signal, not a target by itself

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Final Java Direction

- JUnit 5 lifecycle ideas
- parameterized tests
- test doubles, stubbing, and verification
- how Mockito fits into this mental model
- code coverage as a signal, not a target by itself

## Study Order

1. Run [Junit5 Lifecycle And Parameters](topics/junit5_lifecycle_and_parameters/Junit5LifecycleAndParameters.java)
2. Run [Test Doubles And Verification](topics/test_doubles_and_verification/TestDoublesAndVerification.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- why tests should express behavior rather than framework ceremony
- how parameterized tests reduce duplicated assertion code
- why mocks should support a test instead of dominating it
