---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 7 min
---

# Handling Payment Failures

## Handling Payment Failures

**Concept**

This step focuses on: Java programs stay useful when they are organized around ideas, not only syntax.

errors should preserve meaning for both developers and users.

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

- Read the inline comments and printed lines in main() to see the expected behavior.

**What stays stable**

- errors should preserve meaning for both developers and users.

**What changes**

- failures are part of the business flow and must stay understandable.

**Why it matters**

Java programs stay useful when they are organized around ideas, not only syntax.

**Rule**

👉 Rule: errors should preserve meaning for both developers and users.

**Try this**

- Identify the business data or behavior. 2. Choose the Java construct that expresses the idea clearly. 3. Run the example and compare the output with the explanation.

- Next: compare this step with the next topic and notice what changes.
