# Pattern Matching Learning Kit

## Problem

This chapter shows what breaks when pattern matching is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Checking Shape With Instanceof](topics/checking_shape_with_instanceof/CheckingShapeWithInstanceof.java)
2. Run [Sealed Classes + Pattern Matching Switch](topics/sealed_classes_pattern_matching_switch/SealedClassesPatternMatchingSwitch.java)
3. Run [Switching On Runtime Shape](topics/switching_on_runtime_shape/SwitchingOnRuntimeShape.java)
4. Run [Unpacking Records With Patterns](topics/unpacking_records_with_patterns/UnpackingRecordsWithPatterns.java)

What to observe:

- Which topic shows the failure first: [Checking Shape With Instanceof](topics/checking_shape_with_instanceof/CheckingShapeWithInstanceof.java).
- Which topic narrows the rule: [Switching On Runtime Shape](topics/switching_on_runtime_shape/SwitchingOnRuntimeShape.java).
- Which topic shows the cleaner abstraction: [Unpacking Records With Patterns](topics/unpacking_records_with_patterns/UnpackingRecordsWithPatterns.java).

## Improvement

After this chapter, you can explain the rule behind pattern matching and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Pattern Matching exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

- Run [Checking Shape With Instanceof](topics/checking_shape_with_instanceof/CheckingShapeWithInstanceof.java) and note the first thing that breaks.
- Run [Switching On Runtime Shape](topics/switching_on_runtime_shape/SwitchingOnRuntimeShape.java) and write down what the rule becomes.
- Run [Unpacking Records With Patterns](topics/unpacking_records_with_patterns/UnpackingRecordsWithPatterns.java) and compare the result with the naive approach.
