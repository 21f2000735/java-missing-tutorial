---
introduced: Java 21
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# Sealed Classes + Pattern Matching Switch

## Sealed Classes + Pattern Matching Switch

**Concept**

sealed classes let switch handle every known subtype.

**Example**

```java
    public static void main(String[] args) {
        PaymentResult first = new PaymentSuccess("ORD-77");
        PaymentResult second = new PaymentFailure("card-declined");

        System.out.println("Concept: sealed classes let switch handle every known subtype.");
        System.out.println(describe(first));
        System.out.println(describe(second));
        System.out.println("Why it matters: exhaustive matching makes result handling safer and easier to read.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- sealed classes let switch handle every known subtype.
- exhaustive matching makes result handling safer and easier to read.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: exhaustive matching makes result handling safer and easier to read.

**Try this**

- Concept: sealed classes let switch handle every known subtype.
