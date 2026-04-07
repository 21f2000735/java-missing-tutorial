# Strings In Depth Learning Kit

## Why This Chapter Exists

This chapter covers the string topics learners repeatedly stumble over in interviews and production code reviews.

## The Pain Before It

Strings look simple until interning, `==`, builders, formatting, and regex all arrive in the same discussion.

## Java Creator Mindset

- string pool and interning
- `==` vs `.equals()`
- `StringBuilder` vs `StringBuffer`
- `String.format()` and text blocks
- regular expressions in Java

## How You Might Invent It

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Naive Attempt

The naive approach is to solve each small problem separately and miss the common design rule connecting them.

## Why It Breaks

That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Final Java Direction

- string pool and interning
- `==` vs `.equals()`
- `StringBuilder` vs `StringBuffer`
- `String.format()` and text blocks
- regular expressions in Java

## Study Order

1. Run [StringPoolAndEquals.java](topics/string_pool_and_equals/StringPoolAndEquals.java)
2. Run [BuildersFormattingAndRegex.java](topics/builders_formatting_and_regex/BuildersFormattingAndRegex.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## Tradeoffs

Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony.

## Use / Avoid

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- why reference equality and value equality are different
- why repeated string concatenation can become expensive
- when regex helps and when it makes code harder to read

## Why This Chapter Matters

This chapter covers the string topics learners repeatedly stumble over in interviews and production code reviews.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Strings look simple until interning, `==`, builders, formatting, and regex all arrive in the same discussion.

## Core Ideas

- string pool and interning
- `==` vs `.equals()`
- `StringBuilder` vs `StringBuffer`
- `String.format()` and text blocks
- regular expressions in Java

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## The Problem

Strings look simple until interning, `==`, builders, formatting, and regex all arrive in the same discussion.

## What This Chapter Covers

- string pool and interning
- `==` vs `.equals()`
- `StringBuilder` vs `StringBuffer`
- `String.format()` and text blocks
- regular expressions in Java

## After Reading This Chapter, You Should Know

- why reference equality and value equality are different
- why repeated string concatenation can become expensive
- when regex helps and when it makes code harder to read
