---
introduced: Java 1.2
status: stable
runner: embedded
estimated: 8 min
---

# Understanding ArrayList Growth And Lookup

## The Problem

Many developers can use `ArrayList`, but fewer can explain why it is usually fast and where it becomes costly.

That gap matters because performance problems often begin with the wrong mental model, not the wrong syntax.

## Run This Code

Run the example and focus on these ideas:

- indexed lookup
- append behavior
- resizing cost

## Expected Output

The printed output should make it clear that:

- lookup by index is direct
- appending is usually cheap
- occasional growth has a larger one-time cost

## Wrong Example First

The wrong mental model is "every append is always O(1) with no caveat."

The better mental model is:

- most appends are cheap
- resizing is occasional
- average append cost stays good because the expensive resize does not happen every time

## Why This Works

`ArrayList` stores elements in an array.  
That gives fast index access, but growth sometimes needs a bigger array and element copying.

## Use This When

- order matters
- index-based lookup matters
- duplicates are fine
- append-heavy workloads are common

## Avoid This When

- frequent middle insertions dominate
- uniqueness is the main requirement
- key-based lookup is the real problem

## Version Notes

`ArrayList` has existed since the Java Collections Framework arrived in Java 1.2, so this is a concept every Java engineer should understand no matter which Java version they use.

## Next Topic

Read the HashMap buckets and collisions topic next. Together, these two topics form the base of practical Java collection judgment.
