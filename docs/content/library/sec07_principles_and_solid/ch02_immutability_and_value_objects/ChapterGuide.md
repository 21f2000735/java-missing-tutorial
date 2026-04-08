# Immutability And Value Objects Learning Kit

## Learning Path

1. Step 1: Start with [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) to see the improvement.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Protecting Invoice Data: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java)

Example:

```java
    public static void main(String[] args) {
        Invoice invoice = new Invoice("INV-101", 4_500);
        System.out.println("invoice = " + invoice);
        System.out.println("Concept: immutable value objects keep important business facts stable.");
    }
```

What happens:

- immutable value objects keep important business facts stable.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        Invoice invoice = new Invoice("INV-101", 4_500);
        System.out.println("invoice = " + invoice);
        System.out.println("Concept: immutable value objects keep important business facts stable.");
    }
```

What happens:

- immutable value objects keep important business facts stable.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Immutability And Value Objects exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java), [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java), and [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) starts with the raw behavior, [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) adds the safety rule, and [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) and note the first thing that breaks.
- Run [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) and remove the safety rule or coordination step.
- Run [Protecting Invoice Data](topics/protecting_invoice_data/ProtectingInvoiceData.java) and compare the result with the naive approach.
