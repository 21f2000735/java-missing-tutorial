package com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.making_decisions_and_repeating_work;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MakingDecisionsAndRepeatingWorkTest {
    @Test
    void countsValuesAtLeastThreshold() {
        assertEquals(2, MakingDecisionsAndRepeatingWork.countAtLeast(new int[]{81, 67, 92, 74}, 75));
    }

    @Test
    void returnsReviewStatus() {
        assertEquals("review", MakingDecisionsAndRepeatingWork.reviewStatus(73));
        assertEquals("pass", MakingDecisionsAndRepeatingWork.reviewStatus(75));
    }
}
