package com.learning.javamissing.sec16_core_data_time_and_text.ch05_numbers_and_formatting;

import com.learning.javamissing.sec16_core_data_time_and_text.ch05_numbers_and_formatting.topics.formatting_prices.FormattingPrices;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Formatting Prices", () -> FormattingPrices.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
