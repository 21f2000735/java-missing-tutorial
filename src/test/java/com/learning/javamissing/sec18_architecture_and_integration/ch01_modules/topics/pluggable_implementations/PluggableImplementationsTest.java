package com.learning.javamissing.sec18_architecture_and_integration.ch01_modules.topics.pluggable_implementations;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class PluggableImplementationsTest {
    @Test
    void exposesTwoDiscountImplementations() {
        assertEquals(List.of(15, 10), PluggableImplementations.availableDiscountPercentages());
    }
}
