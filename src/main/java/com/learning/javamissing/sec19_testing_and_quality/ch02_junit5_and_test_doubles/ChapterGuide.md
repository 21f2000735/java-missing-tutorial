# JUnit 5 And Test Doubles Learning Kit

## Why This Chapter Matters

This chapter covers the testing tools and habits usually needed in real teams after the first “assert one value” examples.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Many learners know the idea of a test but still do not know lifecycle hooks, parameterized tests, or how to isolate collaborators cleanly.

## Core Ideas

- JUnit 5 lifecycle ideas
- parameterized tests
- test doubles, stubbing, and verification
- how Mockito fits into this mental model
- code coverage as a signal, not a target by itself

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [Junit5LifecycleAndParameters.java](topics/junit5_lifecycle_and_parameters/Junit5LifecycleAndParameters.java)
2. Run [TestDoublesAndVerification.java](topics/test_doubles_and_verification/TestDoublesAndVerification.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- why tests should express behavior rather than framework ceremony
- how parameterized tests reduce duplicated assertion code
- why mocks should support a test instead of dominating it

## The Problem

Many learners know the idea of a test but still do not know lifecycle hooks, parameterized tests, or how to isolate collaborators cleanly.

## What This Chapter Covers

- JUnit 5 lifecycle ideas
- parameterized tests
- test doubles, stubbing, and verification
- how Mockito fits into this mental model
- code coverage as a signal, not a target by itself

## After Reading This Chapter, You Should Know

- why tests should express behavior rather than framework ceremony
- how parameterized tests reduce duplicated assertion code
- why mocks should support a test instead of dominating it
