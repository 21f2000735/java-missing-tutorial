# Exception Design And Resources Learning Kit

## Why This Chapter Matters

This chapter goes beyond “catch the exception” and focuses on designing exception flow well.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

Teams often mix checked and unchecked exceptions without a clear rule, then lose context while handling files, network calls, or database work.

## Core Ideas

- checked vs unchecked design philosophy
- custom exceptions that carry meaning
- try-with-resources
- exception chaining with causes
- when not to catch an exception too early

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [CheckedUncheckedAndCustom.java](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java)
2. Run [TryWithResourcesAndChaining.java](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java)

## What To Notice

As you read, notice which choices improve clarity, which choices improve safety, and which tradeoffs matter in production code.

## Common Mistakes

The most common mistake is to memorize labels without building a mental model for when the concept actually helps.

## When To Use / When Not To Use

Use this chapter when the surrounding design decision is still fuzzy. Do not force the patterns here into problems that are simpler than the examples.

## Practice

Run the examples again, change one assumption, and explain how the chapter guidance changes.

## Summary

- why some failures belong in the type system and some do not
- how resource handling became cleaner after try-with-resources
- why wrapping an exception without context usually makes debugging worse

## The Problem

Teams often mix checked and unchecked exceptions without a clear rule, then lose context while handling files, network calls, or database work.

## What This Chapter Covers

- checked vs unchecked design philosophy
- custom exceptions that carry meaning
- try-with-resources
- exception chaining with causes
- when not to catch an exception too early

## After Reading This Chapter, You Should Know

- why some failures belong in the type system and some do not
- how resource handling became cleaner after try-with-resources
- why wrapping an exception without context usually makes debugging worse
