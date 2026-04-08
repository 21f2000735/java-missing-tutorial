---
introduced: Java 8
status: stable
runner: embedded
estimated: 12 min
mode: interview
visual: recommended
---

# CompletableFuture Deep Dive

## Topic / Problem
- Real problem: an API call fans out to several services and you want to join the results cleanly.
- Why this Java feature: `CompletableFuture` lets you compose async workflows instead of nesting callbacks.

Bad code:
```java
fetchUser(userId).thenApply(id -> fetchOrders(id));
```
Good code:
```java
fetchUser(userId).thenCompose(id -> fetchOrders(id));
```

## Intuition
- `thenApply` is like mapping one value to another value.
- `thenCompose` is like flattening a future-of-a-future.
- Comparison table:

| Operation | Analogy | Result |
| --- | --- | --- |
| `thenApply` | map | wraps the new value |
| `thenCompose` | flatMap | flattens nested futures |
| `allOf` | join all | waits for every task |
| `anyOf` | race | returns the first result |

## Small Code Snippet
- The runnable example joins user, profile, orders, and fallback work.
- Expected output:
  - `thenApply = profile for user-42`
  - `thenCompose = orders for user-42`
  - `allOf = all parallel calls finished`
  - `exceptionally = fallback-response`

## Internal Working
- `CompletableFuture` helps represent a result that may arrive later.
- `allOf()` waits for all futures; `anyOf()` returns the first completed result.
- Trap callout: use `thenCompose` when the callback already returns a `CompletableFuture`; otherwise you get nested futures.

## Comparison With Other
- `CompletableFuture` is better than manually joining threads for request fan-out.
- `ExecutorService` schedules work, but `CompletableFuture` composes the results.
- `handle()` and `exceptionally()` are the main recovery hooks.

## Famous Company Interview Question
Q: What is the difference between `thenApply` and `thenCompose`?
A: `thenApply` maps a value; `thenCompose` flattens an async stage.

Q: When would you use `allOf`?
A: When you need to wait for every parallel API call to finish.

Q: When would you use `exceptionally` or `handle`?
A: When the pipeline needs a fallback or recovery path.
