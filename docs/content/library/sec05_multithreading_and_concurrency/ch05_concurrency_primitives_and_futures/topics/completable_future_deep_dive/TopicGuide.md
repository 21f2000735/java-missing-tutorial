---
introduced: Java 8
status: stable
runner: embedded
estimated: 12 min
mode: interview
visual: recommended
---

# CompletableFuture Deep Dive

## Why This Exists

Concept: CompletableFuture Deep Dive.

## The Pain Before It



## Java Creator Mindset

Make the rule behind completablefuture deep dive obvious so the safer choice is also the clearer one.

## How You Might Invent It

1. Run the Java file once without changing it.
2. Change one input or one line.
3. Compare the new output with the explanation.

## Naive Attempt

The naive version is to use completablefuture deep dive without checking what rule it is supposed to protect.

## Why It Breaks

If you ignore the rule behind completablefuture deep dive, the example becomes harder to trust.

Edge cases usually show the bug first.

## Final Java Solution

Use the Java file to make the rule behind completablefuture deep dive explicit and repeatable.

Run [CompletableFutureDeepDive.java](CompletableFutureDeepDive.java) as the source of truth for the example.

## Code

Run [CompletableFutureDeepDive.java](CompletableFutureDeepDive.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        CompletableFuture<String> user = CompletableFuture.supplyAsync(() -> slow("user-42"));
        CompletableFuture<String> profile = user.thenApply(id -> "profile for " + id);
        CompletableFuture<String> orderFlow = user.thenCompose(id -> CompletableFuture.supplyAsync(() -> slow("orders for " + id)));

        CompletableFuture<Void> all = CompletableFuture.allOf(
                CompletableFuture.supplyAsync(() -> slow("inventory")),
                CompletableFuture.supplyAsync(() -> slow("payment"))
        );

        CompletableFuture<String> fallback = CompletableFuture
                .supplyAsync(() -> { throw new IllegalStateException("api down"); })
                .exceptionally(error -> "fallback-response");

        System.out.println("thenApply = " + profile.join());
        System.out.println("thenCompose = " + orderFlow.join());
        all.join();
        System.out.println("allOf = all parallel calls finished");
        System.out.println("exceptionally = " + fallback.join());

        CompletableFuture<Object> first = CompletableFuture.anyOf(
                CompletableFuture.supplyAsync(() -> slow("fast api")),
                CompletableFuture.supplyAsync(() -> slow("slow api"))
        );
        System.out.println("anyOf = " + first.join());
        System.out.println("Why it matters: thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.");
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

- reading CompletableFuture Deep Dive as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [CompletableFutureDeepDive.java](CompletableFutureDeepDive.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why CompletableFuture Deep Dive exists, what problem it solves, and what the runnable file proves.
