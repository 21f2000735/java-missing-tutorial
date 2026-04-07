package com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.zones;

import org.junit.jupiter.api.Test;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ZonesTest {
    @Test
    void convertsIndiaTimeToLondonWhileKeepingSameInstant() {
        ZonedDateTime indiaTime = ZonedDateTime.of(2026, 4, 7, 18, 0, 0, 0, ZoneId.of("Asia/Kolkata"));
        ZonedDateTime londonTime = Zones.toLondonTime(indiaTime);

        assertEquals(ZoneId.of("Europe/London"), londonTime.getZone());
        assertEquals(indiaTime.toInstant(), londonTime.toInstant());
    }
}
