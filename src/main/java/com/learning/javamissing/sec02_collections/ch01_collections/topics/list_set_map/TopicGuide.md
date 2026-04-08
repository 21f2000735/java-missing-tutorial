---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
mode: shared
---

# List Set Map

## Why This Exists

Concept: List Set Map.

Java programs stay useful when they are organized around ideas, not only syntax.

## The Pain Before It

teams must store repeated, unique, and keyed data correctly.

This topic uses shopping cart, coupons, and product lookup to make the concept easier to understand.

## Java Creator Mindset

First understand the problem in plain language, then map that idea to the Java code.

## How You Might Invent It

1. Identify the business data or behavior.
2. Choose the Java construct that expresses the idea clearly.
3. Run the example and compare the output with the explanation.

## Naive Attempt

The naive version is to use list set map without checking what rule it is supposed to protect.

## Why It Breaks

teams must store repeated, unique, and keyed data correctly.

Edge cases usually show the bug first.

## Final Java Solution

First understand the problem in plain language, then map that idea to the Java code.

Run [ListSetMap.java](ListSetMap.java) as the source of truth for the example.

## Code

Run [ListSetMap.java](ListSetMap.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        overview();
        wrongExample();
        // Expected output:
        // cartItems keeps duplicates, couponCodes stay unique, quantities support product lookup.
        List<String> cartItems = sampleCartItems();
        Set<String> couponCodes = sampleCouponCodes();
        Map<String, Integer> quantitiesBySku = sampleQuantitiesBySku();
        System.out.println("cartItems = " + cartItems);
        System.out.println("couponCodes = " + couponCodes);
        System.out.println("quantitiesBySku = " + quantitiesBySku);
        System.out.println("What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU.");
        System.out.println("Common confusion: choose List when duplicates or order matter, Set when uniqueness matters, Map when lookup by key matters.");
        System.out.println("Senior note: collection choice affects API clarity, mutation rules, and algorithmic cost.");
    }
```

## Walkthrough

1. Identify the business data or behavior.
2. Choose the Java construct that expresses the idea clearly.
3. Run the example and compare the output with the explanation.

What to observe:

- Read the inline comments and printed lines in main() to see the expected behavior.

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading List Set Map as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [ListSetMap.java](ListSetMap.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why List Set Map exists, what problem it solves, and what the runnable file proves.
