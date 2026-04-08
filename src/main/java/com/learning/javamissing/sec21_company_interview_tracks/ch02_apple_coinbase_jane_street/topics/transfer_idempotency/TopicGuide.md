---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# transfer idempotency

## transfer idempotency

**Concept**

Payment and transfer APIs must survive retries without moving money twice.

**Example**

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

**What happens**

- idempotency keys belong in money-moving APIs

**What stays stable**

- idempotency keys belong in money-moving APIs

**What changes**

- It binds a transfer request id to one durable result.

**Why it matters**

Payment and transfer APIs must survive retries without moving money twice.

**Rule**

👉 Rule: idempotency keys belong in money-moving APIs

**Try this**

- Accept an idempotency key. 2. Store the result for that key. 3. Return the same result on retry.
