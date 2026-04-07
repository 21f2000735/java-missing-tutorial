package com.learning.javamissing.sec20_data_structures_and_complexity.ch03_sorting_searching_and_binary_search.topics.using_binary_search_correctly;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UsingBinarySearchCorrectlyTest {
    @Test
    void returnsIndexWhenItemExists() {
        assertEquals(3, UsingBinarySearchCorrectly.binarySearch(List.of(101, 105, 110, 118, 130), 118));
    }
}
