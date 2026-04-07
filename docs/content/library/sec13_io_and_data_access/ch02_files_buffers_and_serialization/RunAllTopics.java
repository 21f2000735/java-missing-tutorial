package com.learning.javamissing.sec13_io_and_data_access.ch02_files_buffers_and_serialization;

import com.learning.javamissing.sec13_io_and_data_access.ch02_files_buffers_and_serialization.topics.bytes_chars_and_files.BytesCharsAndFiles;
import com.learning.javamissing.sec13_io_and_data_access.ch02_files_buffers_and_serialization.topics.watch_service_and_serialization.WatchServiceAndSerialization;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Bytes, Chars, And Files", () -> BytesCharsAndFiles.main(args));
        run("WatchService And Serialization", () -> WatchServiceAndSerialization.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
