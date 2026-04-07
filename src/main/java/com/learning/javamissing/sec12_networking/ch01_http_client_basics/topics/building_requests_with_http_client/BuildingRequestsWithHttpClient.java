package com.learning.javamissing.sec12_networking.ch01_http_client_basics.topics.building_requests_with_http_client;

import java.net.URI;
import java.net.http.HttpRequest;

public class BuildingRequestsWithHttpClient {
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
}
