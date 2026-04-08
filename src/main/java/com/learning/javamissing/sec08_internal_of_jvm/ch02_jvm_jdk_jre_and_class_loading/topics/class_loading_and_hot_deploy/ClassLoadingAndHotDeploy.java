package com.learning.javamissing.sec08_internal_of_jvm.ch02_jvm_jdk_jre_and_class_loading.topics.class_loading_and_hot_deploy;

public class ClassLoadingAndHotDeploy {
    public static void main(String[] args) {
        ClassLoader appLoader = ClassLoadingAndHotDeploy.class.getClassLoader();
        System.out.println("Concept: class identity is class name plus class loader.");
        System.out.println("app loader = " + appLoader.getClass().getSimpleName());
        System.out.println("same class object = " + (Widget.class == Widget.class));
        System.out.println("Why it matters: hot-deploy containers rely on unloading whole class loaders, not just individual classes.");
    }

    static final class Widget {
    }
}
