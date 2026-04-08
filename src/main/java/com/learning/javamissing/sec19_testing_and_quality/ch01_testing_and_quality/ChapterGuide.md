# Testing And Quality Learning Kit

## Problem

This chapter shows what breaks when testing and quality is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Checking One Rule With Many Inputs](topics/checking_one_rule_with_many_inputs/CheckingOneRuleWithManyInputs.java)
2. Run [Designing Tests Around Business Rules](topics/designing_tests_around_business_rules/DesigningTestsAroundBusinessRules.java)
3. Run [Writing Readable JUnit Tests](topics/writing_readable_junit_tests/WritingReadableJUnitTests.java)

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        runTaxRuleExample();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a good test starts from the business rule");
        System.out.println("- expected and actual values should be obvious");
        System.out.println("- readable tests are part of code design quality");
    }
```

What happens:

- Real-world problem: checkout code adds tax to prices and must stay correct after changes.
- Mental model: first state the rule, then express it in code.
- Why it matters: the business rule is visible before any test framework syntax appears.

Why it matters:

After this chapter, you can explain the rule behind testing and quality and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        explainWhy();
        showTestShape();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- JUnit gives a structure for executable checks");
        System.out.println("- the value comes from a clear scenario and assertion");
        System.out.println("- a test name should describe behavior");
    }
```

What happens:

- Real-world problem: developers need repeatable verification for a tax-calculation rule.
- Mental model: arrange a scenario, execute behavior, assert the result.
- Why it matters: the method name and assertion make the behavior under test easy to read.

Why it matters:

After this chapter, you can explain the rule behind testing and quality and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Testing And Quality exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Checking One Rule With Many Inputs](topics/checking_one_rule_with_many_inputs/CheckingOneRuleWithManyInputs.java), [Designing Tests Around Business Rules](topics/designing_tests_around_business_rules/DesigningTestsAroundBusinessRules.java), and [Writing Readable JUnit Tests](topics/writing_readable_junit_tests/WritingReadableJUnitTests.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Checking One Rule With Many Inputs](topics/checking_one_rule_with_many_inputs/CheckingOneRuleWithManyInputs.java) starts with the raw behavior, [Designing Tests Around Business Rules](topics/designing_tests_around_business_rules/DesigningTestsAroundBusinessRules.java) adds the safety rule, and [Writing Readable JUnit Tests](topics/writing_readable_junit_tests/WritingReadableJUnitTests.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Checking One Rule With Many Inputs](topics/checking_one_rule_with_many_inputs/CheckingOneRuleWithManyInputs.java) and note the first thing that breaks.
- Run [Designing Tests Around Business Rules](topics/designing_tests_around_business_rules/DesigningTestsAroundBusinessRules.java) and remove the safety rule or coordination step.
- Run [Writing Readable JUnit Tests](topics/writing_readable_junit_tests/WritingReadableJUnitTests.java) and compare the result with the naive approach.
