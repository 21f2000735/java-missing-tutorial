package com.learning.javamissing.sec21_company_interview_tracks.ch01_google_meta_amazon.topics.idempotent_reservations;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * Concept: idempotent reservations
 * Why this concept is needed:
 * Booking, checkout, and order systems are retried under network failure.
 *
 * What problem this solves:
 * It prevents duplicate reservations when the same request is sent again.
 *
 * Real-world setup:
 * A flash-sale reservation endpoint receives duplicate calls for the same booking request.
 *
 * How to think about it:
 * A business action needs a stable request identity so the server can return the same result on retry.
 *
 * How to code it:
 * 1. Accept a request id.
 * 2. Store the first result under that id.
 * 3. Return the stored result on duplicate calls.
 *
 * Expected output:
 * firstResult = RESERVED
 * secondResult = RESERVED
 * reservationsCreated = 1
 */
public class IdempotentReservations {
    public static void main(String[] args) {
        ReservationService service = new ReservationService();

        ReservationResult firstResult = service.reserve("req-501", "show-101", 2);
        ReservationResult secondResult = service.reserve("req-501", "show-101", 2);

        // Expected output:
        // firstResult = RESERVED
        // secondResult = RESERVED
        // reservationsCreated = 1
        System.out.println("firstResult = " + firstResult.status());
        System.out.println("secondResult = " + secondResult.status());
        System.out.println("reservationsCreated = " + service.createdReservationCount());
        System.out.println("Why it works: the same request id returns the same stored reservation result.");
        System.out.println("Company lens: Amazon and Meta reward answers that treat retries as normal, not exceptional.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- idempotency protects business actions under retry");
        System.out.println("- the server must own duplicate protection");
        System.out.println("- reservation systems need stable request identity");
    }

    record ReservationResult(String reservationId, String status, Instant createdAt) {}

    static final class ReservationService {
        private final Map<String, ReservationResult> resultsByRequestId = new HashMap<>();
        private int createdReservationCount;

        ReservationResult reserve(String requestId, String showId, int seats) {
            return resultsByRequestId.computeIfAbsent(requestId, key -> {
                createdReservationCount++;
                return new ReservationResult(showId + "-R" + seats, "RESERVED", Instant.parse("2026-04-07T10:15:30Z"));
            });
        }

        int createdReservationCount() {
            return createdReservationCount;
        }
    }
}
