---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# transfer idempotency

## Why This Exists

Concept: transfer idempotency.

Payment and transfer APIs must survive retries without moving money twice.

## The Pain Before It

It binds a transfer request id to one durable result.

A wallet transfer endpoint gets retried after a client timeout.

## Java Creator Mindset

One business action should map to one result, even if the request arrives more than once.

## How You Might Invent It

1. Accept an idempotency key.
2. Store the result for that key.
3. Return the same result on retry.

## Naive Attempt

The naive version is to use transfer idempotency without checking what rule it is supposed to protect.

## Why It Breaks

It binds a transfer request id to one durable result.

Edge cases usually show the bug first.

## Final Java Solution

One business action should map to one result, even if the request arrives more than once.

Run [TransferIdempotency.java](TransferIdempotency.java) as the source of truth for the example.

## Code

Run [TransferIdempotency.java](TransferIdempotency.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        TransferService service = new TransferService();
        Transfer firstTransfer = service.transfer("tx-909", new BigDecimal("125.00"));
        Transfer retryTransfer = service.transfer("tx-909", new BigDecimal("125.00"));

        // Expected output:
        // firstTransfer = COMPLETED
        // retryTransfer = COMPLETED
        // ledgerEntries = 1
        System.out.println("firstTransfer = " + firstTransfer.status());
        System.out.println("retryTransfer = " + retryTransfer.status());
        System.out.println("ledgerEntries = " + service.ledgerEntries());
        System.out.println("Company lens: Coinbase answers should say correctness before convenience.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- idempotency keys belong in money-moving APIs");
        System.out.println("- retries are normal and should be safe");
        System.out.println("- ledger truth must not duplicate on client timeout");
    }
```

## Walkthrough

1. Accept an idempotency key.
2. Store the result for that key.
3. Return the same result on retry.

What to observe:

- firstTransfer = COMPLETED
- retryTransfer = COMPLETED
- ledgerEntries = 1

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading transfer idempotency as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [TransferIdempotency.java](TransferIdempotency.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why transfer idempotency exists, what problem it solves, and what the runnable file proves.
