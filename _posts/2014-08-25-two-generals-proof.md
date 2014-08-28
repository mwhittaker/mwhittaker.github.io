---
layout: post
title: Two Generals and Time Machines
---

The [Two Generals' Problem][wiki] is a classic unsolvable problem in distributed
systems that concerns reaching consensus over a lossy network. This guide will
introduce the Two Generals' Problem and give an intuitive explanation for why
finding a solution to the problem is impossible. It will then formalize the Two
Generals' Problem and formally prove the impossibility.

# The Two Generals' Problem Over A Perfect Network #
Imagine two generals: General Alice and General Bob. Alice's army and Bob's
army are quite a distance away from one another, and the only way Alice and Bob
can communicate is by sending each other letters through the mail. For now,
let's assume that all messages are delivered in less than a day.

Between Alice's and Bob's armies lies an enemy army led by General Eve. Alice
and Bob need to decide whether to attack Eve's army or to retreat. If they
both decide to attack, then they easily capture Eve's army. If they both decide
to retreat, then no blood is shed. But, if only one of Alice or Bob decides to
attack and the other decides to retreat, then the attacking general's army is
captured.  

The challenge is designing an algorithm that Alice and Bob can follow to ensure
that they agree on whether to attack or retreat. Seems simple enough! Here's an
algorithm to solve the problem. 

- Alice decides whether to attack or retreat. Let's say she chooses to attack.
- Alice writes down her decision (i.e. "attack") on a letter.
- Alice puts the letter in an envelope and sends it Bob.
- Since all messages are deliviered in less than a day, Alice waits a day to
  guarantee that the message has been delivered and then attacks Eve's army. 
- When Bob receives Alice's letter, he reads "attack" and then attacks Eve's
  army.


# Formal Model #

Before approaching the Impossibility Proof, it is necessary to explain the Formal Model that is being used in this proof. In more specific terms, a formal model is a set of specifications under which the problem may be approached or looked at. 

With that in mind, it is possible to start formalizing the Two Generals problem. Imagine instead of Alice and Bob, there are two processes trying to communicate. Instead of Eve, there is a unreliable network where information sent between the two processes can be lost at random at undetermined rates. Note that this example of two processes can be extrapolated to two or more processes and nothing would change for the proof.

Next, for each process, there is a concept of state. [Michael, insert definition of state here] A configuration for an entire system is a list of states, where each state corresponds to a process. [Insert better event(s) definition here]. When an event is applied to a configuration, the configuration of the system changes to another configuration (meaning that some state for a process within the configuration has changed). A list of alternating configurations and events is called an execution segment.

Before proceeding onto the actual Impossibility Proof, the last point to address is the definition of indistinguishability with respect to execution segments. Here goes: an execution segment A is indistinguishable from execution segment B, for a single process P, if P sees the same sequence of events in both executions.

In more simplified terms, this means that if there are two executions A and B, and they alter a single process P in the same way with the same events in the same order, then from the perspective of the process P, it cannot tell which execution was executed on itself.

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
