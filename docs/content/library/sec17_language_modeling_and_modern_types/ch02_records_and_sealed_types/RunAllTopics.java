package com.learning.javamissing.sec17_language_modeling_and_modern_types.ch02_records_and_sealed_types;

import com.learning.javamissing.sec17_language_modeling_and_modern_types.ch02_records_and_sealed_types.topics.closing_hierarchies_with_sealed_types.ClosingHierarchiesWithSealedTypes;
import com.learning.javamissing.sec17_language_modeling_and_modern_types.ch02_records_and_sealed_types.topics.exhaustive_branching_over_closed_hierarchies.ExhaustiveBranchingOverClosedHierarchies;
import com.learning.javamissing.sec17_language_modeling_and_modern_types.ch02_records_and_sealed_types.topics.modeling_immutable_data_with_records.ModelingImmutableDataWithRecords;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Closing Hierarchies With Sealed Types", () -> ClosingHierarchiesWithSealedTypes.main(args));
        run("Exhaustive Branching Over Closed Hierarchies", () -> ExhaustiveBranchingOverClosedHierarchies.main(args));
        run("Modeling Immutable Data With Records", () -> ModelingImmutableDataWithRecords.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
