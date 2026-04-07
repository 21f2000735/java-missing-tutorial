# Creational Patterns Learning Kit

This chapter covers the common question: how should an object be created when construction logic starts becoming messy?

## Study Order

1. Run [CreatingObjectsWithFactoryMethod.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch02_creational_patterns/topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java)
2. Run [AssemblingObjectsWithBuilder.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch02_creational_patterns/topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java)

## What You Learn

- when a factory method removes object-creation branching from callers
- when a builder makes many optional fields easier to read
- when simple constructors are still the better choice

## Compare With

- constructor vs factory:
  a constructor always exposes one concrete class, a factory can hide the concrete choice
- telescoping constructor vs builder:
  a builder is clearer when many optional settings exist

## Interview Focus

Q: When is a factory method useful?  
A: When callers should ask for a capability and not care about the concrete class.

Q: When is a builder useful?  
A: When object creation has many optional inputs and readability matters more than minimal code.

## Effective Java Mapping

- Item 1: Consider static factory methods instead of constructors
- Item 2: Consider a builder when faced with many constructor parameters

## Sources

- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
