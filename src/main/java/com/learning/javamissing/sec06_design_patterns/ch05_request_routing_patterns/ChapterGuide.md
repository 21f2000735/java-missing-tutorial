# Request Routing Patterns

## Why This Chapter Matters

This chapter focuses on chain of responsibility because request processing is where design patterns stop feeling theoretical very quickly.

## Intuition

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Problem Statement

This chapter focuses on chain of responsibility because request processing is where design patterns stop feeling theoretical very quickly.

## Core Ideas

Read the chapter as a small set of related ideas around request Routing Patterns, not as isolated trivia.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Study Order

1. Run [RequestValidationChain.java](topics/request_validation_chain/RequestValidationChain.java)
2. Notice how each handler owns one rule
3. Imagine adding one more handler without rewriting the existing chain

## What To Notice

- each handler owns one decision
- the request moves in sequence
- the chain may stop early when a rule fails

### Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| one method | validation is short and stable | rules will grow and change independently |
| chain of responsibility | stages may stop early or be reordered | every step must always run in one fixed batch |

### Interview Focus

Q: What problem does chain of responsibility solve?  
A: It separates request handling into small handlers so rules can evolve independently and the request can move stage by stage.

Q: What is the most common misuse?  
A: Turning a very small fixed validation method into many handlers that add ceremony without adding flexibility.

## Common Mistakes

- the rules are tiny and very stable
- one short method is still easier to explain
- handlers secretly depend on each other and stop being independent

## When To Use / When Not To Use

### Use It When

- request handling is a series of independent checks
- you need to insert, remove, or reorder stages over time
- middleware or validation should read as a pipeline

## Practice

### Case Study

A servlet filter chain, Spring interceptor chain, or checkout validation pipeline all share the same basic pressure:  
small stages, local decisions, and forward movement until something fails or the request is done.

## Summary

After this chapter, you should be able to explain the main decisions behind request routing patterns and connect them back to the runnable examples.

## The Story

Checkout validation starts with one rule:

- cart must not be empty

Then more rules arrive:

- address must be present
- payment must be ready
- inventory may need to be checked
- user may need authorization

One long validation method becomes noisy, hard to reorder, and hard to extend.

## Run This First

1. Run [RequestValidationChain.java](topics/request_validation_chain/RequestValidationChain.java)
2. Notice how each handler owns one rule
3. Imagine adding one more handler without rewriting the existing chain

## What To Look For

- each handler owns one decision
- the request moves in sequence
- the chain may stop early when a rule fails

## Use This Pattern When

- request handling is a series of independent checks
- you need to insert, remove, or reorder stages over time
- middleware or validation should read as a pipeline

## Avoid This Pattern When

- the rules are tiny and very stable
- one short method is still easier to explain
- handlers secretly depend on each other and stop being independent

## Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| one method | validation is short and stable | rules will grow and change independently |
| chain of responsibility | stages may stop early or be reordered | every step must always run in one fixed batch |

## Small Case Study

A servlet filter chain, Spring interceptor chain, or checkout validation pipeline all share the same basic pressure:  
small stages, local decisions, and forward movement until something fails or the request is done.

## Interview Focus

Q: What problem does chain of responsibility solve?  
A: It separates request handling into small handlers so rules can evolve independently and the request can move stage by stage.

Q: What is the most common misuse?  
A: Turning a very small fixed validation method into many handlers that add ceremony without adding flexibility.

## Sources

- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Refactoring.Guru Pattern Catalog: https://refactoring.guru/design-patterns/catalog
