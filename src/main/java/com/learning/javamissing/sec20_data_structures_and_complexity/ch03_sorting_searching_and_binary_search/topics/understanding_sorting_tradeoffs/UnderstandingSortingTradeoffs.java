package com.learning.javamissing.sec20_data_structures_and_complexity.ch03_sorting_searching_and_binary_search.topics.understanding_sorting_tradeoffs;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Concept: Sorting tradeoffs
 * Why this concept is needed:
 * Sorting costs work upfront, so the decision is only good when later operations benefit from the order.
 *
 * What problem this solves:
 * It helps decide when paying sort cost now makes later reading, searching, or ranking easier.
 *
 * Real-world setup:
 * An invoice or order dashboard wants the cheapest items first.
 *
 * How to think about it:
 * Sorting is an investment: do extra work now so later operations become clearer or cheaper.
 *
 * How to code it:
 * 1. Start with unsorted business data.
 * 2. Sort by the business field that matters.
 * 3. Use the sorted order for a real decision such as cheapest-first reporting.
 *
 * Expected output:
 * cheapestOrder = ORD-1
 * sortedOrders = [Order[id=ORD-1, amountInCents=900], Order[id=ORD-2, amountInCents=1500], Order[id=ORD-3, amountInCents=2200]]
 */
public class UnderstandingSortingTradeoffs {
    public static void main(String[] args) {
        System.out.println("Concept: sorting tradeoff");
        System.out.println("Problem: paying sort cost only makes sense if later operations benefit.");
        System.out.println();

        List<Order> orders = new ArrayList<>(List.of(
                new Order("ORD-3", 2_200),
                new Order("ORD-1", 900),
                new Order("ORD-2", 1_500)
        ));
        orders.sort(Comparator.comparingInt(Order::amountInCents));

        // Expected output:
        // cheapestOrder = ORD-1
        // sortedOrders = [Order[id=ORD-1, amountInCents=900], Order[id=ORD-2, amountInCents=1500], Order[id=ORD-3, amountInCents=2200]]
        System.out.println("cheapestOrder = " + orders.getFirst().id());
        System.out.println("sortedOrders = " + orders);
        System.out.println("Why it works: the list is reordered once, then later operations can assume cheapest-first order.");
        System.out.println("Common mistake: sorting one-off data when you do not need ordered results afterward.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- sorting costs work upfront");
        System.out.println("- once data is sorted, later range checks or binary searches become easier");
        System.out.println("- compare by the business field you actually care about");
    }

    record Order(String id, int amountInCents) {}
}
