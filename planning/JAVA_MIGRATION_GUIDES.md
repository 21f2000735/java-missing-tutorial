# Java Migration Guides

This page is for engineers moving codebases across the biggest Java upgrade jumps.

The goal is not only "make it compile".  
The goal is:

- understand the new mental model
- replace old habits with better ones
- modernize selectively without creating chaos

## 7 To 8

### Learn

- lambdas
- streams
- `Optional`
- new date/time API
- interface default methods

### Watch

- do not rewrite every loop into streams blindly
- avoid using `Optional` as a field by default
- learn method references, but do not overuse them when they reduce clarity

### Modernize

- replace `Date`/`Calendar` usage in new code
- move repetitive collection processing to streams where it improves readability

## 8 To 11

### Learn

- module system awareness
- standard HTTP client
- collection and string API additions

### Watch

- classpath vs module-path confusion
- use modules only if they solve a real boundary problem for your project

### Modernize

- replace legacy HTTP libraries only where it gives real value
- adopt newer string helpers and collection factories in new code

## 11 To 17

### Learn

- records
- sealed classes
- pattern matching for `instanceof`
- text blocks

### Watch

- use records for value-like data, not every class
- sealed hierarchies help when the set of variants should stay controlled

### Modernize

- replace repetitive DTO-style code with records where it improves clarity
- use text blocks for SQL, JSON, and templates when multiline readability matters

## 17 To 21

### Learn

- virtual threads
- record patterns
- pattern matching for `switch`
- sequenced collections

### Watch

- virtual threads do not make all blocking and coordination problems disappear
- pattern matching should clarify domain flow, not create clever but hard-to-read code

### Modernize

- use virtual threads for request-per-task style concurrency
- use improved pattern matching where branching becomes more direct and readable

## 21 To 25

### Learn

- keep current with the latest LTS APIs and language refinements
- follow which preview features from 22 to 25 matter to your domain

### Watch

- do not build production-critical code around preview APIs without deliberate version planning
- keep your toolchain, IDE, CI, and runtime aligned

### Modernize

- move teams toward a current LTS baseline
- clean out compatibility hacks that only existed for older JDKs

## Migration Checklist

1. Pin the source, target, and runtime JDK explicitly.
2. Upgrade the build tool and CI first.
3. Run tests before refactoring style.
4. Modernize one category at a time: collections, date/time, concurrency, modeling.
5. Add version notes to code that depends on preview or recent behavior.

## Sources

- Dev.java Learn: https://dev.java/learn/
- Oracle JDK migration guide, release 26: https://docs.oracle.com/en/java/javase/26/migrate/jdk-migration-guide.pdf
- Java SE language updates, release 25: https://docs.oracle.com/en/java/javase/25/language/java-se-language-updates.pdf
- Oracle Java 25 announcement: https://www.oracle.com/news/announcement/oracle-releases-java-25-2025-09-16
- Oracle Java 26 announcement: https://www.oracle.com/news/announcement/oracle-releases-java-26-2026-03-17/
