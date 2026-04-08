# Functional Interfaces Learning Kit

## Why This Chapter Exists

This chapter exists because stream-style Java only feels natural once “passing behavior as data” stops feeling strange.

## The Pain Before It

Sometimes the important thing is not just the data. It is the rule:

- how to price
- how to validate
- how to transform

If a rule should be supplied from outside, Java needs a way to pass that rule around. Functional interfaces are that shape.

## Java Creator Mindset

Read the chapter as a small set of related ideas around functional Interfaces, not as isolated trivia.

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

- one small private method is enough
- the behavior is not really meant to vary
- introducing a functional interface makes the code harder to explain than before

## Final Java Direction

Read the chapter as a small set of related ideas around functional Interfaces, not as isolated trivia.

## Study Order

1. Run [Defining Functions](topics/defining_functions/DefiningFunctions.java)

## What To Notice

- one abstract method defines one action shape
- different lambdas can satisfy that shape
- code becomes more reusable when the rule is passed in instead of hard-coded

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

- one small private method is enough
- the behavior is not really meant to vary
- introducing a functional interface makes the code harder to explain than before

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

### Use It When

- one workflow should support changing rules
- you want to understand the bridge between lambdas and real business code
- stream operations like `map`, `filter`, and `reduce` still feel too magical

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

After this chapter, you should be able to explain the main decisions behind functional interfaces and connect them back to the runnable examples.

## Next Chapter

Move to [Data Filtering And Mapping Learning Kit](../ch03_data_filtering_and_mapping/ChapterGuide.md) after this chapter.
