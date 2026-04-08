package com.learning.javamissing.sec08_internal_of_jvm.ch02_jvm_jdk_jre_and_class_loading;

import com.learning.javamissing.sec08_internal_of_jvm.ch02_jvm_jdk_jre_and_class_loading.topics.class_loading_and_hot_deploy.ClassLoadingAndHotDeploy;
import com.learning.javamissing.sec08_internal_of_jvm.ch02_jvm_jdk_jre_and_class_loading.topics.class_loading_lifecycle.ClassLoadingLifecycle;
import com.learning.javamissing.sec08_internal_of_jvm.ch02_jvm_jdk_jre_and_class_loading.topics.runtime_layers.RuntimeLayers;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Runtime Layers", () -> RuntimeLayers.main(args));
        run("Class Loading Lifecycle", () -> ClassLoadingLifecycle.main(args));
        run("Class Loading And Hot Deploy", () -> ClassLoadingAndHotDeploy.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
