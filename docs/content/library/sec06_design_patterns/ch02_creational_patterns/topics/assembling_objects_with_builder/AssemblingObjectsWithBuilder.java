package com.learning.javamissing.sec06_design_patterns.ch02_creational_patterns.topics.assembling_objects_with_builder;

public class AssemblingObjectsWithBuilder {
    public static void main(String[] args) {
        System.out.println("Concept: builder");
        System.out.println("Problem: a report request has required and optional fields, and the call should stay readable.");
        System.out.println();

        ReportRequest request = new ReportRequest.Builder("sales-summary")
                .email("ops@example.com")
                .includeCharts(true)
                .limit(50)
                .build();

        // Expected output:
        // request = ReportRequest[name=sales-summary, email=ops@example.com, includeCharts=true, limit=50]
        System.out.println("request = " + request);
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
