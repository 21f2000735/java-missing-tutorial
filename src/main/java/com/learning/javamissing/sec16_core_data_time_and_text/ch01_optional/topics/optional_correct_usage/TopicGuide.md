---
introduced: Java 8
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Optional Correct Usage

## Topic / Problem
- Real problem: a lookup can miss, but `null` makes that absence easy to forget.
- Why this Java feature: `Optional` makes the missing case explicit in the return type.

Bad code:
```java
Optional<String> email = Optional.empty();
String value = email.get();
```
Good code:
```java
String value = email.orElseGet(() -> "missing");
```

## Intuition
- `Optional` is a wrapper around "maybe a value."
- `of()` requires a real value.
- `ofNullable()` accepts a possible null.
- Comparison table:

| Need | Use | Why |
| --- | --- | --- |
| Present value | `Optional.of(...)` | fail fast if null sneaks in |
| Maybe missing value | `Optional.ofNullable(...)` | safe conversion |
| Default fallback | `orElseGet(...)` | compute lazily |

## Small Code Snippet
- The runnable example prints a customer email fallback and a required order amount.
- Expected output:
  - `email = alice@example.com`
  - `amount = 499`

## Internal Working
- `map()` transforms the wrapped value.
- `flatMap()` is useful when the mapping function already returns an `Optional`.
- Trap callout: do not use `Optional.get()` without checking or handling absence first.

## Comparison With Other
- `Optional` is good for return values that may be absent.
- A plain null return is easier to forget.
- A field or parameter of type `Optional` usually adds noise rather than clarity.

## Famous Company Interview Question
Q: Where should `Optional` be used?
A: Mostly as a return type for values that may be missing.

Q: Why is `orElseGet()` better than `orElse()` in some cases?
A: Because `orElseGet()` computes the fallback only when needed.

Q: Why not use `Optional` as a field?
A: Because fields should usually carry the actual value or a clear nullability rule.
