# Topic Quality Rubric

Use this rubric to judge whether a topic file is good enough to keep.

The goal is not to add more words.
The goal is to teach the concept clearly, correctly, and memorably.

Choose the expected shape first:

- interview-first topic: use [INTERVIEW_TOPIC_TEMPLATE.md](INTERVIEW_TOPIC_TEMPLATE.md)
- certification-first topic: use [CERTIFICATION_TOPIC_TEMPLATE.md](CERTIFICATION_TOPIC_TEMPLATE.md)

## Pass Criteria

A topic is strong only if it teaches:

- what the topic or problem is
- the intuition behind it
- one small runnable code snippet
- the internal working or boundary that matters
- one useful comparison with another option
- one famous company interview question related to the topic

## Scoring

Score each category from `0` to `3`.

- `0`: missing
- `1`: weak
- `2`: acceptable
- `3`: strong

Target:

- `24+` = strong topic
- `18-23` = usable but needs improvement
- `<18` = rewrite required

## Categories

### 1. Topic And Problem

- Does the topic explain the problem in plain English?
- Can a fresher describe what the topic is for after reading it?

### 2. Intuition

- Does the topic give a simple mental picture?
- Does it avoid repeating the problem statement word for word?

### 3. Small Code Snippet

- Does the topic include a runnable snippet?
- Is the example small enough to understand quickly?

### 4. Internal Working

- Does the topic explain what Java does under the hood?
- Does it explain the boundary that matters most?

### 5. Comparison With Other

- Does the topic compare the concept with the closest alternative?
- Does it clearly say when to use each one?

### 6. Famous Company Interview Question

- Does the topic include a company-style interview question?
- Is the answer short and reusable?

### 7. Focus And Non-Repetition

- Does each section add a new teaching step?
- Has the topic avoided repeating the same idea under renamed headings?

## Required Topic Shape

Every strong topic file should follow one primary template:

- interview-first topic: [INTERVIEW_TOPIC_TEMPLATE.md](INTERVIEW_TOPIC_TEMPLATE.md)
- certification-first topic: [CERTIFICATION_TOPIC_TEMPLATE.md](CERTIFICATION_TOPIC_TEMPLATE.md)

Do not merge both templates into one long page unless there is a strong reason.
Do not add extra default sections unless they introduce new information.

## Deep Dive Rule

Only add a deep dive when the topic is genuinely tricky.

Good deep-dive candidates:

- generics
- collectors
- synchronization
- structured concurrency
- pattern matching
- modules

Deep dives should still fit the six-block shape, but the `Internal Working` section can be longer when the mechanism is the real difficulty.

## Rewrite Trigger

Rewrite the topic if:

- it is still mostly placeholder text
- the example has no believable business meaning
- the output is not explained
- the learner cannot tell when to use the concept
- the topic is only syntax-first and not concept-first
- the same explanation appears again under renamed headings
- the topic is about internal working, but there is no useful picture or flow explanation
