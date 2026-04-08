---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Class Loading And Hot Deploy

## Class Loading And Hot Deploy

**Concept**

class identity is class name plus class loader.

**Example**

```java
    public static void main(String[] args) {
        ClassLoader appLoader = ClassLoadingAndHotDeploy.class.getClassLoader();
        System.out.println("Concept: class identity is class name plus class loader.");
        System.out.println("app loader = " + appLoader.getClass().getSimpleName());
        System.out.println("same class object = " + (Widget.class == Widget.class));
        System.out.println("Why it matters: hot-deploy containers rely on unloading whole class loaders, not just individual classes.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- class identity is class name plus class loader.
- hot-deploy containers rely on unloading whole class loaders, not just individual classes.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: hot-deploy containers rely on unloading whole class loaders, not just individual classes.

**Try this**

- Concept: class identity is class name plus class loader.
