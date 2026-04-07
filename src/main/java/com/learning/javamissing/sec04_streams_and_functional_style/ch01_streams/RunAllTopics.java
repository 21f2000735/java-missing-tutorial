package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams;

import com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.collectors.Collectors;
import com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.parallel_streams.ParallelStreams;
import com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.stream_pipeline.StreamPipeline;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Collectors", () -> Collectors.main(args));
        run("Parallel Streams", () -> ParallelStreams.main(args));
        run("Stream Pipeline", () -> StreamPipeline.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
