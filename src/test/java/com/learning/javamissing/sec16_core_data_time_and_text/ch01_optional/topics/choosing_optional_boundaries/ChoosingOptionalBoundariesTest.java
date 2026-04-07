package com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.choosing_optional_boundaries;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ChoosingOptionalBoundariesTest {
    @Test
    void returnsNicknameWhenExpected() {
        assertTrue(ChoosingOptionalBoundaries.findNickname("Asha").isPresent());
        assertEquals("ACE", ChoosingOptionalBoundaries.displayName("Asha"));
        assertEquals("GUEST", ChoosingOptionalBoundaries.displayName("Ravi"));
    }
}
