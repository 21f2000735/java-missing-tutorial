# Working With Time Learning Kit

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Scheduling Deliveries: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java)

Example:

```java
    public static void main(String[] args) {
        LocalDate orderDate = LocalDate.of(2026, 4, 7);
        LocalDate deliveryDate = orderDate.plusDays(3);
        System.out.println("orderDate = " + orderDate);
        System.out.println("deliveryDate = " + deliveryDate);
        System.out.println("Concept: model time with date types, not manual string math.");
    }
```

What happens:

- model time with date types, not manual string math.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        LocalDate orderDate = LocalDate.of(2026, 4, 7);
        LocalDate deliveryDate = orderDate.plusDays(3);
        System.out.println("orderDate = " + orderDate);
        System.out.println("deliveryDate = " + deliveryDate);
        System.out.println("Concept: model time with date types, not manual string math.");
    }
```

What happens:

- model time with date types, not manual string math.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Working With Time exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java), [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java), and [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java) starts with the raw behavior, [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java) adds the safety rule, and [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java) and note the first thing that breaks.
- Run [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java) and remove the safety rule or coordination step.
- Run [Scheduling Deliveries](topics/scheduling_deliveries/SchedulingDeliveries.java) and compare the result with the naive approach.
