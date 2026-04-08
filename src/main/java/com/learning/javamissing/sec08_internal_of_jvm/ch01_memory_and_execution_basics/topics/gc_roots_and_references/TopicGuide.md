---
introduced: Java 5
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# GC Roots And Reference Types

## GC Roots And Reference Types

**Concept**

GC roots = local variable, active thread, static field, and JNI-style references. Why it matters: strong, soft, weak, and phantom references control how caches and leaks behave.

**Example**

```java
    public static void main(String[] args) {
        String localRoot = "local-root";
        WeakHashMap<Object, String> cache = new WeakHashMap<>();
        Object weakKey = new Object();
        cache.put(weakKey, "cached report");

        WeakReference<String> weakReference = new WeakReference<>("ephemeral");

        System.out.println("GC roots = local variable, active thread, static field, and JNI-style references.");
        System.out.println("strong root = " + localRoot);
        System.out.println("static root = " + STATIC_ROOT);
        System.out.println("weak map size = " + cache.size());
        System.out.println("weak reference present = " + (weakReference.get() != null));
        System.out.println("Why it matters: strong, soft, weak, and phantom references control how caches and leaks behave.");
    }
```

**What happens**

- Run the example and compare the output with the rule in the explanation.
- Change one input or one line.
- Observe what stayed the same and what changed.

**What stays stable**

- strong, soft, weak, and phantom references control how caches and leaks behave.

**What changes**

- The input, state, or execution path is what changes.
- That change is what reveals the behavior you need to understand.

**Why it matters**

This matters because the rule keeps the behavior predictable when the code gets real.

**Rule**

👉 Rule: strong, soft, weak, and phantom references control how caches and leaks behave.

**Try this**

- GC roots = local variable, active thread, static field, and JNI-style references.
