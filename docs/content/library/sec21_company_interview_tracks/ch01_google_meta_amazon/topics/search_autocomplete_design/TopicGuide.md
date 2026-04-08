---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# search autocomplete design

## Why This Exists

Concept: search autocomplete design.

Product search suggestions must be fast, relevant, and easy to reason about under load.

## The Pain Before It

It shows how prefix filtering, popularity ranking, and hot-prefix caching work together.

A travel search box suggests cities while a user types.

## Java Creator Mindset

Separate candidate retrieval from ranking, then cache the prefixes users ask for most.

## How You Might Invent It

1. Filter destinations by prefix.
2. Sort by popularity.
3. Cache hot prefixes for repeated reads.

## Naive Attempt

The naive version is to use search autocomplete design without checking what rule it is supposed to protect.

## Why It Breaks

It shows how prefix filtering, popularity ranking, and hot-prefix caching work together.

Edge cases usually show the bug first.

## Final Java Solution

Separate candidate retrieval from ranking, then cache the prefixes users ask for most.

Run [SearchAutocompleteDesign.java](SearchAutocompleteDesign.java) as the source of truth for the example.

## Code

Run [SearchAutocompleteDesign.java](SearchAutocompleteDesign.java) and compare the output with the explanation below.

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

## Walkthrough

1. Filter destinations by prefix.
2. Sort by popularity.
3. Cache hot prefixes for repeated reads.

What to observe:

- suggestions = [paris, panaji, patna]
- cachedSuggestions = [paris, panaji, patna]

## Mental Model

- What rule is being enforced?
- What changes when you change one input?
- What does the output prove about the rule?

## Mistakes

- reading search autocomplete design as syntax instead of a rule
- changing more than one thing at once
- skipping the runnable file and only reading the prose

## Tradeoffs

The gain is clarity or correctness.

The cost is usually one more rule, one more API, or one more concept to remember.

## Use / Avoid

Use it when the problem in the header comment matches the real code you are writing.

Avoid it when a simpler loop, local variable, or direct call already expresses the rule clearly.

## Practice

Change one line in [SearchAutocompleteDesign.java](SearchAutocompleteDesign.java), rerun it, and write down what changed before and after the edit.

## Summary

After this topic, you should be able to explain why search autocomplete design exists, what problem it solves, and what the runnable file proves.
