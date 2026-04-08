---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# GC Roots And Reference Types

## Topic / Problem
- Real problem: some objects stay alive longer than expected and memory usage climbs.
- Why this Java feature: GC roots and reference types explain what the collector can and cannot reclaim.

Bad code:
```java
static Map<String, Object> cache = new HashMap<>();
```
Good code:
```java
static Map<String, Object> cache = new WeakHashMap<>();
```

## Intuition
- GC roots are the starting points the collector can reach from.
- Strong references keep objects alive.
- Comparison table:

| Reference | Keeps object alive? | Typical use |
| --- | --- | --- |
| Strong | yes | normal object graph |
| Soft | maybe | memory-sensitive cache |
| Weak | no, once not strongly reachable | weak lookup / metadata |
| Phantom | no | cleanup bookkeeping |

## Small Code Snippet
- The runnable example prints the common GC roots and shows a weak reference / weak map example.
- Expected output:
  - `GC roots = local variable, active thread, static field, and JNI-style references.`
  - `weak map size = 1`

## Internal Working
- GC starts from roots and follows reachable references.
- Static collections, ThreadLocal state, and unclosed resources often create leaks by staying strongly reachable.
- Trap callout: a weak reference helps only if some other strong reference does not keep the object alive.

## Comparison With Other
- Strong references are simplest but easiest to leak.
- Weak references are useful for caches and metadata.
- Soft references are less predictable and should be used carefully.

## Famous Company Interview Question
Q: What are GC roots?
A: The objects and references the garbage collector starts from when checking reachability.

Q: Why use `WeakHashMap`?
A: To let entries disappear when their keys are no longer strongly reachable.

Q: What causes common memory leaks in Java?
A: Static collections, ThreadLocal misuse, and unclosed resources.
