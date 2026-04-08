# Data Filtering And Mapping Learning Kit

## Problem

Most real code does not need the raw input exactly as it arrives.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Filtering Orders: Most real code does not need the raw input exactly as it arrives.

## Fix

Run the topics in this order:

1. Run [Filtering Orders](topics/filtering_orders/FilteringOrders.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("The dashboard does not need every order field. It only needs the names of priority orders.");
        System.out.println();
        List<Order> orders = List.of(
                new Order("Book", true, 899),
                new Order("Mouse", false, 1_599),
                new Order("Keyboard", true, 2_499)
        );

        List<String> priorityItems = orders.stream()
                .filter(Order::priority)
                .map(Order::itemName)
                .toList();

        System.out.println("Run this example:");
        System.out.println("priorityItems = " + priorityItems);
        System.out.println("Why it works: filter keeps only priority orders and map extracts only the item name.");
        System.out.println("Use this when: the final answer needs fewer rows and fewer fields than the raw input.");
        System.out.println("Avoid this when: the transformation is so stateful that a loop explains it better.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- filter answers what stays");
        System.out.println("- map answers what shape the result should take");
        System.out.println("- filtering and mapping together often model real business queries clearly");
    }
```

What happens:

- Why it works: filter keeps only priority orders and map extracts only the item name.
- Use this when: the final answer needs fewer rows and fewer fields than the raw input.
- Avoid this when: the transformation is so stateful that a loop explains it better.

Why it matters:

Most real code does not need the raw input exactly as it arrives.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("The dashboard does not need every order field. It only needs the names of priority orders.");
        System.out.println();
        List<Order> orders = List.of(
                new Order("Book", true, 899),
                new Order("Mouse", false, 1_599),
                new Order("Keyboard", true, 2_499)
        );

        List<String> priorityItems = orders.stream()
                .filter(Order::priority)
                .map(Order::itemName)
                .toList();

        System.out.println("Run this example:");
        System.out.println("priorityItems = " + priorityItems);
        System.out.println("Why it works: filter keeps only priority orders and map extracts only the item name.");
        System.out.println("Use this when: the final answer needs fewer rows and fewer fields than the raw input.");
        System.out.println("Avoid this when: the transformation is so stateful that a loop explains it better.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- filter answers what stays");
        System.out.println("- map answers what shape the result should take");
        System.out.println("- filtering and mapping together often model real business queries clearly");
    }
```

What happens:

- Why it works: filter keeps only priority orders and map extracts only the item name.
- Use this when: the final answer needs fewer rows and fewer fields than the raw input.
- Avoid this when: the transformation is so stateful that a loop explains it better.

Why it matters:

Most real code does not need the raw input exactly as it arrives.

After this chapter, you should be able to explain why Data Filtering And Mapping exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Filtering Orders](topics/filtering_orders/FilteringOrders.java), [Filtering Orders](topics/filtering_orders/FilteringOrders.java), and [Filtering Orders](topics/filtering_orders/FilteringOrders.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Filtering Orders](topics/filtering_orders/FilteringOrders.java) starts with the raw behavior, [Filtering Orders](topics/filtering_orders/FilteringOrders.java) adds the safety rule, and [Filtering Orders](topics/filtering_orders/FilteringOrders.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First decide what stays, then decide what the result should look like.

## Try this

- Run [Filtering Orders](topics/filtering_orders/FilteringOrders.java) and note the first thing that breaks.
- Run [Filtering Orders](topics/filtering_orders/FilteringOrders.java) and remove the safety rule or coordination step.
- Run [Filtering Orders](topics/filtering_orders/FilteringOrders.java) and compare the result with the naive approach.
