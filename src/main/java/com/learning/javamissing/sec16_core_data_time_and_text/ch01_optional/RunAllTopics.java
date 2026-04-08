package com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional;

import com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.choosing_optional_boundaries.ChoosingOptionalBoundaries;
import com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.optional_correct_usage.OptionalCorrectUsage;
import com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.representing_optional_values.RepresentingOptionalValues;
import com.learning.javamissing.sec16_core_data_time_and_text.ch01_optional.topics.transforming_optional_values.TransformingOptionalValues;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Choosing Optional Boundaries", () -> ChoosingOptionalBoundaries.main(args));
        run("Optional Correct Usage", () -> OptionalCorrectUsage.main(args));
        run("Representing Optional Values", () -> RepresentingOptionalValues.main(args));
        run("Transforming Optional Values", () -> TransformingOptionalValues.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
