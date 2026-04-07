package com.learning.javamissing.sec08_internal_of_jvm.ch01_memory_and_execution_basics.topics.understanding_stack_heap_and_references;

public class UnderstandingStackHeapAndReferences {
    public static void main(String[] args) {
        System.out.println("Concept: local variable values and object state are not the same thing");
        System.out.println("Real-world problem: two variables point to the same cart object and one update surprises the learner.");
        System.out.println();

        Cart first = new Cart(2);
        Cart second = first;
        second.itemCount = 5;

        // Expected output:
        // first.itemCount = 5
        // second.itemCount = 5
        System.out.println("first.itemCount = " + first.itemCount);
        System.out.println("second.itemCount = " + second.itemCount);
        System.out.println("Why it works: both variables refer to the same heap object, so one mutation is visible through both references.");
    }

    static final class Cart {
        int itemCount;

        Cart(int itemCount) {
            this.itemCount = itemCount;
        }
    }
}
