# Creational Patterns

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

Constructors become hard to read when required and optional values mix together.

## Naive Approach

- Watch out: a builder should protect readability, not become a second mutable domain object that floats around everywhere.
- Try this next: add an exportFormat option and see that the call site still reads like a checklist.

## Failure

- Assembling Objects With Builder: Watch out: a builder should protect readability, not become a second mutable domain object that floats around everywhere.
- Assembling Objects With Builder: Try this next: add an exportFormat option and see that the call site still reads like a checklist.
- Creating Objects With Factory Method: Watch out: if every factory branch leaks into the caller anyway, the factory is not simplifying anything.
- Creating Objects With Factory Method: Try this next: add a WalletGateway branch and keep the caller code unchanged.

## Fix

Run the topics in this order:

1. Run [Assembling Objects With Builder](topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java)
2. Run [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: factory method");
        System.out.println("Story hook: your checkout service should ask for a payment capability, not know every gateway class by name.");
        System.out.println("Problem: checkout code should request a payment gateway without branching everywhere.");
        System.out.println("Mental model: callers request behavior, factories choose implementation.");
        System.out.println();

        PaymentGateway cardGateway = PaymentGatewayFactory.forMethod("CARD");
        PaymentGateway upiGateway = PaymentGatewayFactory.forMethod("UPI");

        // Expected output:
        // card result = CARD payment accepted for 1500
        // upi result = UPI payment accepted for 800
        System.out.println("card result = " + cardGateway.charge(1_500));
        System.out.println("upi result = " + upiGateway.charge(800));
        System.out.println("Why it works: object creation stays in one place and the caller depends on the PaymentGateway contract.");
        System.out.println("Use this when: callers should ask for a behavior or capability while concrete implementation choice stays hidden.");
        System.out.println("Avoid this when: object creation is obvious and there is no meaningful selection logic.");
        System.out.println("Common mistake: hiding simple constructor calls behind a factory when no real selection logic exists.");
        System.out.println("Watch out: if every factory branch leaks into the caller anyway, the factory is not simplifying anything.");
        System.out.println("Try this next: add a WalletGateway branch and keep the caller code unchanged.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- the caller asks for a type of behavior");
        System.out.println("- the factory decides the concrete class");
        System.out.println("- object creation stays in one place instead of spreading across the codebase");
    }
```

What happens:

- Watch out: if every factory branch leaks into the caller anyway, the factory is not simplifying anything.
- Try this next: add a WalletGateway branch and keep the caller code unchanged.

Why it matters:

Callers should often ask for a capability without knowing the concrete class behind it.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: factory method");
        System.out.println("Story hook: your checkout service should ask for a payment capability, not know every gateway class by name.");
        System.out.println("Problem: checkout code should request a payment gateway without branching everywhere.");
        System.out.println("Mental model: callers request behavior, factories choose implementation.");
        System.out.println();

        PaymentGateway cardGateway = PaymentGatewayFactory.forMethod("CARD");
        PaymentGateway upiGateway = PaymentGatewayFactory.forMethod("UPI");

        // Expected output:
        // card result = CARD payment accepted for 1500
        // upi result = UPI payment accepted for 800
        System.out.println("card result = " + cardGateway.charge(1_500));
        System.out.println("upi result = " + upiGateway.charge(800));
        System.out.println("Why it works: object creation stays in one place and the caller depends on the PaymentGateway contract.");
        System.out.println("Use this when: callers should ask for a behavior or capability while concrete implementation choice stays hidden.");
        System.out.println("Avoid this when: object creation is obvious and there is no meaningful selection logic.");
        System.out.println("Common mistake: hiding simple constructor calls behind a factory when no real selection logic exists.");
        System.out.println("Watch out: if every factory branch leaks into the caller anyway, the factory is not simplifying anything.");
        System.out.println("Try this next: add a WalletGateway branch and keep the caller code unchanged.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- the caller asks for a type of behavior");
        System.out.println("- the factory decides the concrete class");
        System.out.println("- object creation stays in one place instead of spreading across the codebase");
    }
```

What happens:

- Watch out: if every factory branch leaks into the caller anyway, the factory is not simplifying anything.
- Try this next: add a WalletGateway branch and keep the caller code unchanged.

Why it matters:

Callers should often ask for a capability without knowing the concrete class behind it.

After this chapter, you should be able to explain why Creational Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Assembling Objects With Builder](topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java), [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java), and [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Assembling Objects With Builder](topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java) starts with the raw behavior, [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java) adds the safety rule, and [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java) moves to the cleaner abstraction.

## Rule

👉 Rule: The caller asks for a payment behavior; the factory chooses the implementation.

## Try this

- Run [Assembling Objects With Builder](topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java) and note the first thing that breaks.
- Run [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java) and remove the safety rule or coordination step.
- Run [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java) and compare the result with the naive approach.
