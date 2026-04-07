package com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.local_date_time;

public class LocalDateTime {
    public static void main(String[] args) {
        explainWhy();
        runMeetingExample();
        showCommonConfusion();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- LocalDateTime represents a local calendar date and clock time");
        System.out.println("- operations like plusMinutes return a new value");
        System.out.println("- LocalDateTime does not contain timezone information");
    }

    private static void explainWhy() {
        System.out.println("Concept: modeling a local schedule");
        System.out.println("Real-world problem: a team stand-up starts at 09:30 in one office.");
        System.out.println("Mental model: use LocalDateTime when the value is local to one business context.");
        System.out.println();
    }

    private static void runMeetingExample() {
        java.time.LocalDateTime standup = java.time.LocalDateTime.of(2026, 4, 7, 9, 30);
        java.time.LocalDateTime delayed = delayMeeting(standup, 15);

        // Expected output:
        // standup = 2026-04-07T09:30
        // delayed = 2026-04-07T09:45
        // originalStillSame = 2026-04-07T09:30
        System.out.println("standup = " + standup);
        System.out.println("delayed = " + delayed);
        System.out.println("originalStillSame = " + standup);
        System.out.println("Why it works: java.time types are immutable, so changes produce a new value.");
    }

    private static void showCommonConfusion() {
        System.out.println();
        System.out.println("Common confusion:");
        System.out.println("- LocalDateTime is not a global instant");
        System.out.println("- if London and Kolkata must agree on the same real moment, a zone-aware type is needed");
    }

    static java.time.LocalDateTime delayMeeting(java.time.LocalDateTime meetingStart, long delayInMinutes) {
        return meetingStart.plusMinutes(delayInMinutes);
    }
}
