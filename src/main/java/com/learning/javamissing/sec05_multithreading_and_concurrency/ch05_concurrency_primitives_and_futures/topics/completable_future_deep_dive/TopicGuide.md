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

- allOf = all parallel calls finished

**What stays stable**

- allOf = all parallel calls finished Why it matters: thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- allOf = all parallel calls finished Why it matters: thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.
- That change is what reveals the behavior you need to understand.

**Why it matters**

allOf = all parallel calls finished Why it matters: thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.

**Rule**

👉 Rule: allOf = all parallel calls finished Why it matters: thenApply maps a value, thenCompose flattens async work, and allOf/anyOf coordinate parallel calls.

**Try this**

- allOf = all parallel calls finished
