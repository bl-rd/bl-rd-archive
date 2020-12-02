---
permalink: "/{{parent}}/{{slug}}/"
title: Video-game style text
description: "In which I learned to use the Web Animations API to give body text some video game pizazz."
layout: post.liquid
is_draft: true
data: {
  thing_link: null,
  has_animation: true,
  animation_file: "animations/video-game-text.html",
  is_thing: false,
  thing_link_text: null
}
---

## But why?

Because _it's my website_ and **I wanted to**!

I've been playing a few pixel art games over the last year or so (big shout outs to [Shovel Knight](https://yachtclubgames.com/shovel-knight/) and [Celeste](http://www.celestegame.com/)) and liked how adding movement to text could add extra meaning.

As moving of the letters is used for extra emphasis, or to imply some significance, I liked the idea of adding some movement to the `<em>` and `<strong>` tags to add further meaning to their semantics.

I've chosen to use the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) (instead of CSS animations) as I can have more control over each animated element without having to rely on a CSS pre-processor.

## Targeting individual letters

To animate each letter, I need a way of targeting them each in turn. This is quite easy to do, using a nifty trick that I picked up from [Tobias Ahlin](https://tobiasahlin.com/)'s [Moving Letters project](https://tobiasahlin.com/moving-letters/). However, there is a slight complication, in that we also need a way of determining the individual words to stop them wrapping.

(JavaScript was here)

One additional thing &mdash; we need some CSS to stop the words wrapping and also to get the letters to actually animate.

(Css was here)

## Animate all the things

Now we have our elements, they can be animated with the [Web Animations API!](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

You can call `animate` on an appropriate DOMElement to trigger an animation. This provides an easy way to test browser support, and just return out the function if the browser doesn't like it.

The [animate function](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) takes two arguments &mdash; `keyframes` and `options`.

The `keyframes` can be thought of as a JavaScript of version of the steps defined in a CSS `@keyframes` animation. To be honest, I found this step difficult. This was mainly due to browser support for animating from or to a property that hasn't been explicitly stated seems ropey at present.

The `options` argument is the equivalent of all the other animation properties that you can be defined in CSS. I'd recommend a look at the [CSS Tricks article](https://css-tricks.com/css-animations-vs-web-animations-api/) that looks at the differences and similiarites between CSS animations and the Web Animations API.

(More JS was here)

## The result

I've replicated this on [CodePen](https://codepen.io/bl-rd/pen/vYEeoNm) with an extra animation style, so feel free to have a more in&ndash;depth look.

## Bonus points

Performance wise, I'd prefer not to have a load of animations running when the user isn't even looking at them. As these animations are being triggered via JavaScript, it means the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) can also be used to only start the animation when elements are in the viewport.

(More JS)

Ideally, this would be applied at the _word_ level as opposed to the individual letter level, but for now, this works quite nicely.

## Accessibility

Adding animation adds motion to our page, and that is [known to impact users with various conditions](https://css-tricks.com/introduction-reduced-motion-media-query/).

Thankfully the `prefers-reduced-motion` feature query makes it quite straight forward. Using this nifty feature, we can detect the user's preference at the operating system level.

(More JS)

In the future, I'd like to have a toggle for people who find the animations annoying, but don't generally want them disabled everywhere!

## Is it worth it?

Maybe? I think it does add some extra (appropriate) emphasis, as well as a bit of character but I appreciate it might not be to everyone's taste.

I liked learning about the Web Animations API and **love** that there is a library free way of doing this type of animation. I'm sure there are certainly plenty of creative possibilities to be had in the future, especially when [the full implementation of the API appears in browsers](https://caniuse.com/#feat=web-animation).

As it stands I like it and, as I said before, _it's my website_!