---
layout: post
title: Logical Clocks
---

Humans use physical time to order events. For example, we say that an event at
8:15 AM occurs before an event at 8:16 AM. In distributed systems, physical
clocks are not always precise, so we can't rely on physical time to order
events. Instead, we can use *logical clocks* to create a partial or total
ordering of events in distributed systems. This article explores the concept
and [an implementation][mwhittaker-clocks] of the logical clocks invented by
Leslie Lamport in his seminal paper [Time, Clocks, and the Ordering of Events
in a Distributed System][lamport-paper].

# Math #
Before we dive into time, clocks, or ordering, let's quickly review a bit of
the underlying math.

## Sets ##
A [*set*][wiki-set] is an unordered collection of distinct things. For example,
we can bundle the integers 3, 11, and 0 into a set denoted $\\{3, 11, 0\\}$.
Or, we could throw the integer 42 into a set with only one element: $\\{42\\}$.
Or, we could have the empty set $\\{\\}$. We say an element $a$ is a member of
$A$ if $A$ contains $a$, and we denote this $a \in A$.

A [*subset*][wiki-subset] $A$ of a set $B$ is a set whose elements are all
members of $B$. We denote that $A$ is a subset of $B$ as $A \\subseteq B$. For
example: $\\{1, 2\\} \subseteq \\{1, 2, 3\\}$, $\\{\\} \subseteq \\{1, 2,
3\\}$, and $\\{1, 2, 3\\} \subseteq \\{1, 2, 3\\}$. A set $A$ is a *strict
subset* of $B$, denoted $A \subset B$, if $A \subseteq B$ and $A \neq B$.

The [*Cartesian product*][wiki-cartesian-product] of two sets $A$ and $B$,
denoted $A \times B$, is the set of ordered pairs $(a, b)$ for every $a \in A$
and $b \in B$. For example, $\\{1, 2\\} \times \\{a, b, c\\} = \\{(1, a), (1,
b), (1, c), (2, a), (2, b), 2, c)\\}$.

## Relations ##
A [*binary relation*][wiki-relation] $R$ on a set $A$ is a subset of $A \times
A$. Similarly, a binary relation on a set $A$ and $B$ is a subset of $A \times
B$. For example, here's a couple relations on $\\{1, 2\\}$ and $\\{a, b, c\\}$:
$\\{(1, a), (2, c)\\}$, $\\{(1, a), (2, b), (3, c)\\}$, $\\{\\}$, and $\\{(1,
a), (1, b), (1, c)\\}$. We can denote $(a, b) \in R$ as $a\,R\,b$.  Consider
for example the familiar "less than" relation, $< $, on the set of natural
numbers. Two naturals $i$, and $j$ are in the relation $< $ if $i$ is less
than $j$. We denote this $i < j$. Concretely, $< $ is the infinite set
$\\{(0, 1), (0, 2), (0, 3), \ldots, (1, 2), (1, 3), (1, 4), \ldots\\}$.

## Partial Orderings ##
An *irreflexive partial ordering* on a set $A$ is a relation on $A$ that
satisfies three properties.

1. **irreflexivity**: $a \nless a$
2. **antisymmetry**: if $a < b$ then $b \nless a$
3. **transitivity**: if $a < b$ and $b < c$ then $a < c$



## Total Orderings ##

# Partial Ordering #
# Total Ordering #
# Implementation #
# Mutual Exclusion #

[lamport-paper]:          http://web.stanford.edu/class/cs240/readings/lamport.pdf
[mwhittaker-clocks]:      https://github.com/mwhittaker/clocks
[wiki-set]:               http://en.wikipedia.org/wiki/Set_%28mathematics%29
[wiki-subset]:            http://en.wikipedia.org/wiki/Subset
[wiki-cartesian-product]: http://en.wikipedia.org/wiki/Cartesian_product
[wiki-relation]:          http://en.wikipedia.org/wiki/Binary_relation
[wiki-partial-ordering]:  http://en.wikipedia.org/wiki/Partially_ordered_set
[wiki-total-ordering]:    http://en.wikipedia.org/wiki/Total_order
