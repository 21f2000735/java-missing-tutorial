package com.learning.javamissing.sec02_collections.ch01_collections.topics.immutability;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ImmutabilityTest {
    @Test
    void immutableListRejectsModification() {
        assertTrue(Immutability.modificationBlocked());
    }
}
