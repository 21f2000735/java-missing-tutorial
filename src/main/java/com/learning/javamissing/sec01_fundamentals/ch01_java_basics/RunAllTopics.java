package com.learning.javamissing.sec01_fundamentals.ch01_java_basics;

import com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.designing_small_methods.DesigningSmallMethods;
import com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.making_decisions_and_repeating_work.MakingDecisionsAndRepeatingWork;
import com.learning.javamissing.sec01_fundamentals.ch01_java_basics.topics.storing_and_naming_values.StoringAndNamingValues;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Designing Small Methods", () -> DesigningSmallMethods.main(args));
        run("Making Decisions And Repeating Work", () -> MakingDecisionsAndRepeatingWork.main(args));
        run("Storing And Naming Values", () -> StoringAndNamingValues.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
