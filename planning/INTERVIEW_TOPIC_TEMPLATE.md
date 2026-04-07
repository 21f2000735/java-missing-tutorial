# Interview Topic Template

Use this template for topics whose main job is to make the learner interview-ready.

The learner should finish the topic able to:

- explain the concept in plain English
- spot the naive answer quickly
- write or discuss a stronger answer
- defend tradeoffs under follow-up questions

## Main Rule

Do not restate the same idea under multiple renamed headings.

Each section must add something new:

- problem
- decision
- code
- tradeoff
- follow-up

If two sections say the same thing, delete one.

## Required `TopicGuide.md` Shape

```md
---
introduced: Java 8
status: stable
runner: embedded
estimated: 8 min
mode: interview
visual: recommended
---

# Topic Name

## Quick Visual
- one image, block diagram, or flow that makes the mechanism obvious fast
- explain what the learner should notice before showing code

## Interview Problem
- What kind of interview question this topic supports
- What the interviewer is actually testing

## Why It Matters
- The real production or backend pressure behind the topic

## Naive Answer
- What a weak candidate usually says or codes first

## Better Answer
- The stronger explanation, rule, or design choice

## Runnable Example
- What to run
- What output or behavior to notice

## Walkthrough
- Explain the key lines only
- Tie the code back to the interview decision

## Tradeoffs
- When this approach helps
- When it adds cost or complexity

## Common Follow-Ups
- Likely follow-up questions
- What a strong answer should mention

## Mistakes
- Common incorrect reasoning
- Common coding mistakes

## Strong Interview Answer
- A short answer the learner could say out loud

## Practice
- One change, edge case, or variant to try next

## Next Topic
- The next topic to read for interview sequencing
```

## What To Emphasize

- picture first when the real confusion is structural
- decision-making over syntax trivia
- correctness under pressure
- tradeoffs and failure modes
- backend realism
- how to speak the answer, not just how to code it

## Good Optional Additions

- `## Company Lens`
- `## Performance Lens`
- `## Comparison Snapshot`

Add them only if they introduce new insight.

## Avoid

- duplicate sections like `Why This Exists` and `Why This Matters` saying the same thing
- repeating the same bullet list under `Core Idea`, `Walkthrough`, and `Strong Interview Answer`
- long syntax dumps with no interview signal
- exam-trap details that distract from the interview goal
