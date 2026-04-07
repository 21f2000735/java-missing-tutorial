package com.learning.javamissing.sec16_core_data_time_and_text.ch02_date_and_time.topics.zones;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Zones {
    public static void main(String[] args) {
        explainWhy();
        runWebinarExample();
        showCommonConfusion();
        System.out.println();
        System.out.println("After reading this example, you should know:");
        System.out.println("- a zone-aware value can represent the same instant in different regions");
        System.out.println("- withZoneSameInstant changes the view, not the real moment");
        System.out.println("- timezone handling matters whenever users are in different countries");
    }

    private static void explainWhy() {
        System.out.println("Concept: timezone-aware date and time");
        System.out.println("Real-world problem: one webinar is shown to users in India and London.");
        System.out.println("Mental model: the instant is one, the displayed local clock time can differ by zone.");
        System.out.println();
    }

    private static void runWebinarExample() {
        ZonedDateTime indiaTime = ZonedDateTime.of(2026, 4, 7, 18, 0, 0, 0, ZoneId.of("Asia/Kolkata"));
        ZonedDateTime londonTime = toLondonTime(indiaTime);

        // Expected output:
        // indiaTime = 2026-04-07T18:00+05:30[Asia/Kolkata]
        // londonTime = 2026-04-07T13:30+01:00[Europe/London]
        System.out.println("indiaTime = " + indiaTime);
        System.out.println("londonTime = " + londonTime);
        System.out.println("Why it works: both values describe the same instant from different regional views.");
    }

    private static void showCommonConfusion() {
        System.out.println();
        System.out.println("Common confusion:");
        System.out.println("- changing the zone is not the same as changing the event time");
        System.out.println("- storing only LocalDateTime loses the region information");
    }

    static ZonedDateTime toLondonTime(ZonedDateTime indiaTime) {
        return indiaTime.withZoneSameInstant(ZoneId.of("Europe/London"));
    }
}
