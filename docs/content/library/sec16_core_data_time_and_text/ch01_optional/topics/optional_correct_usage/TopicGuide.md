---
introduced: Java 8
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Optional Correct Usage

## Why This Exists

Concept: Optional Correct Usage.

## The Pain Before It



## Java Creator Mindset

Make the rule behind optional correct usage obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use optional correct usage without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind optional correct usage, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind optional correct usage explicit and repeatable.

Run [OptionalCorrectUsage.java](OptionalCorrectUsage.java) as the source of truth for the example.

## Code

Run [OptionalCorrectUsage.java](OptionalCorrectUsage.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        Optional<String> email = findCustomerEmail("cust-101");
        String message = email.map(value -> "email = " + value)
                .orElseGet(() -> "email = missing");

        int amount = findAmount("order-1").orElseThrow();

        System.out.println("Concept: Optional models a missing value without null checks.");
        System.out.println(message);
        System.out.println("amount = " + amount);
        System.out.println("Why it matters: Optional works well as a return type, but not as a field or method parameter.");
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

- reading Optional Correct Usage as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [OptionalCorrectUsage.java](OptionalCorrectUsage.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why Optional Correct Usage exists, what problem it solves, and what the runnable file proves.
