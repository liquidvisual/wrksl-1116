---
layout: child_layout/text_page
title: Docs
permalink: /docs/
hero_image: #/assets/img/content/hero/hero-6.jpg
---

<h1>
	Glossary
</h1>

<p class="lead font-weight-normal mb-4">These are all the browseable pages within this live preview site.</p>

<ul class="block-grid-xs-1 block-grid-md-3" style="max-width:1000px;">
	{% for item in site.pages %}
		{% if item.layout %}
			<li class="pb-1">
				<strong>{{ item.title | upcase }}</strong><br>

				<a href="{{ item.permalink }}">{{ item.permalink }}</a><br>
				<small>{{ item.layout }}</small>
			</li>
		{% endif %}
	{% endfor %}
</ul>

<h2>Instructions</h2>

<p>For a homepage hero with no image, place <code>theme-home-minimal</code> on the body.</p>