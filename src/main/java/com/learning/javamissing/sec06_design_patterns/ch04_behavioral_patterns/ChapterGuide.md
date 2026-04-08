# Behavioral Patterns

## Learning Path

1. Step 1: Start with the first topic to see the raw behavior.
2. Step 2: Try the naive version and compare the output.
3. Step 3: Watch the failure appear when the assumption changes.
4. Step 4: Apply the fix and check what stays stable.
5. Step 5: Finish with the improvement and move to the next chapter.

## Problem

Some workflows stay stable overall while a few internal steps vary.

## Naive Approach

- Watch out: if subclasses keep overriding many hooks, the base template is not really stable anymore.
- Try this next: add a JsonOrderExporter and notice that export() still owns the workflow order.

## Failure

- Capturing Workflows With Template Method: Watch out: if subclasses keep overriding many hooks, the base template is not really stable anymore.
- Capturing Workflows With Template Method: Try this next: add a JsonOrderExporter and notice that export() still owns the workflow order.
- Publishing Updates With Observer: Watch out: once many listeners appear, failures and ordering rules must be made explicit or the flow becomes mysterious.
- Publishing Updates With Observer: Try this next: add an analytics listener and decide whether one failing listener should stop the others.

## Fix

Run the topics in this order:

1. Run [Capturing Workflows With Template Method](topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java)
2. Run [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java)

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: observer");
        System.out.println("Story hook: one shipping update should trigger email, SMS, and analytics without the publisher knowing those concrete listeners.");
        System.out.println("Problem: one shipping event should notify more than one listener.");
        System.out.println();

        ShipmentStatusPublisher publisher = new ShipmentStatusPublisher();
        publisher.subscribe(message -> System.out.println("EMAIL listener -> " + message));
        publisher.subscribe(message -> System.out.println("SMS listener -> " + message));

        // Expected output:
        // EMAIL listener -> Order 42 shipped
        // SMS listener -> Order 42 shipped
        publisher.publish("Order 42 shipped");
        System.out.println("Why it works: the publisher knows only the listener contract, not concrete listener classes.");
        System.out.println("Use this when: one event should fan out to several listeners that can change independently.");
        System.out.println("Avoid this when: you only need one direct collaborator and the indirection adds hidden control flow.");
        System.out.println("Common mistake: letting listeners become so tightly coupled that observer turns into hidden control flow.");
        System.out.println("Watch out: once many listeners appear, failures and ordering rules must be made explicit or the flow becomes mysterious.");
        System.out.println("Try this next: add an analytics listener and decide whether one failing listener should stop the others.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- one event can notify many listeners");
        System.out.println("- the publisher does not need to know each listener's concrete type");
        System.out.println("- observer fits event-style updates");
    }
```

What happens:

- Watch out: once many listeners appear, failures and ordering rules must be made explicit or the flow becomes mysterious.
- Try this next: add an analytics listener and decide whether one failing listener should stop the others.

Why it matters:

One event often needs to notify many independent listeners.

## Improvement

Example:

```java
    public static void main(String[] args) {
        System.out.println("Concept: observer");
        System.out.println("Story hook: one shipping update should trigger email, SMS, and analytics without the publisher knowing those concrete listeners.");
        System.out.println("Problem: one shipping event should notify more than one listener.");
        System.out.println();

        ShipmentStatusPublisher publisher = new ShipmentStatusPublisher();
        publisher.subscribe(message -> System.out.println("EMAIL listener -> " + message));
        publisher.subscribe(message -> System.out.println("SMS listener -> " + message));

        // Expected output:
        // EMAIL listener -> Order 42 shipped
        // SMS listener -> Order 42 shipped
        publisher.publish("Order 42 shipped");
        System.out.println("Why it works: the publisher knows only the listener contract, not concrete listener classes.");
        System.out.println("Use this when: one event should fan out to several listeners that can change independently.");
        System.out.println("Avoid this when: you only need one direct collaborator and the indirection adds hidden control flow.");
        System.out.println("Common mistake: letting listeners become so tightly coupled that observer turns into hidden control flow.");
        System.out.println("Watch out: once many listeners appear, failures and ordering rules must be made explicit or the flow becomes mysterious.");
        System.out.println("Try this next: add an analytics listener and decide whether one failing listener should stop the others.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- one event can notify many listeners");
        System.out.println("- the publisher does not need to know each listener's concrete type");
        System.out.println("- observer fits event-style updates");
    }
```

What happens:

- Watch out: once many listeners appear, failures and ordering rules must be made explicit or the flow becomes mysterious.
- Try this next: add an analytics listener and decide whether one failing listener should stop the others.

Why it matters:

One event often needs to notify many independent listeners.

After this chapter, you should be able to explain why Behavioral Patterns exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Capturing Workflows With Template Method](topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java), [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java), and [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Capturing Workflows With Template Method](topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java) starts with the raw behavior, [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java) adds the safety rule, and [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java) moves to the cleaner abstraction.

## Rule

👉 Rule: The publisher owns the event; listeners subscribe to react when that event happens.

## Try this

- Run [Capturing Workflows With Template Method](topics/capturing_workflows_with_template_method/CapturingWorkflowsWithTemplateMethod.java) and note the first thing that breaks.
- Run [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java) and remove the safety rule or coordination step.
- Run [Publishing Updates With Observer](topics/publishing_updates_with_observer/PublishingUpdatesWithObserver.java) and compare the result with the naive approach.
