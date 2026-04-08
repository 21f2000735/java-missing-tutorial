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

Concept: sealed classes let switch handle every known subtype.

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

- Concept: sealed classes let switch handle every known subtype.

**What stays stable**

- Concept: sealed classes let switch handle every known subtype. Why it matters: exhaustive matching makes result handling safer and easier to read.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: sealed classes let switch handle every known subtype. Why it matters: exhaustive matching makes result handling safer and easier to read.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: sealed classes let switch handle every known subtype. Why it matters: exhaustive matching makes result handling safer and easier to read.

**Rule**

👉 Rule: Concept: sealed classes let switch handle every known subtype.

**Try this**

- Concept: sealed classes let switch handle every known subtype.
