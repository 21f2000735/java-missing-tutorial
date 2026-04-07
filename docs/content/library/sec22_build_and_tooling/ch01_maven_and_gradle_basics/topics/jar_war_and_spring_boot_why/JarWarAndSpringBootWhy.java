package com.learning.javamissing.sec22_build_and_tooling.ch01_maven_and_gradle_basics.topics.jar_war_and_spring_boot_why;

public class JarWarAndSpringBootWhy {
    public static void main(String[] args) {
        System.out.println("Concept: packaging format should match deployment style.");
        System.out.println("jar -> general Java archive");
        System.out.println("war -> web archive for servlet containers");
        System.out.println("fat jar -> app plus dependencies in one deployable unit");
        System.out.println("Spring Boot made executable jars common because embedded servers simplified deployment.");
    }
}
