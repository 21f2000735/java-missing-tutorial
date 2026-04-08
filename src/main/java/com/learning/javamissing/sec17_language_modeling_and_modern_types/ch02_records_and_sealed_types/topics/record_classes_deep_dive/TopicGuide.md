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

Concept: records are compact data carriers with built-in equals, hashCode, and toString.

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

- Concept: records are compact data carriers with built-in equals, hashCode, and toString.

**What stays stable**

- Concept: records are compact data carriers with built-in equals, hashCode, and toString. Why it matters: compact constructors let you validate data while keeping the class small.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: records are compact data carriers with built-in equals, hashCode, and toString. Why it matters: compact constructors let you validate data while keeping the class small.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: records are compact data carriers with built-in equals, hashCode, and toString. Why it matters: compact constructors let you validate data while keeping the class small.

**Rule**

👉 Rule: Concept: records are compact data carriers with built-in equals, hashCode, and toString.

**Try this**

- Concept: records are compact data carriers with built-in equals, hashCode, and toString.
