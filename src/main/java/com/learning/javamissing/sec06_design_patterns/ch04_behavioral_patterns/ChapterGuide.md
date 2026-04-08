# Behavioral Patterns

## Problem

Behavioral patterns are about flow: who reacts, what order work happens in, and how much of that flow stays visible.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- avoid observer when one direct collaborator would be simpler
- avoid template method when composition can vary behavior more clearly than inheritance
- avoid hidden control flow that readers cannot trace from the caller

## Fix

Run the topics in this order:

1. Run [Capturing Workflows With Template Method](topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java)
2. Run [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java)

What to observe:

- Which topic shows the failure first: [Capturing Workflows With Template Method](topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java).
- Which topic narrows the rule: [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java).
- Which topic shows the cleaner abstraction: [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java).

## Improvement

Read the chapter as a small set of related ideas around behavioral Patterns, not as isolated trivia.

After this chapter, you should be able to explain why Behavioral Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The chapter keeps the same learning loop: run, observe, change one thing, and compare.
- The real pressure stays the same even when the API changes.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.

## Rule

👉 Rule: Read the chapter as a small set of related ideas around behavioral Patterns, not as isolated trivia.

## Try this

- Run [Capturing Workflows With Template Method](topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java) and note the first thing that breaks.
- Run [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java) and write down what the rule becomes.
- Run [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java) and compare the result with the naive approach.
