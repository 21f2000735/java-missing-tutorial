# Creational Patterns

## Why This Chapter Exists

This chapter exists to answer one design question:

How should object creation read once constructors start hiding business intent?

## The Pain Before It

Object creation starts small:

- one constructor
- a few required fields
- no ambiguity about type

Then pressure builds:

- optional values multiply
- callers should not know the concrete implementation
- validation must happen before the object becomes usable
- long parameter lists stop telling a clear story

That is where factory method and builder become useful.

## Java Creator Mindset

Do not start from pattern names. Start from creation pressure.

Ask:

- does the caller know the concrete type already?
- is the main problem type selection or call-site readability?
- would one more constructor make the code harder to read?

Those questions usually tell you whether to use constructors, factories, or builders.

## How You Might Invent It

Imagine two separate problems.

Problem one:

- checkout needs a payment processor
- the caller should ask for `"CARD"` or `"UPI"` behavior
- the implementation choice should stay hidden

Problem two:

- report creation needs required fields plus many optional ones
- the caller already knows it wants a report
- the problem is readability, not type selection

Those two pressures lead to two different creational patterns.

## Naive Attempt

The naive fix is usually one of these:

- keep adding overloaded constructors
- expose every concrete class directly to callers
- push validation into scattered setters after creation

All three work for a while, but they make object creation harder to follow.

## Why It Breaks

That approach breaks when:

- callers must know too much about implementation choice
- positional constructor arguments become hard to verify by eye
- partially built objects are possible before validation is complete

## Final Java Direction

Use a factory when the caller should ask for a capability and the implementation choice should stay hidden.

Use a builder when the caller already knows the type but creation needs to read like a checklist.

Keep plain constructors when the object is still tiny and obvious.

## Study Order

1. Run [Assembling Objects With Builder](topics/assembling_objects_with_builder/AssemblingObjectsWithBuilder.java)
2. Run [Creating Objects With Factory Method](topics/creating_objects_with_factory_method/CreatingObjectsWithFactoryMethod.java)

## What To Notice

- factory hides which implementation gets created
- builder improves how object assembly reads
- neither pattern is automatically better than a small direct constructor

### Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| constructor vs factory | one concrete type is obvious | implementation choice should stay hidden |
| constructor vs builder | only a few required values exist | optional values and readability matter |
| factory vs builder | you need the right implementation | you already know the type but need readable assembly |

### Interview Focus

Q: When is a factory method better than a constructor?  
A: When the caller should depend on behavior while the implementation choice stays inside one creation point.

Q: When is a builder better than telescoping constructors?  
A: When optional values and readability make positional construction error-prone.

## Mental Model

Use this split:

- factory answers "what should be created?"
- builder answers "how should this object be assembled?"

If you mix up those two questions, the patterns start looking interchangeable when they are not.

## Common Mistakes

- using a factory when there is no real selection logic
- using a builder for tiny value objects with obvious required fields
- adding a pattern that makes creation harder to read than before

## Tradeoffs

Factories give you:

- hidden implementation choice
- cleaner caller dependency boundaries

Builders give you:

- readable creation for optional data
- one place for assembly validation

Both cost you:

- more structure
- more types or steps than a plain constructor

## Use / Avoid

### Use It When

- factory fits when callers should ask for behavior, not concrete classes
- builder fits when object assembly needs readable optional steps
- constructors still fit when the object is small, direct, and obvious

### Avoid It When

- there is no real implementation choice to hide
- optional construction is still small enough for one clear constructor
- the pattern would impress more than it would clarify

## Practice

### Case Study

Imagine a reporting module.

- report type is required
- delivery email is optional
- chart inclusion is optional
- row limit is optional

Builder makes that call site read like a checklist.

Now imagine payment processors.

The caller should request card or UPI behavior, not instantiate those classes directly. That is factory territory.

## Summary

After this chapter, you should be able to explain creational patterns as two different creation pressures:

- hide type choice with factories
- improve readable assembly with builders

If neither pressure exists, use a constructor and move on.

## Next Chapter

Move to [Structural Patterns](../ch03_structural_patterns/ChapterGuide.md) after this chapter.
