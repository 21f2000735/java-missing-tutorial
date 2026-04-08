---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
---

# search autocomplete design

## search autocomplete design

**Concept**

This step focuses on: Product search suggestions must be fast, relevant, and easy to reason about under load.

Product search suggestions must be fast, relevant, and easy to reason about under load.

**Example**

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

**What happens**

- retrieval and ranking are different concerns

**What stays stable**

- retrieval and ranking are different concerns
- prefix filtering narrows candidates and popularity ranking orders them.

**What changes**

- It shows how prefix filtering, popularity ranking, and hot-prefix caching work together.

**Why it matters**

prefix filtering narrows candidates and popularity ranking orders them.

**Rule**

👉 Rule: retrieval and ranking are different concerns

**Try this**

- Filter destinations by prefix. 2. Sort by popularity. 3. Cache hot prefixes for repeated reads.

- Next: compare this step with the next topic and notice what changes.
