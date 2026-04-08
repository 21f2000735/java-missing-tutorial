---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# PriorityQueue And Heap Internals

## PriorityQueue And Heap Internals

**Concept**

PriorityQueue is a min-heap by default.

**Example**

```java
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.addAll(List.of(40, 10, 70, 20, 50));
        System.out.println("Concept: PriorityQueue is a min-heap by default.");
        System.out.println("min peek = " + minHeap.peek());
        System.out.println("min poll = " + minHeap.poll());

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
        maxHeap.addAll(List.of(40, 10, 70, 20, 50));
        System.out.println("max peek = " + maxHeap.peek());
        System.out.println("max poll = " + maxHeap.poll());

        PriorityQueue<Integer> top3 = new PriorityQueue<>();
        for (int value : List.of(8, 21, 3, 55, 13, 34)) {
            top3.offer(value);
            if (top3.size() > 3) {
                top3.poll();
            }
        }
        System.out.println("top3 heap = " + top3);
        System.out.println("Why it matters: add() and poll() are O(log n), which makes PriorityQueue good for top-K and scheduling problems.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- PriorityQueue is a min-heap by default.
- add() and poll() are O(log n), which makes PriorityQueue good for top-K and scheduling problems.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: add() and poll() are O(log n), which makes PriorityQueue good for top-K and scheduling problems.

**Try this**

- Concept: PriorityQueue is a min-heap by default.
