# Writing Safe Java Learning Kit

## Learning Path

1. Step 1: Start with [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) to see the improvement.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Validating Checkout Input: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("validQuantity(2) = " + validQuantity(2));
        System.out.println("validQuantity(0) = " + validQuantity(0));
        System.out.println("Concept: safe code checks assumptions before they become bugs.");
    }
```

What happens:

- safe code checks assumptions before they become bugs.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("validQuantity(2) = " + validQuantity(2));
        System.out.println("validQuantity(0) = " + validQuantity(0));
        System.out.println("Concept: safe code checks assumptions before they become bugs.");
    }
```

What happens:

- safe code checks assumptions before they become bugs.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Writing Safe Java exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java), [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java), and [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) starts with the raw behavior, [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) adds the safety rule, and [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) and note the first thing that breaks.
- Run [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) and remove the safety rule or coordination step.
- Run [Validating Checkout Input](topics/validating_checkout_input/ValidatingCheckoutInput.java) and compare the result with the naive approach.
