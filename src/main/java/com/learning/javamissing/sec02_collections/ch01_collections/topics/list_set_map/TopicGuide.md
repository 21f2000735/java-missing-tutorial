---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
mode: shared
---

# List Set Map

## List Set Map

**Concept**

Java programs stay useful when they are organized around ideas, not only syntax.

**Example**

```java
    public static void main(String[] args) {
        overview();
        wrongExample();
        // Expected output:
        // cartItems keeps duplicates, couponCodes stay unique, quantities support product lookup.
        List<String> cartItems = sampleCartItems();
        Set<String> couponCodes = sampleCouponCodes();
        Map<String, Integer> quantitiesBySku = sampleQuantitiesBySku();
        System.out.println("cartItems = " + cartItems);
        System.out.println("couponCodes = " + couponCodes);
        System.out.println("quantitiesBySku = " + quantitiesBySku);
        System.out.println("What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU.");
        System.out.println("Common confusion: choose List when duplicates or order matter, Set when uniqueness matters, Map when lookup by key matters.");
        System.out.println("Senior note: collection choice affects API clarity, mutation rules, and algorithmic cost.");
    }
```

**What happens**

- What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU.
- Common confusion: choose List when duplicates or order matter, Set when uniqueness matters, Map when lookup by key matters.
- Senior note: collection choice affects API clarity, mutation rules, and algorithmic cost.

**What stays stable**

- What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU. Common confusion: choose List when duplicates or order matter, Set when uniqueness matters, Map when lookup by key matters.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU. Common confusion: choose List when duplicates or order matter, Set when uniqueness matters, Map when lookup by key matters.
- That change is what reveals the behavior you need to understand.

**Why it matters**

What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU. Common confusion: choose List when duplicates or order matter, Set when uniqueness matters, Map when lookup by key matters.

**Rule**

👉 Rule: What to notice: List fits cart order, Set fits unique coupon codes, Map fits product lookup by SKU.

**Try this**

- Identify the business data or behavior. 2. Choose the Java construct that expresses the idea clearly. 3. Run the example and compare the output with the explanation.
