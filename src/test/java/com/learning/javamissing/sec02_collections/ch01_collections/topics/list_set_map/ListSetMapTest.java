package com.learning.javamissing.sec02_collections.ch01_collections.topics.list_set_map;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ListSetMapTest {
    @Test
    void listKeepsDuplicatesSetDoesNot() {
        assertEquals(3, ListSetMap.sampleCartItems().size());
        assertEquals(2, ListSetMap.sampleCouponCodes().size());
        assertEquals(2, ListSetMap.sampleQuantitiesBySku().size());
    }
}
