# Authoring Guide

This file defines how future chapter content should be written.

## Main Rule

One concept should use one topic file only.
For the site, one strong topic should usually have two pieces:

- `TopicGuide.md` for the lesson
- `ConceptName.java` for the runnable example

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

Recommended Java file layout:

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

## Topic Guide Templates

Use the same compact topic spine for most content. The default topic page should stay on these six blocks:

- topic/problem
- intuition
- small code snippet
- internal working
- comparison with other
- famous company interview question

Choose the template based on the primary learner outcome:

- [INTERVIEW_TOPIC_TEMPLATE.md](INTERVIEW_TOPIC_TEMPLATE.md) for interview-readiness topics
- [CERTIFICATION_TOPIC_TEMPLATE.md](CERTIFICATION_TOPIC_TEMPLATE.md) for Java 25 certification-oriented revision topics
- [VISUAL_LESSON_STANDARD.md](VISUAL_LESSON_STANDARD.md) for topics that should teach through diagrams first
- [RESOURCE_PAGE_TEMPLATE.md](RESOURCE_PAGE_TEMPLATE.md) for repeatable markdown resource pages such as compare guides, indexes, roadmaps, and migration pages

Use `runner: embedded` for stable single-file examples that can be pushed to JDoodle from the site.  
Use `runner: local` for preview-sensitive or multi-file examples.
Set `mode` in topic front matter to one of `interview`, `certification`, or `shared`.
Set `visual` in topic front matter to one of `required`, `recommended`, or `none`.
For internal-working topics, use `VISUAL_LESSON_STANDARD.md` only when the picture truly reduces confusion.
Do not restate the same teaching point under multiple renamed headings.
If a section does not add new value, remove it.
Do not add extra default sections like `Why It Matters`, `Naive Answer`, `Better Answer`, `Strong Interview Answer`, `Quick Quiz`, or `Decision Guide` unless they add genuinely new information.

## Naming Limits

Keep names short enough that they are easy to scan in:

- the site sidebar
- code tabs
- package names
- file paths

Use these limits:

- recommended class name: `<= 32`
- hard class name: `<= 40`
- recommended topic folder slug: `<= 28`
- hard topic folder slug: `<= 42`
- recommended full package name: `<= 120`
- hard full package name: `<= 140`

If a name is too long:

- remove filler words like `understanding`, `choosing`, `passing`, `solving`
- keep the concept noun and the key verb
- prefer `HashMapBucketsAndCollisions` over `UnderstandingHashMapBucketsAndCollisions`
- prefer `request_validation_chain` over `passing_requests_with_chain_of_responsibility`

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
- `RunAllTopics.java`

`ChapterGuide.md` should stay short. It should introduce the chapter, point to the important topics, and give a simple comparison or study order.
Do not repeat the full six-block topic template inside the chapter guide unless a section adds genuinely new value.

## Choosing The Right Template

Use the interview template when the topic should help the learner explain a decision out loud, defend tradeoffs, and answer company-style follow-ups.

Use the certification template when the topic should help the learner predict output or compile behavior and revise a narrow Java rule quickly.

If a topic tries to do both equally, the writing usually gets bloated.
Pick a primary goal and let the secondary goal be a short appendix instead.

## Layered Reader Rule

One topic should serve multiple reader levels without turning into a mess.

- beginners should get story, pain, and a simple code path
- intermediate readers should get the mental model and the reasoning path
- interview readers should get tradeoffs and explanation language
- advanced readers should still see why Java chose this shape

The safest way to satisfy different readers is to layer the explanation in that order instead of trying to satisfy everyone at once.

## Release-Aware Writing

This site aims to help users learn Java 7 through Java 25.

When a topic is version-sensitive:

- add `introduced` in `TopicGuide.md`
- say whether the feature is stable, preview, or final
- mention what older Java users would have done before this feature existed
- point to the migration relevance where useful

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
- Item 3: cover in the next related topic
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
