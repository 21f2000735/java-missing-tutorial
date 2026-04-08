# HTTP Client Basics Learning Kit

## Learning Path

1. Step 1: Start with [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) to see the raw behavior.
2. Step 2: Try the next topic to see the naive approach.
3. Step 3: Watch [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) to find the failure.
4. Step 4: Use the fix step to restore correctness.
5. Step 5: Finish with [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) to see the improvement.

## Problem

This chapter shows what breaks when http client basics is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- The naive choice works for a tiny case and fails when the assumption changes.
- The failure is usually visible in order, ownership, or cleanup.
- The bug matters because the code still looks reasonable at a glance.

## Fix

Run the topics in this order:

1. Run [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java)

Example:

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

What happens:

- Real-world problem: a Java service calls a shipping-rate API.
- Why it works: the request object collects HTTP intent before any network call is made.

Why it matters:

After this chapter, you can explain the rule behind http client basics and choose the right approach with less guesswork.

## Improvement

Example:

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

What happens:

- Real-world problem: a Java service calls a shipping-rate API.
- Why it works: the request object collects HTTP intent before any network call is made.

Why it matters:

After this chapter, you can explain the rule behind http client basics and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Http Client Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java), [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java), and [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) starts with the raw behavior, [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) adds the safety rule, and [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) moves to the cleaner abstraction.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) and note the first thing that breaks.
- Run [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) and remove the safety rule or coordination step.
- Run [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) and compare the result with the naive approach.
