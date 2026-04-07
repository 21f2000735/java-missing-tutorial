package com.learning.javamissing.sec06_design_patterns.ch04_behavioral_patterns.topics.publishing_updates_with_observer;

import java.util.ArrayList;
import java.util.List;

/**
 * Concept: Observer pattern
 * Why this concept is needed:
 * One event often needs to notify many independent listeners.
 *
 * What problem this solves:
 * It lets a publisher broadcast updates without knowing every listener's concrete type.
 *
 * Real-world setup:
 * A shipping update should notify email, SMS, and analytics listeners.
 *
 * How to think about it:
 * The publisher owns the event; listeners subscribe to react when that event happens.
 *
 * How to code it:
 * 1. Define the listener contract.
 * 2. Let listeners subscribe to the publisher.
 * 3. Notify all listeners when the event occurs.
 *
 * Expected output:
 * EMAIL listener -> Order 42 shipped
 * SMS listener -> Order 42 shipped
 */
public class PublishingUpdatesWithObserver {
    public static void main(String[] args) {
        System.out.println("Concept: observer");
        System.out.println("Problem: one shipping event should notify more than one listener.");
        System.out.println();

        ShipmentStatusPublisher publisher = new ShipmentStatusPublisher();
        publisher.subscribe(message -> System.out.println("EMAIL listener -> " + message));
        publisher.subscribe(message -> System.out.println("SMS listener -> " + message));

        // Expected output:
        // EMAIL listener -> Order 42 shipped
        // SMS listener -> Order 42 shipped
        publisher.publish("Order 42 shipped");
        System.out.println("Why it works: the publisher knows only the listener contract, not concrete listener classes.");
        System.out.println("Common mistake: letting listeners become so tightly coupled that observer turns into hidden control flow.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- one event can notify many listeners");
        System.out.println("- the publisher does not need to know each listener's concrete type");
        System.out.println("- observer fits event-style updates");
    }

    interface ShipmentListener {
        void onStatusChanged(String message);
    }

    static final class ShipmentStatusPublisher {
        private final List<ShipmentListener> listeners = new ArrayList<>();

        void subscribe(ShipmentListener listener) {
            listeners.add(listener);
        }

        void publish(String message) {
            for (ShipmentListener listener : listeners) {
                listener.onStatusChanged(message);
            }
        }
    }
}
