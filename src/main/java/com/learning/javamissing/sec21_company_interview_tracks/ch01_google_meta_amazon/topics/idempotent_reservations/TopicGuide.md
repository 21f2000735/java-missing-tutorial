---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# Idempotent Reservations

## The Problem

Reservation and booking systems always get retries.
The wrong answer is to trust the client not to retry.

## Run This Code

Run the same request twice and notice that only one reservation is created.

## Company Lens

- Amazon: ownership and customer trust
- Meta: practical backend safety under retry storms

## Strong Interview Answer

Mention:

- request id or idempotency key
- durable result storage
- same result returned on duplicate call
- metric: duplicate request rate and overbooking incidents

## Next Topic

Read `LatencyDebugPlaybook` next. It shows how to answer release-regression questions without hand-waving.
