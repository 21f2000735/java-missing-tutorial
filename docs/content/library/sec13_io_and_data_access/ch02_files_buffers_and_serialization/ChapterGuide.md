# Files, Buffers, And Serialization Learning Kit

## Why This Chapter Matters

This chapter explains the practical I/O questions beginners usually skip until file handling breaks in production.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

People often learn `InputStream` or `File` in isolation and miss the bigger distinction between bytes, characters, buffering, paths, and serialization risk.

## Core Ideas

- bytes vs chars
- buffered I/O intuition
- modern `Path` and `Files`
- `WatchService` at a concept level
- serialization pitfalls

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [BytesCharsAndFiles.java](topics/bytes_chars_and_files/BytesCharsAndFiles.java)
2. Run [WatchServiceAndSerialization.java](topics/watch_service_and_serialization/WatchServiceAndSerialization.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- when character APIs are safer than raw byte APIs
- why buffering improves practical I/O throughput
- why serialization should be treated carefully rather than as a default persistence strategy

## The Problem

People often learn `InputStream` or `File` in isolation and miss the bigger distinction between bytes, characters, buffering, paths, and serialization risk.

## What This Chapter Covers

- bytes vs chars
- buffered I/O intuition
- modern `Path` and `Files`
- `WatchService` at a concept level
- serialization pitfalls

## After Reading This Chapter, You Should Know

- when character APIs are safer than raw byte APIs
- why buffering improves practical I/O throughput
- why serialization should be treated carefully rather than as a default persistence strategy
