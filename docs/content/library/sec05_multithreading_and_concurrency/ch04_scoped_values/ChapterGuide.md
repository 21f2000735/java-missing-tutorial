# Scoped Values Learning Kit

This chapter is about one narrow but useful problem: some context belongs to one operation and should be readable through many nested calls without becoming global mutable state.

## The Problem

Real systems often need request-scoped metadata:

- request id
- current user
- tenant id
- trace id

Passing that through every method can become noisy. Mutable thread-local state can leak. Scoped values give a bounded context mechanism.

## Run This First

1. Run [IntroducingScopedValues.java](topics/introducing_scoped_values/IntroducingScopedValues.java)
2. Run [BindingRequestContext.java](topics/binding_request_context/BindingRequestContext.java)
3. Run [ScopedValuesVsThreadLocal.java](topics/scoped_values_vs_thread_local/ScopedValuesVsThreadLocal.java)

## What To Look For

- the bound value exists only inside one execution scope
- this is good for read-mostly request metadata
- ordinary business data should still be passed as normal parameters when that is clearer

## Use This Chapter When

- one request-level value must cross many layers
- you want a bounded context mechanism instead of mutable thread-local state
- virtual threads and structured tasks make request lifetime more important

## Avoid This Approach When

- the value is ordinary business data for one small call chain
- the state is mutable domain state
- you are not matching the correct JDK preview setup

## Next Step

Go back through the virtual-thread and structured-concurrency examples and notice how much easier they become to reason about when both task lifetime and context lifetime are explicit.
