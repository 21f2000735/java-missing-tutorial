package com.learning.javamissing.sec16_core_data_time_and_text.ch06_text_processing_and_regex;

import com.learning.javamissing.sec16_core_data_time_and_text.ch06_text_processing_and_regex.topics.validating_user_input.ValidatingUserInput;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Validating User Input", () -> ValidatingUserInput.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
