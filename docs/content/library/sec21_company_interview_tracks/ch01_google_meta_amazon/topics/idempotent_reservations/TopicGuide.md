---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
mode: interview
---

# idempotent reservations

## idempotent reservations

**Concept**

This step focuses on: Booking, checkout, and order systems are retried under network failure.

Booking, checkout, and order systems are retried under network failure.

**Example**

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

**What happens**

- idempotency protects business actions under retry

**What stays stable**

- idempotency protects business actions under retry
- the same request id returns the same stored reservation result.

**What changes**

- It prevents duplicate reservations when the same request is sent again.

**Why it matters**

the same request id returns the same stored reservation result.

**Rule**

👉 Rule: idempotency protects business actions under retry

**Try this**

- Accept a request id. 2. Store the first result under that id. 3. Return the stored result on duplicate calls.

- Next: compare this step with the next topic and notice what changes.
