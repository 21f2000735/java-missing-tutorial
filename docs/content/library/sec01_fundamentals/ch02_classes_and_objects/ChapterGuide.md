# Classes And Objects Learning Kit

## Learning Path

1. Step 1: Start with [Classes Objects](topics/classes_objects/ClassesObjects.java) to see the raw behavior.
2. Step 2: Try [Inheritance](topics/inheritance/Inheritance.java) to see the naive approach.
3. Step 3: Watch [Inheritance](topics/inheritance/Inheritance.java) to find the failure.
4. Step 4: Use [Inheritance](topics/inheritance/Inheritance.java) to restore correctness.
5. Step 5: Finish with [Polymorphism](topics/polymorphism/Polymorphism.java) to see the improvement.

## Problem

Java programs stay useful when they are organized around ideas, not only syntax.

## Naive Approach

The naive move is to pick the first obvious API and assume it will stay correct in every case.

## Failure

- Classes Objects: Java programs stay useful when they are organized around ideas, not only syntax.
- Inheritance: Java programs stay useful when they are organized around ideas, not only syntax.
- Polymorphism: Java programs stay useful when they are organized around ideas, not only syntax.

## Fix

Run the topics in this order:

1. Run [Classes Objects](topics/classes_objects/ClassesObjects.java)
2. Run [Inheritance](topics/inheritance/Inheritance.java)
3. Run [Polymorphism](topics/polymorphism/Polymorphism.java)

Example:

```java
    public static void main(String[] args) {
        Vehicle bike = new Bike("Road Bike");
        Vehicle car = new Car("City Car");
        System.out.println(bike.describe());
        System.out.println(car.describe());
        System.out.println("Lesson: subclasses reuse common state and specialize behavior.");
    }
```

What happens:

- subclasses reuse common state and specialize behavior.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

## Improvement

Example:

```java
    public static void main(String[] args) {
        List<Notification> notifications = List.of(new Email(), new Sms(), new Push());
        notifications.forEach(notification -> System.out.println(notification.send("Discount starts at 8 PM")));
        System.out.println("Lesson: the same interface call can trigger different behavior based on the actual object.");
    }
```

What happens:

- the same interface call can trigger different behavior based on the actual object.

Why it matters:

Java programs stay useful when they are organized around ideas, not only syntax.

After this chapter, you should be able to explain why Classes And Objects exists, what breaks if you skip the rule, and why the better abstraction is worth the cost.

## What stays stable

- The underlying pressure stays the same: correctness still depends on the rule being visible and testable.
- The learning loop stays the same: run, observe, change one thing, and compare.
- The underlying pressure stays the same even when the API changes.
- [Classes Objects](topics/classes_objects/ClassesObjects.java), [Inheritance](topics/inheritance/Inheritance.java), and [Polymorphism](topics/polymorphism/Polymorphism.java) all protect the same design pressure from different angles.

## What changes

- The API shape, ownership model, or execution behavior changes from topic to topic.
- The API shape changes from topic to topic.
- The failure mode changes when one assumption is removed.
- The abstraction cost changes as the fix becomes stronger.
- [Classes Objects](topics/classes_objects/ClassesObjects.java) starts with the raw behavior, [Inheritance](topics/inheritance/Inheritance.java) adds the safety rule, and [Polymorphism](topics/polymorphism/Polymorphism.java) moves to the cleaner abstraction.

## Rule

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

## Try this

- Run [Classes Objects](topics/classes_objects/ClassesObjects.java) and note the first thing that breaks.
- Run [Inheritance](topics/inheritance/Inheritance.java) and remove the safety rule or coordination step.
- Run [Polymorphism](topics/polymorphism/Polymorphism.java) and compare the result with the naive approach.
