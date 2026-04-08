# Strategy Pattern

## Why This Chapter Exists

Strategy solves one recurring design pressure: the workflow stays stable, but one business rule keeps changing.

In this chapter, checkout is the stable workflow. Discount policy is the changing part.

## The Pain Before It

Teams usually start with one branch:

- festival discount
- student discount
- premium discount later

The first version feels harmless. Then checkout becomes the place where every marketing rule lands.

That creates three problems:

- the checkout flow grows branching logic that is not really checkout logic
- each new rule risks breaking an existing rule
- testing one rule means mentally re-reading the whole method

## Java Creator Mindset

Do not ask, "How do I use the pattern name?"

Ask:

- what part of this code should stay stable?
- what part is expected to vary?
- can the changing part sit behind one small contract?

That is the real strategy mindset.

## How You Might Invent It

Imagine writing checkout from scratch.

You know checkout must:

1. take an amount
2. apply one discount rule
3. return the final amount

The purchase flow itself does not change much. The discount formula does.

That suggests a split:

- keep `applyDiscount()` simple
- move each discount formula into its own implementation

## Naive Attempt

The naive design is a single method full of `if` or `switch` branches:

```java
if (customerType.equals("FESTIVAL")) { ... }
else if (customerType.equals("STUDENT")) { ... }
else if (customerType.equals("PREMIUM")) { ... }
```

It works at first, but the caller now owns every rule.

## Why It Breaks

That design breaks down when:

- new rules keep arriving
- each rule needs separate tests
- more than one workflow needs the same discount logic

You end up changing checkout for marketing reasons. That is the wrong responsibility boundary.

## Final Java Direction

The chapter direction is simple:

- define a small behavior contract: `DiscountPolicy`
- keep the stable workflow in one method: `applyDiscount()`
- add one class per changing rule

The caller depends on the contract, not on one concrete discount formula.

## Study Order

1. Run [Choosing Behavior With Strategy](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java)

## What To Notice

- `applyDiscount(int amount, DiscountPolicy policy)` is the stable seam
- `FestivalDiscount` and `StudentDiscount` vary independently
- the design win is not "more classes"; it is "fewer reasons to change the caller"

### Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| `if/switch` | there are one or two tiny stable cases | new rules will keep appearing |
| inheritance | the whole type meaning changes | only one behavior changes |
| enum branching | logic is small and static | each rule needs its own growth and tests |

### Interview Focus

Q: What problem does strategy solve?  
A: It isolates interchangeable behavior behind a contract so the caller stops growing branching logic.

Q: What is the most common misuse?  
A: Adding strategy when the rule set is tiny, stable, and clearer as one short method.

## Mental Model

Use this mental model:

- the workflow is the road
- the strategy is the route choice

The road should not change every time you pick a different route.

In code terms:

- checkout owns the flow
- strategy owns the rule

## Common Mistakes

- introducing strategy before there is real variation pressure
- moving the rule into strategies but still branching all over the callers
- creating many tiny classes when a short method is still clearer

## Tradeoffs

Strategy gives you:

- smaller callers
- independently testable rules
- easier extension when new behaviors arrive

Strategy costs you:

- more types
- one more abstraction layer
- the need to place strategy selection somewhere sensible

## Use / Avoid

### Use It When

- one part of the workflow changes more often than the rest
- new rules are likely to keep arriving
- each rule should be tested or reused independently

### Avoid It When

- there are only one or two tiny rules
- the behavior is not expected to grow
- the abstraction would hide a simpler design

## Practice

### Case Study

Suppose discount logic is needed in:

- checkout
- order preview
- analytics replay

If checkout owns the formula, the other flows either duplicate it or call checkout for the wrong reason.

Strategy keeps the rule reusable without making checkout the center of every pricing decision.

### Try Next

Add a `PremiumDiscount` policy and verify that only the new rule changes.

## Summary

After this chapter, you should be able to explain strategy in one sentence:

Keep the stable workflow in one place and move the changing rule behind a small contract.

If you cannot clearly name the changing behavior, you probably do not need strategy yet.

## Next Chapter

Move to [Creational Patterns](../ch02_creational_patterns/ChapterGuide.md) after this chapter.
