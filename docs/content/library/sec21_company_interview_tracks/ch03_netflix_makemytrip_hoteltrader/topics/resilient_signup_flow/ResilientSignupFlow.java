package com.learning.javamissing.sec21_company_interview_tracks.ch03_netflix_makemytrip_hoteltrader.topics.resilient_signup_flow;

import java.util.List;

/**
 * Concept: resilient signup flow
 * Why this concept is needed:
 * Distributed systems fail in pieces, not all at once.
 *
 * What problem this solves:
 * It shows how a signup flow can continue when one non-critical dependency fails.
 *
 * Real-world setup:
 * Signup depends on account creation, billing, and welcome-email steps.
 *
 * How to think about it:
 * Decide which steps are critical and which can degrade safely.
 *
 * How to code it:
 * 1. Run critical steps first.
 * 2. Catch non-critical failure separately.
 * 3. Return an honest degraded result.
 *
 * Expected output:
 * signupStatus = PARTIAL_SUCCESS
 */
public class ResilientSignupFlow {
    public static void main(String[] args) {
        SignupResult result = signup();

        // Expected output:
        // signupStatus = PARTIAL_SUCCESS
        System.out.println("signupStatus = " + result.status());
        System.out.println("deferredActions = " + result.deferredActions());
        System.out.println("Company lens: Netflix-style answers should show graceful degradation, not all-or-nothing panic.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- not every dependency deserves the same failure boundary");
        System.out.println("- degraded success can be better than total failure");
        System.out.println("- reliability answers need explicit recovery plans");
    }

    record SignupResult(String status, List<String> deferredActions) {}

    static SignupResult signup() {
        createAccount();
        activateBilling();
        try {
            sendWelcomeEmail();
            return new SignupResult("SUCCESS", List.of());
        } catch (IllegalStateException failure) {
            return new SignupResult("PARTIAL_SUCCESS", List.of("retry-welcome-email"));
        }
    }

    static void createAccount() {
    }

    static void activateBilling() {
    }

    static void sendWelcomeEmail() {
        throw new IllegalStateException("email provider timeout");
    }
}
