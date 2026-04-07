# Maps And Iterators In Depth Revision Sheet

## Remember

- `HashMap` is the default general-purpose map, not the correct answer for every map problem
- `LinkedHashMap` preserves insertion order
- `TreeMap` keeps keys sorted
- `ConcurrentHashMap` changes the concurrency and iteration story

## Common Mistakes

- using `TreeMap` when only insertion order was needed
- assuming `Collections.synchronizedMap` and `ConcurrentHashMap` behave the same way
- editing a collection during iteration without understanding iterator guarantees

## Interview Questions

1. When would you choose `LinkedHashMap` over `HashMap`?
2. What is the practical difference between fail-fast and weakly consistent iteration?
3. Why is `ConcurrentHashMap` usually preferable to a synchronized wrapper for heavy shared access?
