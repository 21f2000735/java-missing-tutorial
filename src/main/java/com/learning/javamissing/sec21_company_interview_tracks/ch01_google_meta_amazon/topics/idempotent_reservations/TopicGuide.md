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

- Why it works: the same request id returns the same stored reservation result.
- Company lens: Amazon and Meta reward answers that treat retries as normal, not exceptional.
- After reading this example, you should know:

**What stays stable**

- Why it works: the same request id returns the same stored reservation result. Company lens: Amazon and Meta reward answers that treat retries as normal, not exceptional.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Why it works: the same request id returns the same stored reservation result. Company lens: Amazon and Meta reward answers that treat retries as normal, not exceptional.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Why it works: the same request id returns the same stored reservation result. Company lens: Amazon and Meta reward answers that treat retries as normal, not exceptional.

**Rule**

👉 Rule: Why it works: the same request id returns the same stored reservation result.

**Try this**

- Accept a request id. 2. Store the first result under that id. 3. Return the stored result on duplicate calls.
