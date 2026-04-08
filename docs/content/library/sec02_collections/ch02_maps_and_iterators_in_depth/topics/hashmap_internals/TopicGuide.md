---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# HashMap Internals

## Why This Exists

Concept: HashMap Internals.

## The Pain Before It



## Java Creator Mindset

Make the rule behind hashmap internals obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use hashmap internals without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind hashmap internals, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind hashmap internals explicit and repeatable.

Run [HashMapInternals.java](HashMapInternals.java) as the source of truth for the example.

## Code

Run [HashMapInternals.java](HashMapInternals.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        Map<OrderKey, String> orders = new HashMap<>();
        OrderKey paid = new OrderKey("ORD-101");
        OrderKey packed = new OrderKey("ORD-202");

        orders.put(paid, "paid");
        orders.put(packed, "packed");

        System.out.println("Concept: HashMap uses hashCode() to find a bucket and equals() to find the exact key.");
        System.out.println("get(ORD-101) = " + orders.get(new OrderKey("ORD-101")));
        System.out.println("collision lookup = " + orders.get(new OrderKey("ORD-202")));

        paid.id = "ORD-999";
        System.out.println("after mutating the key, get(ORD-101) = " + orders.get(new OrderKey("ORD-101")));
        System.out.println("Why it matters: mutable keys break lookup because the hash bucket no longer matches the stored entry.");
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

- reading HashMap Internals as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [HashMapInternals.java](HashMapInternals.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why HashMap Internals exists, what problem it solves, and what the runnable file proves.
