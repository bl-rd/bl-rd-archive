---
title: "My JavaScript Mindset"
date: 2020-01-13T21:29:54Z
description: "Wait, you don't need JavaScript?"
intro: "Or; a simple lesson was learned."
animation: "anim-2-javascript-mindset.html"
---

## The problem

For this website, I wanted to have a way of having relevant content outside the main body. While there is {{<external-link href="https://www.kooslooijesteijn.net/blog/semantic-sidenotes">}}no semantic HTML element for this yet{{</external-link>}}, I thought a footnote approach ({{<footnote-link demo>}}like this{{</external-link>}}) was the next best option. I can make it accessible, it doesn't break up the flow of the document, and it is relatively easy to navigate the page.

The problem came about when trying to add some temporary styling to the footnote that the reader is jumping to &mdash; providing some clarity as to which part of the page should be read.

## The solution

While I think I have a very {{<footnote-link excuse>}}valid excuse{{</footnote-link>}} for what's coming next, here was my initial attempt at solving the problem.

```css
.footnote-focus {
    animation-name: focus-flash;
    animation-duration: 1s;
}

@keyframes focus-flash: {
    0% {
        background-color: var(--highlight);
    }
    100% {
        background-color: initial;
    }
}
```

So far, so good (or so I thought). I have a class that can be applied to the footnote that flashes a bit of colour over the targeted element (a small clue there...). So now I just need to add the class when the user clicks a matching footnote link. Inner me: **this is what JavaScript is for!**

```javascript
const links = Array.from(document.querySelectorAll('a[data-footnote]'));
let lookup = {};

// the focus class to apply
const focusClass = 'footnote--focus'; 

links.forEach(link => { 
    // create the lookup, so as to not query the DOM every time
    const href = link.getAttribute('href');
    lookup[href] = document.getElementById(href);
 
    // add the event listener
    link.addEventListener('click', e => {
        const { target } = e;
        
        lookup[target].classList.add(focusClass);
 
        // remove the class after a bit so it can be re-added later.
        setTimeout(() => lookup[target].classList.remove(focusClass), 3000);
    });
});
```
I was typing the git commit message when the doubt began creeping in, and it slowly dawned on me that there was a better way of doing this.

As {{<external-link href="https://alistapart.com/article/paint-the-picture-not-the-frame/">}}the browser provides everything users need{{</external-link>}}, so it turns out (in this case) that CSS already has a well-established solution...

## The actual solution

So I ditched all my lovingly hand-crafted (and completely unnecessary) JavaScript as well as the defunct CSS class. Enter the beautiful {{<external-link href="https://www.w3.org/TR/selectors-3/#target-pseudo">}}target pseudo-class{{</external-link>}}.

```css
article a:target {
    animation-name: focus-flash;
    animation-duration: 1s;
}
```

Initially, I was a little bit embarrassed by this and thought I should forget all about it. But then I realised there was a lesson to be learned.

## Don't assume the answer is JavaScript

At work, I've spent the last few years developing applications using JavaScript frameworks. While they are great, this example made me stop and reflect that maybe they've affected how I think about problems. The thing that bothered me was I _knew_ all about the target pseudo-class, but I just dived straight into solving the problem with a script.

This might be a trivial example, but **what** I was trying to achieve isn't the point &mdash; it was the **how**. Hopefully this will serve as a small, personal reminder to think a bit differently about front-end problems in the future. Actually, make that a reminder just to think...

{{<signoff>}}

{{<blogfooter>}}
<li id="demo-footnote">
    It works! 🎉
    {{<footnote-back demo-link >}}
</li>
<li id="excuse-footnote">
    I was very tired...
    {{<footnote-back excuse-link>}}
</li>
{{</blogfooter>}}
