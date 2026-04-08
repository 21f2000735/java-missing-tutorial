---
introduced: Java 8
status: stable
runner: embedded
estimated: 6 min
---

# availability freshness

## availability freshness

**Concept**

Marketplace and partner systems need to know whether what they show is still trustworthy.

**Example**

```java
    public static void main(String[] args) {
        SupplierFeedStatus status = new SupplierFeedStatus(
                Instant.parse("2026-04-07T10:00:00Z"),
                Instant.parse("2026-04-07T10:17:00Z")
        );

        // Expected output:
        // isFresh = false
        // syncLagMinutes = 17
        System.out.println("isFresh = " + status.isFresh(Duration.ofMinutes(10)));
        System.out.println("syncLagMinutes = " + status.syncLagMinutes());
        System.out.println("Company lens: HotelTrader answers should mention sync lag and mismatch rate, not just API latency.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- freshness is a measurable property");
        System.out.println("- supplier lag can turn correct code into wrong product behavior");
        System.out.println("- platform APIs need trust metrics, not only uptime metrics");
    }
```

**What happens**

- Company lens: HotelTrader answers should mention sync lag and mismatch rate, not just API latency.
- After reading this example, you should know:
- freshness is a measurable property

**What stays stable**

- Company lens: HotelTrader answers should mention sync lag and mismatch rate, not just API latency. After reading this example, you should know: - freshness is a measurable property - supplier lag can turn correct code into wrong product behavior - platform APIs need trust metrics, not only uptime metrics
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Company lens: HotelTrader answers should mention sync lag and mismatch rate, not just API latency. After reading this example, you should know: - freshness is a measurable property - supplier lag can turn correct code into wrong product behavior - platform APIs need trust metrics, not only uptime metrics
- That change is what reveals the behavior you need to understand.

**Why it matters**

Company lens: HotelTrader answers should mention sync lag and mismatch rate, not just API latency. After reading this example, you should know: - freshness is a measurable property - supplier lag can turn correct code into wrong product behavior - platform APIs need trust metrics, not only uptime metrics

**Rule**

👉 Rule: Company lens: HotelTrader answers should mention sync lag and mismatch rate, not just API latency.

**Try this**

- Keep the last supplier update time. 2. Compare it with now. 3. Mark inventory as stale when the lag is too large.
