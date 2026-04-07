package com.learning.javamissing.sec21_company_interview_tracks.ch02_apple_coinbase_jane_street.topics.safe_api_design;

import java.util.Objects;

/**
 * Concept: safe API design
 * Why this concept is needed:
 * Good APIs reduce misuse before misuse becomes a production incident.
 *
 * What problem this solves:
 * It shows how validation and small construction rules make invalid states harder to create.
 *
 * Real-world setup:
 * An internal notification API should reject incomplete requests early.
 *
 * How to think about it:
 * API safety means the happy path is obvious and invalid states are hard to construct.
 *
 * How to code it:
 * 1. Validate required fields at creation time.
 * 2. Keep the object small and obvious.
 * 3. Expose clear methods instead of vague mutable state.
 *
 * Expected output:
 * request = NotificationRequest[channel=EMAIL, recipient=ops@example.com, message=Payment settled]
 */
public class SafeApiDesign {
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

    record NotificationRequest(String channel, String recipient, String message) {
        static NotificationRequest of(String channel, String recipient, String message) {
            return new NotificationRequest(
                    requireNonBlank(channel, "channel"),
                    requireNonBlank(recipient, "recipient"),
                    requireNonBlank(message, "message")
            );
        }

        private static String requireNonBlank(String value, String field) {
            Objects.requireNonNull(value, field + " must not be null");
            if (value.isBlank()) {
                throw new IllegalArgumentException(field + " must not be blank");
            }
            return value;
        }
    }
}
