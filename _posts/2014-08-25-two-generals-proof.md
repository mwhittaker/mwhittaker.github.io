---
layout: post
title: Two Generals and Time Machines
---

The [Two Generals' Problem][wiki] is a classic unsolvable problem in
distributed systems that concerns **reaching consensus over a lossy network**.
This guide will introduce the Two Generals' Problem and give an intuitive
explanation for why finding a solution to the problem is impossible. It will
then formalize the Two Generals' Problem and formally prove the impossibility.

The formal model and proof of the Two Generals' Problem is taken from [Notes on
Theory of Distributed Systems][yale-notes].

# The Two Generals' Problem #
Imagine two generals: General Alice and General Bob. Alice's army and Bob's
army are quite a distance away from one another. The only way Alice and Bob
can communicate is by sending each other enveloped messages through the mail. 

Between Alice's and Bob's armies lies an enemy army led by General Eve. Alice
and Bob need to decide whether to attack Eve's army or to retreat from Eve's
army. If they both attack or both retreat, they are victorious. If only one of
Alice or Bob attacks, then they are defeated.


|             | **attack** | **retreat** |
| ----------- | ---------- | ----------- |
| **attack**  | victory    | defeat      |
| **retreat** | defeat     | victory     |

All of Alice and Bob's messages are delivered via Eve's postal service. Eve
receives every message and decides whether she wants to deliver the message or
burn the message. She does not, however, get to open the enveloped message.

The Two Generals' Problem is the problem of designing an algorithm for Alice
and Bob that ensures they agree to attack or agree to retreat. That is, we must
write an algorithm that achieves consensus. 

# The Impossibility #
The Two Generals' Problem seems innocuous enough, but it turns out that there
does not exist an algorithm that can guarantee consensus. Before we formally
prove this impossibility, let's informally explore it with an example.  

Let's say Alice wants to attack. She writes "attack" on a piece of paper, wraps
the message in an envelope, and sends the message off to Bob. Now, one of two
things could happen:

1. Eve could intercept the message and burn it.
2. Eve could intercept the message and deliver it to Bob.

Alice does not know which of these events occur. Since she is unsure if her
message was delivered, she can't decide to attack without the risk of Bob
deciding to retreat. That is, she cannot attack with the *certainty* of
consensus.

Perhaps we can solve this uncertainty with acknowledgements. Let's say Bob
receives Alice's message. Upon receiving the message, Bob responds with an
acknowledging message. Again, this message could either be burned or delivered.
If the message is burned, then Alice never receives her acknowledgement and
cannot make a certain decision. This means that if Bob's message is lost, Bob
can't make a decision without the possibility that Alice makes the opposite
decision.  

Perhaps we can solve this uncertainty with *more* acknowledgements! Bob waits
for an acknowledgement from Alice. But, after sending her acknowledgement,
Alice is uncertain if it was delivered. If it wasn't, then Bob would be still
be uncertain what decision to make. So, Alice waits for an acknowledgement from
Bob. But, after sending his acknowledgements, Bob is uncertain if it was
delivered. This cycle continues indefinitely. At no point is either Alice or
Bob certain what the other General will decide to do.

# Formal Model #
In order to prove the impossibilty of solving the Two Generals' Problem, we'll
need to formalize the problem. We'll label Alice and Bob $A$ and $B$. Each
general has a **state**, $q$, from some state set $Q$. Each general also has
an **outbox** and **inbox** which can hold exactly one enveloped message to
send or receive respectively. A **configuration** is the pair of Alice and
Bob's states $(q\_a, q\_b)$. 


<center>
  <figure>
    <img src="{{site.url}}/assets/generals/gen1.svg" class="three-quarter">
    <figcaption>
    Fig 1. A formal model of the two generals.
    </figcaption>
  </figure>
</center>

The system can changes with two events. In a **delivery event**, the message in
each general's outbox is potentially moved to the other general's inbox. Eve
decides whether the message is delivered or burned. For the sake of simplicity,
we'll assume that both generals always have an envelope in their outbox to
send. If they don't have any meaningful message then they place an empty
envelope in their outbox.

<center>
  <figure>
    <img src="{{site.url}}/assets/generals/gen2.svg" class="three-quarter">
    <figcaption>
    Fig 2. A delivery event. 
    </figcaption>
  </figure>
</center>

In a **computation event**, a general updates its state based on the message in
its inbox and its current state. It can also optionally place a value in its
outbox. More formally, each process has a **transition function**, $f: Inbox
\times Q \rightarrow Q \times Outbox$, that maps an message from an inbox and
the current state to a new state and outbox message.

<center>
  <figure>
    <img src="{{site.url}}/assets/generals/gen3.svg" class="three-quarter">
    <figcaption>
    Fig 3. A computation event.
    </figcaption>
  </figure>
</center>

An **execution** is a sequence of alternating configurations and events denoted
$(C\_0, \phi\_1, C\_1, \phi\_2, \ldots)$. Each $C\_i$ is a configuration and
each $\phi\_i$ is a round of events where each general performs a computation
event and then a delivery event.

An execution $E\_1$ is indistinguishable from another execution $E\_2$ for a
general $g$ if $g$ sees the same thing in both executions. For example,
consider a pair of executions with a single round of events with generals $A$ and $B$:
$(C\_0, \phi\_1, C\_1)$ and $(C\_0', \phi\_1', C\_1')$. In $\phi\_1$, $A$'s
enveloped message is delivered, but in $\phi\_1'$, it is not. Both executions
are indistinguishable to $A$ because she cannot tell if her message was
delivered or not. These executions are not indistinguishable for $B$ who can
tell in round three whether or not the message was delivered. Note that if
$E\_1$ and $E\_2$ are indistinguishable for $g$, then $g$ performs the same
actions in $E\_1$ and $E\_2$.

# Impossibility Proof #
Now, we'll prove that there does not exist an algorithm that can solve the Two
Generals' Problem. First, let's formalize the Two Generals' Problem. Each
general begins with either a 0 or 1 in its inbox. Eve gets to decide these
initial values. After some number of rounds $N$, both generals must output a 0
or 1. We require two properties for our generals that must hold for **all**
executions.

1. **Agreement** Both generals output the same value (i.e. both 0 or both 1).
2. **Validity** If both generals begin with the same input $x$ **and** no
   messages are dropped, then both generals must output $x$.

Assume for contradiction that there does exist an algorithm that satisfies
these two properties. I'll play the part of Eve and construct a contradiction. 

First, I'll start Alice and Bob with 1's as input. I'll allow all messages to
be delivered and wait all $N$ rounds. By the validity condition, we know that
Alice and Bob both output 1. Call this execution $E\_1$.

Next, I'll fire up my time machine and go back one round into the past. This
time around, I'll burn Alice's last message to Bob. Call this execution $E\_2$.
$E\_1$ is indistinguishable to $E\_2$ for Alice. Thus, she must perform the
same action in $E\_1$ and $E\_2$. This means Alice must again output 1. By the
agreement condition, this means that Bob must also output 1.

I'll fire up my time machine again and go back another round. Now, I'll burn
Bob's message to Alice. If we denote this execution as $E\_3$, then $E\_2$ is
indistinguishable to $E\_3$ for Bob. Since Bob output a 1 in $E\_2$, he must
output a 1 in $E\_3$. By the agreement condition, Alice must also output a 1. 

I'll continue my time machine antics until I've dropped all messages. Call this
execution $E\_k$. Next, I'll switch Alice's input from 1 to 0. This execution
is indistinguishable to $E\_k$ to Alice, so she still outputs 1, as does Bob.
Next, I'll switch Bob's input to 1. Again, this execution is indistinguishable
to the last for Bob, so both Bob and Alice and output 1. 

Now that both Alice and Bob begin with an input of 0, I'll allow the first
message to be sent, then the second, and so on. Eventually, I'll reach round
$N$. All messages are sent and both Alice and Bob begin with 0 as input.
However, Alice and Bob still output 1! This violates the validity condition and
is a contradiction.

[wiki]:       http://en.wikipedia.org/wiki/Two_Generals'_Problem
[yale-notes]: http://cs-www.cs.yale.edu/homes/aspnes/classes/465/notes.pdf

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/javascript">
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [['$','$'], ['$','$']],
        processEscapes: true
    }
});
</script>
