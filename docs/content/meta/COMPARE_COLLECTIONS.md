# Compare Collections

Use this page when you are choosing between `List`, `Set`, and `Map` and want the decision quickly.

## The Quick Rule

- Use `List` when order matters and duplicates are allowed.
- Use `Set` when uniqueness matters more than position.
- Use `Map` when lookup by key is the real job.

## One-Look Comparison

| Structure | Best for | Allows duplicates | Lookup shape | Common Java choice |
| --- | --- | --- | --- | --- |
| `List` | ordered items, index access | yes | by index | `ArrayList` |
| `Set` | unique values | no | by value | `HashSet` |
| `Map` | key-value lookup | keys no, values yes | by key | `HashMap` |

## Use This When

- You are modeling a cart, report rows, or ordered workflow steps: start with `List`.
- You are tracking tags, IDs, or already-seen values: start with `Set`.
- You are storing configuration, caches, counters, or user-by-id lookup: start with `Map`.

## Watch Out

- Do not use `List` when you keep checking `contains()` on large data just to enforce uniqueness.
- Do not use `Set` when the business meaning depends on duplicates or stable order.
- Do not use `Map` if the value itself should really be the main thing you iterate over without keys.

## Performance Lens

- `ArrayList` gives cheap append and fast index access, but middle inserts and deletes shift elements.
- `HashSet` and `HashMap` are usually fast for add and lookup, but their real cost still depends on hashing quality and resize behavior.
- `TreeSet` and `TreeMap` buy sorted order with higher constant cost than hash-based structures.

## Read Next

- [Collections section](src/main/java/com/learning/javamissing/sec02_collections/SectionGuide.md)
- [List, Set, Map topic](src/main/java/com/learning/javamissing/sec02_collections/ch01_collections/topics/list_set_map/TopicGuide.md)
- [ArrayList growth and lookup](src/main/java/com/learning/javamissing/sec20_data_structures_and_complexity/ch02_collections_internals_and_tradeoffs/topics/arraylist_growth_and_lookup/TopicGuide.md)
