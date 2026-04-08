# Pattern Matching Learning Kit

## Problem

This chapter shows what breaks when pattern matching is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Checking Shape With Instanceof](topics/checking_shape_with_instanceof/CheckingShapeWithInstanceof.java)
2. Run [Sealed Classes + Pattern Matching Switch](topics/sealed_classes_pattern_matching_switch/SealedClassesPatternMatchingSwitch.java)
3. Run [Switching On Runtime Shape](topics/switching_on_runtime_shape/SwitchingOnRuntimeShape.java)
4. Run [Unpacking Records With Patterns](topics/unpacking_records_with_patterns/UnpackingRecordsWithPatterns.java)

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        runNotificationExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- switch patterns let one branching point describe several runtime shapes");
        System.out.println("- guards add more precise decisions");
        System.out.println("- readable modeling matters more than fancy syntax");
    }
```

What happens:

- Real-world problem: a notification handler receives different payload types.
- Mental model: use one switch to describe what happens for each supported shape.
- Why it works: the guard narrows the Integer case before choosing the result.

Why it matters:

After this chapter, you can explain the rule behind pattern matching and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        runLoginEventExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- record patterns unpack structured data during the match");
        System.out.println("- they work best when the record model is already clear");
        System.out.println("- they reduce repeated getter calls in shape-based code");
    }
```

What happens:

- Real-world problem: a login event contains a user object and a source channel.
- Mental model: if the object has the expected record shape, unpack it immediately.
- Why it works: the pattern drills into the nested record structure in one match.

Why it matters:

After this chapter, you can explain the rule behind pattern matching and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Pattern Matching exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Checking Shape With Instanceof](topics/checking_shape_with_instanceof/CheckingShapeWithInstanceof.java), [Switching On Runtime Shape](topics/switching_on_runtime_shape/SwitchingOnRuntimeShape.java), and [Unpacking Records With Patterns](topics/unpacking_records_with_patterns/UnpackingRecordsWithPatterns.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Checking Shape With Instanceof](topics/checking_shape_with_instanceof/CheckingShapeWithInstanceof.java) starts with the raw behavior, [Switching On Runtime Shape](topics/switching_on_runtime_shape/SwitchingOnRuntimeShape.java) adds the safety rule, and [Unpacking Records With Patterns](topics/unpacking_records_with_patterns/UnpackingRecordsWithPatterns.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Checking Shape With Instanceof](topics/checking_shape_with_instanceof/CheckingShapeWithInstanceof.java) and note the first thing that breaks.
- Run [Switching On Runtime Shape](topics/switching_on_runtime_shape/SwitchingOnRuntimeShape.java) and remove the safety rule or coordination step.
- Run [Unpacking Records With Patterns](topics/unpacking_records_with_patterns/UnpackingRecordsWithPatterns.java) and compare the result with the naive approach.
