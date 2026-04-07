# Behavioral Patterns

Behavioral patterns are about flow: who reacts, what order work happens in, and how much of that flow stays visible.

## The Story

Two very common flow problems appear in business systems:

- one event should trigger several listeners
- one workflow should keep the same outer steps while allowing a few variations

Observer and template method solve those two pressures in very different ways.

## Run This First

1. Run [PublishingUpdatesWithObserver.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch04_behavioral_patterns/topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java)
2. Run [CapturingWorkflowsWithTemplateMethod.java](/Users/indiadelhi/repo/career/java-missing-tutorial/code/src/main/java/com/learning/javamissing/sec06_design_patterns/ch04_behavioral_patterns/topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java)
3. Ask whether your problem is event fan-out or fixed workflow shape

## What To Look For

- observer is about many listeners reacting to one event
- template method is about keeping one workflow order stable
- both patterns affect readability because they influence where control flow lives

## Use This Pattern When

- use observer when one event should notify many independent listeners
- use template method when the algorithm order is stable but a few steps vary
- use either pattern only if the flow stays explainable to the next reader

## Avoid This Pattern When

- avoid observer when one direct collaborator would be simpler
- avoid template method when composition can vary behavior more clearly than inheritance
- avoid hidden control flow that readers cannot trace from the caller

## Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| observer | one event fans out to many listeners | one caller needs one direct response |
| template method | process order is fixed | flexible composition is more important than inheritance |

## Small Case Study

Shipping status changes once, but email, SMS, and analytics should all react.  
Observer matches that shape.  
Now imagine export jobs.  
Every export fetches data, formats it, and delivers it, but CSV and JSON exports vary in one step. Template method matches that shape.

## Interview Focus

Q: When does observer become risky?  
A: When too many listeners create hidden control flow, unclear ordering, or unclear failure behavior.

Q: When is template method the wrong fit?  
A: When subclassing starts varying too many steps and composition would be clearer.

## Sources

- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Refactoring.Guru Pattern Catalog: https://refactoring.guru/design-patterns/catalog
