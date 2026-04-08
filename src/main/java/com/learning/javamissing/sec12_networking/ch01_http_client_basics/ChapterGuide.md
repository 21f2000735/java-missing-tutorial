# HTTP Client Basics Learning Kit

## Problem

Many systems call external APIs. Before worrying about retries and resilience, the learner should understand the basic request model.

## Naive Approach

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java)

What to observe:

- Which topic shows the failure first: [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java).
- Which topic narrows the rule: [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java).
- Which topic shows the cleaner abstraction: [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java).

## Improvement

Read the chapter as a small set of related ideas around hTTP Client Basics, not as isolated trivia.

After this chapter, you should be able to explain why Http Client Basics exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: Read the chapter as a small set of related ideas around hTTP Client Basics, not as isolated trivia.

## Try this

- Run [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) and note the first thing that breaks.
- Run [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) and write down what the rule becomes.
- Run [Building Requests With HttpClient](topics/building_requests_with_http_client/BuildingRequestsWithHttpClient.java) and compare the result with the naive approach.
