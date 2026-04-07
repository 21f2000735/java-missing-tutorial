package com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.local_date_time;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class LocalDateTimeTest {
    @Test
    void delaysMeetingWithoutMutatingOriginalValue() {
        java.time.LocalDateTime standup = java.time.LocalDateTime.of(2026, 4, 7, 9, 30);

        assertEquals(java.time.LocalDateTime.of(2026, 4, 7, 9, 45), LocalDateTime.delayMeeting(standup, 15));
        assertEquals(java.time.LocalDateTime.of(2026, 4, 7, 9, 30), standup);
    }
}
