---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Fail-Fast Vs Fail-Safe Iterators

## Why This Exists

Concept: Fail-Fast Vs Fail-Safe Iterators.

## The Pain Before It



## Java Creator Mindset

Make the rule behind fail-fast vs fail-safe iterators obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use fail-fast vs fail-safe iterators without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind fail-fast vs fail-safe iterators, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind fail-fast vs fail-safe iterators explicit and repeatable.

Run [FailFastVsFailSafeIterators.java](FailFastVsFailSafeIterators.java) as the source of truth for the example.

## Code

Run [FailFastVsFailSafeIterators.java](FailFastVsFailSafeIterators.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        List<String> failFast = new ArrayList<>(List.of("apple", "banana", "cherry"));
        System.out.println("Concept: ArrayList iterators are fail-fast.");
        try {
            for (String item : failFast) {
                if (item.equals("banana")) {
                    failFast.remove(item);
                }
            }
        } catch (ConcurrentModificationException exception) {
            System.out.println("fail-fast exception = " + exception.getClass().getSimpleName());
        }

        List<String> failSafe = new CopyOnWriteArrayList<>(List.of("order-1", "order-2"));
        for (String item : failSafe) {
            if (item.equals("order-1")) {
                failSafe.add("order-3");
            }
        }
        System.out.println("CopyOnWriteArrayList after iteration = " + failSafe);

        Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
        concurrentMap.put("sku-1", 10);
        for (String key : concurrentMap.keySet()) {
            concurrentMap.put("sku-2", 20);
        }
        System.out.println("ConcurrentHashMap keys = " + concurrentMap.keySet());
        System.out.println("Why it matters: fail-fast helps catch bugs early, while fail-safe and weakly consistent iterators trade strict detection for concurrency.");
    }
```

## Walkthrough

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

What to observe:

- Check whether the output matches the rule in the comment header.
- Check whether the edge case you changed still behaves as expected.

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading Fail-Fast Vs Fail-Safe Iterators as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [FailFastVsFailSafeIterators.java](FailFastVsFailSafeIterators.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why Fail-Fast Vs Fail-Safe Iterators exists, what problem it solves, and what the runnable file proves.
