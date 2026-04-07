package com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.designing_small_methods;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class DesigningSmallMethodsTest {
    @Test
    void formatsWelcomeMessage() {
        assertEquals("Welcome, Asha!", DesigningSmallMethods.formatWelcomeMessage("Asha"));
    }

    @Test
    void calculatesOrderTotal() {
        assertEquals(4_796, DesigningSmallMethods.calculateOrderTotalInCents(3, 1_499));
    }
}
