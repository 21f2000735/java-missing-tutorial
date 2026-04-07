# Behavioral Patterns Learning Kit

Behavioral patterns help when the difficult part is not object creation or object shape, but how work moves through the system.

## What Problem This Chapter Solves

Many systems struggle with flow problems:

- many listeners should react to one event
- one workflow should keep the same outer steps while allowing a few internal variations

Behavioral patterns give structure to those interactions so the flow stays explainable.

## Study Order

1. Run [PublishingUpdatesWithObserver.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch04_behavioral_patterns/topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java)
2. Run [CapturingWorkflowsWithTemplateMethod.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch04_behavioral_patterns/topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java)

## Quick Summary

- observer lets one publisher notify many listeners
- template method fixes workflow order while allowing small steps to vary
- behavioral patterns show up in event systems, exports, pipelines, and framework hooks

## Compare With

| Compare | Prefer Left When | Prefer Right When |
| --- | --- | --- |
| observer | many listeners must react to one event | one direct caller just needs one result |
| template method | the overall process is stable but some steps vary | each step should be passed in more freely, often through composition or strategy |

## Mini Case Study

Imagine an e-commerce order update.

- shipping status changes once
- email, SMS, and analytics listeners should all react

Observer fits naturally.  
Now imagine export jobs.

- fetch data
- format it
- deliver it

That outer workflow stays stable even if CSV and JSON formatting vary. Template method fits.

## Interview Focus

Q: When is observer useful?  
A: When one event should notify multiple listeners without the publisher knowing their concrete implementations.

Q: When is template method useful?  
A: When the overall algorithm order is fixed but some steps vary between implementations.

## Sources

- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Refactoring.Guru Pattern Catalog: https://refactoring.guru/design-patterns/catalog
