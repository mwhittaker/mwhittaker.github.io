---
layout: post
title: An Illustrated Proof of the CAP Theorem
---

The [CAP Theorem][wikipedia] is a fundamental theorem in distributed systems
that states any distributed system can have at most two of the following three
properties.

- **C**onsistency
- **A**vailability
- **P**artition tolerance

This guide will summarize [Gilbert and Lynch's specification and proof of the
CAP Theorem][paper] with pictures!

# What is the CAP Theorem? #
The CAP theorem states that a distributed system cannot simultaneously be
consistent, available, and partition tolerant. Sounds simple enough, but what
does it mean to be consistent? available? partition tolerant? Heck, what
exactly do you even mean by a distributed system?

In this section, we'll introduce a simple distributed system and explain what
it means for that system to be available, consistent, and partition tolerant.
For a formal description of the system and the three properties, please refer
to [Gilbert and Lynch's paper][paper]. 

## A Distributed System ##
Let's consider a very simple distributed system. Our system is composed of two
computers, `G1` and `G2`. Both of these computers are keeping track of the same
variable: an integer we'll call `v`. `G1` and `G2` can communicate with each
other over some network. `G1` and `G2` can also communicate with other
computers we'll call clients. Here's what our system look like.

## Consistency ##
## Availability ##
## Partition Tolerance ##

# Prove It #

[paper]:     http://lpd.epfl.ch/sgilbert/pubs/BrewersConjecture-SigAct.pdf
[wikipedia]: http://en.wikipedia.org/wiki/CAP_theorem
 
