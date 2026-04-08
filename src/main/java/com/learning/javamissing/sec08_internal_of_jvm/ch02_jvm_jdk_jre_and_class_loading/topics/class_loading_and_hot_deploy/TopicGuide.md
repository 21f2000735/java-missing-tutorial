---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Class Loading And Hot Deploy

## Topic / Problem
- Real problem: application servers need to reload code without restarting the whole process.
- Why this Java feature: class loader boundaries decide when a class is considered the same or different.

Bad code:
```java
// assume one class name always means one class identity
```
Good code:
```java
ClassLoader loader = SomeClass.class.getClassLoader();
```

## Intuition
- A class is identified by its name and the loader that loaded it.
- Hot deploy works by dropping an old loader and creating a fresh one.
- Comparison table:

| Loader layer | Role | Example |
| --- | --- | --- |
| Bootstrap | core JDK classes | `String`, `Object` |
| Application | app classes | your service code |
| Hot-deploy loader | replaceable module | webapp reload |

## Small Code Snippet
- The runnable example prints the active class loader and shows the same class object in one loader.
- Expected output:
  - `app loader = AppClassLoader`
  - `same class object = true`

## Internal Working
- Delegation usually flows parent first.
- Class unloading happens only when the class loader itself becomes unreachable.
- Trap callout: two classes with the same name can still be different if they came from different loaders.

## Comparison With Other
- Normal application startup loads once and stays put.
- Hot deploy replaces the loader boundary to reload code.
- OSGi and app servers use loader isolation for modular behavior.

## Famous Company Interview Question
Q: Why is class identity tied to the class loader?
A: Because the same bytecode may need to exist twice in different isolated modules.

Q: When can a class be unloaded?
A: When its class loader is no longer reachable.

Q: Why is this important in hot deploy?
A: It lets the server replace a module without restarting the JVM.
