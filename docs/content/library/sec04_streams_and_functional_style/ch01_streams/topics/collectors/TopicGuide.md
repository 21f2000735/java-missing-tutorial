---
introduced: Java 8
status: stable
runner: embedded
estimated: 10 min
---

# Collectors

## Collectors

**Concept**

Java programs stay useful when they are organized around ideas, not only syntax.

**Example**

```java
    public static void main(String[] args) {
        overview();
        wrongExample();
        toListExample();
        groupingByExample();
        partitioningByExample();
        summarizingExample();
        pitfalls();
        examTrap();
        interviewQuestion();
        exercise();
        solution();
    }
```

**What happens**

- Read the inline comments and printed lines in main() to see the expected behavior.

**What stays stable**

- First understand the problem in plain language, then map that idea to the Java code.

**What changes**

- using groupingBy when partitioningBy would express the intent more clearly

**Why it matters**

Java programs stay useful when they are organized around ideas, not only syntax.

**Rule**

👉 Rule: First understand the problem in plain language, then map that idea to the Java code.

**Try this**

- Identify the business data or behavior. 2. Choose the Java construct that expresses the idea clearly. 3. Run the example and compare the output with the explanation.
