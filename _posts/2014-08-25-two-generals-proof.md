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
