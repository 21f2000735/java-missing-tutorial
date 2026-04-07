package com.learning.javamissing.sec06_design_patterns.ch03_structural_patterns.topics.adding_features_with_decorator;

/**
 * Concept: Decorator pattern
 * Why this concept is needed:
 * Stable code often needs extra behavior without being rewritten for each new feature.
 *
 * What problem this solves:
 * It adds behavior around an object while keeping the same public interface.
 *
 * Real-world setup:
 * A notification service needs auditing around an existing email notifier.
 *
 * How to think about it:
 * Wrap the original object, do extra work before or after, then delegate.
 *
 * How to code it:
 * 1. Keep one shared interface.
 * 2. Create a base decorator that delegates.
 * 3. Add focused decorators for extra behavior.
 *
 * Expected output:
 * AUDIT: sending notification
 * EMAIL: order shipped
 */
public class AddingFeaturesWithDecorator {
    public static void main(String[] args) {
        System.out.println("Concept: decorator");
        System.out.println("Problem: add auditing without changing the stable email notifier.");
        System.out.println();

        Notifier baseNotifier = new EmailNotifier();
        Notifier notifier = new AuditNotifierDecorator(baseNotifier);

        // Expected output:
        // AUDIT: sending notification
        // EMAIL: order shipped
        notifier.send("order shipped");
        System.out.println("Why it works: the wrapped object keeps the same interface, so callers do not change.");
        System.out.println("Common mistake: using inheritance for every add-on feature and creating a class explosion.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- decorator keeps the same interface");
        System.out.println("- new behavior wraps the original behavior");
        System.out.println("- this avoids modifying the base class for every extra feature");
    }

    interface Notifier {
        void send(String message);
    }

    static final class EmailNotifier implements Notifier {
        @Override
        public void send(String message) {
            System.out.println("EMAIL: " + message);
        }
    }

    static class NotifierDecorator implements Notifier {
        private final Notifier delegate;

        NotifierDecorator(Notifier delegate) {
            this.delegate = delegate;
        }

        @Override
        public void send(String message) {
            delegate.send(message);
        }
    }

    static final class AuditNotifierDecorator extends NotifierDecorator {
        AuditNotifierDecorator(Notifier delegate) {
            super(delegate);
        }

        @Override
        public void send(String message) {
            System.out.println("AUDIT: sending notification");
            super.send(message);
        }
    }
}
