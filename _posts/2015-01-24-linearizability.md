---
layout: post
title: Visualizing Linearizability
---

In [Time, Clocks, and the Ordering of Events in a Distributed
System][paper_clocks], Leslie Lamport uses space-time diagrams (like the one in
Figure 1) to help the reader form an intuition about the partial ordering of
events in a distributed system. In [Linearizability: A Correctness Condition
for Concurrent Objects][paper_linearizability], Maurice Herlihy and Jeannette
Wing also use diagrams to explain linearizability. However, Herlihy and Wing
introduce a lot of definitions without explaining their intuitive graphical
interpretation. In this article, I'll review each of the definitions introduced
in Herlihy and Wing's paper and explain how to understand them very intuitively
using pictures.

<center>
  <figure>
    <img src="{{site.url}}/assets/lamport/clock.svg" class="wide-image">
    <figcaption> Figure 1. Lamport's Space-Time Diagram </figcaption>
  </figure>
</center>

# Basic Definitions #
Herlihy and Wing's system is composed of *processes* which represent
independent sequential threads of execution. Intuitively, a process could be a
thread in a process or a process on a computer. We use capital letters like
$A$, $B$, and $C$ to range over processes.

The system also has *objects* which represent the objects you're familiar with
from object oriented programming languages. For example, an object could be an
`ArrayList` in Java, a `vector` in C++, or a `list` in Python. We use lowercase
letters like $p$ and $q$ to range over objects.

These objects also have *methods*. Method invocations are divided into two
distinct parts: the *invocation* and the *response*. In programming languages
like C++, you only see the invocation like `v.push_back(x)`, but in our system,
there is an invocation $q.Enqueue(x)$ and a response $q.Ok()$. You can think
of the response as the return status of a method. We use lowercase letters like
$x$ and $y$ to range over arguments to methods.

An *event* is a three tuple of an object, an invocation or response, and a
process. You can read the event $(q, Enqueue(x), A)$ as "Process $A$ performs
$q.Enqueue(x)$" where $q$ is a queue and $Enqueue(x)$ enqueues $x$ onto $q$.
For convenience, I'll denote such an event as $A.q.Enqueue(x)$, or
$q.Enqueue(x)$ if the invoking process is obvious from context.

A *history* is a finite sequence of events. All of the following are histories.
Here, $E$ and $D$ are abbreviations for $Enqueue$ and $Dequeue$.

- $[]$
- $[A.p.E(x), A.p.Ok()]$
- $[A.p.E(x), B.p.D(), B.p.Ok(x)]$
- $[A.p.E(x), A.p.Ok(), B.p.E(y), A.p.D(), B.p.Ok(), A.p.Ok(y)]$

A history is *sequential* if it begins with an invocation and alternates
between invocations and responses. For example, $[A.p.E(x), A.p.Ok()]$ and
$[A.p.E(x). A.p.Ok(), A.p.E(y)]$ are both sequential while $[A.p.E(x),
A.p.E(x)]$ and $A.p.E(x), A.p.Ok(), A.p.Ok()$ are not.

An invocation is *pending* in a sequential history if it has no subsequent
matching response. If an invocation does have a subsequent matching response,
the pair of events is called an *operation*.

# Now with Pictures #
Now we know enough definitions to introduce some pictures. Let's consider the
following history which we'll denote $H\_1$.

- $A.p.E(x)$
- $B.p.E(y)$
- $B.p.Ok()$
- $C.r.E(x)$
- $A.p.Ok()$
- $B.q.E(z)$
- $A.q.D()$
- $B.q.Ok()$
- $A.q.Ok(z)$
- $C.r.Ok()$
- $C.r.E(y)$

We can represent $H\_1$ graphically with Figure 2.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1.svg" class="wide-image">
    <figcaption> Figure 2. $H\_1$ </figcaption>
  </figure>
</center>

Each event is represented as a small vertical tick. Each operation is
represented as a horizontal line. Pending invocations are extended with a line
and an ellipsis. Each process is represented as a horizontal axis. The events
of each process are displayed on its axis. The events and lines connecting
events are colored according to their object where each object gets a unique
color.

The history $complete(H)$ of a history $H$ is the maximal subsequence of $H$
without pending invocations. Graphically, $complete(H)$ erases all pending
requests. For example $complete(H\_1)$ is given in Figure 3.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/Hcomplete.svg" class="wide-image">
    <figcaption> Figure 3. $complete(H\_1)$ </figcaption>
  </figure>
</center>

$H | A$ is the subsequence of $H$ of all events invoked by $A$. Graphically, in
$H | A$ we erase all the events that don't fall on process $A$'s axis. $H\_1 |
A$, $H\_1 | B$, and $H\_1 | C$ are given in Figure 4 - Figure 6.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1A.svg" class="wide-image">
    <figcaption> Figure 4. $H\_1 | A$ </figcaption>
  </figure>
</center>

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1B.svg" class="wide-image">
    <figcaption> Figure 5. $H\_1 | B$ </figcaption>
  </figure>
</center>

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1C.svg" class="wide-image">
    <figcaption> Figure 6. $H\_1 | C$ </figcaption>
  </figure>
</center>

Similarly, $H|p$ is the subsequence of $H$ of all all events invoked on $p$.
Graphically, in $H | p$, we erase all the events that aren't the same color as
$p$. For example, $H\_1 | p$, $H\_1 | q$, and $H\_1 | r$ are given in Figure 7
- Figure 9.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1p.svg" class="wide-image">
    <figcaption> Figure 7. $H\_1 | p$ </figcaption>
  </figure>
</center>

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1q.svg" class="wide-image">
    <figcaption> Figure 8. $H\_1 | q$ </figcaption>
  </figure>
</center>

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1r.svg" class="wide-image">
    <figcaption> Figure 9. $H\_1 | r$ </figcaption>
  </figure>
</center>

# Equivalence #
Two histories $H$ and $H'$ are said to be *equivalent* if they satisfy the
following property.

$$
\forall P.\, H|P = H'|P
$$

Graphically, two histories are considered equivalent if all of their
corresponding process axes are pairwise equivalent. Recall that a process' axis
is a subsequence, so two axes are equivalent if they contain the same events in
the same order. The placement of the events is not important. Take for example
$H\_2$:

- $C.r.E(x)$
- $B.p.E(y)$
- $C.r.Ok()$
- $A.p.E(x)$
- $A.p.Ok()$
- $C.r.E(y)$
- $B.p.Ok()$
- $B.q.E(z)$
- $A.q.D()$
- $B.q.Ok()$
- $A.q.Ok(z)$

$H\_2$ is depicted in Figure 10.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H2.svg" class="wide-image">
    <figcaption> Figure 10. $H\_2$ </figcaption>
  </figure>
</center>

Now, let's look at $H\_1 | P$ and $H\_2 | P$ for $P \in \\{A, B, C\\}$ and see
if $H\_1$ and $H\_2$ are equivalent. This is shown in Figure 11 - Figure 13.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1A.svg" class="wide-image">
    <img src="{{site.url}}/assets/linearizability/H2A.svg" class="wide-image">
    <figcaption> Figure 11. $H\_1 | A$ (top) and $H\_2 | A$ (bottom) </figcaption>
  </figure>
</center>

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1B.svg" class="wide-image">
    <img src="{{site.url}}/assets/linearizability/H2B.svg" class="wide-image">
    <figcaption> Figure 11. $H\_1 | B$ (top) and $H\_2 | B$ (bottom) </figcaption>
  </figure>
</center>

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1C.svg" class="wide-image">
    <img src="{{site.url}}/assets/linearizability/H2C.svg" class="wide-image">
    <figcaption> Figure 11. $H\_1 | C$ (top) and $H\_2 | C$ (bottom) </figcaption>
  </figure>
</center>

Since $H\_1 | A$ = $H\_2 | A$, $H\_1 | B$ = $H\_2 | B$, and $H\_1 | C$ = $H\_2
| C$, $H\_1$ and $H\_2$ are equivalent.

# Linearizability #
Before we get to linearizability, let's first define an irreflexive partial
ordering of operations in a history. If you don't know what an irreflexive
partial ordering is, [my previous blog on Lamport's Logical
Clocks][blog_clocks] explains it in detail. We denote the ordering on $H$ as
$<\_H$. Two operations $o\_1$ and $o\_2$ are in $<\_H$ (i.e. $o\_1 < o\_2$) if
the response of $o\_1$ occurs before the invocation of $o\_2$.

Graphically, this means that $o\_1$ and $o\_2$ do not overlap and that $o\_1$
is to the left of $o\_2$. If the two operations do overlap, they are not
related. For example in Figure 2, if we let process $A$'s first operation be
$A\_1$ and let process $B$'s second operation be $B\_2$, then $A\_1 <\_H B\_2$.
Likewise, $A\_1$ and $B\_1$ are not related.

Finally, we can define *linearizability*! A history $H$ is linearizable if we
can add response events to the end of it to form a new history $H'$ such that:

1. $complete(H')$ is equivalent to a sequential history $S$, and
2. $<\_H \subseteq <\_S$

We call $S$ a *linearization* of $H$. Graphically, this is how you find a
linearization of a history $H$.

- First, add any necessary response events to the end of the history. This will
  close any pending events and turn them into operations. This new history is
  called $H'$.
- Compute $complete(H')$. The diagram of $complete(H')$ should not contain any
  ellipses.
- Slide and shrink events in each process' axis until the history is
  sequential. You can't slide an event past another event since this violate
  equivalence. Also, if you are sliding two operations $o\_1$ and $o\_2$ where
  $o\_1 <\_H o\_2$, then you can't slide $o\_1$ rightward past the start of
  $o\_2$. This would violate the condition that $<\_H \subseteq <\_S$.

Let's demonstrate this process by showing that $H\_1$ is linearizable. We'll do
so by finding a linearization $S\_1$. First, let's extend $H\_1$ with a
response event for process $C$. Call this new history $H\_1'$. $H\_1'$ is shown
in Figure 12.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H1prime.svg" class="wide-image">
    <figcaption> Figure 12. $H\_1'$ </figcaption>
  </figure>
</center>

Now, let's form $S\_1$ which is shown in Figure 13. If you compare $H\_1' | P$
with $S\_1 | P$ for $P \in \\{A, B, C\\}$, you'll see that $S\_1$ and $H\_1'$
are equivalent. Also, $<\_{H\_1} \subseteq <\_{S\_1}$. Thus, $H\_1$ is
linearizable!

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/S1.svg" class="wide-image">
    <figcaption> Figure 13. $S\_1$ </figcaption>
  </figure>
</center>

Let's look at one more history and try to figure out if it's linearizable.
Consider $H\_3$ as shown in Figure 14.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H3.svg" class="wide-image">
    <figcaption> Figure 14. $H\_3$ </figcaption>
  </figure>
</center>


There are two potential linearizations we could form from $H\_3$: $H\_3'$ and
$H\_3''$ shown in Figure 15 and Figure 16. However, both of these histories
violate the sequential semantics of the queue $p$ and are therefore invalid
histories. Thus, $H\_3$ is not linearizable.

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H3prime.svg" class="wide-image">
    <figcaption>
        Figure 15. $H\_3'$ is not a valid history because $A.p.D()$ should
        return $x$ since it was enqueued first.
    </figcaption>
  </figure>
</center>

<center>
  <figure>
    <img src="{{site.url}}/assets/linearizability/H3doubleprime.svg" class="wide-image">
    <figcaption>
        Figure 16. $H\_3''$ is not a valid history because $A.p.D()$ returns
        $y$ when $y$ hasn't even been enqueued yet!
    </figcaption>
  </figure>
</center>

# Implementation #
If you're curious how I made all the figures in this article, check out [the
source code in GitHub][github_linearizability]! Here's a snippet of the code
that made $H\_1$, $H\_1 | A$, $H\_1 | B$, $H\_1 | C$, $H\_1 | p$, $H\_1 | q$,
and $H\_1 | r$.

{% highlight python %}
H1 = History([
    A.p.E(x),
    B.p.E(y),
    B.p.Ok(),
    C.r.E(x),
    A.p.Ok(),
    B.q.E(z),
    A.q.D(),
    B.q.Ok(),
    A.q.Ok(z),
    C.r.Ok(),
    C.r.E(y),
])
H1.plot("H1.svg")
(H1 | A).plot("H1A.svg")
(H1 | B).plot("H1B.svg")
(H1 | C).plot("H1C.svg")
(H1 | p).plot("H1p.svg")
(H1 | q).plot("H1q.svg")
(H1 | r).plot("H1r.svg")
{% endhighlight %}

[paper_linearizability]:  http://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf
[paper_clocks]:           http://web.stanford.edu/class/cs240/readings/lamport.pdf
[blog_clocks]:            http://mwhittaker.github.io/2015/01/20/logical-clocks/
[github_linearizability]: https://github.com/mwhittaker/linearizability