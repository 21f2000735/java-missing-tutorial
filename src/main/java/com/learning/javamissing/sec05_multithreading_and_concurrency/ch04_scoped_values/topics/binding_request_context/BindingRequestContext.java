package com.learning.javamissing.sec05_multithreading_and_concurrency.ch04_scoped_values.topics.binding_request_context;

public class BindingRequestContext {
    private static final java.lang.ScopedValue<String> REQUEST_ID = java.lang.ScopedValue.newInstance();

    public static void main(String[] args) {
        explainWhy();
        java.lang.ScopedValue.where(REQUEST_ID, "req-2026-04-07").run(BindingRequestContext::handleRequest);
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a bound value is visible only inside the chosen scope");
        System.out.println("- this fits request ids and trace ids well");
        System.out.println("- explicit scope is the safety feature");
    }

    private static void explainWhy() {
        System.out.println("Concept: binding a value for one request");
        System.out.println("Real-world problem: the same request id should appear in controller, service, and repository logs.");
        System.out.println("Mental model: bind once at the top of the request and read below.");
        System.out.println();
    }

    private static void handleRequest() {
        // Expected output:
        // requestId = req-2026-04-07
        System.out.println("requestId = " + REQUEST_ID.get());
        System.out.println("Why it works: the binding travels through this call path without becoming shared global state.");
    }
}
