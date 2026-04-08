# Functional Interfaces Learning Kit

## Learning Path

1. Step 1: Start with [Defining Functions](topics/defining_functions/DefiningFunctions.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Defining Functions](topics/defining_functions/DefiningFunctions.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Defining Functions](topics/defining_functions/DefiningFunctions.java) to see the improvement.

## Problem

Some rules should be supplied from outside the workflow instead of being hard-coded inside it.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Defining Functions: Some rules should be supplied from outside the workflow instead of being hard-coded inside it.

## Fix

Run the topics in this order:

1. Run [Defining Functions](topics/defining_functions/DefiningFunctions.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("The checkout flow stays the same, but the discount rule changes.");
        System.out.println();
        PriceRule festiveDiscount = price -> price - 200;
        PriceRule studentDiscount = price -> price - 150;
        System.out.println("Run this example:");
        System.out.println("festive price = " + festiveDiscount.apply(1_200));
        System.out.println("student price = " + studentDiscount.apply(1_200));
        System.out.println("Why it works: both lambdas satisfy the same PriceRule contract.");
        System.out.println("Use this when: one workflow should accept different rules.");
        System.out.println("Avoid this when: one simple method call is clearer than introducing a new function type.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- a functional interface represents one behavior shape");
        System.out.println("- different lambdas can supply different business rules");
        System.out.println("- this idea is the base for many stream operations");
    }
```

What happens:

- Why it works: both lambdas satisfy the same PriceRule contract.
- Use this when: one workflow should accept different rules.
- Avoid this when: one simple method call is clearer than introducing a new function type.

Why it matters:

Some rules should be supplied from outside the workflow instead of being hard-coded inside it.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("The problem:");
        System.out.println("The checkout flow stays the same, but the discount rule changes.");
        System.out.println();
        PriceRule festiveDiscount = price -> price - 200;
        PriceRule studentDiscount = price -> price - 150;
        System.out.println("Run this example:");
        System.out.println("festive price = " + festiveDiscount.apply(1_200));
        System.out.println("student price = " + studentDiscount.apply(1_200));
        System.out.println("Why it works: both lambdas satisfy the same PriceRule contract.");
        System.out.println("Use this when: one workflow should accept different rules.");
        System.out.println("Avoid this when: one simple method call is clearer than introducing a new function type.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- a functional interface represents one behavior shape");
        System.out.println("- different lambdas can supply different business rules");
        System.out.println("- this idea is the base for many stream operations");
    }
```

What happens:

- Why it works: both lambdas satisfy the same PriceRule contract.
- Use this when: one workflow should accept different rules.
- Avoid this when: one simple method call is clearer than introducing a new function type.

Why it matters:

Some rules should be supplied from outside the workflow instead of being hard-coded inside it.

After this chapter, you should be able to explain why Functional Interfaces exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Defining Functions](topics/defining_functions/DefiningFunctions.java), [Defining Functions](topics/defining_functions/DefiningFunctions.java), and [Defining Functions](topics/defining_functions/DefiningFunctions.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Defining Functions](topics/defining_functions/DefiningFunctions.java) starts with the raw behavior, [Defining Functions](topics/defining_functions/DefiningFunctions.java) adds the safety rule, and [Defining Functions](topics/defining_functions/DefiningFunctions.java) moves to the cleaner abstraction.

## Rule

👉 Rule: A functional interface is one behavior shape that many rules can satisfy.

## Try this

- Run [Defining Functions](topics/defining_functions/DefiningFunctions.java) and note the first thing that breaks.
- Run [Defining Functions](topics/defining_functions/DefiningFunctions.java) and remove the safety rule or coordination step.
- Run [Defining Functions](topics/defining_functions/DefiningFunctions.java) and compare the result with the naive approach.
