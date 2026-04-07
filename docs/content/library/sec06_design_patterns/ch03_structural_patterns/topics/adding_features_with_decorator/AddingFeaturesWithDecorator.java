package com.learning.javamissing.sec06_design_patterns.ch03_structural_patterns.topics.adding_features_with_decorator;

public class AddingFeaturesWithDecorator {
    public static void main(String[] args) {
        Notifier baseNotifier = new EmailNotifier();
        Notifier notifier = new AuditNotifierDecorator(baseNotifier);

        // Expected output:
        // AUDIT: sending notification
        // EMAIL: order shipped
        notifier.send("order shipped");
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
