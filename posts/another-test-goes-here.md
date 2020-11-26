---
permalink: "/{{parent}}/{{slug}}/"
title: Another test goes here
description: "Put the pages's abstract here..."
layout: post.liquid
is_draft: true
data:
  is_link: "false,"
  animation_file: "null,"
  has_animation: "true,"
  link_url: some/link/url
---
## Don't put the title in a h1 as the layout will take care of that...

Add some content...

{% if page.data.is_link %}
View the [project]({{page.data.link_url}})
{% endif %}
