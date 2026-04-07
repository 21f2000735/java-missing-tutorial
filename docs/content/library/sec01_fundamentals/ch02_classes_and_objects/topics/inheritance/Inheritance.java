package com.learning.javamissing.sec01_fundamentals.ch02_classes_and_objects.topics.inheritance;

/**
 * Concept: Inheritance
 * Why this concept is needed:
 * Java programs stay useful when they are organized around ideas, not only syntax.
 *
 * What problem this solves:
 * real programs organize data and behavior into understandable units.
 *
 * Real-world setup:
 * This topic uses student, vehicle, and notification models to make the concept easier to understand.
 *
 * How to think about it:
 * First understand the problem in plain language, then map that idea to the Java code.
 *
 * How to code it:
 * 1. Identify the business data or behavior.
 * 2. Choose the Java construct that expresses the idea clearly.
 * 3. Run the example and compare the output with the explanation.
 *
 * Expected output:
 * Read the inline comments and printed lines in main() to see the expected behavior.
 */

public class Inheritance {
    public static void main(String[] args) {
        Vehicle bike = new Bike("Road Bike");
        Vehicle car = new Car("City Car");
        System.out.println(bike.describe());
        System.out.println(car.describe());
        System.out.println("Lesson: subclasses reuse common state and specialize behavior.");
    }

    private static class Vehicle {
        private final String model;

        private Vehicle(String model) {
            this.model = model;
        }

        String describe() {
            return "Vehicle: " + model;
        }
    }

    private static final class Bike extends Vehicle {
        private Bike(String model) {
            super(model);
        }

        @Override
        String describe() {
            return "Bike ready for short trips";
        }
    }

    private static final class Car extends Vehicle {
        private Car(String model) {
            super(model);
        }

        @Override
        String describe() {
            return "Car ready for family travel";
        }
    }
}
