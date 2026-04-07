---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
mode: interview
---

# Idempotent Reservations

## Why This Exists

Reservation systems live in a world of retries.

Networks time out, clients retry, and load balancers repeat requests. If the server treats every retry as a brand-new reservation, the system creates duplicate business actions.

## The Pain Before It

A booking endpoint often receives the same intent more than once:

- the user taps again
- the mobile app retries
- the client never received the first success response

Without duplicate protection, one user action can create multiple reservations or overbook limited inventory.

## Java Creator Mindset

The important idea is not "use a map." The important idea is "give the business action a stable identity."

Once the request has an idempotency key, the server can:

- store the first result
- return the same result on retry
- avoid repeating the side effect

## How You Might Invent It

Start with the business promise:

"If the same reservation request arrives again, the customer should get the same answer, not a second booking."

That promise naturally pushes you toward request identity and stored results.

## Naive Attempt

Write the reservation logic as if every request is brand new:

- create the reservation
- decrement capacity
- return success

This works in the happy path demo and fails under retry pressure.

## Why It Breaks

The same logical request can be processed twice.

That creates risks like:

- duplicate reservations
- incorrect inventory counts
- hard-to-explain customer support cases

The failure is not only technical. It is a business correctness failure.

## Final Java Solution

The runnable example uses a `requestId` as the stable key.

`ReservationService.reserve(...)` stores the first `ReservationResult` in `resultsByRequestId` and returns that stored value for the same request on later calls. In the sample run, the status is `RESERVED` both times, but `createdReservationCount()` stays at `1`.

## Code

### Run It

Run the same request twice and notice that only one reservation is created.

### Expected Result

- `firstResult = RESERVED`
- `secondResult = RESERVED`
- `reservationsCreated = 1`

## Walkthrough

The key line is `computeIfAbsent(requestId, ...)`.

That line says:

- if this request id was already seen, reuse the stored result
- if not, create the reservation once and save the result

That is enough to demonstrate the interview idea clearly: duplicate calls should repeat the answer, not the side effect.

## Mental Model

Think of idempotency as a receipt:

- the first successful request creates the receipt
- later retries show the same receipt
- the business action is not performed again

The request id is how the server recognizes that the receipt already exists.

## Mistakes

- trusting the client not to retry
- generating a new idempotency key on each retry
- storing the key but not the result
- protecting only the HTTP layer without protecting the business action itself

## Tradeoffs

| Gain | Cost |
| --- | --- |
| prevents duplicate business actions | needs stable request identity |
| makes retries safe | needs durable storage in real systems |
| improves customer trust and operational clarity | adds lifecycle rules for stored results |

For interviews, mention that an in-memory map is only a teaching model. Real systems usually need shared durable storage.

## Use / Avoid

### Use It When

- the action changes money, inventory, seats, orders, or reservations
- retries are normal and expected
- duplicate execution would create business damage

### Avoid It When

- the operation is naturally read-only
- the action has no meaningful side effect to protect
- you are using the word idempotent without defining the stable identity rule

## Summary

- retries are normal in booking and checkout systems
- idempotency means the same logical request should return the same result
- the core move is stable request identity plus stored first result
- a strong interview answer ties idempotency to business correctness, not only API style

## Company Lens

- Amazon: ownership, trust, and customer-impact prevention
- Meta: robust backend behavior under retry storms and distributed failure

## Strong Interview Answer

Use an idempotency key, store the first successful result durably, and return that same result on duplicate calls so retries do not repeat the business side effect.

## Next Topic

Read `LatencyDebugPlaybook` next. It pairs well with this topic because both are about handling real production behavior instead of ideal demos.
