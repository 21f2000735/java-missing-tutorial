---
introduced: Java 8
status: stable
runner: embedded
estimated: 12 min
mode: interview
visual: recommended
---

# CompletableFuture Deep Dive

## CompletableFuture Deep Dive

**Concept**

allOf = all parallel calls finished Why it matters: thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.

**Example**

```java
    public static void main(String[] args) {
        CompletableFuture<String> user = CompletableFuture.supplyAsync(() -> slow("user-42"));
        CompletableFuture<String> profile = user.thenApply(id -> "profile for " + id);
        CompletableFuture<String> orderFlow = user.thenCompose(id -> CompletableFuture.supplyAsync(() -> slow("orders for " + id)));

        CompletableFuture<Void> all = CompletableFuture.allOf(
                CompletableFuture.supplyAsync(() -> slow("inventory")),
                CompletableFuture.supplyAsync(() -> slow("payment"))
        );

        CompletableFuture<String> fallback = CompletableFuture
                .supplyAsync(() -> { throw new IllegalStateException("api down"); })
                .exceptionally(error -> "fallback-response");

        System.out.println("thenApply = " + profile.join());
        System.out.println("thenCompose = " + orderFlow.join());
        all.join();
        System.out.println("allOf = all parallel calls finished");
        System.out.println("exceptionally = " + fallback.join());

        CompletableFuture<Object> first = CompletableFuture.anyOf(
                CompletableFuture.supplyAsync(() -> slow("fast api")),
                CompletableFuture.supplyAsync(() -> slow("slow api"))
        );
        System.out.println("anyOf = " + first.join());
        System.out.println("Why it matters: thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.

**Try this**

- allOf = all parallel calls finished
