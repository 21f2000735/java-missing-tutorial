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

Concept: class identity is class name plus class loader.

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

- Concept: class identity is class name plus class loader.

**What stays stable**

- Concept: class identity is class name plus class loader. Why it matters: hot-deploy containers rely on unloading whole class loaders, not just individual classes.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: class identity is class name plus class loader. Why it matters: hot-deploy containers rely on unloading whole class loaders, not just individual classes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: class identity is class name plus class loader. Why it matters: hot-deploy containers rely on unloading whole class loaders, not just individual classes.

**Rule**

👉 Rule: Concept: class identity is class name plus class loader.

**Try this**

- Concept: class identity is class name plus class loader.
