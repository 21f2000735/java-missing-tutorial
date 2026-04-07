# Structural Patterns

Structural patterns help when the business logic is mostly fine, but the edges between parts of the code are awkward.

## The Story

Two common frustrations show up in mature codebases:

- new code wants one interface, but a legacy library gives another
- a stable class needs extra behavior like logging, auditing, retries, or caching

The pain is not "what should the business rule be?"  
The pain is "how do these objects fit together cleanly?"

## Run This First

1. Run [TranslatingIncompatibleApisWithAdapter.java](topics/translating_incompatible_apis_with_adapter/TranslatingIncompatibleApisWithAdapter.java)
2. Run [AddingFeaturesWithDecorator.java](topics/adding_features_with_decorator/AddingFeaturesWithDecorator.java)
3. Ask whether the problem is interface mismatch or optional added behavior

## What To Look For

- adapter changes the shape of collaboration
- decorator preserves the interface and adds behavior around it
- both patterns are strongest near integration boundaries

## Use This Pattern When

- use adapter when you cannot or should not rewrite a dependency
- use decorator when you want optional behavior around a stable interface
- use these patterns when changing the original type would spread risk

## Avoid This Pattern When

- avoid adapter if you control both sides and can align the interface directly
- avoid decorator if the "extra behavior" is really a different service with a different responsibility
- avoid creating wrappers that hide where the real work happens

## Compare With

| Compare | Use Left When | Use Right When |
| --- | --- | --- |
| adapter vs decorator | interfaces do not match | interfaces match and you need extra behavior |
| subclassing vs decorator | extension is intrinsic to the base class | behavior should be optional and composable |

## Small Case Study

You migrate a payment gateway but still depend on an old vendor API.  
Adapter lets new code talk through a cleaner interface.  
Later operations asks for audit logging around notifications without editing the stable notifier.  
Decorator adds that feature without changing callers.

## Interview Focus

Q: Adapter vs decorator?  
A: Adapter changes the interface shape. Decorator keeps the same interface and adds behavior around it.

Q: Why are these patterns common in framework code?  
A: Because framework code often integrates third-party APIs and layers optional cross-cutting behavior.

## Sources

- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Refactoring.Guru Pattern Catalog: https://refactoring.guru/design-patterns/catalog
