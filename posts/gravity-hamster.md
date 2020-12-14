---
permalink: "/{{parent}}/{{slug}}/"
title: Gravity Hamster
description: "A pen I was very surprised to find featured on Codepen's \"picked pens\" list one day."
layout: post.liquid
is_draft: true
data:
  animation_file: ~
  has_animation: false
  thing_link: "https://codepen.io/bl-rd/full/RmKNqZ"
  is_thing: true
  thing_link_text: View the pen
---

{% if page.data.is_link %}
View the [pen]({{page.data.link_url}})
{% endif %}
