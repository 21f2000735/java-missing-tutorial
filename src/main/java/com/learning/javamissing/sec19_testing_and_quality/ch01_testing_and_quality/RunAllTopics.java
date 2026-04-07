package com.learning.javamissing.sec19_testing_and_quality.ch01_testing_and_quality;

import com.learning.javamissing.sec19_testing_and_quality.ch01_testing_and_quality.topics.checking_one_rule_with_many_inputs.CheckingOneRuleWithManyInputs;
import com.learning.javamissing.sec19_testing_and_quality.ch01_testing_and_quality.topics.designing_tests_around_business_rules.DesigningTestsAroundBusinessRules;
import com.learning.javamissing.sec19_testing_and_quality.ch01_testing_and_quality.topics.writing_readable_junit_tests.WritingReadableJUnitTests;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Checking One Rule With Many Inputs", () -> CheckingOneRuleWithManyInputs.main(args));
        run("Designing Tests Around Business Rules", () -> DesigningTestsAroundBusinessRules.main(args));
        run("Writing Readable JUnit Tests", () -> WritingReadableJUnitTests.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
