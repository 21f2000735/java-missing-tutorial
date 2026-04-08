package com.learning.javamissing.sec02_collections.ch02_maps_and_iterators_in_depth.topics.priority_queue_heap_internals;

import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

public class PriorityQueueHeapInternals {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.addAll(List.of(40, 10, 70, 20, 50));
        System.out.println("Concept: PriorityQueue is a min-heap by default.");
        System.out.println("min peek = " + minHeap.peek());
        System.out.println("min poll = " + minHeap.poll());

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
        maxHeap.addAll(List.of(40, 10, 70, 20, 50));
        System.out.println("max peek = " + maxHeap.peek());
        System.out.println("max poll = " + maxHeap.poll());

        PriorityQueue<Integer> top3 = new PriorityQueue<>();
        for (int value : List.of(8, 21, 3, 55, 13, 34)) {
            top3.offer(value);
            if (top3.size() > 3) {
                top3.poll();
            }
        }
        System.out.println("top3 heap = " + top3);
        System.out.println("Why it matters: add() and poll() are O(log n), which makes PriorityQueue good for top-K and scheduling problems.");
    }
}
