# JVM, JDK, JRE, And Class Loading Learning Kit

This chapter covers the Java runtime layers people often mention without really separating them.

## The Problem

Many learners hear JVM, JRE, JDK, classpath, and class loading in one sentence and leave with blurred definitions.

## Study Order

1. Run [RuntimeLayers.java](topics/runtime_layers/RuntimeLayers.java)
2. Run [ClassLoadingLifecycle.java](topics/class_loading_lifecycle/ClassLoadingLifecycle.java)

## What This Chapter Covers

- JVM vs JRE vs JDK
- compile time vs runtime responsibilities
- class loading stages: loading, linking, initialization
- why static initialization timing matters

## After Reading This Chapter, You Should Know

- which tool belongs to development and which belongs to execution
- why “the JVM runs bytecode” is true but incomplete
- why class loading order explains some surprising static behavior
