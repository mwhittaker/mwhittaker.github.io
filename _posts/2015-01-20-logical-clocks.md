---
layout: post
title: Lamport's Logical Clocks
---

People use physical time to order events. For example, we say that an event at
8:15 AM occurs before an event at 8:16 AM. In distributed systems, physical
clocks are not always precise, so we can't rely on physical time to order
events. Instead, we can use *logical clocks* to create a partial or total
ordering of events. This article explores the concept of and [an
implementation][mwhittaker-clocks] of the logical clocks invented by Leslie
Lamport in his seminal paper [Time, Clocks, and the Ordering of Events in a
Distributed System][lamport-paper].

# Math Refresher #
Before we dive into time, clocks, or ordering, let's quickly review a bit of
the underlying math.

## Sets ##
A [*set*][wiki-set] is an unordered collection of distinct things.  For
example, we can bundle the integers 3, 11, and 0 into a set denoted $\\{3, 11,
0\\}$.  Or, we could throw the integer 42 into a set with only one element:
$\\{42\\}$.  Or, we could have the empty set $\\{\\}$. We say an element $a$ is
a member of $A$ if $A$ contains $a$, and we denote this $a \in A$.

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
for example the familiar "less-than" relation, $< $, on the set of natural
numbers. Two naturals $i$, and $j$ are in the relation $< $ if $i$ is less than
$j$. We denote this $i < j$. Concretely, $< $ is the infinite set $\\{(0, 1),
(0, 2), (0, 3), \ldots, (1, 2), (1, 3), (1, 4), \ldots\\}$.

## Partial and Total Orderings ##
An [*irreflexive partial ordering*][wiki-partial-ordering] on a set $A$ is a
relation on $A$ that satisfies three properties.

1. **irreflexivity**: $a \nless a$
2. **antisymmetry**: if $a < b$ then $b \nless a$
3. **transitivity**: if $a < b$ and $b < c$ then $a < c$

For example, the strict subset relation we saw earlier is an example of an
irreflexive partial ordering. Here are some examples of the previous three
properties being satisfied.

1. **irreflexivity**: $\\{1, 2, 3\\} \not\subset \\{1, 2, 3\\}$
2. **antisymmetry**: $\\{1, 2\\} \subset \\{1, 2, 3\\}$, so $\\{1, 2, 3\\}
   \not\subset \\{1, 2\\}$
3. **transitivity**: $\\{1\\} \subset \\{1, 2\\}$ and $\\{1, 2\\} \subset \\{1,
   2, 3\\}$, so $\\{1\\} \subset \\{1, 2, 3\\}$

It's important to note that for some sets $a$ and $b$, $a \not\subset b$ and $b
\not \subset a$. For example, $\\{1, 2\\} \not \subset \\{2, 3\\}$ and $\\{2,
3\\} \not\subset \\{1, 2\\}$. This is quite different than total orderings.

An [*irreflexive total ordering*][wiki-total-ordering] is a irreflexive partial
ordering that satisifes another condition.

- **totality**: if $a \neq b$ then $a < b$ or $b < a$

For example, the "less-than" relation on natural numbers is an irreflexive
total ordering. For all naturals $i$ and $j$ where $i \neq j$, $i < j$ or $j <
i$.

# A Partial Ordering #
Physical time forms a natural "happened-before" irreflexive partial ordering of
events. If we consider two events $a$ and $b$, we can use physical time to know
whether $a$ happened before $b$, $b$ happened before $a$, or the two are
unrelated (i.e. they happened at the same time).  Since physical clocks are
imprecise, we can't use physical time in a distributed system, but we'd still
like an irreflexive partial ordering of events.

We'll define such an ordering, but first, let's formalize our system a bit. Our
distributed system consists of a set of processes that each execute their own
set of events. There are three events each process can execute:

1. A local event
2. Sending a message to another process
3. Receiving a message from another process

The union of every process' events is the set of events we wish to order. We
can visualize such a system using a space-time graph, such as the one in Figure
1 below. Each vertical line represents a process. Time flows forward as we
traverse the graph upwards through the set of events represented as annotated
points. If one process sends a message and another receives a message, the two
are events are connected by a colored line.

<center>
  <figure>
    <img src="{{site.url}}/assets/lamport/clock.svg" class="wide-image">
    <figcaption> Figure 1 </figcaption>
  </figure>
</center>

The system in Figure 1 has three processes: $A$, $B$, and $C$. Process $A$ has
four events.

1. $A_0$: Process $A$ sends a message to process $B$
2. $A_1$: Process $A$ receives a message from process $B$
3. $A_2$: Process $A$ executes a local event
4. $A_3$: Process $A$ receives a message from process $B$

Now we can define our "happened-before" irreflexive partial ordering, denoted
$\rightarrow$, as the smallest relation on events that satisfies the following
three properties.

1. If $a$ and $b$ are events in the same process and $a$ happens before $b$
   then $a \rightarrow b$. For example, $A\_0 \rightarrow A\_1$.
2. If a process sends a message as event $a$ and another process receives the
   message as event $b$, then $a \rightarrow b$. For example, $A\_0 \rightarrow
   B\_2$.
3. If $a \rightarrow b$ and $b \rightarrow c$, then $a \rightarrow c$ For
   example, $A\_0 \rightarrow B\_2$ and $B\_2 \rightarrow B\_4$ and $B\_4
   \rightarrow C\_3$, so $A\_0 \rightarrow C\_3$.

Graphically, $a \rightarrow b$ if we can trace a path forward through time from
$a$ to $b$. For example, we can show that $A\_0 \rightarrow C\_3$ by tracing
from $A\_0$ across the blue line to $B\_2$ up to $B\_4$ and across the purple
line to $C\_3$. This interpretation also makes it clear that some events such
as $A\_2$ and $B\_3$ are not related because we can't trace a path forward
through time from $A\_2$ to $B\_3$ or from $B\_3$ to $A\_2$. In terms of
physical time, $A\_2$ might happen before $B\_3$, but our $\rightarrow$
relation is defined independent of physical time.

# Logical Clocks #
Now let's introduce clocks to help us order events according to our
$\rightarrow$ ordering. Unlike physical clocks which are physical entities that
assign physical times to events, our clocks are simply a conceptualization of a
mathematical function that assigns numbers to events.  These numbers act as
timestamps that help us order events. Since our clocks logically order events,
rather than physically order them, we call them *logical clocks*.

More formally, each process $P\_i$ has a clock $C\_i$ which is a function from
events to the integers. The timestamp of an event $e$ in $P\_i$ is $C\_i(e)$.
The system clock, $C$, is also a function from events to the integers where
$C(e) = C\_i(e)$ when $e$ is an event in $P\_i$. In Figure 1, timestamps are
associated with horizontal dashed lines beginning at 0 and increasing by 1
forwards through time. For example, events $B\_0$ through $B\_7$ have
timestamps $0$ through $7$.

We evaluate our logical clocks with the following correctness criterion known
as the *Clock Condition*.

$$ \forall a, b.\,a \rightarrow b \implies C(a) < C(b) $$

For example, $A\_0 \rightarrow B\_2$, so in order for a clock $C$ to satisfy
the Clock Condition, it must be that $C(A\_0) < C(B\_2)$. Also note that it is
**not** the case that $\forall a, b.\, C(a) < C(b) \implies a \rightarrow b$.
Consider $A\_2$ and $B\_3$. $C(A\_2) < C(B\_3)$, yet $A\_2$ and $B\_3$ are not
related according to our $\rightarrow$ ordering.

Given a system, we can construct a logical clock using a simple algorithm. Each
process $P\_i$ maintains a mutable timestamp $C\_i$. When an event $e$ occurs, we
let $C\_i(e)$ be $C\_i$ when $e$ occurs. Each process $P\_i$ increments $C\_i$
after every event in $P\_i$. Also, when a process $P\_i$ sends a message to
$P\_j$, it includes its timestamp $C\_i$ with the message. When $P\_j$ receives
the message, it sets its timestamp $C\_j$ to be greater than the received
$C\_i$. A concrete implementation of this algorithm is discussed below.

# A Total Ordering #
Our algorithm generates a clock that is consistent with our $\rightarrow$
ordering according to the Clock Condition, but what if we want to totally order
the events of a system? It's surprisingly simple! First, choose an arbitrary
irreflexive total ordering of the processes, denoted $\Rightarrow$. For
example, $\prec$ may be $\\{(A, B), (A, C), (B, C)\\}$. Now, we can define a
total ordering of events using $C$ and our $\prec$ ordering as the smallest
relation satisfying the following properties.

1. If $C(a) < C(b)$, then $a \Rightarrow b$
2. If $C(a) = C(b)$ and $a \prec b$, then $a \Rightarrow b$

Now, we can order previously unrelated events. For example, $A\_1 \Rightarrow
B\_2$ and $A\_2 \Rightarrow B\_3$.

# Implementation #
I implemented [Lamport's logical clocks in Python][mwhittaker-clocks]! The
implementation provides a function `lamport.wind` which takes in a list of
functions each of which represents a process. The functions take in a `Clock_i`
instance that supports three methods: `send(n)`, `recv(n)`, and `local()`.
`wind` returns a function which you can invoke to plot the space-time graphs
we've been using to visualize the logical clocks. Here's a couple of examples!

{% highlight python %}
import lamport

def f(clock):
    clock.send(1)
    clock.recv(1)

def g(clock):
    clock.recv(0)
    clock.send(0)

lamport.wind([f, g])()
{% endhighlight %}
<center>
  <figure>
    <img src="{{site.url}}/assets/lamport/clock2.svg" class="wide-image">
  </figure>
</center>

{% highlight python %}
import lamport

def f(clock):
    clock.send(1)
    clock.send(2)
    clock.recv(1)
    clock.recv(2)

def g(clock):
    clock.send(0)
    clock.send(2)
    clock.recv(0)
    clock.recv(2)

def h(clock):
    clock.send(0)
    clock.send(1)
    clock.recv(0)
    clock.recv(1)

lamport.wind([f, g, h])()
{% endhighlight %}
<center>
  <figure>
    <img src="{{site.url}}/assets/lamport/clock3.svg" class="wide-image" >
  </figure>
</center>

{% highlight python %}
import lamport

def f(clock):
    clock.send(1)
    clock.recv(1)
    clock.local()
    clock.recv(1)

def g(clock):
    clock.send(0)
    clock.send(2)
    clock.recv(0)
    clock.local()
    clock.send(2)
    clock.send(0)
    clock.local()
    clock.recv(2)

def h(clock):
    clock.local()
    clock.send(1)
    clock.recv(1)
    clock.recv(1)

lamport.wind([f, g, h], "clock.png")()
{% endhighlight %}
<center>
  <figure>
    <img src="{{site.url}}/assets/lamport/clock.svg" class="wide-image">
  </figure>
</center>

[lamport-paper]:          http://web.stanford.edu/class/cs240/readings/lamport.pdf
[mwhittaker-clocks]:      https://github.com/mwhittaker/clocks
[wiki-set]:               http://en.wikipedia.org/wiki/Set_%28mathematics%29
[wiki-subset]:            http://en.wikipedia.org/wiki/Subset
[wiki-cartesian-product]: http://en.wikipedia.org/wiki/Cartesian_product
[wiki-relation]:          http://en.wikipedia.org/wiki/Binary_relation
[wiki-partial-ordering]:  http://en.wikipedia.org/wiki/Partially_ordered_set
[wiki-total-ordering]:    http://en.wikipedia.org/wiki/Total_order