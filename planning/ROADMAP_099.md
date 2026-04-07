# Book Roadmap

This roadmap keeps the repo in book form:

- sections use `secXX_*`
- chapters use `chXX_*`
- numbering restarts inside each section

## Current Book Layout

The current implemented structure is:

- `sec01_fundamentals/ch01_java_basics`
- `sec01_fundamentals/ch02_classes_and_objects`
- `sec02_collections/ch01_collections`
- `sec02_collections/ch02_maps_and_iterators_in_depth`
- `sec03_generics/ch01_generics`
- `sec04_streams_and_functional_style/ch01_streams`
- `sec04_streams_and_functional_style/ch02_functional_interfaces`
- `sec04_streams_and_functional_style/ch03_data_filtering_and_mapping`
- `sec04_streams_and_functional_style/ch04_data_grouping_and_aggregation`
- `sec05_multithreading_and_concurrency/ch01_concurrency_basics`
- `sec05_multithreading_and_concurrency/ch02_virtual_threads`
- `sec05_multithreading_and_concurrency/ch03_structured_concurrency`
- `sec05_multithreading_and_concurrency/ch04_scoped_values`
- `sec05_multithreading_and_concurrency/ch05_concurrency_primitives_and_futures`
- `sec06_design_patterns/ch01_strategy_pattern`
- `sec06_design_patterns/ch02_creational_patterns`
- `sec06_design_patterns/ch03_structural_patterns`
- `sec06_design_patterns/ch04_behavioral_patterns`
- `sec06_design_patterns/ch05_request_routing_patterns`
- `sec07_principles_and_solid/ch01_designing_classes`
- `sec07_principles_and_solid/ch02_immutability_and_value_objects`
- `sec08_internal_of_jvm/ch01_memory_and_execution_basics`
- `sec08_internal_of_jvm/ch02_jvm_jdk_jre_and_class_loading`
- `sec08_internal_of_jvm/ch03_jit_and_garbage_collection`
- `sec09_hidden_java_features/ch01_underused_core_utilities`
- `sec10_reflection_and_metadata/ch01_metadata_and_annotations`
- `sec11_exception_handling/ch01_handling_errors`
- `sec11_exception_handling/ch02_exception_design_and_resources`
- `sec12_networking/ch01_http_client_basics`
- `sec13_io_and_data_access/ch01_talking_to_databases`
- `sec13_io_and_data_access/ch02_files_buffers_and_serialization`
- `sec14_famous_design_problems/ch01_cache_design_basics`
- `sec15_clean_code_and_refactoring/ch01_readable_code_basics`
- `sec16_core_data_time_and_text/ch01_optional`
- `sec16_core_data_time_and_text/ch02_date_and_time`
- `sec16_core_data_time_and_text/ch03_missing_values_and_optional`
- `sec16_core_data_time_and_text/ch04_working_with_time`
- `sec16_core_data_time_and_text/ch05_numbers_and_formatting`
- `sec16_core_data_time_and_text/ch06_text_processing_and_regex`
- `sec16_core_data_time_and_text/ch07_strings_in_depth`
- `sec17_language_modeling_and_modern_types/ch01_pattern_matching`
- `sec17_language_modeling_and_modern_types/ch02_records_and_sealed_types`
- `sec18_architecture_and_integration/ch01_modules`
- `sec18_architecture_and_integration/ch02_modular_design`
- `sec18_architecture_and_integration/ch03_building_for_many_languages`
- `sec18_architecture_and_integration/ch04_writing_safe_java`
- `sec19_testing_and_quality/ch01_testing_and_quality`
- `sec19_testing_and_quality/ch02_junit5_and_test_doubles`
- `sec20_data_structures_and_complexity/ch01_reasoning_about_time_and_space`
- `sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs`
- `sec20_data_structures_and_complexity/ch03_sorting_searching_and_binary_search`
- `sec20_data_structures_and_complexity/ch04_problem_solving_patterns`
- `sec22_build_and_tooling/ch01_maven_and_gradle_basics`

## Growth Rule

When new material is added:

- add it inside the right `secXX_*`
- continue chapter numbering inside that section only
- keep chapter names readable enough to feel like a book chapter title

Examples:

- `sec06_design_patterns/ch02_factory_pattern`
- `sec06_design_patterns/ch03_builder_pattern`
- `sec08_internal_of_jvm/ch02_class_loading`
- `sec12_networking/ch02_socket_programming_basics`
- `sec15_clean_code_and_refactoring/ch02_refactoring_small_examples`
- `sec20_data_structures_and_complexity/ch05_trees_graphs_and_traversal`
- `sec20_data_structures_and_complexity/ch06_heaps_priority_queues_and_scheduling`

## Chapter Requirements

Every chapter should include:

- `ChapterGuide.md`
- `RunChapter.java`
- `RunAllTopics.java`
- one or more runnable topic files under `topics/`
- examples with real output and explanation
- interview and OCJP usefulness where relevant
- Effective Java mapping where relevant

## Book Rule

If all section guides and chapter guides are combined, the repo should read like a structured Java book instead of a loose note collection.
