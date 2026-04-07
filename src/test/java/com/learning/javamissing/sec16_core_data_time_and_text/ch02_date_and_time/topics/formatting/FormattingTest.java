package com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.formatting;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FormattingTest {
    @Test
    void formatsAndParsesInvoiceDate() {
        assertEquals("07 Apr 2026", Formatting.formatInvoiceDate(LocalDate.of(2026, 4, 7)));
        assertEquals(LocalDate.of(2026, 4, 7), Formatting.parseVisibleDate("07 Apr 2026"));
    }
}
