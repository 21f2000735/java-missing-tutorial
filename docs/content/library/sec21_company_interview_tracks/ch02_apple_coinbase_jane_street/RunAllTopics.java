package com.learning.javamissing.sec21_company_interview_tracks.ch02_apple_coinbase_jane_street;

import com.learning.javamissing.sec21_company_interview_tracks.ch02_apple_coinbase_jane_street.topics.running_median_prices.RunningMedianPrices;
import com.learning.javamissing.sec21_company_interview_tracks.ch02_apple_coinbase_jane_street.topics.safe_api_design.SafeApiDesign;
import com.learning.javamissing.sec21_company_interview_tracks.ch02_apple_coinbase_jane_street.topics.transfer_idempotency.TransferIdempotency;

public class RunAllTopics {
    public static void main(String[] args) {
        System.out.println("=== Safe API Design ===");
        SafeApiDesign.main(args);
        System.out.println();
        System.out.println("=== Transfer Idempotency ===");
        TransferIdempotency.main(args);
        System.out.println();
        System.out.println("=== Running Median Prices ===");
        RunningMedianPrices.main(args);
    }
}
