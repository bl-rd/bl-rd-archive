---
permalink: "/{{parent}}/{{slug}}/"
title: Some pen
description: "YO yo yo"
layout: post.liquid
is_draft: true
data: {
  has_animation: false,
  animation_file: null,
  is_thing: true,
  thing_link: "https://codepen.io",
  thing_link_text: "View pen"
}
---

## Don't put the title in a h1 as the layout will take care of that...

Add some content...

{% if page.data.is_link %}
View the [project]({{page.data.link_url}})
{% endif %}
