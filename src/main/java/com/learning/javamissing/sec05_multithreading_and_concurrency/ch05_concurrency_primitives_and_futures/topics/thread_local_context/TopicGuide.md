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

- Why it matters: each thread can carry request context without sharing mutable state.

**What stays stable**

- Why it matters: each thread can carry request context without sharing mutable state.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Why it matters: each thread can carry request context without sharing mutable state.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Why it matters: each thread can carry request context without sharing mutable state.

**Rule**

👉 Rule: Why it matters: each thread can carry request context without sharing mutable state.

**Try this**

- Why it matters: each thread can carry request context without sharing mutable state.
