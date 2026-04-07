package com.learning.javamissing.sec05_multithreading_and_concurrency.ch03_structured_concurrency;

import com.learning.javamissing.sec05_multithreading_and_concurrency.ch03_structured_concurrency.topics.choosing_first_successful_result.ChoosingFirstSuccessfulResult;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch03_structured_concurrency.topics.collecting_results_from_child_tasks.CollectingResultsFromChildTasks;
import com.learning.javamissing.sec05_multithreading_and_concurrency.ch03_structured_concurrency.topics.keeping_child_tasks_inside_one_request.KeepingChildTasksInsideOneRequest;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Choosing First Successful Result", () -> ChoosingFirstSuccessfulResult.main(args));
        run("Collecting Results From Child Tasks", () -> CollectingResultsFromChildTasks.main(args));
        run("Keeping Child Tasks Inside One Request", () -> KeepingChildTasksInsideOneRequest.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
