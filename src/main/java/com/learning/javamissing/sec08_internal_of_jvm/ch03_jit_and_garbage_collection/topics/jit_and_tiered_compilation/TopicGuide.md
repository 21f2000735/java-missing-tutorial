---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# JIT Compilation And Tiered Compilation

## Topic / Problem
- Real problem: the same code runs many times and should get faster once it becomes hot.
- Why this Java feature: the JVM can optimize frequently used methods at runtime.

Bad code:
```java
// assume every method always runs at the same speed
```
Good code:
```java
// let the JVM profile hot methods and optimize them
```

## Intuition
- The JVM starts by interpreting code.
- Hot code can move through compilation tiers.
- Comparison table:

| Stage | Role | What it means |
| --- | --- | --- |
| Interpreted | baseline execution | simplest startup path |
| C1 | client compilation | quick optimization |
| C2 | server compilation | deeper optimization |

## Small Code Snippet
- The runnable example calls one method many times and prints the final sum.
- Expected output:
  - `sum = 299995`
  - and a note to use `-XX:+PrintCompilation`

## Internal Working
- Hot methods are detected by profiling counters.
- The JIT may inline, unroll, or apply escape analysis.
- Trap callout: warm-up matters. A microbenchmark can look slow before the JIT has enough profile data.

## Comparison With Other
- Interpreted code is simpler to start.
- JIT-compiled hot code is faster after warm-up.
- Tiered compilation balances startup and peak performance.

## Famous Company Interview Question
Q: Why can Java get faster while the program is running?
A: Because the JIT compiles hot code paths at runtime.

Q: What is tiered compilation?
A: A staged optimization pipeline from interpreted code to faster compiled code.

Q: Why do benchmarks need warm-up?
A: Because the JIT needs time to detect hot methods.
