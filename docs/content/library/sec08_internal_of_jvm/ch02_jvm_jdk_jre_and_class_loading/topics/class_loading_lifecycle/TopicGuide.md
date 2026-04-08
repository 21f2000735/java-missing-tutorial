---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 7 min
mode: interview
visual: required
visual_asset: ClassLoadingLifecycleVisual.svg
---

# Class Loading Lifecycle

## Why This Exists

This topic exists because static initialization timing surprises many Java developers.

## The Pain Before It

A learner sees output like:

`CustomerConfig static initialization running`

and asks:

- why did that print before the next line?
- did the class load at startup?
- what exactly triggered it?

## Java Creator Mindset

Do not compress everything into the phrase "class loading."

Separate:

- loading
- linking
- initialization

## How You Might Invent It

If every class ran all static setup eagerly at startup, programs would pay work before it was needed.

Java instead activates classes closer to actual use.

![Class loading and initialization timeline](ClassLoadingLifecycleVisual.svg)

What to notice:

- class metadata becomes available before static initialization necessarily runs
- active use is what matters
- initialization is the stage where static setup code executes

## Naive Attempt

The naive answer is:

"The class loads once the JVM starts."

## Why It Breaks

That answer misses the important runtime detail: the class can become known before its static initialization is triggered.

## Final Java Solution

Use this progression:

- loading makes the class available
- linking prepares it
- initialization runs static setup when active use demands it

## Code

### Run It

Run the example and watch when the static initialization message appears relative to the field access.

### Expected Result

- `Concept: classes are loaded and initialized only when the JVM decides they are needed.`
- `Accessing CustomerConfig.DEFAULT_REGION triggers class initialization.`
- `CustomerConfig static initialization running`
- `region = IN`

## Walkthrough

`CustomerConfig.DEFAULT_REGION` is backed by a method call, so accessing it triggers initialization of the nested class.

That is why the message prints before the region value is shown.

## Mental Model

Think of initialization as the moment the JVM commits to running static setup for the class.

## Mistakes

- using "loaded" when you mean "initialized"
- assuming every static member behaves like a compile-time constant
- missing the trigger point in the code

## Tradeoffs

Lazy activation improves startup behavior and avoids unnecessary work, but it means timing questions become important when debugging static side effects.

## Use / Avoid

### Use It When

- explaining static initialization timing
- debugging class startup behavior
- answering JVM lifecycle interview questions

### Avoid It When

- you are calling every static access the same thing without checking whether initialization actually ran

## Practice

Change one input in [ClassLoadingLifecycle.java](ClassLoadingLifecycle.java), rerun it, and write down what changed.

## Summary

After this topic, you should be able to explain why touching one static field can trigger class initialization at that exact point in execution.
