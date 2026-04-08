# Topic Coverage Map

This page maps the major Java topics to the current book structure.

## Java Internals

- JVM, JRE, JDK, class loading lifecycle: `sec08_internal_of_jvm/ch02_jvm_jdk_jre_and_class_loading`
- JIT basics, GC strategies: `sec08_internal_of_jvm/ch03_jit_and_garbage_collection`
- stack vs heap in practice: `sec08_internal_of_jvm/ch01_memory_and_execution_basics`

## Strings

- string pool and interning: `sec16_core_data_time_and_text/ch07_strings_in_depth`
- `==` vs `.equals()`: `sec16_core_data_time_and_text/ch07_strings_in_depth`
- `StringBuilder` vs `StringBuffer` vs performance: `sec16_core_data_time_and_text/ch07_strings_in_depth`
- `String.format()`, `printf`, text blocks: `sec16_core_data_time_and_text/ch07_strings_in_depth`
- regular expressions in Java: `sec16_core_data_time_and_text/ch06_text_processing_and_regex`

## Collections

- `ArrayList` vs `LinkedList` vs `ArrayDeque`: `sec02_collections/ch01_collections`
- `HashMap` internals, hashing, buckets, load factor: `sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs`
- `TreeMap` vs `LinkedHashMap`: `sec02_collections/ch02_maps_and_iterators_in_depth`
- `ConcurrentHashMap` vs `Collections.synchronizedMap`: `sec02_collections/ch02_maps_and_iterators_in_depth`
- fail-fast vs weakly consistent iterators: `sec02_collections/ch02_maps_and_iterators_in_depth`

## Generics

- type erasure, bounds, wildcards, generic methods: `sec03_generics/ch01_generics`

## Functional Java

- lambdas under the hood, method references, `Predicate` / `Function` / `Consumer` / `Supplier` chaining: `sec04_streams_and_functional_style/ch02_functional_interfaces`
- streams and lazy evaluation: `sec04_streams_and_functional_style/ch01_streams`
- collectors, `groupingBy`, `partitioningBy`, `toUnmodifiableList`: `sec04_streams_and_functional_style/ch01_streams` and `ch04_data_grouping_and_aggregation`
- `Optional` usage and anti-patterns: `sec16_core_data_time_and_text/ch01_optional` and `ch03_missing_values_and_optional`

## Concurrency

- `volatile`, `synchronized`, `ReentrantLock`, executors, thread pools, `CountDownLatch`, `Semaphore`, `CyclicBarrier`, `CompletableFuture`: `sec05_multithreading_and_concurrency/ch01_concurrency_basics` and `ch05_concurrency_primitives_and_futures`
- virtual threads: `sec05_multithreading_and_concurrency/ch02_virtual_threads`
- structured concurrency: `sec05_multithreading_and_concurrency/ch03_structured_concurrency`
- scoped values: `sec05_multithreading_and_concurrency/ch04_scoped_values`

## Exception Handling

- checked vs unchecked, try-with-resources, chaining, custom exceptions, when not to catch: `sec11_exception_handling/ch01_handling_errors` and `ch02_exception_design_and_resources`

## I/O And NIO

- bytes vs chars, buffered I/O, `Path` and `Files`, `WatchService`, serialization pitfalls: `sec13_io_and_data_access/ch02_files_buffers_and_serialization`

## Modern Java

- modules and module boundaries: `sec18_architecture_and_integration/ch01_modules` and `ch02_modular_design`
- records and sealed classes: `sec17_language_modeling_and_modern_types/ch02_records_and_sealed_types`
- pattern matching: `sec17_language_modeling_and_modern_types/ch01_pattern_matching`
- text blocks: `sec16_core_data_time_and_text/ch07_strings_in_depth`
- sequenced collections: `sec09_hidden_java_features/ch01_underused_core_utilities`

## Design Patterns

- strategy: `sec06_design_patterns/ch01_strategy_pattern`
- factory, builder, singleton: `sec06_design_patterns/ch02_creational_patterns`
- adapter, decorator, chain of responsibility, template method: `sec06_design_patterns/ch03_structural_patterns` and `ch04_behavioral_patterns`
- observer: `sec06_design_patterns/ch04_behavioral_patterns`

## Testing

- business-rule tests, JUnit 5 lifecycle, parameterized tests, Mockito-style doubles, coverage discussion: `sec19_testing_and_quality/ch01_testing_and_quality` and `ch02_junit5_and_test_doubles`

## Build And Ecosystem

- Maven vs Gradle, dependency scopes, jars, wars, Spring Boot packaging and why it matters: `sec22_build_and_tooling/ch01_maven_and_gradle_basics`

## Small Backlog

The main gaps that still deserve dedicated subtopics are:

- `ArrayList` vs `LinkedList` vs `ArrayDeque` as a standalone collection choice lesson
- `Singleton` in the creational patterns chapter
- `Sequenced Collections` as a dedicated modern-Java topic
- `Predicate` / `Function` / `Consumer` / `Supplier` chaining as a dedicated functional-composition topic
