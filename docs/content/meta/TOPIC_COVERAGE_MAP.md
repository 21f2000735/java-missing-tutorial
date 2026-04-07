# Topic Coverage Map

This page maps the major Java topics to the current book structure.

## Java Internals

- JVM, JRE, JDK: `sec08_internal_of_jvm/ch02_jvm_jdk_jre_and_class_loading`
- class loading lifecycle: `sec08_internal_of_jvm/ch02_jvm_jdk_jre_and_class_loading`
- JIT basics: `sec08_internal_of_jvm/ch03_jit_and_garbage_collection`
- stack vs heap: `sec08_internal_of_jvm/ch01_memory_and_execution_basics`
- GC strategies: `sec08_internal_of_jvm/ch03_jit_and_garbage_collection`

## Strings

- string pool and interning: `sec16_core_data_time_and_text/ch07_strings_in_depth`
- `==` vs `.equals()`: `sec16_core_data_time_and_text/ch07_strings_in_depth`
- builders, formatting, text blocks, regex: `sec16_core_data_time_and_text/ch07_strings_in_depth`

## Collections

- core collection choice: `sec02_collections/ch01_collections`
- `HashMap` internals: `sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs`
- `TreeMap` vs `LinkedHashMap`: `sec02_collections/ch02_maps_and_iterators_in_depth`
- concurrent maps and iterator behavior: `sec02_collections/ch02_maps_and_iterators_in_depth`

## Generics

- type erasure, bounds, wildcards, generic methods: `sec03_generics/ch01_generics`

## Functional Java

- functional interfaces and method references: `sec04_streams_and_functional_style/ch02_functional_interfaces`
- streams and lazy evaluation: `sec04_streams_and_functional_style/ch01_streams`
- collectors and grouping: `sec04_streams_and_functional_style/ch01_streams` and `ch04_data_grouping_and_aggregation`
- `Optional`: `sec16_core_data_time_and_text/ch01_optional`

## Concurrency

- raw threads and executors: `sec05_multithreading_and_concurrency/ch01_concurrency_basics`
- virtual threads: `sec05_multithreading_and_concurrency/ch02_virtual_threads`
- structured concurrency and scoped values: `sec05_multithreading_and_concurrency/ch03_structured_concurrency` and `ch04_scoped_values`
- `volatile`, locks, latches, futures: `sec05_multithreading_and_concurrency/ch05_concurrency_primitives_and_futures`

## Exception Handling

- handling failures: `sec11_exception_handling/ch01_handling_errors`
- checked vs unchecked, try-with-resources, chaining, custom exceptions: `sec11_exception_handling/ch02_exception_design_and_resources`

## I/O And NIO

- database access: `sec13_io_and_data_access/ch01_talking_to_databases`
- bytes vs chars, `Path`, buffering, `WatchService`, serialization pitfalls: `sec13_io_and_data_access/ch02_files_buffers_and_serialization`

## Modern Java

- modules: `sec18_architecture_and_integration/ch01_modules`
- records and sealed classes: `sec17_language_modeling_and_modern_types/ch02_records_and_sealed_types`
- pattern matching: `sec17_language_modeling_and_modern_types/ch01_pattern_matching`
- text blocks: `sec16_core_data_time_and_text/ch07_strings_in_depth`
- sequenced collections and small modern utilities: `sec09_hidden_java_features/ch01_underused_core_utilities`

## Design Patterns

- strategy: `sec06_design_patterns/ch01_strategy_pattern`
- factory and builder: `sec06_design_patterns/ch02_creational_patterns`
- observer: `sec06_design_patterns/ch04_behavioral_patterns`

## Testing

- business-rule tests: `sec19_testing_and_quality/ch01_testing_and_quality`
- JUnit 5, parameterized tests, Mockito-style doubles, coverage discussion: `sec19_testing_and_quality/ch02_junit5_and_test_doubles`

## Build And Ecosystem

- Maven vs Gradle, dependency scopes, jars, wars, Spring Boot packaging: `sec22_build_and_tooling/ch01_maven_and_gradle_basics`
