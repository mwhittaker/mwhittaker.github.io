---
layout: post
title: Gnome with Xmonad on Ubuntu 12.04
---

[Xmonad][] is a minimalistic tiling window manager written and configured in
Haskell. [Gnome][] is a free and popular desktop environment for linux. [Gnomem
with Xmonad][] is a combination of the two. This tutorial will go over how to
download, set up, and get started using Xmonad with Gnome on Ubuntu 12.04.  

# Installing #
Open up a terminal and install xmonad:

{% highlight bash %}
sudo apt-get install gnome-panel xmonad
{% endhighlight %}

Now create the file `~/xmonad/xmonad.hs` with the following contents.

{% highlight haskell %}
import XMonad
import XMonad.Config.Gnome

main = xmonad gnomeConfig
{% endhighlight %}

That's it! 

Now log out. When you come to the login screen, you'll see a white circle as
shown below.

<center>
![white circle](http://i.stack.imgur.com/2mQeW.png)
</center>

Click on the white circle to see a list of your available desktop environments.
Select "Gnome with Xmonad".

<center>
![desktop menu](http://i.stack.imgur.com/NoL8a.png)
</center>

If all goes well, you should see be greeted with a screen that looks like the
following.

<center>
![desktop]({{site.url}}/{{ page.path | replace: '_posts', 'assets' | replace: '.md', ''}}/desktop.png)
</center>

If you press `Alt-Shift-Enter` a couple times and you should see a bunch of
tiled terminals.

<center>
![terminals]({{site.url}}/{{ page.path | replace: '_posts', 'assets' | replace: '.md', ''}}/terminals.png)
</center>

# Setting Up #

# Getting Started #

[Xmonad]:            http://xmonad.org/
[Gnome]:             http://www.gnome.org/
[Gnome with Xmonad]: http://www.haskell.org/haskellwiki/Xmonad/Using_xmonad_in_Gnome
[askubuntu]:         http://askubuntu.com/questions/323729/xmonad-with-gnome-ubuntu-12-04
