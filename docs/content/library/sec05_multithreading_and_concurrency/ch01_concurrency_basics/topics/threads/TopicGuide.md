---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
---

# Threads

## Threads

**Concept**

Concurrency starts with one hard fact: two units of work can overlap in time.

**Example**

```java
    public static void main(String[] args) throws InterruptedException {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        exercise();
        solution();
    }
```

**What happens**

- A thread can run a small task independently.
- You want one task to run independently, but once tasks overlap, execution order and shared state both matter.
- threads let work overlap in time

**What stays stable**

- start() creates a new thread; run() is just a normal method call
- threads let work overlap in time

**What changes**

- You want one task to run independently, but once tasks overlap, execution order and shared state both matter.
- calling run() directly and expecting a new thread

**Why it matters**

you are learning the execution model or showing a tiny one-off demo. synchronized protects the shared counter.

**Rule**

👉 Rule: start() creates a new thread; run() is just a normal method call

**Try this**

- Start one background task. 2. Wait with join() when you need the task finished. 3. Notice how shared mutable state changes the design problem.
