package com.learning.javamissing.sec22_build_and_tooling.ch01_maven_and_gradle_basics.topics.build_files_and_dependency_scopes;

public class BuildFilesAndDependencyScopes {
    public static void main(String[] args) {
        System.out.println("Concept: a build file describes how a project is compiled, tested, packaged, and given dependencies.");
        System.out.println("Maven style = pom.xml with lifecycle and conventions.");
        System.out.println("Gradle style = build.gradle or build.gradle.kts with task-oriented configuration.");
        System.out.println("compile scope -> needed to compile the code");
        System.out.println("runtime scope -> needed when the app runs");
        System.out.println("test scope -> needed only in tests");
    }
}
