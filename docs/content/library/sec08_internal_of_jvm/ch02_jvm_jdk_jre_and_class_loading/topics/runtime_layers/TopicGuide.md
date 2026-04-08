---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 6 min
mode: interview
visual: required
visual_asset: RuntimeLayersVisual.svg
---

# Runtime Layers

## Runtime Layers

**Concept**

JVM, JRE, and JDK answer different questions.

**Example**

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

![Runtime Layers visual](./RuntimeLayersVisual.svg)

**What happens**

- a new developer can run code in the IDE but cannot explain what the runtime and toolchain actually are.

**What stays stable**

- JVM, JRE, and JDK answer different questions.
- the JDK contains tools like javac, while the JVM is the execution engine inside the larger runtime story.

**What changes**

- a new developer can run code in the IDE but cannot explain what the runtime and toolchain actually are.

**Why it matters**

a new developer can run code in the IDE but cannot explain what the runtime and toolchain actually are.

**Rule**

👉 Rule: the JDK contains tools like javac, while the JVM is the execution engine inside the larger runtime story.

**Try this**

- Concept: JVM, JRE, and JDK answer different questions.
- Real-world problem: a new developer can run code in the IDE but cannot explain what the runtime and toolchain actually are.
- JVM = executes bytecode
