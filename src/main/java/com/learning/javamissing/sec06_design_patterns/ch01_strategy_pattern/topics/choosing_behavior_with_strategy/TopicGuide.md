---
introduced: Java 5+
status: stable
runner: embedded
estimated: 7 min
mode: interview
interviewQ:
  - question: What problem does Strategy solve in one sentence?
    answer: It separates one changing behavior from a stable workflow so the caller stops growing conditionals.
  - question: When is Strategy overkill?
    answer: When there are only one or two tiny stable cases and the behavior is unlikely to vary independently.
---

# Strategy pattern

## Strategy pattern

**Concept**

choose one behavior through a strategy interface

**Example**

```java
    public static void main(String[] args) {
        System.out.println("Concept: choose one behavior through a strategy interface");
        System.out.println("Story hook: the checkout flow stays the same, but marketing keeps adding new discount campaigns every month.");
        System.out.println("Real-world problem: checkout uses different discount rules for students and festivals.");
        System.out.println("Mental model: checkout should not know every discount formula.");
        System.out.println();

        int festivalFinalAmount = applyDiscount(2_000, new FestivalDiscount());
        int studentFinalAmount = applyDiscount(2_000, new StudentDiscount());

        // Expected output:
        // festivalFinalAmount = 1700
        // studentFinalAmount = 1800
        System.out.println("festivalFinalAmount = " + festivalFinalAmount);
        System.out.println("studentFinalAmount = " + studentFinalAmount);
        System.out.println("Why it works: checkout depends on the DiscountPolicy contract, not one hard-coded rule.");
        System.out.println("Use this when: one small part of the workflow changes often while the surrounding flow stays stable.");
        System.out.println("Avoid this when: you only have one or two tiny rules and they are unlikely to grow.");
        System.out.println("Common mistake: replacing one huge switch with many strategies when the rule set is still tiny and stable.");
        System.out.println("Watch out: if callers still choose concrete strategy classes everywhere, the branching just moved instead of disappearing.");
        System.out.println("Try this next: add a PremiumDiscount strategy and notice that applyDiscount does not need to change.");
        System.out.println("After reading this example, you should know:");
        System.out.println("- strategy moves changing behavior behind a contract");
        System.out.println("- the caller stays stable while rules grow independently");
        System.out.println("- strategy is strongest when behavior changes more often than the workflow");
    }
```

**What happens**

- checkout uses different discount rules for students and festivals.
- strategy moves changing behavior behind a contract

**What stays stable**

- strategy moves changing behavior behind a contract
- choose one behavior through a strategy interface

**What changes**

- checkout uses different discount rules for students and festivals.
- replacing one huge switch with many strategies when the rule set is still tiny and stable.

**Why it matters**

one small part of the workflow changes often while the surrounding flow stays stable. checkout depends on the DiscountPolicy contract, not one hard-coded rule.

**Rule**

👉 Rule: strategy moves changing behavior behind a contract

**Try this**

- Define the behavior contract. 2. Add one implementation per rule. 3. Pass the chosen strategy into the stable workflow.
