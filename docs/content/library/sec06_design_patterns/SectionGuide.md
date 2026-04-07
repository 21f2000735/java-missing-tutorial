# sec06_design_patterns Design Patterns

This section should teach patterns as repeatable problem shapes, not as names to memorize for interviews.

## Before You Start

- Prerequisites: sec01_fundamentals and sec07_principles_and_solid are the best base.
- This section prepares you for: framework code reading, service design, API boundary decisions, and architecture discussions.
- Suggested pace: 4 to 6 focused sessions.

## What Real Problems This Section Solves

- one class is making too many behavior choices with `if` or `switch`
- object creation is getting noisy and hard to read
- one part of the system needs to talk to an old or incompatible API
- you need to add behavior without changing a stable core class
- many listeners should react to one event
- one request should pass through multiple validation or middleware steps

## How To Read This Section

- start with the problem first, not the pattern name
- run the topic file and compare the output with the situation described in the chapter
- ask what would go wrong if you did not use the pattern
- focus on tradeoffs: when the pattern helps, and when it adds unnecessary structure
- finish each chapter with the revision sheet before moving on

## Pattern Mindset

- a pattern is useful only when a recurring design pressure exists
- simple code is better than a pattern used too early
- a pattern should reduce branching, coupling, or duplication in a visible way
- if the code becomes harder to explain after applying a pattern, the pattern choice is probably wrong

## Current Chapters

- `ch01_strategy_pattern`
- `ch02_creational_patterns`
- `ch03_structural_patterns`
- `ch04_behavioral_patterns`
- `ch05_request_routing_patterns`

## How The Chapters Fit Together

- start with strategy because it teaches variation without hard-coded branching
- move to creational patterns once object creation starts hiding business intent
- study structural patterns when integration boundaries get awkward
- study behavioral patterns when workflows and event flow matter more than raw object shape
- end with request routing patterns because they combine sequencing, responsibility boundaries, and extension points

## Common Beginner Mistakes

- using a pattern to look “senior” instead of solving a real design problem
- introducing inheritance when composition would stay simpler
- naming classes after patterns without making the design clearer
- copying pattern diagrams from books without adapting them to the actual codebase

## What An Experienced Engineer Should Still Get From This Section

- sharper judgment about where patterns create clarity and where they create ceremony
- better vocabulary for design reviews
- stronger mapping between small examples and real production extension points
- easier reading of frameworks that use factories, decorators, observers, adapters, and chains internally

## Recommended Next Step

Move to sec18_architecture_and_integration once these patterns feel natural in small examples.
