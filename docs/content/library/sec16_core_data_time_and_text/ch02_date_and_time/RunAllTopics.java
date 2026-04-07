package com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time;

import com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.formatting.Formatting;
import com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.local_date_time.LocalDateTime;
import com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.zones.Zones;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Formatting", () -> Formatting.main(args));
        run("Local Date Time", () -> LocalDateTime.main(args));
        run("Zones", () -> Zones.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
