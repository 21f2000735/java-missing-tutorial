package com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.formatting;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Formatting {
    public static void main(String[] args) {
        explainWhy();
        wrongExample();
        runInvoiceExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- formatting is for display and parsing, not for core business logic");
        System.out.println("- the pattern used for parsing must match the text exactly");
        System.out.println("- typed date values are safer than string dates");
    }

    private static void explainWhy() {
        System.out.println("Concept: formatting dates for people");
        System.out.println("Real-world problem: an invoice date must be shown in a human-readable form.");
        System.out.println("Mental model: keep values as LocalDate inside the program, format only at the boundary.");
        System.out.println();
    }

    private static void wrongExample() {
        System.out.println("Common confusion:");
        System.out.println("- storing dates as plain strings makes sorting, validation, and math harder");
        System.out.println("- use strings for input/output, not as the main date model");
        System.out.println();
    }

    private static void runInvoiceExample() {
        LocalDate invoiceDate = LocalDate.of(2026, 4, 7);
        String visibleDate = formatInvoiceDate(invoiceDate);
        LocalDate parsedBack = parseVisibleDate("07 Apr 2026");

        // Expected output:
        // visibleDate = 07 Apr 2026
        // parsedBack = 2026-04-07
        System.out.println("visibleDate = " + visibleDate);
        System.out.println("parsedBack = " + parsedBack);
        System.out.println("Why it works: the formatter converts between a typed LocalDate and the display text.");
    }

    static String formatInvoiceDate(LocalDate invoiceDate) {
        return invoiceDate.format(DateTimeFormatter.ofPattern("dd MMM uuuu"));
    }

    static LocalDate parseVisibleDate(String visibleDate) {
        return LocalDate.parse(visibleDate, DateTimeFormatter.ofPattern("dd MMM uuuu"));
    }
}
