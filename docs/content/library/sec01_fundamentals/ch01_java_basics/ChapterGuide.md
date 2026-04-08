# Java Basics Learning Kit

## Learning Path

1. Step 1: Start with [Designing Small Methods](topics/designing_small_methods/DesigningSmallMethods.java) to see the raw behavior.
2. Step 2: Try [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java) to see the naive approach.
3. Step 3: Watch [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java) to find the failure.
4. Step 4: Use [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java) to restore correctness.
5. Step 5: Finish with [Storing And Naming Values](topics/storing_and_naming_values/StoringAndNamingValues.java) to see the improvement.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

- A method named process() that prints, calculates, and updates state at the same time is hard to reuse.
- Topic: Methods
- Chapter: Java Basics

## Failure

- Designing Small Methods: A method named process() that prints, calculates, and updates state at the same time is hard to reuse.
- Designing Small Methods: Topic: Methods
- Making Decisions And Repeating Work: Using a deeply nested if/else block for a tiny decision makes the code harder to read.
- Making Decisions And Repeating Work: Topic: Control Flow

## Fix

Run the topics in this order:

1. Run [Designing Small Methods](topics/designing_small_methods/DesigningSmallMethods.java)
2. Run [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java)
3. Run [Storing And Naming Values](topics/storing_and_naming_values/StoringAndNamingValues.java)

Example:

```java
    public static void main(String[] args) {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }
```

What happens:

- Using a deeply nested if/else block for a tiny decision makes the code harder to read.
- Topic: Control Flow
- Chapter: Java Basics

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        printOverview();
        wrongExample();
        basicExample();
        betterExample();
        commonPitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }
```

What happens:

- double price = 19.99;
- double total = 3 * price;
- Problem: this works, but double is a weak teaching choice for money because decimal precision can confuse beginners.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Java Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Designing Small Methods](topics/designing_small_methods/DesigningSmallMethods.java), [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java), and [Storing And Naming Values](topics/storing_and_naming_values/StoringAndNamingValues.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Designing Small Methods](topics/designing_small_methods/DesigningSmallMethods.java) starts with the raw behavior, [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java) adds the safety rule, and [Storing And Naming Values](topics/storing_and_naming_values/StoringAndNamingValues.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Designing Small Methods](topics/designing_small_methods/DesigningSmallMethods.java) and note the first thing that breaks.
- Run [Making Decisions And Repeating Work](topics/making_decisions_and_repeating_work/MakingDecisionsAndRepeatingWork.java) and remove the safety rule or coordination step.
- Run [Storing And Naming Values](topics/storing_and_naming_values/StoringAndNamingValues.java) and compare the result with the naive approach.
