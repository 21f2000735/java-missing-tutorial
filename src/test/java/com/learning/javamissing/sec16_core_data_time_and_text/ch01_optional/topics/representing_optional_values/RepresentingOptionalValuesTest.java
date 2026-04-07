package com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.representing_optional_values;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class RepresentingOptionalValuesTest {
    @Test
    void createsOptionalFromNullableValue() {
        assertTrue(RepresentingOptionalValues.optionalFromNullable(null).isEmpty());
        assertEquals("support@example.com", RepresentingOptionalValues.displayOrDefault(RepresentingOptionalValues.optionalFromNullable(null), "support@example.com"));
    }
}
