---
introduced: Java 16
status: stable
runner: embedded
estimated: 6 min
---

# safe API design

## safe API design

**Concept**

Good APIs reduce misuse before misuse becomes a production incident.

**Example**

```java
    public static void main(String[] args) {
        NotificationRequest request = NotificationRequest.of("EMAIL", "ops@example.com", "Payment settled");

        // Expected output:
        // request = NotificationRequest[channel=EMAIL, recipient=ops@example.com, message=Payment settled]
        System.out.println("request = " + request);
        System.out.println("Why it works: the static factory validates required fields before the request exists.");
        System.out.println("Company lens: Apple-style answers should sound like 'hard to misuse' rather than 'more flexible'.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- good APIs prevent invalid states early");
        System.out.println("- validation at the boundary improves correctness");
        System.out.println("- safety is often more valuable than extra flexibility");
    }
```

**What happens**

- good APIs prevent invalid states early

**What stays stable**

- good APIs prevent invalid states early
- the static factory validates required fields before the request exists.

**What changes**

- It shows how validation and small construction rules make invalid states harder to create.

**Why it matters**

the static factory validates required fields before the request exists.

**Rule**

👉 Rule: good APIs prevent invalid states early

**Try this**

- Validate required fields at creation time. 2. Keep the object small and obvious. 3. Expose clear methods instead of vague mutable state.
