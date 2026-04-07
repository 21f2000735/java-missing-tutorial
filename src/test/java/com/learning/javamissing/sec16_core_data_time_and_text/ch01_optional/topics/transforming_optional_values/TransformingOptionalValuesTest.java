package com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.transforming_optional_values;

import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TransformingOptionalValuesTest {
    @Test
    void extractsDomainOrFallback() {
        assertEquals("example.com", TransformingOptionalValues.extractDomain(Optional.of("learner@example.com")));
        assertEquals("missing", TransformingOptionalValues.extractDomain(Optional.empty()));
    }
}
