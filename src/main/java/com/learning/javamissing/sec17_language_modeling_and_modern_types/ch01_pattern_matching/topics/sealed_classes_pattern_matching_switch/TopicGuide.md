---
introduced: Java 21
status: stable
runner: embedded
estimated: 10 min
mode: interview
visual: recommended
---

# Sealed Classes + Pattern Matching Switch

## Topic / Problem
- Real problem: a result type can be success or failure, and you want the compiler to help cover every case.
- Why this Java feature: sealed classes plus pattern matching switch make result handling exhaustive.

Bad code:
```java
if (result instanceof PaymentSuccess) { ... }
else if (result instanceof PaymentFailure) { ... }
```
Good code:
```java
return switch (result) {
    case PaymentSuccess success -> ...
    case PaymentFailure failure -> ...
};
```

## Intuition
- A sealed hierarchy closes the set of subtypes.
- Pattern matching switch names the shape directly.
- Comparison table:

| Design | Benefit | Risk |
| --- | --- | --- |
| Open hierarchy | flexible | harder to reason about every case |
| Sealed hierarchy | exhaustive | less extension freedom |

## Small Code Snippet
- The runnable example switches between approved and declined payment results.
- Expected output:
  - `approved = ORD-77`
  - `declined = card-declined`

## Internal Working
- The compiler can check that all permitted subtypes are handled.
- Guards can refine the matching when a subtype has more than one meaningful branch.
- Trap callout: sealed classes are about controlled extension, not just "fancy inheritance."

## Comparison With Other
- Use sealed classes when the set of outcomes is known.
- Use open inheritance when outside code must add subtypes freely.
- Pattern matching switch is cleaner than a long `instanceof` chain.

## Famous Company Interview Question
Q: Why use a sealed class?
A: To close the hierarchy and make exhaustive handling easier.

Q: Why is pattern matching switch better than a long `if-else` chain?
A: It states the shape directly and is easier for the compiler to check.

Q: When is sealing a bad idea?
A: When third-party extension is a design goal.
