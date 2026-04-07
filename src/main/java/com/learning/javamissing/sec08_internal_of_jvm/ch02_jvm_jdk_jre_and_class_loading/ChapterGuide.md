# JVM, JDK, JRE, And Class Loading Learning Kit

## Why This Chapter Matters

This chapter covers the Java runtime layers people often mention without really separating them.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Many learners hear JVM, JRE, JDK, classpath, and class loading in one sentence and leave with blurred definitions.

## Core Ideas

- JVM vs JRE vs JDK
- compile time vs runtime responsibilities
- class loading stages: loading, linking, initialization
- why static initialization timing matters

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [RuntimeLayers.java](topics/runtime_layers/RuntimeLayers.java)
2. Run [ClassLoadingLifecycle.java](topics/class_loading_lifecycle/ClassLoadingLifecycle.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- which tool belongs to development and which belongs to execution
- why “the JVM runs bytecode” is true but incomplete
- why class loading order explains some surprising static behavior

## The Problem

Many learners hear JVM, JRE, JDK, classpath, and class loading in one sentence and leave with blurred definitions.

## What This Chapter Covers

- JVM vs JRE vs JDK
- compile time vs runtime responsibilities
- class loading stages: loading, linking, initialization
- why static initialization timing matters

## After Reading This Chapter, You Should Know

- which tool belongs to development and which belongs to execution
- why “the JVM runs bytecode” is true but incomplete
- why class loading order explains some surprising static behavior
