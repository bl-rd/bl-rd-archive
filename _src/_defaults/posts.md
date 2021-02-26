---
layout: post.liquid
title: First Post
is_draft: true
permalink: /{{parent}}/{{slug}}/
description: Put the pages's abstract here...
data: {
  # animation config
  has_animation: false,
  animation_file: ~,

  # thing config
  thing_link: ~,
  thing_link_text: ~
}
tags: []
categories: [ posts ]
---

## Don't put the title in a h1 as the layout will take care of that...

Add some content...

{% if page.data.thing_link %}
[{{ page.data.thing_link_text }}]({{ page.data.thing_link }})
{% endif %}
