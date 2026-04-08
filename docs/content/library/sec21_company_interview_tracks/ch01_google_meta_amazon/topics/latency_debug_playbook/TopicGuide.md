---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# latency debug playbook

## latency debug playbook

**Concept**

This step focuses on: Strong companies care how you debug production regressions, not just how you code fresh features.

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

- compare before and after before chasing symptoms

**What stays stable**

- compare before and after before chasing symptoms
- the approach compares metrics first and guesses later.

**What changes**

- It shows a disciplined way to find the likely bottleneck instead of guessing.

**Why it matters**

the approach compares metrics first and guesses later.

**Rule**

👉 Rule: compare before and after before chasing symptoms

**Try this**

- Model component timings. 2. Compare baselines with the new release. 3. Inspect the largest regression first.

- Next: compare this step with the next topic and notice what changes.
