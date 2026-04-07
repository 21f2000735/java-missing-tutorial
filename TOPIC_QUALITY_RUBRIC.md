# Topic Quality Rubric

Use this rubric to judge whether a topic file is good enough to keep.

The goal is not to add more words.
The goal is to teach the concept clearly, correctly, and memorably.

## Pass Criteria

A topic is strong only if it teaches:

- what the concept is
- why the concept exists
- what real problem it solves
- how to think about it
- how to code it
- what output to expect
- what mistakes to avoid
- what experienced engineers care about

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

### 1. Concept Clarity

- Does the topic explain the idea in plain English?
- Can a fresher describe the concept after reading it?

### 2. Why It Exists

- Does the topic explain why Java needs this feature or idea?
- Is the problem statement explicit?

### 3. Real-World Relevance

- Is the example tied to a believable domain?
- Can the learner imagine seeing this in a real project?

### 4. Runnable Example Quality

- Does the file contain actual runnable code?
- Is the example small enough to understand in one sitting?

### 5. Expected Output

- Is the output shown or described clearly?
- Is the output explained, not only listed?

### 6. Mental Model

- Does the topic teach how to think about the concept?
- Does it help the learner reason, not only memorize?

### 7. Common Mistakes

- Does the topic show at least one realistic mistake?
- Does it explain why the mistake is wrong?

### 8. Interview Value

- Does the topic help the learner explain tradeoffs out loud?
- Is there at least one useful interview-style question?

### 9. Exam Value

- Does the topic call out syntax traps or output traps where relevant?
- Is the OCJP angle separated from real-world advice?

### 10. Senior Value

- Does the topic include at least one maintainability, API design, or correctness note for experienced developers?

## Required Topic Shape

Every strong topic file should contain, either as comments or printed teaching sections:

1. `Concept`
2. `Why this concept is needed`
3. `What problem this solves`
4. `Real-world setup`
5. `How to think about it`
6. `How to code it`
7. `Expected output`
8. `Common mistake`
9. `Interview angle`
10. `Senior note`

## Deep Dive Rule

Only add a deep dive when the topic is genuinely tricky.

Good deep-dive candidates:

- generics
- collectors
- synchronization
- structured concurrency
- pattern matching
- modules

Deep dives should explain:

- what is happening under the hood
- what learners usually misunderstand
- what design tradeoff matters in production code

## Rewrite Trigger

Rewrite the topic if:

- it is still mostly placeholder text
- the example has no believable business meaning
- the output is not explained
- the learner cannot tell when to use the concept
- the topic is only syntax-first and not concept-first
