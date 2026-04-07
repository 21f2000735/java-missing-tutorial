# Exception Design And Resources Revision Sheet

## Remember

- checked exceptions force the caller to deal with recoverable failure paths
- unchecked exceptions usually signal programming mistakes or unrecoverable flow
- custom exceptions should add business meaning, not just new class names
- try-with-resources closes resources automatically
- causes preserve the original failure chain

## Interview Questions

1. When would you choose a checked exception?
2. Why is try-with-resources safer than manual close logic?
3. What is exception chaining and why does it matter?
