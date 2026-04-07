package com.learning.javamissing.sec13_io_and_data_access.ch02_files_buffers_and_serialization.topics.watch_service_and_serialization;

public class WatchServiceAndSerialization {
    public static void main(String[] args) {
        System.out.println("Concept: WatchService listens for filesystem changes and serialization turns object state into bytes.");
        System.out.println("WatchService use case: react when an upload folder receives a new file.");
        System.out.println("Serialization warning: object version changes and unsafe deserialization can create long-term problems.");
        System.out.println("Use this when: you need a mental model before reading the larger Files API docs.");
    }
}
