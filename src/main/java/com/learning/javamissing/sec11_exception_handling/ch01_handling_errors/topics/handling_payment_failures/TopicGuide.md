---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 7 min
---

# Handling Payment Failures

## Handling Payment Failures

**Concept**

Java programs stay useful when they are organized around ideas, not only syntax.

**Example**

```java
    public static void main(String[] args) {
        try {
            chargeCard(false);
        } catch (IllegalStateException exception) {
            System.out.println("paymentStatus = failed");
            System.out.println("reason = " + exception.getMessage());
        }
        System.out.println("Concept: errors should preserve meaning for both developers and users.");
    }
```

**What happens**

- paymentStatus = failed
- Concept: errors should preserve meaning for both developers and users.

**What stays stable**

- paymentStatus = failed Concept: errors should preserve meaning for both developers and users.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- paymentStatus = failed Concept: errors should preserve meaning for both developers and users.
- That change is what reveals the behavior you need to understand.

**Why it matters**

paymentStatus = failed Concept: errors should preserve meaning for both developers and users.

**Rule**

👉 Rule: paymentStatus = failed Concept: errors should preserve meaning for both developers and users.

**Try this**

- Identify the business data or behavior. 2. Choose the Java construct that expresses the idea clearly. 3. Run the example and compare the output with the explanation.
