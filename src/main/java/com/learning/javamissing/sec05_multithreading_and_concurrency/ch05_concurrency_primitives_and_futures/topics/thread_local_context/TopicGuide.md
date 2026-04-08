---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
mode: interview
visual: recommended
---

# ThreadLocal

## ThreadLocal

**Concept**

Why it matters: each thread can carry request context without sharing mutable state.

**Example**

```java
    public static void main(String[] args) throws InterruptedException {
        Thread alice = new Thread(() -> runRequest("alice", "orders"));
        Thread bob = new Thread(() -> runRequest("bob", "payments"));

        alice.start();
        bob.start();
        alice.join();
        bob.join();

        System.out.println("Why it matters: each thread can carry request context without sharing mutable state.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- each thread can carry request context without sharing mutable state.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: each thread can carry request context without sharing mutable state.

**Try this**

- Why it matters: each thread can carry request context without sharing mutable state.
