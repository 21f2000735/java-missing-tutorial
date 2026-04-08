# Maven And Gradle Basics Learning Kit

## Why This Chapter Exists

This chapter gives the practical build-system explanation many Java learners never get early enough.

## The Pain Before It

You may know Java syntax but still feel lost when a project opens with `pom.xml`, `build.gradle`, scopes, plugins, jars, or Spring Boot packaging.

## Java Creator Mindset

- Maven vs Gradle
- project build files
- dependency scopes
- jar vs war vs fat jar
- why Spring Boot changed packaging conversations

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Final Java Direction

- Maven vs Gradle
- project build files
- dependency scopes
- jar vs war vs fat jar
- why Spring Boot changed packaging conversations

## Study Order

1. Run [Build Files And Dependency Scopes](topics/build_files_and_dependency_scopes/BuildFilesAndDependencyScopes.java)
2. Run [Jar War And Spring Boot Why](topics/jar_war_and_spring_boot_why/JarWarAndSpringBootWhy.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- what a build file is really responsible for
- why dependency scopes affect runtime behavior
- why many modern Java services ship as executable jars
