# Exception Design And Resources Learning Kit

This chapter goes beyond “catch the exception” and focuses on designing exception flow well.

## The Problem

Teams often mix checked and unchecked exceptions without a clear rule, then lose context while handling files, network calls, or database work.

## Study Order

1. Run [CheckedUncheckedAndCustom.java](topics/checked_unchecked_and_custom/CheckedUncheckedAndCustom.java)
2. Run [TryWithResourcesAndChaining.java](topics/try_with_resources_and_chaining/TryWithResourcesAndChaining.java)

## What This Chapter Covers

- checked vs unchecked design philosophy
- custom exceptions that carry meaning
- try-with-resources
- exception chaining with causes
- when not to catch an exception too early

## After Reading This Chapter, You Should Know

- why some failures belong in the type system and some do not
- how resource handling became cleaner after try-with-resources
- why wrapping an exception without context usually makes debugging worse
