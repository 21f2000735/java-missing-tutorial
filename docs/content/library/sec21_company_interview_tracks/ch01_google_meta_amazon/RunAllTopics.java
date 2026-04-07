package com.learning.javamissing.sec21_company_interview_tracks.ch01_google_meta_amazon;

import com.learning.javamissing.sec21_company_interview_tracks.ch01_google_meta_amazon.topics.idempotent_reservations.IdempotentReservations;
import com.learning.javamissing.sec21_company_interview_tracks.ch01_google_meta_amazon.topics.latency_debug_playbook.LatencyDebugPlaybook;
import com.learning.javamissing.sec21_company_interview_tracks.ch01_google_meta_amazon.topics.search_autocomplete_design.SearchAutocompleteDesign;

public class RunAllTopics {
    public static void main(String[] args) {
        System.out.println("=== Search Autocomplete Design ===");
        SearchAutocompleteDesign.main(args);
        System.out.println();
        System.out.println("=== Idempotent Reservations ===");
        IdempotentReservations.main(args);
        System.out.println();
        System.out.println("=== Latency Debug Playbook ===");
        LatencyDebugPlaybook.main(args);
    }
}
