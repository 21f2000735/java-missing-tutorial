# sec06_design_patterns Design Patterns

This section treats design patterns as recurring pressure points in real systems, not as names to memorize.

## The Story

Most teams do not wake up and decide to "use a pattern".  
They feel pressure first:

- a checkout flow keeps growing new discount rules
- constructors stop telling a readable story
- a stable class needs logging or retries around it
- one event must notify many listeners
- request validation becomes one long unreadable method

Patterns matter only when that pressure keeps repeating.

## Start Here If

- you know the pattern names but still hesitate when asked where they help
- you have seen factories, builders, observers, and decorators in frameworks but want to understand the shape behind them
- you want examples that begin with a business problem instead of UML diagrams

## How To Read This Section

- read the story hook first
- run the topic file before reading the whole chapter guide
- ask what the "boring but direct" version would look like without the pattern
- keep only the pattern if it removes visible branching, coupling, or construction noise

## Pattern Lens

- strategy handles changing behavior
- factory and builder handle creation pressure
- adapter and decorator handle awkward boundaries
- observer and template method handle event flow and workflow shape
- chain of responsibility handles staged request processing

## Current Chapters

- `ch01_strategy_pattern`
- `ch02_creational_patterns`
- `ch03_structural_patterns`
- `ch04_behavioral_patterns`
- `ch05_request_routing_patterns`

## Watch Out

- a pattern should remove a real code smell, not decorate ordinary code with more classes
- if a simpler method is still easier to explain, keep the simpler method
- "enterprise-looking" code is not the same as better design

## What An Experienced Engineer Should Still Get From This Section

- clearer judgment about when patterns reduce change risk
- stronger language for design reviews
- better mapping between small examples and framework internals
- more confidence in rejecting unnecessary ceremony

## Recommended Next Step

Move to `sec18_architecture_and_integration` after this section so you can see how these small patterns show up again at system boundaries.
