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

Optional models a missing value without null checks.

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

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- Optional models a missing value without null checks.
- Optional works well as a return type, but not as a field or method parameter.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: Optional works well as a return type, but not as a field or method parameter.

**Try this**

- Concept: Optional models a missing value without null checks.
