---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Class Loading And Hot Deploy

## Why This Exists

Concept: Class Loading And Hot Deploy.

## The Pain Before It



## Java Creator Mindset

Make the rule behind class loading and hot deploy obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use class loading and hot deploy without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind class loading and hot deploy, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind class loading and hot deploy explicit and repeatable.

Run [ClassLoadingAndHotDeploy.java](ClassLoadingAndHotDeploy.java) as the source of truth for the example.

## Code

Run [ClassLoadingAndHotDeploy.java](ClassLoadingAndHotDeploy.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        ClassLoader appLoader = ClassLoadingAndHotDeploy.class.getClassLoader();
        System.out.println("Concept: class identity is class name plus class loader.");
        System.out.println("app loader = " + appLoader.getClass().getSimpleName());
        System.out.println("same class object = " + (Widget.class == Widget.class));
        System.out.println("Why it matters: hot-deploy containers rely on unloading whole class loaders, not just individual classes.");
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

- reading Class Loading And Hot Deploy as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [ClassLoadingAndHotDeploy.java](ClassLoadingAndHotDeploy.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why Class Loading And Hot Deploy exists, what problem it solves, and what the runnable file proves.
