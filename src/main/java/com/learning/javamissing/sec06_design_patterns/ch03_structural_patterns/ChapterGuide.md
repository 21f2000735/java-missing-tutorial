# Structural Patterns

## Problem

Structural patterns help when the business logic is mostly fine, but the edges between parts of the code are awkward.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- avoid adapter if you control both sides and can align the interface directly
- avoid decorator if the "extra behavior" is really a different service with a different responsibility
- avoid creating wrappers that hide where the real work happens

## Fix

Run the topics in this order:

1. Run [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java)
2. Run [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java)

What to observe:

- Which topic shows the failure first: [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java).
- Which topic narrows the rule: [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java).
- Which topic shows the cleaner abstraction: [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java).

## Improvement

Read the chapter as a small set of related ideas around structural Patterns, not as isolated trivia.

After this chapter, you should be able to explain why Structural Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

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

👉 Rule: Read the chapter as a small set of related ideas around structural Patterns, not as isolated trivia.

## Try this

- Run [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java) and note the first thing that breaks.
- Run [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) and write down what the rule becomes.
- Run [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java) and compare the result with the naive approach.
