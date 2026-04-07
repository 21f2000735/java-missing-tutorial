package com.learning.javamissing.sec06_design_patterns.ch04_behavioral_patterns.topics.publishing_updates_with_observer;

import java.util.ArrayList;
import java.util.List;

public class PublishingUpdatesWithObserver {
    public static void main(String[] args) {
        ShipmentStatusPublisher publisher = new ShipmentStatusPublisher();
        publisher.subscribe(message -> System.out.println("EMAIL listener -> " + message));
        publisher.subscribe(message -> System.out.println("SMS listener -> " + message));

        // Expected output:
        // EMAIL listener -> Order 42 shipped
        // SMS listener -> Order 42 shipped
        publisher.publish("Order 42 shipped");
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
