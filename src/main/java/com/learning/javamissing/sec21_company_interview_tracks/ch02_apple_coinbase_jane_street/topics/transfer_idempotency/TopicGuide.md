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

- Company lens: Coinbase answers should say correctness before convenience.
- After reading this example, you should know:
- idempotency keys belong in money-moving APIs

**What stays stable**

- Company lens: Coinbase answers should say correctness before convenience. After reading this example, you should know: - idempotency keys belong in money-moving APIs - retries are normal and should be safe - ledger truth must not duplicate on client timeout
- The example keeps the same Java shape while you vary one thing.

**What changes**

- Company lens: Coinbase answers should say correctness before convenience. After reading this example, you should know: - idempotency keys belong in money-moving APIs - retries are normal and should be safe - ledger truth must not duplicate on client timeout
- That change is what reveals the behavior you need to understand.

**Why it matters**

Company lens: Coinbase answers should say correctness before convenience. After reading this example, you should know: - idempotency keys belong in money-moving APIs - retries are normal and should be safe - ledger truth must not duplicate on client timeout

**Rule**

👉 Rule: Company lens: Coinbase answers should say correctness before convenience.

**Try this**

- Accept an idempotency key. 2. Store the result for that key. 3. Return the same result on retry.
