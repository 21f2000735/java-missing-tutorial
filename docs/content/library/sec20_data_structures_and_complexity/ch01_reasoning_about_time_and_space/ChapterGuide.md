# Reasoning About Time And Space Learning Kit

## Learning Path

1. Step 1: Start with [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) to see the improvement.

## Problem

Timing alone does not explain how code behaves as the input keeps growing.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Measuring Growth With Big O: Timing alone does not explain how code behaves as the input keeps growing.

## Fix

Run the topics in this order:

1. Run [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: Big-O");
        System.out.println("Problem: two search approaches may feel similar on small data but scale very differently.");
        System.out.println();

        List<Integer> sortedRollNumbers = List.of(3, 7, 11, 15, 19, 24, 31, 42);

        int linearSteps = linearSearchSteps(sortedRollNumbers, 31);
        int binarySteps = binarySearchSteps(sortedRollNumbers, 31);

        // Expected output:
        // linearSteps = 7
        // binarySteps = 3
        System.out.println("linearSteps = " + linearSteps);
        System.out.println("binarySteps = " + binarySteps);
        System.out.println("Why it works: linear search checks one by one, while binary search removes half the remaining space each step.");
        System.out.println("Common mistake: treating Big-O as exact runtime instead of a growth model.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- Big-O is about growth, not one machine's clock");
        System.out.println("- linear search inspects items one by one");
        System.out.println("- binary search removes half the search space each step");
    }
```

What happens:

- Problem: two search approaches may feel similar on small data but scale very differently.
- Why it works: linear search checks one by one, while binary search removes half the remaining space each step.
- Common mistake: treating Big-O as exact runtime instead of a growth model.

Why it matters:

Timing alone does not explain how code behaves as the input keeps growing.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: Big-O");
        System.out.println("Problem: two search approaches may feel similar on small data but scale very differently.");
        System.out.println();

        List<Integer> sortedRollNumbers = List.of(3, 7, 11, 15, 19, 24, 31, 42);

        int linearSteps = linearSearchSteps(sortedRollNumbers, 31);
        int binarySteps = binarySearchSteps(sortedRollNumbers, 31);

        // Expected output:
        // linearSteps = 7
        // binarySteps = 3
        System.out.println("linearSteps = " + linearSteps);
        System.out.println("binarySteps = " + binarySteps);
        System.out.println("Why it works: linear search checks one by one, while binary search removes half the remaining space each step.");
        System.out.println("Common mistake: treating Big-O as exact runtime instead of a growth model.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- Big-O is about growth, not one machine's clock");
        System.out.println("- linear search inspects items one by one");
        System.out.println("- binary search removes half the search space each step");
    }
```

What happens:

- Problem: two search approaches may feel similar on small data but scale very differently.
- Why it works: linear search checks one by one, while binary search removes half the remaining space each step.
- Common mistake: treating Big-O as exact runtime instead of a growth model.

Why it matters:

Timing alone does not explain how code behaves as the input keeps growing.

After this chapter, you should be able to explain why Reasoning About Time And Space exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java), [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java), and [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) starts with the raw behavior, [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) adds the safety rule, and [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Ask what work grows as the input grows, not only how fast one run felt.

## Try this

- Run [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) and note the first thing that breaks.
- Run [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) and remove the safety rule or coordination step.
- Run [Measuring Growth With Big O](topics/measuring_growth_with_big_o/MeasuringGrowthWithBigO.java) and compare the result with the naive approach.
