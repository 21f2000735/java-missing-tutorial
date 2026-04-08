---
introduced: Java 11
status: stable
runner: embedded
estimated: 7 min
---

# Building Requests With HttpClient

## Building Requests With HttpClient

**Concept**

build a clear outbound HTTP request

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

- a Java service calls a shipping-rate API.

**What stays stable**

- build a clear outbound HTTP request
- the request object collects HTTP intent before any network call is made.

**What changes**

- a Java service calls a shipping-rate API.

**Why it matters**

the request object collects HTTP intent before any network call is made. a Java service calls a shipping-rate API.

**Rule**

👉 Rule: the request object collects HTTP intent before any network call is made.

**Try this**

- Concept: build a clear outbound HTTP request
- Real-world problem: a Java service calls a shipping-rate API.
- Why it works: the request object collects HTTP intent before any network call is made.
