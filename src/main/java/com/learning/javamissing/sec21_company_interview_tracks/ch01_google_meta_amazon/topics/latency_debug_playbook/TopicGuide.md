---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# latency debug playbook

## latency debug playbook

**Concept**

Strong companies care how you debug production regressions, not just how you code fresh features.

**Example**

```java
    public static void main(String[] args) {
        List<ComponentLatency> baseline = List.of(
                new ComponentLatency("gateway", 22),
                new ComponentLatency("pricing-api", 40),
                new ComponentLatency("inventory-api", 35)
        );
        List<ComponentLatency> current = List.of(
                new ComponentLatency("gateway", 25),
                new ComponentLatency("pricing-api", 150),
                new ComponentLatency("inventory-api", 39)
        );

        Regression regression = findPrimaryRegression(baseline, current);

        // Expected output:
        // primaryRegression = pricing-api
        // latencyDeltaMs = 110
        System.out.println("primaryRegression = " + regression.component());
        System.out.println("latencyDeltaMs = " + regression.deltaMs());
        System.out.println("Why it works: the approach compares metrics first and guesses later.");
        System.out.println("Company lens: Google values methodical debugging and measurable reasoning.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- compare before and after before chasing symptoms");
        System.out.println("- isolate the biggest regression first");
        System.out.println("- good debugging answers mention rollback, metrics, and blast radius");
    }
```

**What happens**

- Why it works: the approach compares metrics first and guesses later.
- Company lens: Google values methodical debugging and measurable reasoning.
- After reading this example, you should know:

**What stays stable**

- Why it works: the approach compares metrics first and guesses later. Company lens: Google values methodical debugging and measurable reasoning.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Why it works: the approach compares metrics first and guesses later. Company lens: Google values methodical debugging and measurable reasoning.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Why it works: the approach compares metrics first and guesses later. Company lens: Google values methodical debugging and measurable reasoning.

**Rule**

👉 Rule: Why it works: the approach compares metrics first and guesses later.

**Try this**

- Model component timings. 2. Compare baselines with the new release. 3. Inspect the largest regression first.
