# Data Grouping And Aggregation Learning Kit

This chapter is about moving from raw rows to business answers like totals, counts, grouped maps, and summaries.

## The Problem

Decision-makers rarely want:

- every row exactly as stored

They usually want:

- sales by category
- total revenue by region
- pass/fail buckets
- counts by status

That means grouping and aggregation.

## Run This First

1. Run [GroupingSales.java](topics/grouping_sales/GroupingSales.java)

## What To Look For

- the grouping key answers “by what dimension?”
- the aggregation answers “what final fact do we want?”
- collectors make the shape of the final result explicit

## Use This Chapter When

- you need maps of grouped values
- you need totals, counts, or summaries from many rows
- the business question starts with “by category,” “by status,” or “by region”

## Avoid This Approach When

- the result does not need grouping at all
- the pipeline becomes more complex than a direct loop for a tiny dataset

## Next Step

Go back to `ch01_streams` after this chapter. Collectors usually become much easier once grouping and aggregation feel like real business questions instead of syntax.
