---
introduced: Java 1.0
status: stable
runner: embedded
estimated: 7 min
---

# Handling Payment Failures

## The Problem

Real systems fail.

The question is not whether failure happens.  
The question is whether the code explains the failure clearly enough for:

- the developer
- the log reader
- the user-facing flow

## Run This Code

Run the example and see how the failure keeps business meaning instead of becoming a vague generic message.

## Expected Output

- the payment status becomes failed
- the reason stays visible

## ❌ Bad Code

Catch a broad exception, print a generic message, and lose the real reason.

That leads to code that is hard to debug and hard to trust.

## ✅ Better Code

Throw and catch exceptions that preserve business meaning.

In this case:

- the payment failed
- the gateway was unavailable

That is simple, precise, and useful.

## Why This Works

Good exception handling keeps the meaning of the failure path visible.  
That is very close to Clean Code thinking: unclear failure handling is unclear code.

## Use This When

- business failures need clear context
- the caller should decide how to react

## Avoid This When

- you are swallowing exceptions
- you convert every failure into the same vague message

## Version Notes

The core principle is timeless. Modern Java mainly improves how clearly the surrounding code can be written.

## Next Topic

Read the networking chapter after this one, because remote calls create many of the failures engineers must learn to handle well.
