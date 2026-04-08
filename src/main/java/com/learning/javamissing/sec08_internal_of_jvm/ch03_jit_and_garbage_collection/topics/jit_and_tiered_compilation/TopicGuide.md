---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# JIT Compilation And Tiered Compilation

## JIT Compilation And Tiered Compilation

**Concept**

Concept: hot methods get optimized by the JIT over time.

**Example**

```java
    public static void main(String[] args) {
        long sum = 0;
        for (int i = 0; i < 100_000; i++) {
            sum += hotMethod(i);
        }
        System.out.println("Concept: hot methods get optimized by the JIT over time.");
        System.out.println("sum = " + sum);
        System.out.println("Use -XX:+PrintCompilation to observe compilation decisions when needed.");
        System.out.println("Why it matters: tiered compilation moves from interpreted code to faster compiled code for hot paths.");
    }
```

**What happens**

- Concept: hot methods get optimized by the JIT over time.
- Use -XX:+PrintCompilation to observe compilation decisions when needed.

**What stays stable**

- Concept: hot methods get optimized by the JIT over time. Use -XX:+PrintCompilation to observe compilation decisions when needed.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: hot methods get optimized by the JIT over time. Use -XX:+PrintCompilation to observe compilation decisions when needed.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: hot methods get optimized by the JIT over time. Use -XX:+PrintCompilation to observe compilation decisions when needed.

**Rule**

👉 Rule: Concept: hot methods get optimized by the JIT over time.

**Try this**

- Concept: hot methods get optimized by the JIT over time.
- Use -XX:+PrintCompilation to observe compilation decisions when needed.
