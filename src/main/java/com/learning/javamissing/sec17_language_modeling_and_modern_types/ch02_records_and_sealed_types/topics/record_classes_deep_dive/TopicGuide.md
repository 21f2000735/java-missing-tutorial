---
introduced: Java 16
status: stable
runner: embedded
estimated: 9 min
mode: interview
visual: recommended
---

# Record Classes Deep Dive

## Topic / Problem
- Real problem: many classes only carry data and boilerplate gets in the way.
- Why this Java feature: records model immutable data clearly and with less code.

Bad code:
```java
class Money {
    private final String currency;
    private final int amount;
}
```
Good code:
```java
record Money(String currency, int amount) {}
```

## Intuition
- Records are data-first classes.
- Java generates the boring parts for you.
- Comparison table:

| Feature | Record | Regular class |
| --- | --- | --- |
| `equals/hashCode/toString` | auto-generated | manual |
| Immutability | fields are final | depends on design |
| Validation | compact constructor | normal constructor |

## Small Code Snippet
- The runnable example creates two identical `Money` records.
- Expected output:
  - `record = Money[currency=INR, amount=499]`
  - `equals = true`

## Internal Working
- Records are final data carriers.
- They can implement interfaces and use compact constructors for validation.
- Trap callout: records are not for every object graph; they are best when the class is mainly a value.

## Comparison With Other
- Use records for values, DTOs, and result types.
- Use regular classes when identity and behavior matter more than data shape.
- Do not force inheritance into a record design.

## Famous Company Interview Question
Q: Why are records useful?
A: Because they reduce boilerplate for immutable data carriers.

Q: Can a record have validation?
A: Yes, through a compact constructor.

Q: Can records implement interfaces?
A: Yes, they can.
