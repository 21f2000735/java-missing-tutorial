---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
mode: interview
---

# idempotent reservations

## Why This Exists

Concept: idempotent reservations.

Booking, checkout, and order systems are retried under network failure.

## The Pain Before It

It prevents duplicate reservations when the same request is sent again.

A flash-sale reservation endpoint receives duplicate calls for the same booking request.

## Java Creator Mindset

A business action needs a stable request identity so the server can return the same result on retry.

## How You Might Invent It

1. Accept a request id.
2. Store the first result under that id.
3. Return the stored result on duplicate calls.

## Naive Attempt

The naive version is to use idempotent reservations without checking what rule it is supposed to protect.

## Why It Breaks

It prevents duplicate reservations when the same request is sent again.

Edge cases usually show the bug first.

## Final Java Solution

A business action needs a stable request identity so the server can return the same result on retry.

Run [IdempotentReservations.java](IdempotentReservations.java) as the source of truth for the example.

## Code

Run [IdempotentReservations.java](IdempotentReservations.java) and compare the output with the explanation below.

```java
    public static void main(String[] args) {
        ReservationService service = new ReservationService();

        ReservationResult firstResult = service.reserve("req-501", "show-101", 2);
        ReservationResult secondResult = service.reserve("req-501", "show-101", 2);

        // Expected output:
        // firstResult = RESERVED
        // secondResult = RESERVED
        // reservationsCreated = 1
        System.out.println("firstResult = " + firstResult.status());
        System.out.println("secondResult = " + secondResult.status());
        System.out.println("reservationsCreated = " + service.createdReservationCount());
        System.out.println("Why it works: the same request id returns the same stored reservation result.");
        System.out.println("Company lens: Amazon and Meta reward answers that treat retries as normal, not exceptional.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- idempotency protects business actions under retry");
        System.out.println("- the server must own duplicate protection");
        System.out.println("- reservation systems need stable request identity");
    }
```

## Walkthrough

1. Accept a request id.
2. Store the first result under that id.
3. Return the stored result on duplicate calls.

What to observe:

- firstResult = RESERVED
- secondResult = RESERVED
- reservationsCreated = 1

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading idempotent reservations as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [IdempotentReservations.java](IdempotentReservations.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why idempotent reservations exists, what problem it solves, and what the runnable file proves.
