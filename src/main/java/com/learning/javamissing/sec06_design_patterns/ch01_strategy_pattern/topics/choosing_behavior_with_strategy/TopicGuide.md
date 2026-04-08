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

# Strategy pattern

## Why This Exists

Concept: Strategy pattern.

Business rules often change faster than the workflow that uses them.

## The Pain Before It

It removes growing conditional logic from the caller when one behavior can vary.

Checkout needs different discount rules for festival, student, and premium customers.

## Java Creator Mindset

Keep the stable workflow in one place and move the changing rule behind a small contract.

## How You Might Invent It

1. Define the behavior contract.
2. Add one implementation per rule.
3. Pass the chosen strategy into the stable workflow.

## Naive Attempt

The naive version is to use strategy pattern without checking what rule it is supposed to protect.

## Why It Breaks

It removes growing conditional logic from the caller when one behavior can vary.

Edge cases usually show the bug first.

## Final Java Solution

Keep the stable workflow in one place and move the changing rule behind a small contract.

Run [ChoosingBehaviorWithStrategy.java](ChoosingBehaviorWithStrategy.java) as the source of truth for the example.

## Code

Run [ChoosingBehaviorWithStrategy.java](ChoosingBehaviorWithStrategy.java) and compare the output with the explanation below.

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

## Walkthrough

1. Define the behavior contract.
2. Add one implementation per rule.
3. Pass the chosen strategy into the stable workflow.

What to observe:

- festivalFinalAmount = 1700
- studentFinalAmount = 1800

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading Strategy pattern as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [ChoosingBehaviorWithStrategy.java](ChoosingBehaviorWithStrategy.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why Strategy pattern exists, what problem it solves, and what the runnable file proves.
