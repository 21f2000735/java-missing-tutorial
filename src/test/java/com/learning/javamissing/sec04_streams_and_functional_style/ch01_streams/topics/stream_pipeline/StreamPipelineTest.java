package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.stream_pipeline;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class StreamPipelineTest {
    @Test
    void filtersLongNames() {
        assertEquals(List.of("liam", "alex"), StreamPipeline.longNames(List.of("ava", "liam", "zoe", "alex"), 4));
    }

    @Test
    void countsPassingScores() {
        assertEquals(3, StreamPipeline.countPassingScores(List.of(55, 91, 78, 42, 88), 60));
    }
}
