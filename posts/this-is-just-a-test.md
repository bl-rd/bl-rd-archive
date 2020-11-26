---
permalink: "/{{parent}}/{{slug}}/"
title: This is just a test
description: "Here is a super good abstract"
layout: post.liquid
is_draft: true
data:
  animation_file: "null,"
  is_link: "false,"
  has_animation: "true,"
  link_url: some/link/url
---
## Don't put the title in a h1 as the layout will take care of that...

Add some content...

{% if page.data.is_link %}
View the [project]({{page.data.link_url}})
{% endif %}
