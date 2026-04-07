package com.learning.javamissing.sec06_design_patterns.ch02_creational_patterns.topics.assembling_objects_with_builder;

/**
 * Concept: Builder pattern
 * Why this concept is needed:
 * Constructors become hard to read when required and optional values mix together.
 *
 * What problem this solves:
 * It makes object creation readable when many optional settings exist.
 *
 * Real-world setup:
 * A reporting feature builds a request with optional email delivery, chart generation, and row limits.
 *
 * How to think about it:
 * The builder gathers choices step by step, then creates one final immutable result.
 *
 * How to code it:
 * 1. Keep required fields in the builder constructor.
 * 2. Add methods for optional settings.
 * 3. Build the final immutable object at the end.
 *
 * Expected output:
 * request = ReportRequest[name=sales-summary, email=ops@example.com, includeCharts=true, limit=50]
 */
public class AssemblingObjectsWithBuilder {
    public static void main(String[] args) {
        System.out.println("Concept: builder");
        System.out.println("Story hook: reporting options keep growing, and the constructor call is turning into a guessing game.");
        System.out.println("Problem: a report request has required and optional fields, and the call should stay readable.");
        System.out.println("Mental model: optional choices should read like named decisions, not positional guessing.");
        System.out.println();

        ReportRequest request = new ReportRequest.Builder("sales-summary")
                .email("ops@example.com")
                .includeCharts(true)
                .limit(50)
                .build();

        // Expected output:
        // request = ReportRequest[name=sales-summary, email=ops@example.com, includeCharts=true, limit=50]
        System.out.println("request = " + request);
        System.out.println("Why it works: each optional decision is named, so the call remains readable when fields grow.");
        System.out.println("Use this when: an object has a few required values and several optional settings that should stay readable.");
        System.out.println("Avoid this when: the object has only a small obvious constructor and the builder would add ceremony.");
        System.out.println("Common mistake: using a builder for tiny objects that only need one or two obvious values.");
        System.out.println("Watch out: a builder should protect readability, not become a second mutable domain object that floats around everywhere.");
        System.out.println("Try this next: add an exportFormat option and see that the call site still reads like a checklist.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- builders make optional settings explicit");
        System.out.println("- builders avoid long constructor calls full of positional arguments");
        System.out.println("- small immutable result objects stay easy to reason about");
    }

    record ReportRequest(String name, String email, boolean includeCharts, int limit) {
        static final class Builder {
            private final String name;
            private String email = "not-set@example.com";
            private boolean includeCharts;
            private int limit = 10;

            Builder(String name) {
                this.name = name;
            }

            Builder email(String email) {
                this.email = email;
                return this;
            }

            Builder includeCharts(boolean includeCharts) {
                this.includeCharts = includeCharts;
                return this;
            }

            Builder limit(int limit) {
                this.limit = limit;
                return this;
            }

            ReportRequest build() {
                return new ReportRequest(name, email, includeCharts, limit);
            }
        }
    }
}
