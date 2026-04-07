package com.learning.javamissing.sec20_data_structures_and_complexity.ch03_sorting_searching_and_binary_search.topics.understanding_sorting_tradeoffs;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class UnderstandingSortingTradeoffs {
    public static void main(String[] args) {
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
        System.out.println("After reading this example, you should know:");
        System.out.println("- sorting costs work upfront");
        System.out.println("- once data is sorted, later range checks or binary searches become easier");
        System.out.println("- compare by the business field you actually care about");
    }

    record Order(String id, int amountInCents) {}
}
