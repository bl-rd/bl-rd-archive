---
title: "Video-game style text"
date: 2020-02-16T14:28:45Z
description: "Making text look like it came from a _video-game_ &mdash; with the power of **JavaScript**!"
intro: "In which I learned to use the Web Animations API to give my body text some video game pizazz."
draft: true
animation: "anim-3-video-game-text.html"
thumbnail: true
---

## But why?

Because _it's my website_ and **I wanted to**!

I've been playing a few pixel art games over the last year or so (for example {{<external-link href="https://yachtclubgames.com/shovel-knight/">}}Shovel Knight{{</external-link>}}, {{<external-link href="http://www.celestegame.com/">}}Celeste{{</external-link>}}) and liked how adding movement to text could add extra meaning.

As moving of the letters is used for extra emphasis, or to imply some significance, I liked the idea of adding some movement to the `<em>` and `<strong>` tags to add further meaning to their semantics.

I've chosen to use the {{<external-link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API">}}Web Animations API{{</external-link>}} (instead of CSS animations) as I can have more control over each animated element without having to rely on a CSS pre-processor.

## Targeting individual letters

To animate each letter, I need a way of targeting them each in turn. This is quite easy to do, using a nifty trick that I picked up from {{<external-link href="https://tobiasahlin.com/">}}Tobias Ahlin{{</external-link>}}'s {{<external-link href="https://tobiasahlin.com/moving-letters/">}}Moving Letters project{{</external-link>}}. However, there is a slight complication, in that we also need a way of determining the individual words to stop them {{<footnote-link help>}}wrapping{{</footnote-link>}}.

```javascript
// get the elements from the DOM
const bold = Array.from(document.querySelectorAll('strong'));

bold.forEach(b => {
  // wrap each separate word in the tag in a span
  b.innerHTML = `
    <span class="text-animation"><span class="text-animation__word">
      ${b.textContent.trim().replace(/\s/ig,'</span><span class="text-animation__word">$&')}
    </span>`;

  // wrap each individual letter in the word in a span that we will target for the animation
  const words = Array.from(b.querySelectorAll('.vg-text-animation__word'));
    words.forEach((word, index) => {
      word.innerHTML = word.innerHTML.replace(/\s/g, '');
      word.innerHTML = word.textContent
        .replace(/\S/g, '<span class="vg-text-animation__letter vg-text-animation__letter--bold">$&</span>');
      // if there is another word after this one then add some whitespace
      if (words.length > 1 && index < words.length - 1) {
        word.innerHTML += '&nbsp;';
      }
  });
});

```

One additional thing &mdash; we need some CSS to stop the words wrapping and also to get the letters to actually animate.

```css
.vg-text-animation__word {
  display: inline-block;
}

.vg-text-animation__letter {
  position: relative;
  display: inline-block;
}
```

## Animate all the things

Now we have our elements, they can be animated with the {{<external-link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API">}}Web Animations API!{{</external-link>}}

You can call `animate` on an appropriate DOMElement to trigger an animation. This provides an easy way to test browser support, and just return out the function if the browser doesn't like it.

The {{<external-link href="https://developer.mozilla.org/en-US/docs/Web/API/Element/animate">}}animate function{{</external-link>}} takes two arguments &mdash; `keyframes` and `options`.

The `keyframes` can be thought of as a JavaScript of version of the steps defined in a CSS `@keyframes` animation. To be honest, I found this step difficult. This was mainly due to browser support for animating from or to a property that hasn't been explicitly stated {{<footnote-link ropey>}}seems ropey at present{{</footnote-link>}}.

The `options` argument is the equivalent of all the other animation properties that you can be defined in CSS. I'd recommend a look at the {{<external-link href="https://css-tricks.com/css-animations-vs-web-animations-api/">}}CSS Tricks article{{</external-link>}} that looks at the differences and similiarites between CSS animations and the Web Animations API.

```javascript
// feature-sniff for the web animations api
if (!HTMLElement.prototype.animate) {
  return;
}

// our animation frames - rotate the elements back and forth
const frames = [
 { transform: 'rotate(-4deg)', offset: 0 },
 { transform: 'rotate(4deg)', offset: 1 }
];

const letters = document.querySelectorAll('.vg-text-animation__letter--bold');
letters.forEach((l, idx) => {
  l.animate(frames, {
    iterations: Infinity,
    direction: 'normal',
    easing: 'cubic-bezier(0.9,-1,0.1,1)',
    duration: 200,
    // small offset based on the index of each element to provide variation
    delay: idx * 80
  });
});
```

## The result

{{<rawHtml>}}
<iframe height="300" src="/examples/video-game-anim-1"></iframe>
{{</rawHtml>}}

## Bonus points

Performance wise, I'd prefer not to have a load of animations running when the user isn't even looking at them. As these animations are being triggered via JavaScript, it means the {{<external-link href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver">}}Intersection Observer API{{</external-link>}} can also be used to only start the animation when elements are in the viewport.

```javascript
letters.forEach((l, idx) => {
  // assign to a variable to access later
  const anim = l.animate(frames, {
    iterations: Infinity,
    direction: 'normal',
    easing: 'cubic-bezier(0.9,-1,0.1,1)',
    duration: 200,
    // small offset based on the index of each element to provide variation
    delay: idx * 80
  });

  // create a new instance observer, and only play
  // the animation if the element is in the viewport
  let observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        anim.play();
      } else {
        anim.cancel();
      }
    });    
    }, {
      root: null,
      rootMargin: '0px'
    });
    observer.observe(l);
});

```

Ideally, this would be applied at the _word_ level as opposed to the individual letter level, but for now, this works quite nicely.

## Accessibility

Adding animation adds motion to our page, and that is {{<external-link href="https://css-tricks.com/introduction-reduced-motion-media-query/">}}known to impact users with various conditions{{</external-link>}}.

Thankfully the `prefers-reduced-motion` feature query makes it quite straight forward. Using this nifty feature, we can detect the user's preference at the operating system level.

```javascript
// feature-sniff for the web animations api
if (!HTMLElement.prototype.animate) {
  return;
}

const { matchMedia: media } = window;

// return if the user has turned off animation in the OS
if (media && media('(prefers-reduced-motion: reduce)').matches) {
  return;
}
```
In the future, I'd like to have a toggle for people who find the animations annoying, but don't generally want them disabled everywhere!

## Is it worth it?

Maybe? I think it does add some extra (appropriate) emphasis, as well as a bit of character but I appreciate it might not be to everyone's taste.

I liked learning about the Web Animations API and **love** that there is a library free way of doing this type of animation. I'm sure there are certainly plenty of creative possibilities to be had in the future, especially when {{<external-link href="https://caniuse.com/#feat=web-animation">}}the full implementation of the API appears in browsers{{</external-link>}}.

As it stands I like it and, as I said before, _it's my website_!

{{<signoff>}}

{{<blogfooter>}}
<li id="help-footnote">
    I'm sure someone smarter than me can think of a better way. If so, then please let me know!
    {{<footnote-back help-link >}}
</li>
<li id="ropey-footnote">
    I would frequently get a `Animation to or from an underlying value is not yet supported.` error. Usually fixed by making sure there was always an offset set to 0.
    {{<footnote-back ropey-link >}}
</li>
{{</blogfooter>}}