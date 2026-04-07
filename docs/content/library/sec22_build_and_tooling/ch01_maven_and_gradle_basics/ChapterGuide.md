# Maven And Gradle Basics Learning Kit

## Why This Chapter Matters

This chapter gives the practical build-system explanation many Java learners never get early enough.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

You may know Java syntax but still feel lost when a project opens with `pom.xml`, `build.gradle`, scopes, plugins, jars, or Spring Boot packaging.

## Core Ideas

- Maven vs Gradle
- project build files
- dependency scopes
- jar vs war vs fat jar
- why Spring Boot changed packaging conversations

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [BuildFilesAndDependencyScopes.java](topics/build_files_and_dependency_scopes/BuildFilesAndDependencyScopes.java)
2. Run [JarWarAndSpringBootWhy.java](topics/jar_war_and_spring_boot_why/JarWarAndSpringBootWhy.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- what a build file is really responsible for
- why dependency scopes affect runtime behavior
- why many modern Java services ship as executable jars

## The Problem

You may know Java syntax but still feel lost when a project opens with `pom.xml`, `build.gradle`, scopes, plugins, jars, or Spring Boot packaging.

## What This Chapter Covers

- Maven vs Gradle
- project build files
- dependency scopes
- jar vs war vs fat jar
- why Spring Boot changed packaging conversations

## After Reading This Chapter, You Should Know

- what a build file is really responsible for
- why dependency scopes affect runtime behavior
- why many modern Java services ship as executable jars
