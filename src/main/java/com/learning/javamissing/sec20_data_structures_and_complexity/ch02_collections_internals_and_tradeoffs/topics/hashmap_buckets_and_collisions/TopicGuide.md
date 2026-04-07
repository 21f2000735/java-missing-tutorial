---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 9 min
---

# HashMap Buckets And Collisions

## Why This Exists

`HashMap` feels instant until two questions arrive:

- what happens when keys collide
- why do `equals()` and `hashCode()` matter so much

## The Pain Before It

`HashMap` feels instant until two questions arrive:

- what happens when keys collide
- why do `equals()` and `hashCode()` matter so much

This topic exists because many developers can use `HashMap`, but fewer can explain why it is fast on average and where the risks come from.

## Java Creator Mindset

Think in two layers:

1. average lookup is fast because keys are spread out
2. collisions and poor key design increase the amount of work inside a bucket

## How You Might Invent It

![HashMap buckets single-look visual](./HashMapBucketsVisual.svg)

Read the picture in one pass:

- keys are spread into buckets
- collisions mean more than one key lands in the same bucket
- correct `equals()` and `hashCode()` keep lookup correct

## Naive Attempt

Treat `HashMap` as magical constant-time lookup with no caveats.

That usually leads to:

- ignoring key design
- weak reasoning about collisions
- confusion when behavior is correct but slower than expected

## Why It Breaks

Treat `HashMap` as magical constant-time lookup with no caveats.

That usually leads to:

- ignoring key design
- weak reasoning about collisions
- confusion when behavior is correct but slower than expected

## Final Java Solution

Think in two layers:

1. average lookup is fast because keys are spread out
2. collisions and poor key design increase the amount of work inside a bucket

## Code

### Run It

Run the example and notice that collisions do not break correctness by themselves.

The real lesson is:

- bad hashing increases work
- bad `equals()` or `hashCode()` breaks map behavior

### Expected Result

- the stored status is found correctly
- several keys share the same bucket
- correctness still holds because the key contract is correct

## Walkthrough

Walk through the example in order: start state, rule application, final result.

## Mental Model

![HashMap buckets single-look visual](./HashMapBucketsVisual.svg)

Read the picture in one pass:

- keys are spread into buckets
- collisions mean more than one key lands in the same bucket
- correct `equals()` and `hashCode()` keep lookup correct

| Need | `HashMap` | `TreeMap` |
| --- | --- | --- |
| Fast average lookup by key | strong fit | usually slower |
| Sorted keys | no | yes |
| Simple key-value storage | strong fit | fine, but adds ordering cost |
| Understand collision behavior | required | not the same design issue |

## Mistakes

Treat `HashMap` as magical constant-time lookup with no caveats.

That usually leads to:

- ignoring key design
- weak reasoning about collisions
- confusion when behavior is correct but slower than expected

## Tradeoffs

| Need | `HashMap` | `TreeMap` |
| --- | --- | --- |
| Fast average lookup by key | strong fit | usually slower |
| Sorted keys | no | yes |
| Simple key-value storage | strong fit | fine, but adds ordering cost |
| Understand collision behavior | required | not the same design issue |

The right mental model is:

- lookup is usually near constant average time
- collision-heavy buckets can do more work
- key design affects speed and correctness

When performance matters, the useful measurements are:

- lookup time with realistic keys
- map size growth
- collision rate under real data shape
- memory cost per entry

## Use / Avoid

### Use It When

- you need key-based lookup
- ordering is not the main requirement
- average fast access matters

### Avoid It When

- you need sorted traversal by key
- the real problem is uniqueness only, not key-to-value lookup

## Summary

- `HashMap` speed depends on good key distribution, not magic
- collisions increase work but do not automatically break correctness
- correct `equals()` and `hashCode()` are part of the data-structure contract

## Why This Matters

`HashMap` feels instant until two questions arrive:

- what happens when keys collide
- why do `equals()` and `hashCode()` matter so much

## Intuition

![HashMap buckets single-look visual](./HashMapBucketsVisual.svg)

Read the picture in one pass:

- keys are spread into buckets
- collisions mean more than one key lands in the same bucket
- correct `equals()` and `hashCode()` keep lookup correct

## Problem Statement

`HashMap` feels instant until two questions arrive:

- what happens when keys collide
- why do `equals()` and `hashCode()` matter so much

This topic exists because many developers can use `HashMap`, but fewer can explain why it is fast on average and where the risks come from.

## Core Idea

Think in two layers:

1. average lookup is fast because keys are spread out
2. collisions and poor key design increase the amount of work inside a bucket

## Simple Example

### Run It

Run the example and notice that collisions do not break correctness by themselves.

The real lesson is:

- bad hashing increases work
- bad `equals()` or `hashCode()` breaks map behavior

### Expected Result

- the stored status is found correctly
- several keys share the same bucket
- correctness still holds because the key contract is correct

## Step-by-Step Working

Walk through the example in order: start state, rule application, final result.

## Rules / Syntax

- Prefer the smallest correct rule over cleverness.
- Connect the rule back to the runnable example.

## Common Mistakes

Treat `HashMap` as magical constant-time lookup with no caveats.

That usually leads to:

- ignoring key design
- weak reasoning about collisions
- confusion when behavior is correct but slower than expected

## When To Use / When Not To Use

### Use It When

- you need key-based lookup
- ordering is not the main requirement
- average fast access matters

### Avoid It When

- you need sorted traversal by key
- the real problem is uniqueness only, not key-to-value lookup

## Practice

Change one part of the runnable example, rerun it, and explain whether hashmap buckets and collisions still behaves the way you expected.

### After That

Go back and compare this with `ArrayList` growth and lookup. Together they explain two of the most important everyday Java performance tradeoffs.

## The Problem

`HashMap` feels instant until two questions arrive:

- what happens when keys collide
- why do `equals()` and `hashCode()` matter so much

This topic exists because many developers can use `HashMap`, but fewer can explain why it is fast on average and where the risks come from.

## Quick Visual

![HashMap buckets single-look visual](./HashMapBucketsVisual.svg)

Read the picture in one pass:

- keys are spread into buckets
- collisions mean more than one key lands in the same bucket
- correct `equals()` and `hashCode()` keep lookup correct

## Run This Code

Run the example and notice that collisions do not break correctness by themselves.

The real lesson is:

- bad hashing increases work
- bad `equals()` or `hashCode()` breaks map behavior

## Expected Output

- the stored status is found correctly
- several keys share the same bucket
- correctness still holds because the key contract is correct

## ❌ Bad Code

Treat `HashMap` as magical constant-time lookup with no caveats.

That usually leads to:

- ignoring key design
- weak reasoning about collisions
- confusion when behavior is correct but slower than expected

## ✅ Better Code

Think in two layers:

1. average lookup is fast because keys are spread out
2. collisions and poor key design increase the amount of work inside a bucket

## Comparison Snapshot

| Need | `HashMap` | `TreeMap` |
| --- | --- | --- |
| Fast average lookup by key | strong fit | usually slower |
| Sorted keys | no | yes |
| Simple key-value storage | strong fit | fine, but adds ordering cost |
| Understand collision behavior | required | not the same design issue |

## Performance Lens

The right mental model is:

- lookup is usually near constant average time
- collision-heavy buckets can do more work
- key design affects speed and correctness

When performance matters, the useful measurements are:

- lookup time with realistic keys
- map size growth
- collision rate under real data shape
- memory cost per entry

## Watch Out

The biggest beginner bug is not collision.  
It is inconsistent key contracts.

If `equals()` and `hashCode()` disagree, lookup can become wrong even when the code compiles and the map looks populated.

## Use This When

- you need key-based lookup
- ordering is not the main requirement
- average fast access matters

## Avoid This When

- you need sorted traversal by key
- the real problem is uniqueness only, not key-to-value lookup

## After Reading This, You Should Know

- `HashMap` speed depends on good key distribution, not magic
- collisions increase work but do not automatically break correctness
- correct `equals()` and `hashCode()` are part of the data-structure contract

## Next Topic

Go back and compare this with `ArrayList` growth and lookup. Together they explain two of the most important everyday Java performance tradeoffs.
