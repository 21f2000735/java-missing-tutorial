# Collections Learning Kit

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

- Sorting only by one fixed rule inside the class makes it harder to sort the same object in different ways later.

## Failure

- Comparator: Sorting only by one fixed rule inside the class makes it harder to sort the same object in different ways later.
- Immutability: Sharing one mutable list across many methods can create bugs when one method changes it unexpectedly.
- List Set Map: Using a List for coupon codes can keep the same coupon more than once by mistake.

## Fix

Run the topics in this order:

1. Run [Comparator](topics/comparator/Comparator.java)
2. Run [Immutability](topics/immutability/Immutability.java)
3. Run [List Set Map](topics/list_set_map/ListSetMap.java)

Example:

```java
    public static void main(String[] args) {
        wrongExample();
        // Expected output:
        // Java prints the list, then shows that modification is not allowed.
        List<String> fixedTopics = sampleTopics();
        System.out.println("fixedTopics = " + fixedTopics);
        try {
            fixedTopics.add("modules");
        } catch (UnsupportedOperationException exception) {
            System.out.println("cannot modify immutable list");
        }
        System.out.println("Lesson: immutable collections prevent accidental updates.");
        System.out.println("Senior note: immutability reduces defensive-copy pressure and makes shared-state bugs rarer.");
    }
```

What happens:

- Sharing one mutable list across many methods can create bugs when one method changes it unexpectedly.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        overview();
        wrongExample();
        // Expected output:
        // cartItems keeps duplicates, couponCodes stay unique, quantities support product lookup.
        List<String> cartItems = sampleCartItems();
        Set<String> couponCodes = sampleCouponCodes();
        Map<String, Integer> quantitiesBySku = sampleQuantitiesBySku();
        System.out.println("cartItems = " + cartItems);
        System.out.println("couponCodes = " + couponCodes);
        System.out.println("quantitiesBySku = " + quantitiesBySku);
        System.out.println("What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU.");
        System.out.println("Common confusion: choose List when duplicates or order matter, Set when uniqueness matters, Map when lookup by key matters.");
        System.out.println("Senior note: collection choice affects API clarity, mutation rules, and algorithmic cost.");
    }
```

What happens:

- Using a List for coupon codes can keep the same coupon more than once by mistake.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Collections exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Comparator](topics/comparator/Comparator.java), [Immutability](topics/immutability/Immutability.java), and [List Set Map](topics/list_set_map/ListSetMap.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Comparator](topics/comparator/Comparator.java) starts with the raw behavior, [Immutability](topics/immutability/Immutability.java) adds the safety rule, and [List Set Map](topics/list_set_map/ListSetMap.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Comparator](topics/comparator/Comparator.java) and note the first thing that breaks.
- Run [Immutability](topics/immutability/Immutability.java) and remove the safety rule or coordination step.
- Run [List Set Map](topics/list_set_map/ListSetMap.java) and compare the result with the naive approach.
