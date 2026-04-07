package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.collectors;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CollectorsTest {
    @Test
    void groupsAndCountsByCategory() {
        List<Collectors.Order> orders = List.of(
                new Collectors.Order("book", "education", 899),
                new Collectors.Order("pen", "education", 99),
                new Collectors.Order("mouse", "electronics", 1_599)
        );

        assertEquals(List.of("book", "pen"), Collectors.groupProductNamesByCategory(orders).get("education"));
        assertEquals(Map.of("education", 2L, "electronics", 1L), Collectors.countProductsByCategory(orders));
    }
}
