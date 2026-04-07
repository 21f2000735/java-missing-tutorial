package com.learning.javamissing.sec05_multithreading_and_concurrency.ch01_concurrency_basics.topics.executors;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ExecutorsTest {
    @Test
    void executorReturnsBothTaskResults() throws Exception {
        Executors.TaskSummary summary = Executors.computeReportLengthAndRetryCount();
        assertEquals("quarterly-report".length(), summary.reportLength());
        assertEquals(3, summary.retryCount());
    }
}
