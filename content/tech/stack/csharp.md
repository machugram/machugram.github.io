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

There is the C# on .NET Framework 4.8, and the C# on modern .NET. Same family. Different CLR, different BCL, different hosting, different hiring market. You cannot in-place upgrade one into the other.
