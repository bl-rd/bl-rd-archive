---
layout: post.liquid
title: First Post
is_draft: true
permalink: /{{parent}}/{{slug}}/
description: Put the pages's abstract here...
data: {
  has_animation: false,
  animation_file: null,
  is_thing: false,
  thing_link: null,
  thing_link_text: null
}
---

## Don't put the title in a h1 as the layout will take care of that...

Add some content...

{% if page.data.is_link %}
View the [project]({{page.data.link_url}})
{% endif %}