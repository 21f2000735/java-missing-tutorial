---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# PriorityQueue And Heap Internals

## Topic / Problem
- Real problem: keep the next smallest, largest, or top-K item ready to process.
- Why this Java feature: `PriorityQueue` gives fast access to the highest-priority element.

Bad code:
```java
List<Integer> numbers = new ArrayList<>();
Collections.sort(numbers);
```
Good code:
```java
PriorityQueue<Integer> queue = new PriorityQueue<>();
```

## Intuition
- Default `PriorityQueue` is a min-heap.
- A custom comparator turns it into a max-heap.
- Comparison table:

| Need | Structure | Complexity |
| --- | --- | --- |
| Next smallest | min-heap | `add()` / `poll()` = O(log n) |
| Next largest | max-heap | `add()` / `poll()` = O(log n) |
| Top-K stream | heap of size K | keeps only the best K values |

## Small Code Snippet
- The runnable example shows min-heap, max-heap, and top-3 tracking.
- Expected output:
  - min peek = `10`
  - max peek = `70`
  - top3 heap keeps the three largest values seen

## Internal Working
- The heap is stored in an array.
- Parent and child positions are computed by index math, not pointers.
- Trap callout: `PriorityQueue` does not fully sort all elements; it only guarantees the head has the highest priority.

## Comparison With Other
- `PriorityQueue` is better than sorting the whole list on every insert.
- `ArrayDeque` is for FIFO/LIFO work, not priority order.
- A sorted list is simpler to read but slower to maintain under repeated inserts.

## Famous Company Interview Question
Q: Why use a heap for top-K problems?
A: Because it keeps the most relevant K items without sorting the full stream.

Q: What is the default order of `PriorityQueue`?
A: Min-heap order.

Q: What is the complexity of `add()` and `poll()`?
A: O(log n).
