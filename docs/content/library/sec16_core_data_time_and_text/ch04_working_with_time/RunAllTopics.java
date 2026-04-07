package com.learning.javamissing.sec16_core_data_time_and_text.ch04_working_with_time;

import com.learning.javamissing.sec16_core_data_time_and_text.ch04_working_with_time.topics.scheduling_deliveries.SchedulingDeliveries;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Scheduling Deliveries", () -> SchedulingDeliveries.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
