# Records And Sealed Types Learning Kit

## Learning Path

1. Step 1: Start with [Closing Hierarchies With Sealed Types](topics/closing_hierarchies_with_sealed_types/ClosingHierarchiesWithSealedTypes.java) to see the raw behavior.
2. Step 2: Try [Exhaustive Sealed Branching](topics/exhaustive_sealed_branching/ExhaustiveSealedBranching.java) to see the naive approach.
3. Step 3: Watch [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java) to find the failure.
4. Step 4: Use [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java) to restore correctness.
5. Step 5: Finish with [Record Classes Deep Dive](topics/record_classes_deep_dive/RecordClassesDeepDive.java) to see the improvement.

## Problem

This chapter shows what breaks when records and sealed types is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Closing Hierarchies With Sealed Types](topics/closing_hierarchies_with_sealed_types/ClosingHierarchiesWithSealedTypes.java)
2. Run [Exhaustive Sealed Branching](topics/exhaustive_sealed_branching/ExhaustiveSealedBranching.java)
3. Run [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java)
4. Run [Record Classes Deep Dive](topics/record_classes_deep_dive/RecordClassesDeepDive.java)

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        runInvoiceExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- records fit transparent immutable data");
        System.out.println("- the main value is clearer modeling, not only fewer lines");
        System.out.println("- record components become the natural API of the value");
    }
```

What happens:

- Real-world problem: an invoice summary has stable fields and no custom identity lifecycle.
- Mental model: when the data is the main point of the type, a record is a strong fit.
- Why it works: the record exposes its components directly and provides a useful value-style toString.

Why it matters:

After this chapter, you can explain the rule behind records and sealed types and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        Money total = new Money("INR", 499);
        Money sameTotal = new Money("INR", 499);

        System.out.println("Concept: records are compact data carriers with built-in equals, hashCode, and toString.");
        System.out.println("record = " + total);
        System.out.println("equals = " + total.equals(sameTotal));
        System.out.println("Why it matters: compact constructors let you validate data while keeping the class small.");
    }
```

What happens:

- Why it matters: compact constructors let you validate data while keeping the class small.

Why it matters:

After this chapter, you can explain the rule behind records and sealed types and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Records And Sealed Types exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Closing Hierarchies With Sealed Types](topics/closing_hierarchies_with_sealed_types/ClosingHierarchiesWithSealedTypes.java), [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java), and [Record Classes Deep Dive](topics/record_classes_deep_dive/RecordClassesDeepDive.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Closing Hierarchies With Sealed Types](topics/closing_hierarchies_with_sealed_types/ClosingHierarchiesWithSealedTypes.java) starts with the raw behavior, [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java) adds the safety rule, and [Record Classes Deep Dive](topics/record_classes_deep_dive/RecordClassesDeepDive.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Closing Hierarchies With Sealed Types](topics/closing_hierarchies_with_sealed_types/ClosingHierarchiesWithSealedTypes.java) and note the first thing that breaks.
- Run [Modeling Immutable Data With Records](topics/modeling_immutable_data_with_records/ModelingImmutableDataWithRecords.java) and remove the safety rule or coordination step.
- Run [Record Classes Deep Dive](topics/record_classes_deep_dive/RecordClassesDeepDive.java) and compare the result with the naive approach.
