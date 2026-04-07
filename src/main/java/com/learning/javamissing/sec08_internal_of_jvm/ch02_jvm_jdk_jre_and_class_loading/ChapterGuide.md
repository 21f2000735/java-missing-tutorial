# JVM, JDK, JRE, And Class Loading Learning Kit

## Why This Chapter Exists

This chapter exists because Java runtime language is often repeated without separation:

- JVM
- JRE
- JDK
- class loading

In interviews, people say the words correctly but mix up their responsibilities.

## The Pain Before It

Common weak answers sound like this:

- "JDK is Java."
- "JVM and JRE are basically the same."
- "Class loading happens before the program starts."

Those answers are not fully wrong, but they are too blurry to survive follow-up questions.

## Java Creator Mindset

Think in layers:

- JDK answers "how do I build and develop?"
- JVM answers "what executes bytecode?"
- runtime layering answers "what is needed to run?"
- class loading answers "when does this class become active?"

Each term solves a different runtime question.

## How You Might Invent It

If Java had only one giant concept called "runtime," developers would constantly mix up:

- development tools
- execution engine
- libraries required for running code

Likewise, if every class initialized eagerly at startup, startup cost and static side effects would become harder to manage.

So Java separates both:

- toolchain layers
- class activation lifecycle

## Naive Attempt

The naive approach is to memorize definitions as one-line glossary entries and stop there.

That creates recognition without operational understanding.

## Why It Breaks

That breaks when interviewers ask:

- why do I need a JDK locally but only a runtime in some environments?
- what exactly triggers static initialization?
- why did touching one static field print output before `main()` continued?

## Final Java Direction

Use this chapter to separate two ideas clearly:

- runtime layers: JDK, JRE, JVM
- class lifecycle: loading, linking, initialization

One is about responsibilities. The other is about timing.

## Study Order

1. Run [RuntimeLayers.java](topics/runtime_layers/RuntimeLayers.java)
2. Run [ClassLoadingLifecycle.java](topics/class_loading_lifecycle/ClassLoadingLifecycle.java)
3. Explain why the second example prints static initialization output exactly when it does

## What To Notice

- the JDK contains development tools such as `javac`
- the JVM is the execution engine, not the whole toolchain
- class initialization is lazy enough to be triggered by actual use

### Compare With

| Compare | Left Side | Right Side |
| --- | --- | --- |
| JDK vs JVM | development tools plus runtime pieces | execution engine for bytecode |
| loading vs initialization | making class data available | running static setup |
| compile time vs runtime | producing bytecode | executing and activating code |

### Interview Focus

Q: What is the shortest correct difference between JDK and JVM?  
A: The JDK is for building Java programs; the JVM is the engine that executes Java bytecode.

Q: What usually triggers class initialization?  
A: First active use, such as reading a non-constant static field or calling a static method.

## Mental Model

Think of the JDK/JVM/JRE part as layers of responsibility.

Think of class loading as a timeline:

1. class becomes known
2. JVM prepares it
3. static initialization runs when needed

## Common Mistakes

- treating JVM as the whole Java development stack
- saying "class loading" when you really mean "class initialization"
- assuming all static setup happens eagerly at startup

## Tradeoffs

Java gains:

- clear tool/runtime separation
- delayed activation of classes
- more controlled startup behavior

The cost is:

- more terminology
- more chances for vague explanations if the layers are not kept separate

## Use / Avoid

### Use It When

- you are preparing for JVM interviews
- you need to explain startup behavior
- you are debugging static initialization surprises

### Avoid It When

- you are collapsing all runtime concepts into one fuzzy definition

## Practice

### Small Exercise

Change the class-loading example so the static field is not touched. Then explain what output should disappear and why.

## Summary

After this chapter, you should be able to answer two different questions clearly:

- what piece of Java is responsible for building versus running code?
- when does a class actually become initialized?

## Sources

- Java Language Specification: https://docs.oracle.com/javase/specs/
