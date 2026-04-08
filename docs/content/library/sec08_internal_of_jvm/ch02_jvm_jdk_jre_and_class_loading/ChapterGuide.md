# JVM, JDK, JRE, And Class Loading Learning Kit

## Problem

This chapter shows what breaks when jvm, jdk, jre, and class loading is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Class Loading And Hot Deploy](topics/class_loading_and_hot_deploy/ClassLoadingAndHotDeploy.java)
2. Run [Class Loading Lifecycle](topics/class_loading_lifecycle/ClassLoadingLifecycle.java)
3. Run [Runtime Layers](topics/runtime_layers/RuntimeLayers.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: classes are loaded and initialized only when the JVM decides they are needed.");
        System.out.println("Accessing CustomerConfig.DEFAULT_REGION triggers class initialization.");
        System.out.println("region = " + CustomerConfig.DEFAULT_REGION);
        System.out.println("Why it works: loading makes class data available, linking prepares it, and initialization runs static setup.");
    }
```

What happens:

- Accessing CustomerConfig.DEFAULT_REGION triggers class initialization.
- Why it works: loading makes class data available, linking prepares it, and initialization runs static setup.
- CustomerConfig static initialization running

Why it matters:

After this chapter, you can explain the rule behind jvm, jdk, jre, and class loading and choose the right approach with less guesswork.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: JVM, JRE, and JDK answer different questions.");
        System.out.println("Real-world problem: a new developer can run code in the IDE but cannot explain what the runtime and toolchain actually are.");
        System.out.println();

        // Expected output:
        // JVM = executes bytecode
        // JRE = runtime pieces needed to run Java programs
        // JDK = tools + runtime for developing Java
        System.out.println("JVM = executes bytecode");
        System.out.println("JRE = runtime pieces needed to run Java programs");
        System.out.println("JDK = tools + runtime for developing Java");
        System.out.println("Why it matters: the JDK contains tools like javac, while the JVM is the execution engine inside the larger runtime story.");
    }
```

What happens:

- Real-world problem: a new developer can run code in the IDE but cannot explain what the runtime and toolchain actually are.
- JVM = executes bytecode
- JRE = runtime pieces needed to run Java programs

Why it matters:

After this chapter, you can explain the rule behind jvm, jdk, jre, and class loading and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Jvm Jdk Jre And Class Loading exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Class Loading And Hot Deploy](topics/class_loading_and_hot_deploy/ClassLoadingAndHotDeploy.java), [Class Loading Lifecycle](topics/class_loading_lifecycle/ClassLoadingLifecycle.java), and [Runtime Layers](topics/runtime_layers/RuntimeLayers.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Class Loading And Hot Deploy](topics/class_loading_and_hot_deploy/ClassLoadingAndHotDeploy.java) starts with the raw behavior, [Class Loading Lifecycle](topics/class_loading_lifecycle/ClassLoadingLifecycle.java) adds the safety rule, and [Runtime Layers](topics/runtime_layers/RuntimeLayers.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Class Loading And Hot Deploy](topics/class_loading_and_hot_deploy/ClassLoadingAndHotDeploy.java) and note the first thing that breaks.
- Run [Class Loading Lifecycle](topics/class_loading_lifecycle/ClassLoadingLifecycle.java) and remove the safety rule or coordination step.
- Run [Runtime Layers](topics/runtime_layers/RuntimeLayers.java) and compare the result with the naive approach.
