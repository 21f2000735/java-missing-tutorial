package com.learning.javamissing.sec21_company_interview_tracks.ch03_netflix_makemytrip_hoteltrader.topics.availability_freshness;

import java.time.Duration;
import java.time.Instant;

/**
 * Concept: availability freshness
 * Why this concept is needed:
 * Marketplace and partner systems need to know whether what they show is still trustworthy.
 *
 * What problem this solves:
 * It measures whether supplier availability is fresh enough to use.
 *
 * Real-world setup:
 * A hotel connectivity platform receives room updates from suppliers.
 *
 * How to think about it:
 * Freshness is a time-based trust check, not only a data-format check.
 *
 * How to code it:
 * 1. Keep the last supplier update time.
 * 2. Compare it with now.
 * 3. Mark inventory as stale when the lag is too large.
 *
 * Expected output:
 * isFresh = false
 * syncLagMinutes = 17
 */
public class AvailabilityFreshness {
    public static void main(String[] args) {
        SupplierFeedStatus status = new SupplierFeedStatus(
                Instant.parse("2026-04-07T10:00:00Z"),
                Instant.parse("2026-04-07T10:17:00Z")
        );

        // Expected output:
        // isFresh = false
        // syncLagMinutes = 17
        System.out.println("isFresh = " + status.isFresh(Duration.ofMinutes(10)));
        System.out.println("syncLagMinutes = " + status.syncLagMinutes());
        System.out.println("Company lens: HotelTrader answers should mention sync lag and mismatch rate, not just API latency.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- freshness is a measurable property");
        System.out.println("- supplier lag can turn correct code into wrong product behavior");
        System.out.println("- platform APIs need trust metrics, not only uptime metrics");
    }

    record SupplierFeedStatus(Instant lastSupplierUpdate, Instant now) {
        boolean isFresh(Duration allowedLag) {
            return Duration.between(lastSupplierUpdate, now).compareTo(allowedLag) <= 0;
        }

        long syncLagMinutes() {
            return Duration.between(lastSupplierUpdate, now).toMinutes();
        }
    }
}
