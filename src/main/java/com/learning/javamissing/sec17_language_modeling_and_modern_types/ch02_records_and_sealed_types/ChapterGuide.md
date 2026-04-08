# Records And Sealed Types Learning Kit

## Problem

This chapter shows what breaks when records and sealed types is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Closing Hierarchies With Sealed Types](topics/closing_hierarchies_with_sealed_types/ClosingHierarchiesWithSealedTypes.java)
2. Run [Exhaustive Sealed Branching](topics/exhaustive_sealed_branching/ExhaustiveSealedBranching.java)
3. Run [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java)
4. Run [Record Classes Deep Dive](topics/record_classes_deep_dive/RecordClassesDeepDive.java)

What to observe:

- Which topic shows the failure first: [Closing Hierarchies With Sealed Types](topics/closing_hierarchies_with_sealed_types/ClosingHierarchiesWithSealedTypes.java).
- Which topic narrows the rule: [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java).
- Which topic shows the cleaner abstraction: [Record Classes Deep Dive](topics/record_classes_deep_dive/RecordClassesDeepDive.java).

## Improvement

After this chapter, you can explain the rule behind records and sealed types and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Records And Sealed Types exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Closing Hierarchies With Sealed Types](topics/closing_hierarchies_with_sealed_types/ClosingHierarchiesWithSealedTypes.java) and note the first thing that breaks.
- Run [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java) and write down what the rule becomes.
- Run [Record Classes Deep Dive](topics/record_classes_deep_dive/RecordClassesDeepDive.java) and compare the result with the naive approach.
