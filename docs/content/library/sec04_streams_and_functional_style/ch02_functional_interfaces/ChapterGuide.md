# Functional Interfaces Learning Kit

This chapter exists because stream-style Java only feels natural once “passing behavior as data” stops feeling strange.

## The Problem

Sometimes the important thing is not just the data. It is the rule:

- how to price
- how to validate
- how to transform

If a rule should be supplied from outside, Java needs a way to pass that rule around. Functional interfaces are that shape.

## Run This First

1. Run [DefiningFunctions.java](topics/defining_functions/DefiningFunctions.java)

## What To Look For

- one abstract method defines one action shape
- different lambdas can satisfy that shape
- code becomes more reusable when the rule is passed in instead of hard-coded

## Use This Chapter When

- one workflow should support changing rules
- you want to understand the bridge between lambdas and real business code
- stream operations like `map`, `filter`, and `reduce` still feel too magical

## Avoid Overcomplicating It When

- one small private method is enough
- the behavior is not really meant to vary
- introducing a functional interface makes the code harder to explain than before

## Next Chapter

Move to `ch03_data_filtering_and_mapping` to see behavior-passing used in actual transformation problems.
