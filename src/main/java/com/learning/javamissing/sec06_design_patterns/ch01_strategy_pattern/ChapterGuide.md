# Strategy Pattern

## Why This Chapter Matters

Strategy is the pattern you reach for when the workflow stays stable but one decision keeps changing.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Strategy is the pattern you reach for when the workflow stays stable but one decision keeps changing.

## Core Ideas

Read the chapter as a small set of related ideas around strategy Pattern, not as isolated trivia.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [ChoosingBehaviorWithStrategy.java](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java)
2. Notice that `applyDiscount()` does not change when you swap discount behavior
3. Imagine adding one more campaign without touching checkout flow

## What To Notice

- the stable workflow depends on an interface, not a concrete rule
- each rule gets its own focused implementation
- the design pressure is "changing behavior", not "creating more classes"

### Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| `if/switch` | there are few stable cases | new rules will keep appearing |
| inheritance | the whole type meaning changes | only one behavior changes |
| enum branching | logic is tiny and static | rules need their own tests and growth path |

### Interview Focus

Q: What problem does strategy solve?  
A: It isolates interchangeable behavior behind a contract so the caller stops growing branching logic.

Q: What is the most common misuse?  
A: Introducing strategy when the behavior is too small and stable to justify extra structure.

## Common Mistakes

- there are only one or two tiny stable cases
- a short method is still more readable than introducing new classes
- the rule will never vary separately from the workflow

## When To Use / When Not To Use

### Use It When

- one small part of the workflow changes often
- each rule should be tested independently
- callers should stop knowing every rule formula

## Practice

### Case Study

Think about a pricing engine used by checkout, order preview, and analytics.  
If discount logic lives inside checkout, those other flows will either duplicate it or call checkout for the wrong reason.  
Strategy keeps discount logic reusable and local.

## Summary

After this chapter, you should be able to explain the main decisions behind strategy pattern and connect them back to the runnable examples.

## The Story

An online store starts with one discount rule.  
Then the business adds:

- festival discounts
- student discounts
- premium-member discounts
- region-specific rules

The dangerous move is to keep adding branches inside checkout.  
Checkout should run the purchase flow, not own every marketing rule.

## Run This First

1. Run [ChoosingBehaviorWithStrategy.java](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java)
2. Notice that `applyDiscount()` does not change when you swap discount behavior
3. Imagine adding one more campaign without touching checkout flow

## What To Look For

- the stable workflow depends on an interface, not a concrete rule
- each rule gets its own focused implementation
- the design pressure is "changing behavior", not "creating more classes"

## Use This Pattern When

- one small part of the workflow changes often
- each rule should be tested independently
- callers should stop knowing every rule formula

## Avoid This Pattern When

- there are only one or two tiny stable cases
- a short method is still more readable than introducing new classes
- the rule will never vary separately from the workflow

## Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| `if/switch` | there are few stable cases | new rules will keep appearing |
| inheritance | the whole type meaning changes | only one behavior changes |
| enum branching | logic is tiny and static | rules need their own tests and growth path |

## Small Case Study

Think about a pricing engine used by checkout, order preview, and analytics.  
If discount logic lives inside checkout, those other flows will either duplicate it or call checkout for the wrong reason.  
Strategy keeps discount logic reusable and local.

## Interview Focus

Q: What problem does strategy solve?  
A: It isolates interchangeable behavior behind a contract so the caller stops growing branching logic.

Q: What is the most common misuse?  
A: Introducing strategy when the behavior is too small and stable to justify extra structure.

## Effective Java Mapping

- Item 18: Favor composition over inheritance
- Item 64: Refer to objects by their interfaces

## Sources

- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
