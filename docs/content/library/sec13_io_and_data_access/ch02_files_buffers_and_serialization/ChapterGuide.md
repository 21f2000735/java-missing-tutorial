# Files, Buffers, And Serialization Learning Kit

This chapter explains the practical I/O questions beginners usually skip until file handling breaks in production.

## The Problem

People often learn `InputStream` or `File` in isolation and miss the bigger distinction between bytes, characters, buffering, paths, and serialization risk.

## Study Order

1. Run [BytesCharsAndFiles.java](topics/bytes_chars_and_files/BytesCharsAndFiles.java)
2. Run [WatchServiceAndSerialization.java](topics/watch_service_and_serialization/WatchServiceAndSerialization.java)

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
