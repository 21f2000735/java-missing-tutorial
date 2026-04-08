# Chapter Quality Checklist

Use this checklist before calling any chapter complete.

## Freshers First

- a college fresher can understand the chapter without prior industry experience
- difficult words are explained in simple English
- examples start simple before becoming advanced
- every topic explains what output to expect

## Topic Files

- every topic file runs directly
- every topic file shows real code, not only labels
- every topic file includes at least one real example
- every topic file includes one better version of the example
- every topic file includes one common mistake
- every topic file includes one OCJP trap
- every topic file includes one interview question and answer
- every topic file includes one exercise and one working solution
- every `TopicGuide.md` follows this H2 order:
  `Topic / Problem`, `Intuition`, `Small Code Snippet`,
  `Internal Working`, `Comparison With Other`,
  `Famous Company Interview Question`
- do not add extra default sections unless they add genuinely new information
- the topic should stay focused on one concept, one code path, one comparison, and one interview question

## Chapter Guide

- one `ChapterGuide.md` per chapter
- clear study order
- short beginner summary of each topic
- one comparison or study-order note if it adds value
- quick quiz only if it adds new value
- interview questions only if they are chapter-wide, not duplicated from topic files
- Effective Java mapping
- source links
- every `ChapterGuide.md` should stay shorter than a topic file and avoid repeating the topic template

## Quality Bar

- examples use small, readable data
- names are meaningful
- code is runnable as-is
- no placeholder prose remains
- no hidden `.class` files remain in the repo
