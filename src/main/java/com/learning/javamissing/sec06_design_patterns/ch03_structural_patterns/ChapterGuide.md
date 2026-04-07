# Structural Patterns Learning Kit

This chapter is about making code shapes fit together cleanly. Structural patterns matter when your design is mostly correct, but the boundaries between objects or APIs are getting awkward.

## What Problem This Chapter Solves

You often have code that almost works together:

- your service expects one interface, but a legacy library gives another
- you want to add auditing, caching, retries, or logging without changing the original class

Structural patterns help when the problem is the *shape* of collaboration rather than business logic itself.

## Study Order

1. Run [TranslatingIncompatibleApisWithAdapter.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch03_structural_patterns/topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java)
2. Run [AddingFeaturesWithDecorator.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch03_structural_patterns/topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java)

## Quick Summary

- adapter changes one API shape into another
- decorator keeps the same interface and adds behavior around it
- structural patterns are strongest at boundaries: integrations, wrappers, and extension layers

## Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| adapter | your code and an existing dependency speak different interfaces | you already have the same interface and want extra behavior |
| decorator | the base object should keep the same public contract | you truly need a different public contract |
| subclassing | the base class is meant for extension and change is intrinsic | you want optional add-on behavior without editing the base type |

## Mini Case Study

Imagine a payment service migration.

- old gateway exposes `makePayment`
- new code expects `pay`
- you cannot rewrite the old library

Adapter solves the mismatch.  
Now imagine you need to add auditing around every notification without editing the stable email notifier. Decorator solves that.

## Interview Focus

Q: Adapter vs decorator?  
A: Adapter changes the interface shape. Decorator preserves the interface and adds behavior around it.

Q: Why use decorator instead of subclassing?  
A: Because it adds behavior without modifying or tightly coupling to the base implementation hierarchy.

## Sources

- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Refactoring.Guru Pattern Catalog: https://refactoring.guru/design-patterns/catalog
