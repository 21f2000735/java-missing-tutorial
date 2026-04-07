package com.learning.javamissing.sec21_company_interview_tracks.ch03_netflix_makemytrip_hoteltrader;

import com.learning.javamissing.sec21_company_interview_tracks.ch03_netflix_makemytrip_hoteltrader.topics.availability_freshness.AvailabilityFreshness;
import com.learning.javamissing.sec21_company_interview_tracks.ch03_netflix_makemytrip_hoteltrader.topics.hotel_search_cache.HotelSearchCache;
import com.learning.javamissing.sec21_company_interview_tracks.ch03_netflix_makemytrip_hoteltrader.topics.resilient_signup_flow.ResilientSignupFlow;

public class RunAllTopics {
    public static void main(String[] args) {
        System.out.println("=== Resilient Signup Flow ===");
        ResilientSignupFlow.main(args);
        System.out.println();
        System.out.println("=== Hotel Search Cache ===");
        HotelSearchCache.main(args);
        System.out.println();
        System.out.println("=== Availability Freshness ===");
        AvailabilityFreshness.main(args);
    }
}
