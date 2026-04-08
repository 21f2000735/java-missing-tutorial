---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 7 min
mode: interview
visual: required
visual_asset: ClassLoadingLifecycleVisual.svg
---

# Class Loading Lifecycle

## Class Loading Lifecycle

**Concept**

This step focuses on: classes are loaded and initialized only when the JVM decides they are needed.

classes are loaded and initialized only when the JVM decides they are needed.

**Example**

```java
    public static void main(String[] args) {
        System.out.println("Concept: classes are loaded and initialized only when the JVM decides they are needed.");
        System.out.println("Accessing CustomerConfig.DEFAULT_REGION triggers class initialization.");
        System.out.println("region = " + CustomerConfig.DEFAULT_REGION);
        System.out.println("Why it works: loading makes class data available, linking prepares it, and initialization runs static setup.");
    }
```

![Class Loading Lifecycle visual](./ClassLoadingLifecycleVisual.svg)

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- classes are loaded and initialized only when the JVM decides they are needed.
- loading makes class data available, linking prepares it, and initialization runs static setup.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

loading makes class data available, linking prepares it, and initialization runs static setup.

**Rule**

👉 Rule: loading makes class data available, linking prepares it, and initialization runs static setup.

**Try this**

- Concept: classes are loaded and initialized only when the JVM decides they are needed.
- Accessing CustomerConfig.DEFAULT_REGION triggers class initialization.
- Why it works: loading makes class data available, linking prepares it, and initialization runs static setup.

- Next: compare this step with the next topic and notice what changes.
