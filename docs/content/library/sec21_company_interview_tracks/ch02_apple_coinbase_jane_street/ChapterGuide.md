# Apple, Coinbase, Jane Street

## Learning Path

1. Step 1: Start with [running median prices](topics/running_median_prices/RunningMedianPrices.java) to see the raw behavior.
2. Step 2: Try [safe API design](topics/safe_api_design/SafeApiDesign.java) to see the naive approach.
3. Step 3: Watch [safe API design](topics/safe_api_design/SafeApiDesign.java) to find the failure.
4. Step 4: Use [safe API design](topics/safe_api_design/SafeApiDesign.java) to restore correctness.
5. Step 5: Finish with [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java) to see the improvement.

## Problem

Some interviewers want to see whether you can keep an invariant while data keeps arriving.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- running median prices: Some interviewers want to see whether you can keep an invariant while data keeps arriving.
- safe API design: Good APIs reduce misuse before misuse becomes a production incident.
- transfer idempotency: Payment and transfer APIs must survive retries without moving money twice.

## Fix

Run the topics in this order:

1. Run [running median prices](topics/running_median_prices/RunningMedianPrices.java)
2. Run [safe API design](topics/safe_api_design/SafeApiDesign.java)
3. Run [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java)

Example:

```java
    public static void main(String[] args) {
        NotificationRequest request = NotificationRequest.of("EMAIL", "ops@example.com", "Payment settled");

        // Expected output:
        // request = NotificationRequest[channel=EMAIL, recipient=ops@example.com, message=Payment settled]
        System.out.println("request = " + request);
        System.out.println("Why it works: the static factory validates required fields before the request exists.");
        System.out.println("Company lens: Apple-style answers should sound like 'hard to misuse' rather than 'more flexible'.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- good APIs prevent invalid states early");
        System.out.println("- validation at the boundary improves correctness");
        System.out.println("- safety is often more valuable than extra flexibility");
    }
```

What happens:

Why it matters:

Good APIs reduce misuse before misuse becomes a production incident.

## Improvement

Example:

```java
    public static void main(String[] args) {
        TransferService service = new TransferService();
        Transfer firstTransfer = service.transfer("tx-909", new BigDecimal("125.00"));
        Transfer retryTransfer = service.transfer("tx-909", new BigDecimal("125.00"));

        // Expected output:
        // firstTransfer = COMPLETED
        // retryTransfer = COMPLETED
        // ledgerEntries = 1
        System.out.println("firstTransfer = " + firstTransfer.status());
        System.out.println("retryTransfer = " + retryTransfer.status());
        System.out.println("ledgerEntries = " + service.ledgerEntries());
        System.out.println("Company lens: Coinbase answers should say correctness before convenience.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- idempotency keys belong in money-moving APIs");
        System.out.println("- retries are normal and should be safe");
        System.out.println("- ledger truth must not duplicate on client timeout");
    }
```

What happens:

Why it matters:

Payment and transfer APIs must survive retries without moving money twice.

After this chapter, you should be able to explain why Apple Coinbase Jane Street exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [running median prices](topics/running_median_prices/RunningMedianPrices.java), [safe API design](topics/safe_api_design/SafeApiDesign.java), and [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [running median prices](topics/running_median_prices/RunningMedianPrices.java) starts with the raw behavior, [safe API design](topics/safe_api_design/SafeApiDesign.java) adds the safety rule, and [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java) moves to the cleaner abstraction.

## Rule

👉 Rule: API safety means the happy path is obvious and invalid states are hard to construct.

## Try this

- Run [running median prices](topics/running_median_prices/RunningMedianPrices.java) and note the first thing that breaks.
- Run [safe API design](topics/safe_api_design/SafeApiDesign.java) and remove the safety rule or coordination step.
- Run [transfer idempotency](topics/transfer_idempotency/TransferIdempotency.java) and compare the result with the naive approach.
