package com.learning.javamissing.sec13_io_and_data_access.ch01_talking_to_databases;

import com.learning.javamissing.sec13_io_and_data_access.ch01_talking_to_databases.topics.querying_student_results.QueryingStudentResults;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Querying Student Results", () -> QueryingStudentResults.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
