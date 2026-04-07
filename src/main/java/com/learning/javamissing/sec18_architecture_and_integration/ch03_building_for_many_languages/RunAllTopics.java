package com.learning.javamissing.sec18_architecture_and_integration.ch03_building_for_many_languages;

import com.learning.javamissing.sec18_architecture_and_integration.ch03_building_for_many_languages.topics.showing_messages_by_locale.ShowingMessagesByLocale;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Showing Messages By Locale", () -> ShowingMessagesByLocale.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
