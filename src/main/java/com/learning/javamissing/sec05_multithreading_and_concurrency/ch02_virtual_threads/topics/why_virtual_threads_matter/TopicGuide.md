---
introduced: Java 21
status: final
runner: local
estimated: 9 min
---

# Why virtual threads matter

## Why virtual threads matter

**Concept**

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

- After reading this example, you should know:
- a virtual thread is still a Thread
- virtual threads are useful when tasks spend time waiting

**What stays stable**

- After reading this example, you should know: - a virtual thread is still a Thread - virtual threads are useful when tasks spend time waiting - they improve the cost model, not the business logic
- The example keeps the same Java shape while you vary one thing.

**What changes**

- After reading this example, you should know: - a virtual thread is still a Thread - virtual threads are useful when tasks spend time waiting - they improve the cost model, not the business logic
- That change is what reveals the behavior you need to understand.

**Why it matters**

After reading this example, you should know: - a virtual thread is still a Thread - virtual threads are useful when tasks spend time waiting - they improve the cost model, not the business logic

**Rule**

👉 Rule: After reading this example, you should know: - a virtual thread is still a Thread - virtual threads are useful when tasks spend time waiting - they improve the cost model, not the business logic

**Try this**

- Start one virtual thread. 2. Let it block in a simple style. 3. Compare the model with traditional expensive thread-per-task thinking.
