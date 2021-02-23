---
permalink: "/{{parent}}/{{slug}}/"
title: Gravity Hamster
description: "A pen I was very surprised to find featured on Codepen's \"picked pens\" list one day."
published_date: "2019-05-14 21:25:06 +0000"
layout: post.liquid
is_draft: false
data:
  animation_file: ~
  thing_link: "https://codepen.io/bl-rd/full/RmKNqZ"
  thing_link_text: View the pen
  is_thing: true
  has_animation: 
tags: [
  css,
  codepen
]
categories: [ thing ]
---
{% if page.data.is_link %}
View the [pen]({{page.data.link_url}})
{% endif %}
