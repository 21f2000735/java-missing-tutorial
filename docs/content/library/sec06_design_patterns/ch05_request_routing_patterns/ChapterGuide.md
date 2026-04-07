# Request Routing Patterns Learning Kit

This chapter focuses on one practical pattern that appears everywhere in middleware, validation pipelines, and request handling: chain of responsibility.

## What Problem This Chapter Solves

Request processing often needs several checks:

- cart is not empty
- address is present
- payment method is ready
- user is authorized

If all checks live in one method, the code becomes long and hard to extend. Chain of responsibility lets each handler own one rule and pass the request onward when it succeeds.

## Study Order

1. Run [PassingRequestsWithChainOfResponsibility.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch05_request_routing_patterns/topics/passing_requests_with_chain_of_responsibility/PassingRequestsWithChainOfResponsibility.java)

## Quick Summary

- each handler owns one decision
- the request travels until something fails or the chain completes
- this pattern is common in validation, middleware, servlet filters, and request interception

## Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| one long validation method | the rules are tiny and stable | rules grow independently or should be reordered, removed, or extended |
| chain of responsibility | each step can decide and pass forward | the workflow must always run every step with no early exit |

## Mini Case Study

Think about a checkout request in an online store.

- if the cart is empty, stop early
- if the address is missing, stop early
- if payment is missing, stop early

Each rule is simple, but the sequence matters. A chain keeps each rule local and the overall path readable.

## Interview Focus

Q: What problem does chain of responsibility solve?  
A: It breaks request handling into small handlers so each rule stays separate and the request can pass through a sequence of checks.

Q: Where do engineers see it in real systems?  
A: In middleware pipelines, validation chains, filters, authentication stages, and request interceptors.

## Sources

- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Refactoring.Guru Pattern Catalog: https://refactoring.guru/design-patterns/catalog
