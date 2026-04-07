---
introduced: Java 8
status: stable
runner: embedded
estimated: 9 min
---

# Stream Pipeline

## The Problem

You have a list of data.  
You want to:

- filter it
- transform it
- collect the result

The question is not "can Java do this?"  
The question is "how do I express that flow clearly?"

## Run This Code

Run the Java example and read the pipeline left to right.

## Expected Output

Compare the output with the pipeline stages:

- what got filtered out
- what got transformed
- what got collected at the end

## Wrong Example First

A common mistake is to use streams only because they look modern.

That leads to:

- heavy nesting
- hard-to-debug side effects
- collectors that are harder to read than a loop

## Better Example

Use streams when the work is really a data transformation pipeline.

If the code reads naturally as:

1. keep these items
2. change them this way
3. collect the result

then a stream is probably a good fit.

## Why This Works

Streams separate *what should happen* from the low-level loop mechanics.  
That can make business rules easier to scan, especially for filtering, mapping, grouping, and aggregating.

## Use This When

- the code is mainly about transforming data
- each step can be read left to right
- the collector clearly shows the desired result

## Avoid This When

- side effects are the main point
- the pipeline becomes harder to explain than a loop
- debugging needs very explicit step-by-step local state

## Version Notes

Streams were introduced in Java 8 and remain one of the core modern Java features every engineer should understand well.

## Next Topic

Open the collectors topic after this one. It is where many stream users become unsure, and it deserves extra attention.
