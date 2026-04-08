---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# resilient signup flow

## resilient signup flow

**Concept**

Distributed systems fail in pieces, not all at once.

**Example**

```java
    public static void main(String[] args) {
        SignupResult result = signup();

        // Expected output:
        // signupStatus = PARTIAL_SUCCESS
        System.out.println("signupStatus = " + result.status());
        System.out.println("deferredActions = " + result.deferredActions());
        System.out.println("Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- not every dependency deserves the same failure boundary");
        System.out.println("- degraded success can be better than total failure");
        System.out.println("- reliability answers need explicit recovery plans");
    }
```

**What happens**

- Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic.
- After reading this example, you should know:
- not every dependency deserves the same failure boundary

**What stays stable**

- Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic. After reading this example, you should know: - not every dependency deserves the same failure boundary - degraded success can be better than total failure - reliability answers need explicit recovery plans
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic. After reading this example, you should know: - not every dependency deserves the same failure boundary - degraded success can be better than total failure - reliability answers need explicit recovery plans
- That change is what reveals the behavior you need to understand.

**Why it matters**

Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic. After reading this example, you should know: - not every dependency deserves the same failure boundary - degraded success can be better than total failure - reliability answers need explicit recovery plans

**Rule**

👉 Rule: Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic.

**Try this**

- Run critical steps first. 2. Catch non-critical failure separately. 3. Return an honest degraded result.
