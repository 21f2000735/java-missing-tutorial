# Date And Time Learning Kit

## Problem

This chapter shows what breaks when date and time is treated as syntax instead of behavior. The real pressure is what changes when work, state, or rules overlap.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model.

## Fix

Run the topics in this order:

1. Run [Formatting](topics/formatting/Formatting.java)
2. Run [Local Date Time](topics/local_date_time/LocalDateTime.java)
3. Run [Zones](topics/zones/Zones.java)

What to observe:

- Which topic shows the failure first: [Formatting](topics/formatting/Formatting.java).
- Which topic narrows the rule: [Local Date Time](topics/local_date_time/LocalDateTime.java).
- Which topic shows the cleaner abstraction: [Zones](topics/zones/Zones.java).

## Improvement

After this chapter, you can explain the rule behind date and time and choose the right approach with less guesswork.

After this chapter, you should be able to explain why Date And Time exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: Keep the design correct by making the important rule explicit and hard to misuse.

## Try this

- Run [Formatting](topics/formatting/Formatting.java) and note the first thing that breaks.
- Run [Local Date Time](topics/local_date_time/LocalDateTime.java) and write down what the rule becomes.
- Run [Zones](topics/zones/Zones.java) and compare the result with the naive approach.
