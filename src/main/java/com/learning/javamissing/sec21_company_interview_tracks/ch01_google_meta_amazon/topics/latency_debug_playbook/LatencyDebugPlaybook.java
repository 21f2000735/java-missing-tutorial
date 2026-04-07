package com.learning.javamissing.sec21_company_interview_tracks.ch01_google_meta_amazon.topics.latency_debug_playbook;

import java.util.Comparator;
import java.util.List;

/**
 * Concept: latency debug playbook
 * Why this concept is needed:
 * Strong companies care how you debug production regressions, not just how you code fresh features.
 *
 * What problem this solves:
 * It shows a disciplined way to find the likely bottleneck instead of guessing.
 *
 * Real-world setup:
 * A checkout service got slower after a new release.
 *
 * How to think about it:
 * Compare before and after metrics, identify the largest change, then narrow the blast radius.
 *
 * How to code it:
 * 1. Model component timings.
 * 2. Compare baselines with the new release.
 * 3. Inspect the largest regression first.
 *
 * Expected output:
 * primaryRegression = pricing-api
 * latencyDeltaMs = 110
 */
public class LatencyDebugPlaybook {
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

    record ComponentLatency(String component, int averageMs) {}
    record Regression(String component, int deltaMs) {}

    static Regression findPrimaryRegression(List<ComponentLatency> baseline, List<ComponentLatency> current) {
        return current.stream()
                .map(now -> new Regression(
                        now.component(),
                        now.averageMs() - baseline.stream()
                                .filter(old -> old.component().equals(now.component()))
                                .findFirst()
                                .orElseThrow()
                                .averageMs()
                ))
                .max(Comparator.comparingInt(Regression::deltaMs))
                .orElseThrow();
    }
}
