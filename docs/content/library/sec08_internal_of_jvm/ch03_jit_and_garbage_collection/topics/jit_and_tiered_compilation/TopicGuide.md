---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# JIT Compilation And Tiered Compilation

## Why This Exists

Concept: JIT Compilation And Tiered Compilation.

## The Pain Before It



## Java Creator Mindset

Make the rule behind jit compilation and tiered compilation obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use jit compilation and tiered compilation without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind jit compilation and tiered compilation, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind jit compilation and tiered compilation explicit and repeatable.

Run [JitAndTieredCompilation.java](JitAndTieredCompilation.java) as the source of truth for the example.

## Code

Run [JitAndTieredCompilation.java](JitAndTieredCompilation.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        long sum = 0;
        for (int i = 0; i < 100_000; i++) {
            sum += hotMethod(i);
        }
        System.out.println("Concept: hot methods get optimized by the JIT over time.");
        System.out.println("sum = " + sum);
        System.out.println("Use -XX:+PrintCompilation to observe compilation decisions when needed.");
        System.out.println("Why it matters: tiered compilation moves from interpreted code to faster compiled code for hot paths.");
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

- reading JIT Compilation And Tiered Compilation as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [JitAndTieredCompilation.java](JitAndTieredCompilation.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why JIT Compilation And Tiered Compilation exists, what problem it solves, and what the runnable file proves.
