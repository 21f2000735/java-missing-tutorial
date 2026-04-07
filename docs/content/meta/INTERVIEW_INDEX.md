# Interview Index

Use this page when you do not want a long reading path first.

This is the fastest way to find the Java interview topic, question type, or company pressure you need right now.

## Start In One Of These Four Ways

### 1. I want the full structured path

Go to [INTERVIEW_TRACK.md](INTERVIEW_TRACK.md).

Use that when you want a deliberate reading order from core Java to company-style practice.

### 2. I want a faster answer process

Go to [INTERVIEW_PROBLEM_APPROACH.md](INTERVIEW_PROBLEM_APPROACH.md).

Use that when you want to improve how you speak, structure, and defend answers under pressure.

### 3. I want company-style practice

Go to [COMPANY_QUESTION_BANK.md](COMPANY_QUESTION_BANK.md).

Use that when you want original question-answer practice grouped by company pressure.

### 4. I want the most asked Java topics first

Go to [HIGH_DEMAND_JAVA_TOPICS.md](HIGH_DEMAND_JAVA_TOPICS.md).

Use that when you want to prioritize the topics interviewers keep revisiting.

## Fast Topic Index

### Collections

- [List, Set, Map](../src/main/java/com/learning/javamissing/sec02_collections/ch01_collections/topics/list_set_map/TopicGuide.md)
- [HashMap Buckets And Collisions](../src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs/topics/hashmap_buckets_and_collisions/TopicGuide.md)
- [ArrayList Growth And Lookup](../src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs/topics/arraylist_growth_and_lookup/TopicGuide.md)

Interview signal:
- choose the right data shape
- explain lookup tradeoffs
- compare correctness and complexity

### Streams

- [Stream Pipeline](../src/main/java/com/learning/javamissing/sec04_streams_and_functional_style/ch01_streams/topics/stream_pipeline/TopicGuide.md)
- [Collectors](../src/main/java/com/learning/javamissing/sec04_streams_and_functional_style/ch01_streams/topics/collectors/TopicGuide.md)
- [Parallel Streams](../src/main/java/com/learning/javamissing/sec04_streams_and_functional_style/ch01_streams/topics/parallel_streams/TopicGuide.md)

Interview signal:
- loop vs stream judgment
- collector choice
- side effects and readability tradeoffs

### Concurrency

- [Threads](../src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch01_concurrency_basics/topics/threads/TopicGuide.md)
- [Executors](../src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch01_concurrency_basics/topics/executors/TopicGuide.md)
- [Synchronization](../src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch01_concurrency_basics/topics/synchronization/TopicGuide.md)
- [Why Virtual Threads Matter](../src/main/java/com/learning/javamissing/sec05_multithreading_and_concurrency/ch02_virtual_threads/topics/why_virtual_threads_matter/TopicGuide.md)

Interview signal:
- thread model basics
- task execution strategy
- race conditions and shared state
- when newer concurrency tools help

### Exceptions And Reliability

- [Handling Payment Failures](../src/main/java/com/learning/javamissing/sec11_exception_handling/ch01_handling_errors/topics/handling_payment_failures/TopicGuide.md)
- [Meaningful Exceptions](../src/main/java/com/learning/javamissing/sec11_exception_handling/ch01_handling_errors/topics/writing_meaningful_exception_messages/TopicGuide.md)
- [Try With Resources And Chaining](../src/main/java/com/learning/javamissing/sec11_exception_handling/ch02_exception_design_and_resources/topics/try_with_resources_and_chaining/TopicGuide.md)

Interview signal:
- preserving context
- checked vs unchecked judgment
- failure-path readability

### JVM Basics

- [Understanding Stack Heap And References](../src/main/java/com/learning/javamissing/sec08_internal_of_jvm/ch01_memory_and_execution_basics/topics/understanding_stack_heap_and_references/TopicGuide.md)
- [Class Loading Basics](../src/main/java/com/learning/javamissing/sec08_internal_of_jvm/ch02_class_loading_and_bytecode/topics/how_class_loading_works/TopicGuide.md)

Interview signal:
- memory model intuition
- reference behavior
- runtime explanation without hand-waving

### Backend And Company Problems

- [Idempotent Reservations](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch01_google_meta_amazon/topics/idempotent_reservations/TopicGuide.md)
- [Latency Debug Playbook](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch01_google_meta_amazon/topics/latency_debug_playbook/TopicGuide.md)
- [Transfer Idempotency](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch02_apple_coinbase_jane_street/topics/transfer_idempotency/TopicGuide.md)
- [Resilient Signup Flow](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch03_netflix_makemytrip_hoteltrader/topics/resilient_signup_flow/TopicGuide.md)

Interview signal:
- idempotency
- retries
- latency debugging
- reliability and distributed correctness

## Fast Company Index

### Google / Meta / Amazon

Go to:
- [ch01_google_meta_amazon/ChapterGuide.md](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch01_google_meta_amazon/ChapterGuide.md)

Good for:
- debugging
- backend tradeoffs
- autocomplete, retries, latency, correctness

### Apple / Coinbase / Jane Street

Go to:
- [ch02_apple_coinbase_jane_street/ChapterGuide.md](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch02_apple_coinbase_jane_street/ChapterGuide.md)

Good for:
- API design
- money correctness
- invariants and clean reasoning

### Netflix / MakeMyTrip / HotelTrader

Go to:
- [ch03_netflix_makemytrip_hoteltrader/ChapterGuide.md](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/ch03_netflix_makemytrip_hoteltrader/ChapterGuide.md)

Good for:
- reliability
- caching
- booking/search systems
- observability and data freshness

## Best Order If You Only Have Limited Time

### 3-Day Sprint

1. [INTERVIEW_PROBLEM_APPROACH.md](INTERVIEW_PROBLEM_APPROACH.md)
2. Collections
3. Streams
4. Concurrency
5. [COMPANY_QUESTION_BANK.md](COMPANY_QUESTION_BANK.md)

### 7-Day Sprint

1. [INTERVIEW_TRACK.md](INTERVIEW_TRACK.md)
2. Collections
3. Streams
4. Exceptions
5. Concurrency
6. JVM Basics
7. Company Tracks

### 14-Day Sprint

1. Follow [INTERVIEW_TRACK.md](INTERVIEW_TRACK.md)
2. Use this index daily for lookup and revision
3. Add [COMPANY_QUESTION_BANK.md](COMPANY_QUESTION_BANK.md) practice every day

## What To Use This Page For

Use this page when you need:

- fast navigation
- topic lookup
- company lookup
- short-term revision
- a recovery point after getting lost in too many pages

## What Not To Use This Page For

Do not treat this page as the only study plan.

Use it as:

- the fast map
- the lookup layer
- the restart point

Then return to [INTERVIEW_TRACK.md](INTERVIEW_TRACK.md) for deeper structured progress.
