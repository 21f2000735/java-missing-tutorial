package com.learning.javamissing.sec04_streams_and_functional_style.ch01_streams.topics.parallel_streams;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ParallelStreamsTest {
    @Test
    void sequentialAndParallelResultsMatch() {
        List<Integer> values = List.of(1, 2, 3, 4, 5, 6, 7, 8);
        assertEquals(ParallelStreams.sumOfSquaresSequential(values), ParallelStreams.sumOfSquaresParallel(values));
    }
}
