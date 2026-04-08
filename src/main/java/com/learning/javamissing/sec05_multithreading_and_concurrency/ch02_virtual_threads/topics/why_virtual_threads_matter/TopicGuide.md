---
introduced: Java 21
status: final
runner: local
estimated: 9 min
---

# Why virtual threads matter

## Why This Exists

Concept: Why virtual threads matter.

Waiting-heavy systems need a cheaper way to express many concurrent tasks.

## The Pain Before It

It keeps direct blocking-style code practical for very many mostly waiting tasks.

An order request waits on inventory and pricing checks.

## Java Creator Mindset

A virtual thread is still a thread, but its cost model is much better for waiting-heavy workloads.

## How You Might Invent It

1. Start one virtual thread.
2. Let it block in a simple style.
3. Compare the model with traditional expensive thread-per-task thinking.

## Naive Attempt

The naive version is to use why virtual threads matter without checking what rule it is supposed to protect.

## Why It Breaks

It keeps direct blocking-style code practical for very many mostly waiting tasks.

Edge cases usually show the bug first.

## Final Java Solution

A virtual thread is still a thread, but its cost model is much better for waiting-heavy workloads.

Run [WhyVirtualThreadsMatter.java](WhyVirtualThreadsMatter.java) as the source of truth for the example.

## Code

Run [WhyVirtualThreadsMatter.java](WhyVirtualThreadsMatter.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) throws InterruptedException {
        explainWhy();
        wrongMentalModel();
        runBlockingTaskExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a virtual thread is still a Thread");
        System.out.println("- virtual threads are useful when tasks spend time waiting");
        System.out.println("- they improve the cost model, not the business logic");
    }
```

## Walkthrough

1. Start one virtual thread.
2. Let it block in a simple style.
3. Compare the model with traditional expensive thread-per-task thinking.

What to observe:

- inventory check finished on VirtualThread...

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading Why virtual threads matter as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [WhyVirtualThreadsMatter.java](WhyVirtualThreadsMatter.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why Why virtual threads matter exists, what problem it solves, and what the runnable file proves.
