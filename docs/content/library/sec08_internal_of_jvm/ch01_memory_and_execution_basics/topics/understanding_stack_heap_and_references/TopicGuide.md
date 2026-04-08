---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
mode: interview
visual: required
visual_asset: StackHeapReferencesVisual.svg
interviewQ:
  - question: Why does mutating one reference sometimes affect another variable?
    answer: Because both variables can hold references to the same heap object, so the mutation happens on shared state, not on the local variable itself.
  - question: What lives on the stack in a normal method call?
    answer: Local variable slots and primitive values for that frame; object instances themselves still live on the heap.
---

# Understanding Stack, Heap, And References

## Why This Exists

Concept: Understanding Stack, Heap, And References.

## The Pain Before It



## Java Creator Mindset

Make the rule behind understanding stack, heap, and references obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

![Understanding Stack, Heap, And References visual](./StackHeapReferencesVisual.svg)

## Naive Attempt

The naive version is to use understanding stack, heap, and references without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind understanding stack, heap, and references, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind understanding stack, heap, and references explicit and repeatable.

Run [UnderstandingStackHeapAndReferences.java](UnderstandingStackHeapAndReferences.java) as the source of truth for the example.

## Code

Run [UnderstandingStackHeapAndReferences.java](UnderstandingStackHeapAndReferences.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        System.out.println("Concept: local variable values and object state are not the same thing");
        System.out.println("Real-world problem: two variables point to the same cart object and one update surprises the learner.");
        System.out.println();

        Cart first = new Cart(2);
        Cart second = first;
        second.itemCount = 5;

        // Expected output:
        // first.itemCount = 5
        // second.itemCount = 5
        System.out.println("first.itemCount = " + first.itemCount);
        System.out.println("second.itemCount = " + second.itemCount);
        System.out.println("Why it works: both variables refer to the same heap object, so one mutation is visible through both references.");
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

![Understanding Stack, Heap, And References visual](./StackHeapReferencesVisual.svg)

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading Understanding Stack, Heap, And References as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [UnderstandingStackHeapAndReferences.java](UnderstandingStackHeapAndReferences.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why Understanding Stack, Heap, And References exists, what problem it solves, and what the runnable file proves.
