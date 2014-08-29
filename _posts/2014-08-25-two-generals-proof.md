---
layout: post
title: Two Generals and Time Machines
---

The [Two Generals' Problem][wiki] is a classic unsolvable problem in
distributed systems that concerns **reaching consensus over a lossy network**.
This guide will introduce the Two Generals' Problem and give an intuitive
explanation for why finding a solution to the problem is impossible. It will
then formalize the Two Generals' Problem and formally prove the impossibility.  

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

Before approaching the Impossibility Proof, it is necessary to explain the
Formal Model that is being used in this proof. In more specific terms, a formal
model is a set of specifications under which the problem may be approached or
looked at. 

With that in mind, it is possible to start formalizing the Two Generals
problem. Imagine instead of Alice and Bob, there are two processes trying to
communicate. Instead of Eve, there is a unreliable network where information
sent between the two processes can be lost at random at undetermined rates.
Note that this example of two processes can be extrapolated to two or more
processes and nothing would change for the proof.

Next, for each process, there is a concept of state. [Michael, insert
definition of state here] A configuration for an entire system is a list of
states, where each state corresponds to a process. [Insert better event(s)
definition here]. When an event is applied to a configuration, the
configuration of the system changes to another configuration (meaning that some
state for a process within the configuration has changed). A list of
alternating configurations and events is called an execution segment.

Before proceeding onto the actual Impossibility Proof, the last point to
address is the definition of indistinguishability with respect to execution
segments. Here goes: an execution segment A is indistinguishable from execution
segment B, for a single process P, if P sees the same sequence of events in
both executions.

In more simplified terms, this means that if there are two executions A and B,
and they alter a single process P in the same way with the same events in the
same order, then from the perspective of the process P, it cannot tell which
execution was executed on itself.

# Impossibility Proof #

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
