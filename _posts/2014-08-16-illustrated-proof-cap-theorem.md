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
servers, `G1` and `G2`. Both of these servers are keeping track of the same
variable, `v`, whose value is initially `v0`. `G1` and `G2` can communicate
with each other and can also communicate with external clients. Here's
what our system looks like.

<center>
<img src="{{site.url}}/assets/cap/cap1.svg" class="three-quarter-image">
</center>

A client can request to write and read from any server. When a server receives
a request, it performs any computations it wants and then responds to the
client. For example, here is what a write would look like.

<center>
<img src="{{site.url}}/assets/cap/cap2.svg" class="three-quarter-image">
<img src="{{site.url}}/assets/cap/cap3.svg" class="three-quarter-image">
<img src="{{site.url}}/assets/cap/cap4.svg" class="three-quarter-image">
</center>


## Consistency ##
## Availability ##
## Partition Tolerance ##

# Prove It #

[paper]:     http://lpd.epfl.ch/sgilbert/pubs/BrewersConjecture-SigAct.pdf
[wikipedia]: http://en.wikipedia.org/wiki/CAP_theorem
 
