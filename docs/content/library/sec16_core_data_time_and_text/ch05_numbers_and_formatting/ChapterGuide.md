# Numbers And Formatting Learning Kit

## Learning Path

1. Step 1: Start with [Formatting Prices](topics/formatting_prices/FormattingPrices.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Formatting Prices](topics/formatting_prices/FormattingPrices.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Formatting Prices](topics/formatting_prices/FormattingPrices.java) to see the improvement.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Formatting Prices: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Formatting Prices](topics/formatting_prices/FormattingPrices.java)

Example:

```java
    public static void main(String[] args) {
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);
        System.out.println("displayPrice = " + currencyFormat.format(1499.97));
        System.out.println("Concept: business data may be numeric internally but still needs human-friendly presentation.");
    }
```

What happens:

- business data may be numeric internally but still needs human-friendly presentation.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);
        System.out.println("displayPrice = " + currencyFormat.format(1499.97));
        System.out.println("Concept: business data may be numeric internally but still needs human-friendly presentation.");
    }
```

What happens:

- business data may be numeric internally but still needs human-friendly presentation.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Numbers And Formatting exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Formatting Prices](topics/formatting_prices/FormattingPrices.java), [Formatting Prices](topics/formatting_prices/FormattingPrices.java), and [Formatting Prices](topics/formatting_prices/FormattingPrices.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Formatting Prices](topics/formatting_prices/FormattingPrices.java) starts with the raw behavior, [Formatting Prices](topics/formatting_prices/FormattingPrices.java) adds the safety rule, and [Formatting Prices](topics/formatting_prices/FormattingPrices.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Formatting Prices](topics/formatting_prices/FormattingPrices.java) and note the first thing that breaks.
- Run [Formatting Prices](topics/formatting_prices/FormattingPrices.java) and remove the safety rule or coordination step.
- Run [Formatting Prices](topics/formatting_prices/FormattingPrices.java) and compare the result with the naive approach.
