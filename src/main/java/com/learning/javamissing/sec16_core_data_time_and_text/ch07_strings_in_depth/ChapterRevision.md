# Strings In Depth Revision Sheet

## Remember

- `==` compares references, `.equals()` compares string content
- the string pool lets identical string literals share storage
- `StringBuilder` is the default mutable string builder in single-threaded code
- `StringBuffer` is synchronized and usually not the first choice today

## Interview Questions

1. Why does `==` sometimes look like it works on strings and then fail later?
2. When would you choose `StringBuilder` over `StringBuffer`?
3. What role does the string pool play?
