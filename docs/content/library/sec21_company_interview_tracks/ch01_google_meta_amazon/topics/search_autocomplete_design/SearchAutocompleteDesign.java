package com.learning.javamissing.sec21_company_interview_tracks.ch01_google_meta_amazon.topics.search_autocomplete_design;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Concept: search autocomplete design
 * Why this concept is needed:
 * Product search suggestions must be fast, relevant, and easy to reason about under load.
 *
 * What problem this solves:
 * It shows how prefix filtering, popularity ranking, and hot-prefix caching work together.
 *
 * Real-world setup:
 * A travel search box suggests cities while a user types.
 *
 * How to think about it:
 * Separate candidate retrieval from ranking, then cache the prefixes users ask for most.
 *
 * How to code it:
 * 1. Filter destinations by prefix.
 * 2. Sort by popularity.
 * 3. Cache hot prefixes for repeated reads.
 *
 * Expected output:
 * suggestions = [paris, panaji, patna]
 * cachedSuggestions = [paris, panaji, patna]
 */
public class SearchAutocompleteDesign {
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

    record Destination(String name, int popularity) {}

    static final class AutocompleteService {
        private final List<Destination> destinations;
        private final Map<String, List<String>> cache = new java.util.HashMap<>();

        AutocompleteService(List<Destination> destinations) {
            this.destinations = destinations;
        }

        List<String> suggest(String prefix, int limit) {
            return cache.computeIfAbsent(prefix.toLowerCase(), key -> destinations.stream()
                    .filter(destination -> destination.name().startsWith(key))
                    .sorted(Comparator.comparingInt(Destination::popularity).reversed())
                    .limit(limit)
                    .map(Destination::name)
                    .collect(Collectors.toList()));
        }
    }
}
