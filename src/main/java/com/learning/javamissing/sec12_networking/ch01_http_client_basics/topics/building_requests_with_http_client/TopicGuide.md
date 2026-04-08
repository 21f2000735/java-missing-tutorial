---
introduced: Java 11
status: stable
runner: embedded
estimated: 7 min
---

# Building Requests With HttpClient

## Building Requests With HttpClient

**Concept**

Concept: build a clear outbound HTTP request

**Example**

```java
    public static void main(String[] args) {
        System.out.println("Concept: build a clear outbound HTTP request");
        System.out.println("Real-world problem: a Java service calls a shipping-rate API.");
        System.out.println();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.example.com/shipping/rates"))
                .header("Accept", "application/json")
                .GET()
                .build();

        // Expected output:
        // method = GET
        // host = api.example.com
        System.out.println("method = " + request.method());
        System.out.println("host = " + request.uri().getHost());
        System.out.println("Why it works: the request object collects HTTP intent before any network call is made.");
    }
```

**What happens**

- Concept: build a clear outbound HTTP request
- Real-world problem: a Java service calls a shipping-rate API.
- Why it works: the request object collects HTTP intent before any network call is made.

**What stays stable**

- Concept: build a clear outbound HTTP request Real-world problem: a Java service calls a shipping-rate API. Why it works: the request object collects HTTP intent before any network call is made.
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Concept: build a clear outbound HTTP request Real-world problem: a Java service calls a shipping-rate API. Why it works: the request object collects HTTP intent before any network call is made.
- That change is what reveals the behavior you need to understand.

**Why it matters**

Concept: build a clear outbound HTTP request Real-world problem: a Java service calls a shipping-rate API. Why it works: the request object collects HTTP intent before any network call is made.

**Rule**

👉 Rule: Concept: build a clear outbound HTTP request Real-world problem: a Java service calls a shipping-rate API.

**Try this**

- Concept: build a clear outbound HTTP request
- Real-world problem: a Java service calls a shipping-rate API.
- Why it works: the request object collects HTTP intent before any network call is made.
