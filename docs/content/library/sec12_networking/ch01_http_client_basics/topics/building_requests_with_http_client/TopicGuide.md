---
introduced: Java 11
status: stable
runner: embedded
estimated: 7 min
---

# Building Requests With HttpClient

## The Problem

Modern Java applications call external services all the time.

Even the basic request should still read clearly:

- where are we calling?
- what method are we using?
- what format do we expect back?

## Run This Code

Run the example and check the request method and host.

## Expected Output

- method is `GET`
- host is `api.example.com`

## ❌ Bad Code

Scatter request details across many lines or helper methods so the actual HTTP intent is hard to see.

## ✅ Better Code

Build the request in one small readable block:

- URI
- headers
- method

That keeps the outbound call easy to review.

## Why This Works

The request object captures HTTP intent before the call happens.  
That improves readability and makes future changes safer.

## Use This When

- you want a clear standard-library HTTP client
- outbound service calls are part of your everyday code

## Avoid This When

- request-building is so abstracted that readers cannot tell what the call is doing

## Version Notes

The standard HTTP client became available in Java 11, which is one reason 11 remains an important learning and migration milestone.

## Next Topic

Read exception handling and retry-related topics next, because networking and failure handling are tightly connected.
