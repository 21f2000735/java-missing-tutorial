package com.learning.javamissing.sec02_collections.ch01_collections.topics.comparator;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ComparatorTest {
    @Test
    void sortsByPriceThenName() {
        List<Comparator.Product> products = new ArrayList<>(List.of(
                new Comparator.Product("Mouse", 1_599),
                new Comparator.Product("Keyboard", 2_499),
                new Comparator.Product("Notebook", 199),
                new Comparator.Product("Adapter", 1_599)
        ));

        Comparator.sortProductsByPriceThenName(products);

        assertEquals("Notebook", products.getFirst().name());
        assertEquals("Adapter", products.get(1).name());
        assertEquals("Mouse", products.get(2).name());
    }
}
