package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching;

import com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching.topics.checking_shape_with_instanceof.CheckingShapeWithInstanceof;
import com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching.topics.sealed_classes_pattern_matching_switch.SealedClassesPatternMatchingSwitch;
import com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching.topics.switching_on_runtime_shape.SwitchingOnRuntimeShape;
import com.learning.javamissing.sec17_language_modeling_and_modern_types.ch01_pattern_matching.topics.unpacking_records_with_patterns.UnpackingRecordsWithPatterns;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Checking Shape With Instanceof", () -> CheckingShapeWithInstanceof.main(args));
        run("Sealed Classes Pattern Matching Switch", () -> SealedClassesPatternMatchingSwitch.main(args));
        run("Switching On Runtime Shape", () -> SwitchingOnRuntimeShape.main(args));
        run("Unpacking Records With Patterns", () -> UnpackingRecordsWithPatterns.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
