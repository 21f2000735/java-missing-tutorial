---
introduced: Java 16
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Record Classes Deep Dive

## Record Classes Deep Dive

**Concept**

This step focuses on: records are compact data carriers with built-in equals, hashCode, and toString.

records are compact data carriers with built-in equals, hashCode, and toString.

**Example**

```java
    public static void main(String[] args) {
        Money total = new Money("INR", 499);
        Money sameTotal = new Money("INR", 499);

        System.out.println("Concept: records are compact data carriers with built-in equals, hashCode, and toString.");
        System.out.println("record = " + total);
        System.out.println("equals = " + total.equals(sameTotal));
        System.out.println("Why it matters: compact constructors let you validate data while keeping the class small.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- records are compact data carriers with built-in equals, hashCode, and toString.
- compact constructors let you validate data while keeping the class small.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: compact constructors let you validate data while keeping the class small.

**Try this**

- Concept: records are compact data carriers with built-in equals, hashCode, and toString.

- Next: compare this step with the next topic and notice what changes.
