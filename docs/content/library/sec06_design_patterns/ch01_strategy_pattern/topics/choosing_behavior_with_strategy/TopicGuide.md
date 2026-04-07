---
introduced: Java 5+
status: stable
runner: embedded
estimated: 7 min
---

# Choosing Behavior With Strategy

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

## Wrong Example First

The wrong design is one giant checkout method with many discount branches.  
That makes checkout hard to test and easy to break whenever the business adds one more rule.

## Better Example

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
