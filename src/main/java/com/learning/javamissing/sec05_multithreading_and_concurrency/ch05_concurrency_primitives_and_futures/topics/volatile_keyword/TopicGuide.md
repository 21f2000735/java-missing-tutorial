---
introduced: Java 5
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# Volatile Keyword

## Volatile Keyword

**Concept**

worker observed shutdown = true Why it matters: volatile gives visibility, but AtomicInteger is still needed for atomic updates.

**Example**

```java
    public static void main(String[] args) {
        try {
            Thread worker = new Thread(() -> {
                while (!shutdownRequested) {
                    // wait for the visible stop signal
                }
                System.out.println("worker observed shutdown = true");
            });

            worker.start();
            Thread.sleep(20);
            shutdownRequested = true;
            worker.join();

            AtomicInteger processed = new AtomicInteger();
            Thread first = new Thread(() -> repeat(1000, processed));
            Thread second = new Thread(() -> repeat(1000, processed));
            first.start();
            second.start();
            first.join();
            second.join();

            System.out.println("AtomicInteger count = " + processed.get());
            System.out.println("singleton hash = " + getInstance().hashCode());
            System.out.println("same singleton hash = " + getInstance().hashCode());
            System.out.println("Why it matters: volatile gives visibility, but AtomicInteger is still needed for atomic updates.");
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
        }
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- volatile gives visibility, but AtomicInteger is still needed for atomic updates.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: volatile gives visibility, but AtomicInteger is still needed for atomic updates.

**Try this**

- worker observed shutdown = true
