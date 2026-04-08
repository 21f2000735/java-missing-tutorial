---
introduced: Java 5+
status: stable
runner: embedded
estimated: 7 min
mode: interview
interviewQ:
  - question: What problem does Strategy solve in one sentence?
    answer: It separates one changing behavior from a stable workflow so the caller stops growing conditionals.
  - question: When is Strategy overkill?
    answer: When there are only one or two tiny stable cases and the behavior is unlikely to vary independently.
---

# Choosing Behavior With Strategy

## Why This Exists

This topic exists because checkout should not know every discount formula.

## The Pain Before It

One rule becomes two, then four, then a long branch chain inside the caller.

That makes the workflow harder to read and harder to change safely.

## Java Creator Mindset

Keep the stable workflow in one place. Move the changing rule behind a small contract.

## How You Might Invent It

If you were designing this from scratch, you would notice:

- the input amount stays the same
- the final amount is always the output
- only the discount rule varies

That is the signal to separate behavior from workflow.

## Naive Attempt

Put every discount rule in one checkout method with `if` branches.

That looks cheaper at first but makes one method own every future campaign.

## Why It Breaks

The branch-heavy version breaks down when:

- rules keep changing
- each rule deserves separate tests
- more than one flow needs the same policy logic

## Final Java Solution

Define `DiscountPolicy`, keep `applyDiscount()` stable, and swap only the policy object.

## Code

### Run It

Run the Java file first and compare the two results produced by different policy implementations.

### Expected Result

- `festivalFinalAmount = 1700`
- `studentFinalAmount = 1800`

## Walkthrough

`applyDiscount()` does not care whether the policy is festival or student.

It only knows this rule:

1. receive amount
2. ask the strategy for discount
3. subtract discount

That is the point of strategy. The caller keeps one flow while the behavior varies.

## Mental Model

Treat the strategy as a plug-in rule for one narrow decision inside a stable workflow.

## Mistakes

- using strategy for tiny rules that are unlikely to grow
- scattering strategy selection logic across many callers
- thinking the benefit is "more classes" instead of "clearer change boundaries"

## Tradeoffs

You gain clearer responsibilities and easier extension.  
You pay with extra types and one more abstraction layer.

## Use / Avoid

### Use It When

- one behavior changes more often than the workflow
- new policies are likely to arrive
- each policy should be tested independently

### Avoid It When

- the rule set is tiny and stable
- the abstraction would be heavier than the problem
- a short direct method is still clearer

## Practice

Add a `PremiumDiscount` implementation and explain why `applyDiscount()` should not change.

## Summary

After this topic, you should be able to explain why `applyDiscount()` stays stable while discount behavior changes through `DiscountPolicy`.
