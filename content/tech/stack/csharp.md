---
title: C#
summary: "Living notes on the language I ship in: contracts, async, LINQ, dispose, and the two runtimes."
date: 2026-09-21
draft: false
tags:
  - stack
---

This is a living page. I add to it when something in C# earns a note, and I rewrite it when I was wrong. It is not a tutorial, and it is not a language tour. It is the parts I keep bumping into on systems that have to be correct.

## The two C#s

There is the C# on .NET Framework 4.8, and the C# on modern .NET. Same family. Different CLR, different BCL, different hosting, different hiring market. You cannot in-place upgrade one into the other. That is why [[tech/rfc-blue-green-dotnet | two folders and a live path]] exists.

Most “new C#” writing assumes you already left Framework. A lot of money still has not. The interesting problem is writing C# that is honest about which runtime it is on — and not copying a Core blog post into a `w3wp` that still has a synchronisation context.

## Encode the constraint

C# is useful when the type system carries the product rule, so a reviewer does not have to.

Money is `decimal`, not `double`. An instant that leaves the process is `DateTimeOffset`, not `DateTime.Now`. Identifiers that must never be swapped are types, not `string`. The properties that make a disclosure valid are `required`, not a comment on a DTO.

```csharp
readonly record struct Money(decimal Amount, string Currency);
readonly record struct TradeId(Guid Value);
```

The language will let you do the sloppy thing. That is not an argument for doing it. In a regulated system, the cheap trick is a comment. The expensive trick is a type.

Nullable reference types are a migration, not a switch. Treat them as errors on new code. Do not “fix” a warning by slapping `!` on a value you have not proved.

## async is a colour

Once a method is `async`, the useful call stack is async too. You can pretend otherwise with `.Result` and `.Wait()`. On Framework IIS, that is how you deadlock a thread-pool thread that ASP.NET needed for someone else's request.

`async` is not a performance feature. It is a contract: this method may return the thread before the work is done.

`ConfigureAwait(false)` is a library concern. In an ASP.NET request, the context often *is* the product — `HttpContext`, culture, the user. Do not paste it into a controller because it looked professional. On modern ASP.NET Core there is no request `SynchronizationContext` anyway. The cargo cult is a Framework hangover.

If you are still on 4.8, the rule is simpler than the blogs: do not block. Sync-over-async is the usual incident.

## LINQ enumerates when you look

LINQ is a query. It runs when you walk it, not when you write it. Enumerate twice, do the work twice. Hand an `IQueryable` to a second `foreach` and you have a second database round-trip you will not see in the method that built the query.

`ToList()` is not a code smell. It is a decision: this is the moment the query becomes data. Make that moment obvious.

EF Core will translate a beautiful composition into N+1 if you tickle a navigation you forgot to `Include`, or if you project like the database were memory. The bug is not LINQ. The bug is treating `IQueryable` as `IEnumerable`.

## Dispose is part of the type

`IDisposable` is not cleanup hygiene. It is the type saying this object owns something the GC will not notice in time — a handle, a connection, a lock, a file.

`using var` made this boring, which is the point. `IAsyncDisposable` is the same idea when release is itself async. If a helper returns an open `DbContext`, it has exported a lifetime. Prefer the caller to own it, or not to see it.

Finalizers are not a strategy. They are a last chance.

## Time that can be wrong

`DateTime.Now` is not a clock. It is a read of the machine, in local time, untestable, and hostile to “this window opened at 16:30 in this jurisdiction.”

`TimeProvider` (and a clock you inject before that existed) makes “what time is it?” a dependency. Tests freeze it. Production uses the system. A disclosure that fires on the wrong side of a timezone is not a rounding error.

Prefer `DateTimeOffset` for anything that leaves the process. Store UTC. Convert at the edge, where the jurisdiction lives.

## Still on the desk

Things I have not written here yet, and probably should:

- `Channel<T>` versus “a `List` I lock” — [[projects/sentinel | Sentinel]] lives in this neighbourhood
- records for messages, classes for entities
- `CancellationToken` as the request’s lifetime, not an optional argument
- source generators, when they are a compiler and not a party trick
- `Span<T>` and the allocation tax on a box that already runs two CLRs

