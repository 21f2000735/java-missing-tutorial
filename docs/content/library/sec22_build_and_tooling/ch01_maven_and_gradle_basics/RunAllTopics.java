package com.learning.javamissing.sec22_build_and_tooling.ch01_maven_and_gradle_basics;

import com.learning.javamissing.sec22_build_and_tooling.ch01_maven_and_gradle_basics.topics.build_files_and_dependency_scopes.BuildFilesAndDependencyScopes;
import com.learning.javamissing.sec22_build_and_tooling.ch01_maven_and_gradle_basics.topics.jar_war_and_spring_boot_why.JarWarAndSpringBootWhy;

public class RunAllTopics {
    public static void main(String[] args) {
        run("Build Files And Dependency Scopes", () -> BuildFilesAndDependencyScopes.main(args));
        run("Jar, War, And Spring Boot Why", () -> JarWarAndSpringBootWhy.main(args));
    }

    private static void run(String name, Runnable topic) {
        System.out.println();
        System.out.println("=== " + name + " ===");
        topic.run();
    }
}
