# Strategy Pattern

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

Business rules often change faster than the workflow that uses them.

## Naive Approach

- Watch out: if callers still choose concrete strategy classes everywhere, the branching just moved instead of disappearing.
- Try this next: add a PremiumDiscount strategy and notice that applyDiscount does not need to change.

## Failure

- Strategy pattern: Watch out: if callers still choose concrete strategy classes everywhere, the branching just moved instead of disappearing.
- Strategy pattern: Try this next: add a PremiumDiscount strategy and notice that applyDiscount does not need to change.

## Fix

Run the topics in this order:

1. Run [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: choose one behavior through a strategy interface");
        System.out.println("Story hook: the checkout flow stays the same, but marketing keeps adding new discount campaigns every month.");
        System.out.println("Real-world problem: checkout uses different discount rules for students and festivals.");
        System.out.println("Mental model: checkout should not know every discount formula.");
        System.out.println();

        int festivalFinalAmount = applyDiscount(2_000, new FestivalDiscount());
        int studentFinalAmount = applyDiscount(2_000, new StudentDiscount());

        // Expected output:
        // festivalFinalAmount = 1700
        // studentFinalAmount = 1800
        System.out.println("festivalFinalAmount = " + festivalFinalAmount);
        System.out.println("studentFinalAmount = " + studentFinalAmount);
        System.out.println("Why it works: checkout depends on the DiscountPolicy contract, not one hard-coded rule.");
        System.out.println("Use this when: one small part of the workflow changes often while the surrounding flow stays stable.");
        System.out.println("Avoid this when: you only have one or two tiny rules and they are unlikely to grow.");
        System.out.println("Common mistake: replacing one huge switch with many strategies when the rule set is still tiny and stable.");
        System.out.println("Watch out: if callers still choose concrete strategy classes everywhere, the branching just moved instead of disappearing.");
        System.out.println("Try this next: add a PremiumDiscount strategy and notice that applyDiscount does not need to change.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- strategy moves changing behavior behind a contract");
        System.out.println("- the caller stays stable while rules grow independently");
        System.out.println("- strategy is strongest when behavior changes more often than the workflow");
    }
```

What happens:

- Watch out: if callers still choose concrete strategy classes everywhere, the branching just moved instead of disappearing.
- Try this next: add a PremiumDiscount strategy and notice that applyDiscount does not need to change.

Why it matters:

Business rules often change faster than the workflow that uses them.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: choose one behavior through a strategy interface");
        System.out.println("Story hook: the checkout flow stays the same, but marketing keeps adding new discount campaigns every month.");
        System.out.println("Real-world problem: checkout uses different discount rules for students and festivals.");
        System.out.println("Mental model: checkout should not know every discount formula.");
        System.out.println();

        int festivalFinalAmount = applyDiscount(2_000, new FestivalDiscount());
        int studentFinalAmount = applyDiscount(2_000, new StudentDiscount());

        // Expected output:
        // festivalFinalAmount = 1700
        // studentFinalAmount = 1800
        System.out.println("festivalFinalAmount = " + festivalFinalAmount);
        System.out.println("studentFinalAmount = " + studentFinalAmount);
        System.out.println("Why it works: checkout depends on the DiscountPolicy contract, not one hard-coded rule.");
        System.out.println("Use this when: one small part of the workflow changes often while the surrounding flow stays stable.");
        System.out.println("Avoid this when: you only have one or two tiny rules and they are unlikely to grow.");
        System.out.println("Common mistake: replacing one huge switch with many strategies when the rule set is still tiny and stable.");
        System.out.println("Watch out: if callers still choose concrete strategy classes everywhere, the branching just moved instead of disappearing.");
        System.out.println("Try this next: add a PremiumDiscount strategy and notice that applyDiscount does not need to change.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- strategy moves changing behavior behind a contract");
        System.out.println("- the caller stays stable while rules grow independently");
        System.out.println("- strategy is strongest when behavior changes more often than the workflow");
    }
```

What happens:

- Watch out: if callers still choose concrete strategy classes everywhere, the branching just moved instead of disappearing.
- Try this next: add a PremiumDiscount strategy and notice that applyDiscount does not need to change.

Why it matters:

Business rules often change faster than the workflow that uses them.

After this chapter, you should be able to explain why Strategy Pattern exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java), [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java), and [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) starts with the raw behavior, [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) adds the safety rule, and [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the stable workflow in one place and move the changing rule behind a small contract.

## Try this

- Run [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) and note the first thing that breaks.
- Run [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) and remove the safety rule or coordination step.
- Run [Strategy pattern](topics/choosing_behavior_with_strategy/ChoosingBehaviorWithStrategy.java) and compare the result with the naive approach.
