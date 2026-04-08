# Request Routing Patterns

## Problem

This chapter focuses on chain of responsibility because request processing is where design patterns stop feeling theoretical very quickly.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- the rules are tiny and very stable
- one short method is still easier to explain
- handlers secretly depend on each other and stop being independent

## Fix

Run the topics in this order:

1. Run [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java)

What to observe:

- Which topic shows the failure first: [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java).
- Which topic narrows the rule: [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java).
- Which topic shows the cleaner abstraction: [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java).

## Improvement

Read the chapter as a small set of related ideas around request Routing Patterns, not as isolated trivia.

After this chapter, you should be able to explain why Request Routing Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: Read the chapter as a small set of related ideas around request Routing Patterns, not as isolated trivia.

## Try this

- Run [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) and note the first thing that breaks.
- Run [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) and write down what the rule becomes.
- Run [Request Validation Chain](topics/request_validation_chain/RequestValidationChain.java) and compare the result with the naive approach.
