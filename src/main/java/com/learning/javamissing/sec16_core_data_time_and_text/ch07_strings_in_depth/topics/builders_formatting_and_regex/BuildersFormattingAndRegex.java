package com.learning.javamissing.sec16_core_data_time_and_text.ch07_strings_in_depth.topics.builders_formatting_and_regex;

import java.util.regex.Pattern;

public class BuildersFormattingAndRegex {
    public static void main(String[] args) {
        String invoiceLine = new StringBuilder()
                .append("INV-")
                .append(42)
                .append(" total=")
                .append(String.format("%.2f", 128.5))
                .toString();

        boolean validCode = Pattern.matches("INV-\\d+ total=\\d+\\.\\d{2}", invoiceLine);
        String textBlock = """
                Summary:
                %s
                """.formatted(invoiceLine);

        // Expected output:
        // invoiceLine = INV-42 total=128.50
        // validCode = true
        System.out.println("invoiceLine = " + invoiceLine);
        System.out.println("validCode = " + validCode);
        System.out.println(textBlock.strip());
        System.out.println("Why it matters: StringBuilder helps repeated assembly, formatters help presentation, and regex helps validation when the pattern is genuinely clearer than manual checks.");
    }
}
