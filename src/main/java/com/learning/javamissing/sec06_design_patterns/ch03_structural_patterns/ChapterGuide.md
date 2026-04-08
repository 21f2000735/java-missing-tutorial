# Structural Patterns

## Why This Chapter Exists

Structural patterns help when the business logic is mostly fine, but the edges between parts of the code are awkward.

## The Pain Before It

Before learners build a mental model for structural patterns, the APIs feel like isolated facts instead of answers to one connected problem.

## Java Creator Mindset

Read the chapter as a small set of related ideas around structural Patterns, not as isolated trivia.

## How You Might Invent It

Two common frustrations show up in mature codebases:

- new code wants one interface, but a legacy library gives another
- a stable class needs extra behavior like logging, auditing, retries, or caching

The pain is not "what should the business rule be?"  
The pain is "how do these objects fit together cleanly?"

## Naive Attempt

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| adapter vs decorator | interfaces do not match | interfaces match and you need extra behavior |
| subclassing vs decorator | extension is intrinsic to the base class | behavior should be optional and composable |

## Why It Breaks

- avoid adapter if you control both sides and can align the interface directly
- avoid decorator if the "extra behavior" is really a different service with a different responsibility
- avoid creating wrappers that hide where the real work happens

## Final Java Direction

Read the chapter as a small set of related ideas around structural Patterns, not as isolated trivia.

## Study Order

1. Run [Adding Features With Decorator](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java)
2. Run [Translating Incompatible Apis With Adapter](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java)

## What To Notice

- adapter changes the shape of collaboration
- decorator preserves the interface and adds behavior around it
- both patterns are strongest near integration boundaries

### Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| adapter vs decorator | interfaces do not match | interfaces match and you need extra behavior |
| subclassing vs decorator | extension is intrinsic to the base class | behavior should be optional and composable |

### Interview Focus

Q: Adapter vs decorator?  
A: Adapter changes the interface shape. Decorator keeps the same interface and adds behavior around it.

Q: Why are these patterns common in framework code?  
A: Because framework code often integrates third-party APIs and layers optional cross-cutting behavior.

## Mental Model

Keep one question in mind while reading: what stays stable here, what changes, and what rule keeps the design correct?

## Common Mistakes

- avoid adapter if you control both sides and can align the interface directly
- avoid decorator if the "extra behavior" is really a different service with a different responsibility
- avoid creating wrappers that hide where the real work happens

## Tradeoffs

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| adapter vs decorator | interfaces do not match | interfaces match and you need extra behavior |
| subclassing vs decorator | extension is intrinsic to the base class | behavior should be optional and composable |

## Use / Avoid

### Use It When

- use adapter when you cannot or should not rewrite a dependency
- use decorator when you want optional behavior around a stable interface
- use these patterns when changing the original type would spread risk

## Practice

### Case Study

You migrate a payment gateway but still depend on an old vendor API.  
Adapter lets new code talk through a cleaner interface.  
Later operations asks for audit logging around notifications without editing the stable notifier.  
Decorator adds that feature without changing callers.

## Summary

After this chapter, you should be able to explain the main decisions behind structural patterns and connect them back to the runnable examples.

## Next Chapter

Move to [Behavioral Patterns](../ch04_behavioral_patterns/ChapterGuide.md) after this chapter.
