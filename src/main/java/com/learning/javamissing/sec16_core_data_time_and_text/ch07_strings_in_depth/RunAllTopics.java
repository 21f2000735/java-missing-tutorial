package com.learning.javamissing.sec16_core_data_time_and_text.ch07_strings_in_depth;

import com.learning.javamissing.sec16_core_data_time_and_text.ch07_strings_in_depth.topics.builders_formatting_and_regex.BuildersFormattingAndRegex;
import com.learning.javamissing.sec16_core_data_time_and_text.ch07_strings_in_depth.topics.string_pool_and_equals.StringPoolAndEquals;

public class RunAllTopics {
    public static void main(String[] args) {
        run("String Pool And Equals", () -> StringPoolAndEquals.main(args));
        run("Builders, Formatting, And Regex", () -> BuildersFormattingAndRegex.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
