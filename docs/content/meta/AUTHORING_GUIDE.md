# Authoring Guide

This file defines how future chapter content should be written.

## Main Rule

One concept should use one topic file only.

Do not split the same concept into:

- question file
- answer file
- exercise file
- solution file

Keep everything together so a learner can read one file and fully understand the topic.

## Target Learner

The default learner is a college fresher or junior developer.

Write as if the learner:

- knows basic programming ideas
- may not know Java deeply yet
- may not know production terminology
- needs examples that can be run and understood step by step

Also write so that an experienced engineer still finds value in the chapter:

- explain tradeoffs, not only syntax
- mention maintainability and API design where relevant
- keep the example simple, but not childish

## Topic File Template

Recommended file layout:

```java
package com.learning.javamissing.chXXX_topic_name.topics.concept_name;

/**
 * Topic: <Concept Name>
 * Why it matters
 * Where it appears in OCJP
 * Which Effective Java items relate to it
 */
public class ConceptName {
    public static void main(String[] args) {
        // 1. Basic example
        // 2. Better example
        // 3. Common pitfall
        // 4. Small exercise prompt
        // 5. Explained solution
        // 6. Interview Q&A notes
    }
}
```

## Topic File Quality Standard

Each topic file should include:

- a plain-English explanation
- a short real-world problem statement before the first code example
- a runnable basic example with real values and output
- a runnable better version of the example
- at least one pitfall
- at least one OCJP-style tricky point
- at least one interview question and answer
- one exercise with a clearly explained solution

Each topic file should avoid:

- vague placeholders
- generic print statements with no teaching value
- files that only describe code instead of running real code
- code that is too clever for the learner level
- copied text from books or websites
- unexplained jargon
- examples that require production experience just to understand the setup
- fake examples with no believable business meaning
- examples that teach syntax but do not teach when the feature helps in real code

## Fresher-Friendly Writing Rules

- explain new terms the first time they appear
- prefer simple variable names that describe business meaning
- keep methods short
- do not stack too many Java features in one example
- show expected output or clearly explain what will happen
- move from simple to advanced, not advanced to simple
- if an example is advanced, first show the beginner version
- use common business domains before abstract domains
- give variable names that sound like something a team would really use
- prefer one realistic scenario across the topic file instead of changing domains every few lines

## Real-World Example Rule

Every topic file should start from a believable situation such as:

- a student result system
- an e-commerce order
- a shopping cart
- a user profile page
- a payment or invoice flow
- a background report job
- an inventory or catalog lookup

The learner should be able to answer:

- who is using this code?
- what data is being processed?
- what result should come out?

If the example cannot answer those questions, it is probably too abstract.

## Champion Standard

Assume the long-term goal is to help the learner become excellent at Java, not only pass an exam.

That means each strong topic file should help with:

- syntax
- output prediction
- design thinking
- debugging intuition
- interview discussion
- production judgment

## Chapter Assets

Every chapter should contain these chapter-level files:

- `ChapterGuide.md`
- `RunChapter.java`

`ChapterGuide.md` should club together:

- theory
- deep-dive notes
- quick quiz
- interview questions
- sources
- Effective Java mapping
- OCJP trap notes
- mindmap or chart

Every `ChapterGuide.md` should also include:

- a short line saying the chapter is beginner-friendly
- a simple study order
- a quick summary after each major idea

## Interview Questions

`InterviewQuestions.md` should be chapter-wide, but each topic file should still contain a small interview section.

Use this style:

```text
Q: Why would you choose X over Y?
A: Because ...
```

Questions should test:

- conceptual understanding
- tradeoffs
- common production mistakes
- code reading skill

## Effective Java Coverage Tracking

`EffectiveJavaChecklist.md` should map chapter topics to Effective Java items.

Use this format:

```text
- Item 1: covered in topics/static_factories/StaticFactories.java
- Item 2: covered in topics/builders/Builders.java
- Item 3: planned
```

Do not copy long passages from the book.
Use original summaries and examples.

## OCJP Prep Book Usage

OCJP books may be used for coverage guidance and question style.

Good uses:

- identify important exam topics
- identify confusing syntax patterns
- identify common distractors
- identify useful short exercises

Not allowed:

- copying book questions directly
- copying explanations directly
- reproducing protected content in bulk
