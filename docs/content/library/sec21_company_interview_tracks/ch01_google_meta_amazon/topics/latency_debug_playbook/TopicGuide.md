---
introduced: Java 8
status: stable
runner: embedded
estimated: 7 min
---

# Latency Debug Playbook

## The Problem

Good interviewers ask what you do when production gets slower, because debugging quality predicts engineering quality.

## Run This Code

Run the comparison and notice that the answer is not "optimize everything."
It is "identify the largest change first."

## Strong Interview Answer

Mention:

- compare baseline and current release
- identify the worst changed dependency
- decide whether rollback is needed
- inspect error rate, GC, and downstream timing together

## Company Lens

- Google: disciplined narrowing
- Meta: practical production response

## Next Topic

Go to `ch02_apple_coinbase_jane_street` for correctness, API design, and algorithm-heavy questions.
