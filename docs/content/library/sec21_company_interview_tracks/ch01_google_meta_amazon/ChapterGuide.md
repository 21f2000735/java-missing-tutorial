# Google, Meta, Amazon

## Learning Path

1. Step 1: Start with [idempotent reservations](topics/idempotent_reservations/IdempotentReservations.java) to see the raw behavior.
2. Step 2: Try [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java) to see the naive approach.
3. Step 3: Watch [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java) to find the failure.
4. Step 4: Use [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java) to restore correctness.
5. Step 5: Finish with [search autocomplete design](topics/search_autocomplete_design/SearchAutocompleteDesign.java) to see the improvement.

## Problem

Booking, checkout, and order systems are retried under network failure.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- idempotent reservations: Booking, checkout, and order systems are retried under network failure.
- latency debug playbook: Strong companies care how you debug production regressions, not just how you code fresh features.
- search autocomplete design: Product search suggestions must be fast, relevant, and easy to reason about under load.

## Fix

Run the topics in this order:

1. Run [idempotent reservations](topics/idempotent_reservations/IdempotentReservations.java)
2. Run [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java)
3. Run [search autocomplete design](topics/search_autocomplete_design/SearchAutocompleteDesign.java)

Example:

```java
    public static void main(String[] args) {
        List<ComponentLatency> baseline = List.of(
                new ComponentLatency("gateway", 22),
                new ComponentLatency("pricing-api", 40),
                new ComponentLatency("inventory-api", 35)
        );
        List<ComponentLatency> current = List.of(
                new ComponentLatency("gateway", 25),
                new ComponentLatency("pricing-api", 150),
                new ComponentLatency("inventory-api", 39)
        );

        Regression regression = findPrimaryRegression(baseline, current);

        // Expected output:
        // primaryRegression = pricing-api
        // latencyDeltaMs = 110
        System.out.println("primaryRegression = " + regression.component());
        System.out.println("latencyDeltaMs = " + regression.deltaMs());
        System.out.println("Why it works: the approach compares metrics first and guesses later.");
        System.out.println("Company lens: Google values methodical debugging and measurable reasoning.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- compare before and after before chasing symptoms");
        System.out.println("- isolate the biggest regression first");
        System.out.println("- good debugging answers mention rollback, metrics, and blast radius");
    }
```

What happens:

Why it matters:

Strong companies care how you debug production regressions, not just how you code fresh features.

## Improvement

Example:

```java
    public static void main(String[] args) {
        AutocompleteService service = new AutocompleteService(List.of(
                new Destination("paris", 98),
                new Destination("panaji", 84),
                new Destination("patna", 60),
                new Destination("pune", 75),
                new Destination("berlin", 88)
        ));

        System.out.println("Company lens: Google and Meta like answers that are simple, measurable, and scalable.");
        System.out.println("Problem: a user types 'pa' and expects useful suggestions fast.");
        List<String> suggestions = service.suggest("pa", 3);
        List<String> cachedSuggestions = service.suggest("pa", 3);

        // Expected output:
        // suggestions = [paris, panaji, patna]
        // cachedSuggestions = [paris, panaji, patna]
        System.out.println("suggestions = " + suggestions);
        System.out.println("cachedSuggestions = " + cachedSuggestions);
        System.out.println("Why it works: prefix filtering narrows candidates and popularity ranking orders them.");
        System.out.println("Metric to mention in interview: p95 suggestion latency and cache hit rate.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- retrieval and ranking are different concerns");
        System.out.println("- hot prefixes are worth caching");
        System.out.println("- autocomplete answers should mention latency and relevance together");
    }
```

What happens:

Why it matters:

Product search suggestions must be fast, relevant, and easy to reason about under load.

After this chapter, you should be able to explain why Google Meta Amazon exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [idempotent reservations](topics/idempotent_reservations/IdempotentReservations.java), [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java), and [search autocomplete design](topics/search_autocomplete_design/SearchAutocompleteDesign.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [idempotent reservations](topics/idempotent_reservations/IdempotentReservations.java) starts with the raw behavior, [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java) adds the safety rule, and [search autocomplete design](topics/search_autocomplete_design/SearchAutocompleteDesign.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Compare before and after metrics, identify the largest change, then narrow the blast radius.

## Try this

- Run [idempotent reservations](topics/idempotent_reservations/IdempotentReservations.java) and note the first thing that breaks.
- Run [latency debug playbook](topics/latency_debug_playbook/LatencyDebugPlaybook.java) and remove the safety rule or coordination step.
- Run [search autocomplete design](topics/search_autocomplete_design/SearchAutocompleteDesign.java) and compare the result with the naive approach.
