package com.learning.javamissing.sec08_internal_of_jvm.ch02_jvm_jdk_jre_and_class_loading.topics.class_loading_lifecycle;

public class ClassLoadingLifecycle {
    public static void main(String[] args) {
        System.out.println("Concept: classes are loaded and initialized only when the JVM decides they are needed.");
        System.out.println("Accessing CustomerConfig.DEFAULT_REGION triggers class initialization.");
        System.out.println("region = " + CustomerConfig.DEFAULT_REGION);
        System.out.println("Why it works: loading makes class data available, linking prepares it, and initialization runs static setup.");
    }

    static final class CustomerConfig {
        static final String DEFAULT_REGION = initializeRegion();

        private static String initializeRegion() {
            System.out.println("CustomerConfig static initialization running");
            return "IN";
        }
    }
}
