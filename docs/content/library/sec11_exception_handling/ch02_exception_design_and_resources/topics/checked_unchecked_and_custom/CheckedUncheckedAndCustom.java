package com.learning.javamissing.sec11_exception_handling.ch02_exception_design_and_resources.topics.checked_unchecked_and_custom;

public class CheckedUncheckedAndCustom {
    public static void main(String[] args) {
        try {
            submitBooking("");
        } catch (BookingValidationException exception) {
            System.out.println("bookingStatus = rejected");
            System.out.println("reason = " + exception.getMessage());
        }

        // Expected output:
        // bookingStatus = rejected
        // reason = Guest email is required
        System.out.println("Why it matters: a custom checked exception can force the caller to handle a recoverable business validation problem deliberately.");
    }

    static void submitBooking(String guestEmail) throws BookingValidationException {
        if (guestEmail == null || guestEmail.isBlank()) {
            throw new BookingValidationException("Guest email is required");
        }
    }

    static final class BookingValidationException extends Exception {
        BookingValidationException(String message) {
            super(message);
        }
    }
}
