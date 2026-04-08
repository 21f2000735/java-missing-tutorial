---
introduced: Java 8
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Optional Correct Usage

## Optional Correct Usage

**Concept**

Concept: Optional models a missing value without null checks.

**Example**

```java
    public static void main(String[] args) {
        Optional<String> email = findCustomerEmail("cust-101");
        String message = email.map(value -> "email = " + value)
                .orElseGet(() -> "email = missing");

        int amount = findAmount("order-1").orElseThrow();

        System.out.println("Concept: Optional models a missing value without null checks.");
        System.out.println(message);
        System.out.println("amount = " + amount);
        System.out.println("Why it matters: Optional works well as a return type, but not as a field or method parameter.");
    }
```

**What happens**

- Concept: Optional models a missing value without null checks.

**What stays stable**

- Concept: Optional models a missing value without null checks. Why it matters: Optional works well as a return type, but not as a field or method parameter.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: Optional models a missing value without null checks. Why it matters: Optional works well as a return type, but not as a field or method parameter.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: Optional models a missing value without null checks. Why it matters: Optional works well as a return type, but not as a field or method parameter.

**Rule**

👉 Rule: Concept: Optional models a missing value without null checks.

**Try this**

- Concept: Optional models a missing value without null checks.
