package com.learning.javamissing.sec05_multithreading_and_concurrency.ch05_concurrency_primitives_and_futures.topics.completable_future_deep_dive;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class CompletableFutureDeepDive {
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

    private static String slow(String value) {
        try {
            TimeUnit.MILLISECONDS.sleep(20);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
        }
        return value;
    }
}
