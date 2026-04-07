package com.learning.javamissing.sec06_design_patterns.ch04_behavioral_patterns;

import com.learning.javamissing.sec06_design_patterns.ch04_behavioral_patterns.topics.capturing_workflows_with_template_method.CapturingWorkflowsWithTemplateMethod;
import com.learning.javamissing.sec06_design_patterns.ch04_behavioral_patterns.topics.publishing_updates_with_observer.PublishingUpdatesWithObserver;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Publishing Updates With Observer", () -> PublishingUpdatesWithObserver.main(args));
        run("Capturing Workflows With Template Method", () -> CapturingWorkflowsWithTemplateMethod.main(args));
    }

    private static void run(String topicName, Runnable topicRunner) {
        System.out.println();
        System.out.println("=== " + topicName + " ===");
        topicRunner.run();
    }
}
