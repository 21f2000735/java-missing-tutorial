# Memory And Execution Basics Learning Kit

## Why This Chapter Exists

This chapter exists because many Java bugs and interview mistakes come from one weak mental model:

- where the local variable lives
- where the object lives
- what a reference actually points to

## The Pain Before It

Learners often say:

- "I changed one variable. Why did the other one also change?"
- "Is Java pass-by-reference?"
- "Does the object live inside the variable?"

Those questions are all symptoms of the same confusion: mixing up the reference with the object.

## Java Creator Mindset

Start with separation, not terminology.

Keep these apart:

- stack frame for the current method
- local variable slot inside that frame
- heap object referenced by that slot

When those three ideas stay distinct, a lot of Java stops feeling mysterious.

## How You Might Invent It

If Java stored the full object inside every local variable, copying a variable would copy the entire object each time.

That would make method calls, sharing, and mutation expensive and awkward.

A simpler design is:

- local variables hold values or references
- objects live separately
- multiple references can point to the same object

## Naive Attempt

The naive mental model is:

"Two variables means two different objects."

That is wrong whenever one variable is assigned from another reference.

## Why It Breaks

That wrong model breaks when:

- one alias mutates shared state
- method calls appear to "change another variable"
- collection and concurrency examples start behaving in surprising ways

## Final Java Direction

Treat local variables as holders. Treat objects as separate runtime entities.

Then ask one question every time:

"Am I changing the reference, or am I changing the object it points to?"

## Study Order

1. Run [GC Roots And Reference Types](topics/gc_roots_and_references/GcRootsAndReferences.java)
2. Run [Understanding Stack, Heap, And References](topics/understanding_stack_heap_and_references/UnderstandingStackHeapAndReferences.java)

## What To Notice

- `first` and `second` are separate local variables
- both variables point to the same `Cart` object
- mutating the shared object is visible through both references

### Compare With

| Compare | Left Side | Right Side |
| --- | --- | --- |
| local variable | lives in the current stack frame | may hold a primitive value or an object reference |
| object | does not live "inside" the variable | lives separately on the heap |
| reassignment vs mutation | changes which object a reference points to | changes state inside the existing object |

### Interview Focus

Q: Why do both variables show the updated count?  
A: Because both references point to the same heap object, so the mutation is shared.

Q: What is the usual bad answer?  
A: Saying "Java is pass-by-reference" instead of explaining that Java passes values, including reference values.

## Mental Model

Use this picture in your head:

- stack frame = labels for the current method
- heap = objects with state
- reference = arrow from label to object

The label is not the object.

## Common Mistakes

- saying "variable equals object"
- confusing reassignment with mutation
- using memorized stack/heap words without tracing the arrows

## Tradeoffs

This model gives you:

- clearer debugging
- better mutation reasoning
- a stronger base for collections, exceptions, and concurrency

It costs you one thing:

- you must trace reference flow instead of guessing from variable names

## Use / Avoid

### Use It When

- you are debugging surprising mutations
- you are explaining parameter passing
- you are preparing for JVM and collections interviews

### Avoid It When

- you are using stack/heap labels as slogans without tracing the actual reference flow

## Practice

### Small Exercise

Take the example and try three changes:

1. reassign `second` to a new `Cart`
2. mutate through `first`
3. pass the `Cart` into another method and mutate there

Explain each result using references, not guesswork.

## Summary

After this chapter, you should be able to explain one of the most common Java surprises correctly:

Two variables can point to one object, so one mutation can be observed through both references.

## Next Chapter

Move to [JVM, JDK, JRE, And Class Loading Learning Kit](../ch02_jvm_jdk_jre_and_class_loading/ChapterGuide.md) after this chapter.
