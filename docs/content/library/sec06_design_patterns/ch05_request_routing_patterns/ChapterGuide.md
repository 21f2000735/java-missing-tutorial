# Request Routing Patterns

## Learning Path

1. Step 1: Start with [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) to see the improvement.

## Problem

Request handling often contains several independent checks that should stay separate.

## Naive Approach

- Watch out: if handlers secretly depend on each other, the chain looks modular but behaves like tangled hidden flow.
- Try this next: add an InventoryAvailableHandler before payment and see how easy it is to insert a new rule.

## Failure

- Request Validation Chain: Watch out: if handlers secretly depend on each other, the chain looks modular but behaves like tangled hidden flow.
- Request Validation Chain: Try this next: add an InventoryAvailableHandler before payment and see how easy it is to insert a new rule.

## Fix

Run the topics in this order:

1. Run [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: chain of responsibility");
        System.out.println("Story hook: checkout validation keeps gaining new guardrails, and one giant validation method is turning unreadable.");
        System.out.println("Problem: checkout validation should keep each rule separate and stop early on failure.");
        System.out.println();

        CheckoutHandler chain = new NotEmptyCartHandler(new AddressPresentHandler(new PaymentReadyHandler(null)));

        // Expected output:
        // checkout validation = READY
        System.out.println("checkout validation = " + chain.handle(new CheckoutRequest(true, true, true)));
        System.out.println("Why it works: each handler owns one decision and the chain controls the request flow.");
        System.out.println("Use this when: request handling is a sequence of independent checks that may stop early.");
        System.out.println("Avoid this when: the rules are tiny, fixed, and clearer in one short validation method.");
        System.out.println("Common mistake: hiding one simple validation method behind too many handlers when the rules are tiny and stable.");
        System.out.println("Watch out: if handlers secretly depend on each other, the chain looks modular but behaves like tangled hidden flow.");
        System.out.println("Try this next: add an InventoryAvailableHandler before payment and see how easy it is to insert a new rule.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- each handler checks one rule");
        System.out.println("- the request moves down the chain until a rule fails or the chain finishes");
        System.out.println("- chain of responsibility fits request validation and middleware pipelines");
    }
```

What happens:

- Watch out: if handlers secretly depend on each other, the chain looks modular but behaves like tangled hidden flow.
- Try this next: add an InventoryAvailableHandler before payment and see how easy it is to insert a new rule.

Why it matters:

Request handling often contains several independent checks that should stay separate.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: chain of responsibility");
        System.out.println("Story hook: checkout validation keeps gaining new guardrails, and one giant validation method is turning unreadable.");
        System.out.println("Problem: checkout validation should keep each rule separate and stop early on failure.");
        System.out.println();

        CheckoutHandler chain = new NotEmptyCartHandler(new AddressPresentHandler(new PaymentReadyHandler(null)));

        // Expected output:
        // checkout validation = READY
        System.out.println("checkout validation = " + chain.handle(new CheckoutRequest(true, true, true)));
        System.out.println("Why it works: each handler owns one decision and the chain controls the request flow.");
        System.out.println("Use this when: request handling is a sequence of independent checks that may stop early.");
        System.out.println("Avoid this when: the rules are tiny, fixed, and clearer in one short validation method.");
        System.out.println("Common mistake: hiding one simple validation method behind too many handlers when the rules are tiny and stable.");
        System.out.println("Watch out: if handlers secretly depend on each other, the chain looks modular but behaves like tangled hidden flow.");
        System.out.println("Try this next: add an InventoryAvailableHandler before payment and see how easy it is to insert a new rule.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- each handler checks one rule");
        System.out.println("- the request moves down the chain until a rule fails or the chain finishes");
        System.out.println("- chain of responsibility fits request validation and middleware pipelines");
    }
```

What happens:

- Watch out: if handlers secretly depend on each other, the chain looks modular but behaves like tangled hidden flow.
- Try this next: add an InventoryAvailableHandler before payment and see how easy it is to insert a new rule.

Why it matters:

Request handling often contains several independent checks that should stay separate.

After this chapter, you should be able to explain why Request Routing Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java), [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java), and [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) starts with the raw behavior, [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) adds the safety rule, and [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Each handler decides one rule and forwards the request only if that rule passes.

## Try this

- Run [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) and note the first thing that breaks.
- Run [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) and remove the safety rule or coordination step.
- Run [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) and compare the result with the naive approach.
