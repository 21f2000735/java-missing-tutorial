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

hot methods get optimized by the JIT over time.

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

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- hot methods get optimized by the JIT over time.
- tiered compilation moves from interpreted code to faster compiled code for hot paths.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: tiered compilation moves from interpreted code to faster compiled code for hot paths.

**Try this**

- Concept: hot methods get optimized by the JIT over time.
- Use -XX:+PrintCompilation to observe compilation decisions when needed.
