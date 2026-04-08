# JUnit 5 And Test Doubles Learning Kit

## Problem

This chapter shows what breaks when junit 5 and test doubles is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Junit5 Lifecycle And Parameters](topics/junit5_lifecycle_and_parameters/Junit5LifecycleAndParameters.java)
2. Run [Test Doubles And Verification](topics/test_doubles_and_verification/TestDoublesAndVerification.java)

Example:

```java
    public static void main(String[] args) {
        FakeNotifier notifier = new FakeNotifier();
        RegistrationService service = new RegistrationService(notifier);
        service.register("lee@example.com");

        // Expected output:
        // sentTo = lee@example.com
        System.out.println("sentTo = " + notifier.lastRecipient);
        System.out.println("Why it matters: Mockito automates this style of stubbing and verification, but the core skill is isolating collaborators with a controllable test double.");
    }
```

What happens:

- Mockito automates this style of stubbing and verification, but the core skill is isolating collaborators with a controllable test double.

Why it matters:

After this chapter, you can explain the rule behind junit 5 and test doubles and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        FakeNotifier notifier = new FakeNotifier();
        RegistrationService service = new RegistrationService(notifier);
        service.register("lee@example.com");

        // Expected output:
        // sentTo = lee@example.com
        System.out.println("sentTo = " + notifier.lastRecipient);
        System.out.println("Why it matters: Mockito automates this style of stubbing and verification, but the core skill is isolating collaborators with a controllable test double.");
    }
```

What happens:

- Mockito automates this style of stubbing and verification, but the core skill is isolating collaborators with a controllable test double.

Why it matters:

After this chapter, you can explain the rule behind junit 5 and test doubles and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Junit5 And Test Doubles exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Junit5 Lifecycle And Parameters](topics/junit5_lifecycle_and_parameters/Junit5LifecycleAndParameters.java), [Test Doubles And Verification](topics/test_doubles_and_verification/TestDoublesAndVerification.java), and [Test Doubles And Verification](topics/test_doubles_and_verification/TestDoublesAndVerification.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Junit5 Lifecycle And Parameters](topics/junit5_lifecycle_and_parameters/Junit5LifecycleAndParameters.java) starts with the raw behavior, [Test Doubles And Verification](topics/test_doubles_and_verification/TestDoublesAndVerification.java) adds the safety rule, and [Test Doubles And Verification](topics/test_doubles_and_verification/TestDoublesAndVerification.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Junit5 Lifecycle And Parameters](topics/junit5_lifecycle_and_parameters/Junit5LifecycleAndParameters.java) and note the first thing that breaks.
- Run [Test Doubles And Verification](topics/test_doubles_and_verification/TestDoublesAndVerification.java) and remove the safety rule or coordination step.
- Run [Test Doubles And Verification](topics/test_doubles_and_verification/TestDoublesAndVerification.java) and compare the result with the naive approach.
