# How To Approach A Problem In An Interview

This guide is for coding, backend, and system-style interviews.

The goal is not to sound clever.
The goal is to show clear engineering thinking under time pressure.

## The Core Process

### 1. Restate the problem

Say the problem back in your own words.

This shows:

- you understood the ask
- you are not solving the wrong problem
- you can communicate clearly before coding

Example:

> "So the goal is to make retries safe for a booking API, which means the same request should not create two bookings."

### 2. Ask what matters

Before coding, ask about:

- input size
- constraints
- edge cases
- correctness versus speed
- what counts as success

This is where good candidates separate themselves from fast guessers.

### 3. Start with the simplest correct solution

Do not jump to the most advanced answer immediately.

First say:

- the brute-force or direct solution
- why it works
- its cost

That gives the interviewer a baseline and proves you can reason from first principles.

### 4. Name the bottleneck

Once the simple answer is clear, explain what makes it weak.

Example:

- repeated linear scan
- duplicate work
- expensive sort per request
- unsafe retry behavior
- shared mutable state

### 5. Improve one thing at a time

Upgrade the design in visible steps:

- better data structure
- caching
- idempotency key
- partitioning
- async boundary
- retry control

Do not try to improve five things at once.

### 6. Code with narration

As you code:

- explain the intent of major steps
- name invariants clearly
- mention edge cases before they surprise you

Good interview code should sound like readable engineering, not silent typing.

### 7. Test mentally before you stop

Always walk through:

- empty input
- one item
- duplicate item
- retry case
- failure case
- large input or hot path

### 8. Talk about tradeoffs

A strong answer ends with judgment:

- time complexity
- space complexity
- correctness guarantees
- failure modes
- when this solution is not ideal

## Problem Types And What To Optimize For

### Coding question

Focus on:

- correctness
- complexity
- edge cases
- clarity

### Backend design question

Focus on:

- API contract
- data model
- retries
- idempotency
- metrics

### System design question

Focus on:

- scale
- bottlenecks
- consistency
- partitioning
- observability

### Debugging question

Focus on:

- compare before and after
- reduce blast radius
- identify the biggest change
- avoid random guessing

## What Interviewers Usually Want To Hear

They usually want signals like:

- you understood the problem
- you can structure the solution
- you know what to optimize for
- you do not hide from tradeoffs
- you can explain your thinking clearly

## Common Bad Pattern

The weak pattern is:

1. jump into code
2. realize the structure is wrong
3. rewrite halfway
4. never explain tradeoffs

That feels noisy and unstructured.

## Better Pattern

The stronger pattern is:

1. clarify
2. state simple approach
3. name bottleneck
4. improve
5. code
6. test mentally
7. summarize tradeoffs

## Good Lines To Say In An Interview

- "Let me restate the problem to make sure I have it right."
- "I’ll start with the simplest correct version first."
- "The bottleneck in that approach is repeated scanning."
- "I can improve lookup by changing the data structure."
- "Before I finish, let me test the edge cases."
- "The tradeoff here is lower latency for slightly more memory."

## Use This With The Company Section

Pair this guide with:

- [COMPANY_QUESTION_BANK.md](COMPANY_QUESTION_BANK.md)
- [sec21_company_interview_tracks/SectionGuide.md](../src/main/java/com/learning/javamissing/sec21_company_interview_tracks/SectionGuide.md)

That gives you both:

- the process for solving interview problems
- the company-specific styles you should practice against
