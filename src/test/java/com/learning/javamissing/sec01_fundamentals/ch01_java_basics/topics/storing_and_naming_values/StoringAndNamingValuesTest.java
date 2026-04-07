package com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.storing_and_naming_values;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StoringAndNamingValuesTest {
    @Test
    void calculatesRevenueInCents() {
        assertEquals(149_997, StoringAndNamingValues.calculateRevenueInCents(3, 49_999));
    }
}
