package com.learning.javamissing.sec16_core_data_time_and_text.ch03_missing_values_and_optional;

import com.learning.javamissing.sec16_core_data_time_and_text.ch03_missing_values_and_optional.topics.representing_absence.RepresentingAbsence;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Representing Absence", () -> RepresentingAbsence.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
