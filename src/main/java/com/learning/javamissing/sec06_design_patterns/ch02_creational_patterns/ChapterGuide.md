# Creational Patterns

This chapter is about one question: how should object creation read once construction starts hiding business intent?

## The Story

Creation starts simple:

- call a constructor
- pass a few values
- move on

Then reality arrives:

- optional values start piling up
- callers should not know the concrete class
- validation needs to happen before the object is usable
- long constructor calls stop telling a readable story

That is where factory method and builder become useful.

## Run This First

1. Run [CreatingObjectsWithFactoryMethod.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch02_creational_patterns/topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java)
2. Run [AssemblingObjectsWithBuilder.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch02_creational_patterns/topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java)
3. Ask which example hides implementation choice and which one improves call-site readability

## What To Look For

- factory hides *which type* gets created
- builder improves *how creation reads*
- constructors are still fine when the object is small and obvious

## Use This Pattern When

- use factory when callers should ask for behavior, not concrete classes
- use builder when optional inputs make constructors hard to read
- use plain constructors when the object is still tiny and direct

## Avoid This Pattern When

- avoid factory if there is no real selection logic
- avoid builder for tiny value objects with obvious parameters
- avoid any creational pattern that makes construction harder to follow than before

## Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| constructor vs factory | one concrete type is obvious | implementation choice should stay hidden |
| constructor vs builder | only a few required values exist | optional values and readability matter |
| factory vs builder | you need the right implementation | you already know the type but need readable assembly |

## Small Case Study

Imagine a reporting module.

- report type is required
- delivery email is optional
- charts are optional
- row limit is optional

Builder makes the call look like a checklist.  
Now imagine payment methods.  
The caller should ask for `"CARD"` or `"UPI"` behavior and not construct those classes directly. That is factory territory.

## Interview Focus

Q: When is a factory method better than a constructor?  
A: When the caller should depend on a capability while the implementation choice stays inside one creation point.

Q: When is a builder better than telescoping constructors?  
A: When many optional values make positional arguments unreadable and error-prone.

## Effective Java Mapping

- Item 1: Consider static factory methods instead of constructors
- Item 2: Consider a builder when faced with many constructor parameters

## Sources

- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
