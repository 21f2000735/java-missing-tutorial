# Structural Patterns

## Learning Path

1. Step 1: Start with [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java) to see the raw behavior.
2. Step 2: Try [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) to see the naive approach.
3. Step 3: Watch [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) to see the improvement.

## Problem

Stable code often needs extra behavior without being rewritten for each new feature.

## Naive Approach

- Watch out: if decorators become hard to order or reason about, you may be stacking too many responsibilities.
- Try this next: add a RetryNotifierDecorator and decide in which order retry and audit should wrap the base notifier.

## Failure

- Adding Features With Decorator: Watch out: if decorators become hard to order or reason about, you may be stacking too many responsibilities.
- Adding Features With Decorator: Try this next: add a RetryNotifierDecorator and decide in which order retry and audit should wrap the base notifier.
- Translating Incompatible Apis With Adapter: Watch out: if the adapter starts carrying business rules, it has stopped being a translator and become a hidden service.
- Translating Incompatible Apis With Adapter: Try this next: add request logging inside the adapter and decide whether that belongs there or in a decorator.

## Fix

Run the topics in this order:

1. Run [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java)
2. Run [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: adapter");
        System.out.println("Story hook: your new service speaks one interface, but the old gateway everyone still depends on speaks another.");
        System.out.println("Problem: new code expects pay(), but the legacy gateway exposes makePayment().");
        System.out.println();

        PaymentProcessor processor = new LegacyGatewayAdapter(new LegacyGateway());

        // Expected output:
        // result = legacy gateway paid 2300
        System.out.println("result = " + processor.pay(2_300));
        System.out.println("Why it works: only the adapter knows about the legacy API shape.");
        System.out.println("Use this when: a dependency is useful but its interface does not match what your current code wants.");
        System.out.println("Avoid this when: you control both sides and can simply align the interface directly.");
        System.out.println("Common mistake: leaking the old API into the new code instead of keeping the translation local.");
        System.out.println("Watch out: if the adapter starts carrying business rules, it has stopped being a translator and become a hidden service.");
        System.out.println("Try this next: add request logging inside the adapter and decide whether that belongs there or in a decorator.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- adapter lets new code depend on a cleaner interface");
        System.out.println("- legacy code stays untouched");
        System.out.println("- the translation logic lives in one bridge class");
    }
```

What happens:

- Watch out: if the adapter starts carrying business rules, it has stopped being a translator and become a hidden service.
- Try this next: add request logging inside the adapter and decide whether that belongs there or in a decorator.

Why it matters:

New code and legacy code often expose different interfaces even when they do similar work.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: adapter");
        System.out.println("Story hook: your new service speaks one interface, but the old gateway everyone still depends on speaks another.");
        System.out.println("Problem: new code expects pay(), but the legacy gateway exposes makePayment().");
        System.out.println();

        PaymentProcessor processor = new LegacyGatewayAdapter(new LegacyGateway());

        // Expected output:
        // result = legacy gateway paid 2300
        System.out.println("result = " + processor.pay(2_300));
        System.out.println("Why it works: only the adapter knows about the legacy API shape.");
        System.out.println("Use this when: a dependency is useful but its interface does not match what your current code wants.");
        System.out.println("Avoid this when: you control both sides and can simply align the interface directly.");
        System.out.println("Common mistake: leaking the old API into the new code instead of keeping the translation local.");
        System.out.println("Watch out: if the adapter starts carrying business rules, it has stopped being a translator and become a hidden service.");
        System.out.println("Try this next: add request logging inside the adapter and decide whether that belongs there or in a decorator.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- adapter lets new code depend on a cleaner interface");
        System.out.println("- legacy code stays untouched");
        System.out.println("- the translation logic lives in one bridge class");
    }
```

What happens:

- Watch out: if the adapter starts carrying business rules, it has stopped being a translator and become a hidden service.
- Try this next: add request logging inside the adapter and decide whether that belongs there or in a decorator.

Why it matters:

New code and legacy code often expose different interfaces even when they do similar work.

After this chapter, you should be able to explain why Structural Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java), [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java), and [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java) starts with the raw behavior, [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) adds the safety rule, and [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Put the translation in one bridge class so the rest of the code can depend on the cleaner contract.

## Try this

- Run [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java) and note the first thing that breaks.
- Run [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) and remove the safety rule or coordination step.
- Run [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) and compare the result with the naive approach.
