# JIT And Garbage Collection Revision Sheet

## Remember

- the JIT compiles frequently executed bytecode into optimized machine code
- GC reclaims memory from objects that are no longer reachable
- G1 is the mainstream low-pause collector for many server workloads
- ZGC and Shenandoah aim for very low pause times on larger heaps

## Interview Questions

1. What does the JIT compiler do in Java?
2. Why do people care about pause time in garbage collection?
3. When do G1, ZGC, and Shenandoah usually enter the discussion?
