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
  is_thing: false,
  thing_link: ~,
  thing_link_text: ~,

  # note config
  is_note: false,

  # tags config
  tags: []
}
---

## Don't put the title in a h1 as the layout will take care of that...

Add some content...

{% if page.data.is_thing %}
[{{ page.data.thing_link_text }}]({{ page.data.thing_link }})
{% endif %}
