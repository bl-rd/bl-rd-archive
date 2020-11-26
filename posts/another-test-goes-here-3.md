---
permalink: "/{{parent}}/{{slug}}/"
title: Another test goes here 3
description: "Put the pages's abstract here..."
layout: post.liquid
is_draft: true
data:
  link_url: some/link/url
  animation_file: "null,"
  is_link: "false,"
  has_animation: "true,"
---
## Don't put the title in a h1 as the layout will take care of that...

Add some content...

{% if page.data.is_link %}
View the [project]({{page.data.link_url}})
{% endif %}
