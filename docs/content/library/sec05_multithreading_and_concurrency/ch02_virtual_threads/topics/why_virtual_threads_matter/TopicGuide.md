---
introduced: Java 21
status: final
runner: local
estimated: 9 min
---

# Why virtual threads matter

## Why virtual threads matter

**Concept**

This step focuses on: Waiting-heavy systems need a cheaper way to express many concurrent tasks.

Waiting-heavy systems need a cheaper way to express many concurrent tasks.

**Example**

```java
    public static void main(String[] args) throws InterruptedException {
        explainWhy();
        wrongMentalModel();
        runBlockingTaskExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a virtual thread is still a Thread");
        System.out.println("- virtual threads are useful when tasks spend time waiting");
        System.out.println("- they improve the cost model, not the business logic");
    }
```

**What happens**

- Many requests mostly wait on I/O, but traditional thread-per-task models become expensive.
- a virtual thread is still a Thread

**What stays stable**

- a virtual thread is still a Thread
- the code stays simple and blocking-style, but the thread is lightweight.

**What changes**

- Many requests mostly wait on I/O, but traditional thread-per-task models become expensive.
- assuming virtual threads make every workload faster

**Why it matters**

tasks mostly wait on external systems. the code stays simple and blocking-style, but the thread is lightweight.

**Rule**

👉 Rule: a virtual thread is still a Thread

**Try this**

- Start one virtual thread. 2. Let it block in a simple style. 3. Compare the model with traditional expensive thread-per-task thinking.

- Next: compare this step with the next topic and notice what changes.
