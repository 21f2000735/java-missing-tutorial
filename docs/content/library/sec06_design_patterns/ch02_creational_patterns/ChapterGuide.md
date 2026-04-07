# Creational Patterns Learning Kit

This chapter answers one design question that appears everywhere in Java: how should an object be created once construction starts hiding intent or spreading branching across the codebase?

## What Problem This Chapter Solves

Object creation looks simple at first:

- call a constructor
- pass a few values
- move on

Then the pressure grows:

- several optional values appear
- callers should not know the concrete class
- validation rules apply during construction
- positional arguments become hard to read

Creational patterns keep construction readable and controlled.

## Study Order

1. Run [CreatingObjectsWithFactoryMethod.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch02_creational_patterns/topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java)
2. Run [AssemblingObjectsWithBuilder.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch02_creational_patterns/topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java)

## Quick Summary

- factory method hides the concrete implementation choice
- builder makes many optional fields readable and safer
- constructors are still fine when the object is small and obvious
- the best pattern is the one that reduces confusion for the caller

## Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| constructor vs factory | one concrete type is obvious and creation is simple | callers should ask for a capability while implementation choice stays hidden |
| constructor vs builder | there are few arguments and required values are obvious | optional fields, validation, or readability problems are growing |
| factory vs builder | you need the right type returned | you already know the type but construction is becoming hard to read |

## Mini Case Study

Think about a reporting feature.

- the report request needs a required report name
- email delivery is optional
- chart generation is optional
- row limits and export formats may grow later

A constructor becomes noisy quickly. A builder keeps the call readable.  
Now think about payment methods. The caller should ask for “card” or “UPI” behavior without constructing the concrete gateway directly. That is factory territory.

## When To Use

- use factories when callers should not know the concrete type
- use builders when many optional settings exist
- use constructors when the object is still small and obvious

## When Not To Use

- do not add a builder for a three-field object with no ambiguity
- do not hide important business choices behind factories that are hard to trace
- do not use patterns that make creation longer than the object itself

## Interview Focus

Q: When is a factory method useful?  
A: When callers should request a behavior or capability without depending on one concrete class.

Q: When is a builder useful?  
A: When object creation has many optional inputs, readability matters, or validation should happen before the final object is built.

## Effective Java Mapping

- Item 1: Consider static factory methods instead of constructors
- Item 2: Consider a builder when faced with many constructor parameters

## Sources

- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
