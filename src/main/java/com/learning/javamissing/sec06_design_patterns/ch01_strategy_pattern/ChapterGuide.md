# Strategy Pattern

## Problem

This chapter shows what breaks when strategy pattern is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- That design breaks down when:
- new rules keep arriving
- each rule needs separate tests

## Fix

Run the topics in this order:

1. Run [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java)

What to observe:

- Which topic shows the failure first: [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java).
- Which topic narrows the rule: [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java).
- Which topic shows the cleaner abstraction: [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java).

## Improvement

After this chapter, you can explain the rule behind strategy pattern and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Strategy Pattern exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) and note the first thing that breaks.
- Run [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) and write down what the rule becomes.
- Run [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) and compare the result with the naive approach.
