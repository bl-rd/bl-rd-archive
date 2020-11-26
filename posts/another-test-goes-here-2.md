---
permalink: "/{{parent}}/{{slug}}/"
title: Another test goes here 2
description: "Put the pages's abstract here..."
layout: post.liquid
is_draft: true
data:
  has_animation: "true,"
  link_url: some/link/url
  is_link: "false,"
  animation_file: "null,"
---
## Don't put the title in a h1 as the layout will take care of that...

Add some content...

{% if page.data.is_link %}
View the [project]({{page.data.link_url}})
{% endif %}
