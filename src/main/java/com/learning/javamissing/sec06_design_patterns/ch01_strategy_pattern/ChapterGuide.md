# Strategy Pattern Learning Kit

This chapter teaches one of the most practical design moves in Java: separate changing behavior behind a small contract so the caller does not keep choosing logic with conditionals.

## What Problem This Chapter Solves

Teams often start with one rule:

- one discount rule
- one tax rule
- one shipping rule

Then the business grows:

- festival discount
- student discount
- premium-customer discount
- region-specific pricing

The usual bad path is a growing `if` or `switch` inside checkout or billing code. Strategy moves that changing behavior behind an interface so the calling code stays stable.

## Study Order

1. Run [ChoosingBehaviorWithStrategy.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch01_strategy_pattern/topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java)

## Quick Summary

- strategy is for choosing one behavior from a family of behaviors
- the caller depends on a contract, not a concrete rule
- strategy reduces branching in the part of the code that uses the behavior
- strategy is strongest when new behavior is expected to appear over time

## Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| `if/switch` | there are only one or two stable cases and they are unlikely to grow | the behavior changes often, new cases appear, or testing each rule separately matters |
| inheritance | the variation is core identity and the whole type truly changes | only one part of the behavior changes while the rest of the workflow stays the same |
| enum-based branching | the logic is tiny and stable | different implementations need their own code, tests, and growth path |

## Mini Case Study

Imagine an e-commerce checkout service.

- the checkout flow should not know every discount rule
- the marketing team keeps adding campaigns
- tests should verify each discount rule without running the whole checkout flow

This is exactly where strategy helps.

## When To Use

- use it when one behavior changes independently from the rest of the workflow
- use it when you want to test each rule in isolation
- use it when callers should not know concrete implementation details

## When Not To Use

- do not add strategy for two tiny cases that will never grow
- do not create ten classes when one clear method would do
- do not hide business rules so deeply that readers cannot find them

## Interview Focus

Q: What problem does strategy solve?  
A: It separates interchangeable behavior behind a common contract so callers stop hard-coding branching logic.

Q: Why is strategy often better than a long `switch`?  
A: Because new rules can be added and tested independently without changing the calling flow.

## Effective Java Mapping

- Item 18: Favor composition over inheritance
- Item 64: Refer to objects by their interfaces

## Sources

- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
