package com.learning.javamissing.sec21_company_interview_tracks.ch02_apple_coinbase_jane_street.topics.transfer_idempotency;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Concept: transfer idempotency
 * Why this concept is needed:
 * Payment and transfer APIs must survive retries without moving money twice.
 *
 * What problem this solves:
 * It binds a transfer request id to one durable result.
 *
 * Real-world setup:
 * A wallet transfer endpoint gets retried after a client timeout.
 *
 * How to think about it:
 * One business action should map to one result, even if the request arrives more than once.
 *
 * How to code it:
 * 1. Accept an idempotency key.
 * 2. Store the result for that key.
 * 3. Return the same result on retry.
 *
 * Expected output:
 * firstTransfer = COMPLETED
 * retryTransfer = COMPLETED
 * ledgerEntries = 1
 */
public class TransferIdempotency {
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

    record Transfer(String id, BigDecimal amount, String status) {}

    static final class TransferService {
        private final Map<String, Transfer> transfers = new HashMap<>();
        private int ledgerEntries;

        Transfer transfer(String idempotencyKey, BigDecimal amount) {
            return transfers.computeIfAbsent(idempotencyKey, key -> {
                ledgerEntries++;
                return new Transfer(key, amount, "COMPLETED");
            });
        }

        int ledgerEntries() {
            return ledgerEntries;
        }
    }
}
