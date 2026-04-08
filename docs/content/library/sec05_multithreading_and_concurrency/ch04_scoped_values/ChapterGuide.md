# Scoped Values Learning Kit

## Why This Chapter Exists

This chapter is about one narrow but useful problem: some context belongs to one operation and should be readable through many nested calls without becoming global mutable state.

## The Pain Before It

Real systems often need request-scoped metadata:

- request id
- current user
- tenant id
- trace id

Passing that through every method can become noisy. Mutable thread-local state can leak. Scoped values give a bounded context mechanism.

## Java Creator Mindset

Read the chapter as a small set of related ideas around scoped Values, not as isolated trivia.

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

- the value is ordinary business data for one small call chain
- the state is mutable domain state
- you are not matching the correct JDK preview setup

## Final Java Direction

Read the chapter as a small set of related ideas around scoped Values, not as isolated trivia.

## Study Order

1. Run [Binding Request Context](topics/binding_request_context/BindingRequestContext.java)
2. Run [Introducing Scoped Values](topics/introducing_scoped_values/IntroducingScopedValues.java)
3. Run [Scoped Values Vs Thread Local](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java)

## What To Notice

- the bound value exists only inside one execution scope
- this is good for read-mostly request metadata
- ordinary business data should still be passed as normal parameters when that is clearer

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

- the value is ordinary business data for one small call chain
- the state is mutable domain state
- you are not matching the correct JDK preview setup

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

### Use It When

- one request-level value must cross many layers
- you want a bounded context mechanism instead of mutable thread-local state
- virtual threads and structured tasks make request lifetime more important

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind scoped values and connect them back to the runnable examples.

## Next Chapter

Move to [Concurrency Primitives And Futures Learning Kit](../ch05_concurrency_primitives_and_futures/ChapterGuide.md) after this chapter.
