---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 8 min
mode: interview
visual: required
visual_asset: StackHeapReferencesVisual.svg
interviewQ:
  - question: Why does mutating one reference sometimes affect another variable?
    answer: Because both variables can hold references to the same heap object, so the mutation happens on shared state, not on the local variable itself.
  - question: What lives on the stack in a normal method call?
    answer: Local variable slots and primitive values for that frame; object instances themselves still live on the heap.
---

# Understanding Stack, Heap, And References

## Understanding Stack, Heap, And References

**Concept**

This step focuses on: local variable values and object state are not the same thing

local variable values and object state are not the same thing

**Example**

```java
    public static void main(String[] args) {
        System.out.println("Concept: local variable values and object state are not the same thing");
        System.out.println("Real-world problem: two variables point to the same cart object and one update surprises the learner.");
        System.out.println();

        Cart first = new Cart(2);
        Cart second = first;
        second.itemCount = 5;

        // Expected output:
        // first.itemCount = 5
        // second.itemCount = 5
        System.out.println("first.itemCount = " + first.itemCount);
        System.out.println("second.itemCount = " + second.itemCount);
        System.out.println("Why it works: both variables refer to the same heap object, so one mutation is visible through both references.");
    }
```

![Understanding Stack, Heap, And References visual](./StackHeapReferencesVisual.svg)

**What happens**

- two variables point to the same cart object and one update surprises the learner.

**What stays stable**

- local variable values and object state are not the same thing
- both variables refer to the same heap object, so one mutation is visible through both references.

**What changes**

- two variables point to the same cart object and one update surprises the learner.

**Why it matters**

both variables refer to the same heap object, so one mutation is visible through both references. two variables point to the same cart object and one update surprises the learner.

**Rule**

👉 Rule: both variables refer to the same heap object, so one mutation is visible through both references.

**Try this**

- Concept: local variable values and object state are not the same thing
- Real-world problem: two variables point to the same cart object and one update surprises the learner.
- Why it works: both variables refer to the same heap object, so one mutation is visible through both references.

- Next: compare this step with the next topic and notice what changes.
