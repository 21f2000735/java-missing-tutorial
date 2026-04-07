---
introduced: Java 5+
status: stable
runner: embedded
estimated: 7 min
---

# Choosing Behavior With Strategy

## Why This Exists

The checkout flow should not know every discount rule.

## The Pain Before It

The checkout flow should not know every discount rule.

That sounds obvious, but teams often start with one rule and then keep adding:

- festival discounts
- student discounts
- partner discounts
- premium-member rules

The checkout flow becomes the place where every marketing change lands. That is the pressure strategy solves.

## Java Creator Mindset

Use one small contract for the changing behavior and keep the stable workflow separate.

That gives you:

- one place for the workflow
- one focused class per rule
- easier tests

## How You Might Invent It

Use one small contract for the changing behavior and keep the stable workflow separate.

## Naive Attempt

The wrong design is one giant checkout method with many discount branches.  
That makes checkout hard to test and easy to break whenever the business adds one more rule.

## Why It Breaks

The wrong design is one giant checkout method with many discount branches.  
That makes checkout hard to test and easy to break whenever the business adds one more rule.

## Final Java Solution

Use one small contract for the changing behavior and keep the stable workflow separate.

That gives you:

- one place for the workflow
- one focused class per rule
- easier tests

## Code

### Run It

Run the Java file first. Notice that `applyDiscount()` stays the same while the concrete rule changes.

### Expected Result

- `festivalFinalAmount = 1700`
- `studentFinalAmount = 1800`

## Walkthrough

Strategy reduces the number of reasons one caller has to change.  
Checkout changes when checkout changes.  
Discount logic changes when discount rules change.

## Mental Model

Use a small mental model first: identify the input, the rule, and the outcome that choosing behavior with strategy should guarantee.

## Mistakes

The wrong design is one giant checkout method with many discount branches.  
That makes checkout hard to test and easy to break whenever the business adds one more rule.

## Tradeoffs

The gain is usually safety or clarity. The cost is usually more structure, more rules, or less flexibility in the wrong place.

## Use / Avoid

### Use It When

- one behavior changes more often than the rest of the workflow
- new business rules are likely to keep arriving
- each rule should be testable by itself

### Avoid It When

- there are only one or two tiny cases
- the rule set is unlikely to grow
- extra classes would hide a simpler design

## Summary

After this topic, you should be able to explain choosing behavior with strategy, run the example, and defend when it helps versus when it adds noise.

## Why This Matters

The checkout flow should not know every discount rule.

## Intuition

Use one small contract for the changing behavior and keep the stable workflow separate.

## Problem Statement

The checkout flow should not know every discount rule.

That sounds obvious, but teams often start with one rule and then keep adding:

- festival discounts
- student discounts
- partner discounts
- premium-member rules

The checkout flow becomes the place where every marketing change lands. That is the pressure strategy solves.

## Core Idea

Use one small contract for the changing behavior and keep the stable workflow separate.

That gives you:

- one place for the workflow
- one focused class per rule
- easier tests

## Simple Example

### Run It

Run the Java file first. Notice that `applyDiscount()` stays the same while the concrete rule changes.

### Expected Result

- `festivalFinalAmount = 1700`
- `studentFinalAmount = 1800`

## Step-by-Step Working

Strategy reduces the number of reasons one caller has to change.  
Checkout changes when checkout changes.  
Discount logic changes when discount rules change.

## Rules / Syntax

This idea is not tied to one Java release.  
Modern Java helps mostly by making the implementation smaller with records, lambdas, and cleaner interfaces, but the concept itself is much older.

- Prefer the smallest correct rule over cleverness.
- Connect the rule back to the runnable example.

## Common Mistakes

The wrong design is one giant checkout method with many discount branches.  
That makes checkout hard to test and easy to break whenever the business adds one more rule.

## When To Use / When Not To Use

### Use It When

- one behavior changes more often than the rest of the workflow
- new business rules are likely to keep arriving
- each rule should be testable by itself

### Avoid It When

- there are only one or two tiny cases
- the rule set is unlikely to grow
- extra classes would hide a simpler design

## Practice

Change one part of the runnable example, rerun it, and explain whether choosing behavior with strategy still behaves the way you expected.

### After That

Move to the creational patterns chapter and compare this kind of variation problem with object-creation problems.

## The Problem

The checkout flow should not know every discount rule.

That sounds obvious, but teams often start with one rule and then keep adding:

- festival discounts
- student discounts
- partner discounts
- premium-member rules

The checkout flow becomes the place where every marketing change lands. That is the pressure strategy solves.

## Run This Code

Run the Java file first. Notice that `applyDiscount()` stays the same while the concrete rule changes.

## Expected Output

- `festivalFinalAmount = 1700`
- `studentFinalAmount = 1800`

## ❌ Bad Code

The wrong design is one giant checkout method with many discount branches.  
That makes checkout hard to test and easy to break whenever the business adds one more rule.

## ✅ Better Code

Use one small contract for the changing behavior and keep the stable workflow separate.

That gives you:

- one place for the workflow
- one focused class per rule
- easier tests

## Why This Works

Strategy reduces the number of reasons one caller has to change.  
Checkout changes when checkout changes.  
Discount logic changes when discount rules change.

## Use This When

- one behavior changes more often than the rest of the workflow
- new business rules are likely to keep arriving
- each rule should be testable by itself

## Avoid This When

- there are only one or two tiny cases
- the rule set is unlikely to grow
- extra classes would hide a simpler design

## Version Notes

This idea is not tied to one Java release.  
Modern Java helps mostly by making the implementation smaller with records, lambdas, and cleaner interfaces, but the concept itself is much older.

## Next Topic

Move to the creational patterns chapter and compare this kind of variation problem with object-creation problems.
