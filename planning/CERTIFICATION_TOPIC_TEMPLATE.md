# Certification Topic Template

Use this template for topics whose main job is Java 25 certification-oriented revision.

The learner should finish the topic able to:

- recognize the rule the exam is testing
- predict output or compile behavior
- avoid common traps
- connect the rule back to runnable Java code

## Main Rule

Keep the topic precise and exam-oriented, but do not let it become memorization-only.

The learner should see:

- the rule
- the trap
- the correct mental model
- the runnable example

## Required `TopicGuide.md` Shape

```md
---
introduced: Java 25
status: stable
runner: embedded
estimated: 6 min
mode: certification
visual: recommended
---

# Topic Name

## Quick Visual
- one simple picture that clarifies the rule, memory shape, flow, or compile/runtime boundary

## Certification Focus
- What Java rule, feature, or API area this topic revises

## Why This Rule Exists
- The plain-English reason behind the rule

## Core Rule
- The exact rule to remember
- The boundary where people get confused

## Common Trap
- The mistake the exam is likely to exploit

## Runnable Example
- Small example with expected result

## Output / Compile Check
- What compiles
- What fails
- What prints

## Walkthrough
- Explain the result step by step

## Java 25 Note
- Version-specific note when relevant

## Mistakes To Avoid
- Fast reminders for revision

## Quick Revision
- 3 to 5 short bullets the learner can recall later

## Practice Check
- One small question or prediction exercise

## Next Revision Topic
- The next topic in certification order
```

## What To Emphasize

- picture first when the exam confusion is about internal shape or flow
- exactness
- output prediction
- compile-time reasoning
- Java 25 awareness where it matters
- short, clear revision language

## Good Optional Additions

- `## Compare With`
- `## Version Notes`
- `## Memory Aid`
- `## Mini Quiz`

## Avoid

- long motivational prose
- broad interview digressions
- repeating the same rule under several headings
- production architecture discussion unless it clarifies the exam rule
