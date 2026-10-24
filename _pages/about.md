---
permalink: /
title:
description: "Kaisar Dauyey is a physician and translational researcher: whole-person patient care, and the tissue, molecular, and microbial evidence that answers clinical questions."
author_profile: false
banner_quote: "There is only one corner of the universe you can be certain of improving, and that's your own self."
banner_quote_source: "https://podcasts.apple.com/ca/podcast/aldous-huxley-there-is-only-one-corner-of-the/id1723882003?i=1000774531837"
hero: research/about-h-pylori-okinawa-banner.webp
hero_position: "center"
banner_size: research-art
banner_title: "From the patient to the tissue, and back."
redirect_from:
  - /about/
  - /about.html
---

<div class="reading-home">
  <section class="reading-intro" aria-labelledby="home-title">
    <div>
      <div class="about-profile"><span class="about-name">Kaisar Dauyey</span></div>
      <p class="eyebrow">Physician and researcher</p>
      <h2 id="home-title">Questions from medicine.<br>Answers from biology.</h2>
      <p class="reading-lead">My work starts with a question about a person, a population, or an organism. I use clinical observation, genetics, and computation to understand what the evidence can tell us.</p>
      <p>My papers follow infections, cancer, immune disease, and the people who provide care. My doctoral thesis brings together ancient human genomes and the response of reef fish to a changing ocean.</p>
      <div class="reading-actions"><a class="about-button about-button--primary" href="/research/">Explore the research →</a><a class="text-link" href="/publications/">Read the papers →</a></div>
      <p class="reading-caption">MD, Nazarbayev University · PhD in Genetics, SOKENDAI<br>Postdoctoral research, Hokkaido University</p>
    </div>
    <figure class="reading-portrait reading-cats">
      <div class="cat-animation">
        <img src="{{ site.baseurl }}/images/about-cats-golden-kamui.webp" alt="Golden Kamui-inspired collage of black cats, tabbies, a black-and-white cat, and a calico by the Okinawa sea" width="896" height="1120" fetchpriority="high">
        {% for cat in (1..5) %}
        <img class="cat-blink cat-blink--{{ cat }}" src="{{ site.baseurl }}/images/about-cats-blink.webp" alt="" aria-hidden="true" width="896" height="1120" decoding="async">
        {% endfor %}
      </div>
      <figcaption>
        <span>Critical inspiration for research work.</span>
        <button class="cat-animation-toggle" type="button" aria-pressed="false" hidden>Pause animation</button>
      </figcaption>
    </figure>
  </section>

  <section class="reading-section" aria-labelledby="work-title">
    <p class="eyebrow">Start here</p><h2 id="work-title">Follow the question.</h2>
    <div class="reading-paths">
      <a href="/research/#infectious-disease"><span>Infection and resistance</span><strong>What local evidence does a clinician need?</strong><small>Patient samples, culture, and antibiotic resistance in Kazakhstan.</small><b aria-hidden="true">↗</b></a>
      <a href="/research/#clinical-systems"><span>Patients and care</span><strong>Where does care become difficult?</strong><small>Diagnostic delays, cancer genetics, and the experience of palliative care professionals.</small><b aria-hidden="true">↗</b></a>
      <a href="/research/#polygenic-risk"><span>Ancient genomes</span><strong>How far can a modern genetic score travel?</strong><small>Exploratory comparisons across ancestry and time.</small><b aria-hidden="true">↗</b></a>
      <a href="/research/#ocean-acidification"><span>Reef fish and adaptation</span><strong>How does a changing ocean reach the genome?</strong><small>Transposable element related transcripts under elevated carbon dioxide.</small><b aria-hidden="true">↗</b></a>
    </div>
  </section>

  <section class="reading-section" aria-labelledby="selected-title">
    <div class="reading-heading"><div><p class="eyebrow">Selected writing</p><h2 id="selected-title">Read the evidence.</h2></div><a class="text-link" href="/publications/">All publications →</a></div>
    <div class="writing-collage"><article class="reading-study writing-card writing-card--infection">{% include writing-visual.html kind="infection" number="01" %}<div><p class="eyebrow">Frontiers in Microbiology · 2026</p><h3>Antibiotic resistance in Almaty</h3><p>Our study enrolled 150 patients and recovered 86 viable <em>H. pylori</em> isolates. Testing those isolates gave us a local resistance profile to compare with regional evidence.</p><a class="text-link" href="https://doi.org/10.3389/fmicb.2026.1747006">Read the paper ↗</a></div></article>
    <article class="reading-study writing-card writing-card--care">{% include writing-visual.html kind="care" number="02" %}<div><p class="eyebrow">BMC Palliative Care · 2025</p><h3>The people behind the care</h3><p>Interviews with 60 palliative care professionals in Kazakhstan explored emotional strain, burnout, and how people understood their work.</p><a class="text-link" href="https://doi.org/10.1186/s12904-025-01798-z">Read the paper ↗</a></div></article>
    <article class="reading-study writing-card writing-card--thesis">{% include writing-visual.html kind="thesis" number="03" %}<div><p class="eyebrow">Doctoral thesis · SOKENDAI · 2024</p><h3>Ancient humans and changing reefs</h3><p>My thesis examines polygenic scores in ancient genomes and TE related expression in 72 reef fish brain transcriptomes. Both ask how genetic signals make sense in their biological context.</p><a class="text-link" href="https://ir.soken.ac.jp/records/2000266">Read the thesis record ↗</a></div></article></div>{% assign collage_language = page.lang | default: 'en' %}<p class="writing-caption">{{ site.data.writing_collage[collage_language].caption }}</p>
  </section>

{% include current-research.html %}

{% include reef-feature.html %}

  <section class="reading-next" aria-labelledby="conversation-title"><div><p class="eyebrow">Collaboration</p><h2 id="conversation-title">What question are you working on?</h2><p>Tell me what you want to understand and what evidence you have.</p></div><a class="about-button about-button--primary" href="/contact/">Get in touch →</a></section>
  <nav class="reading-related" aria-label="More about Kaisar"><a href="/clinical-practice/">Clinical practice</a><a href="/diagnostic-medicine/">Diagnostic medicine</a><a href="/interests/">Fieldwork and interests</a><a href="/cv/">CV and training</a></nav>
  <section class="visitor-tracker" aria-labelledby="visitor-tracker-title">
    <p class="eyebrow">Across borders</p>
    <h2 id="visitor-tracker-title">Visitors worldwide</h2>
    <p class="visitor-tracker__intro">A record of the places from which this work has been read.</p>
    <a class="visitor-tracker__map" href="https://mapmyvisitors.com/web/1c7ga" aria-label="View visitor locations and statistics on MapMyVisitors" rel="noopener noreferrer">
      <img src="https://mapmyvisitors.com/map.png?cl=ffffff&amp;w=600&amp;t=tt&amp;d=EbdIQeVXNWfqNGr9-LK8xxs9Vwb5DnKww9qk4xH2RAQ&amp;co=2d78ad&amp;ct=ffffff" alt="Map of recorded visitor locations worldwide" width="600" height="306" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="visitor-tracker__link">Explore visitor statistics <span aria-hidden="true">↗</span></span>
    </a>
    <p class="visitor-tracker__note">Recorded visits over time · MapMyVisitors</p>
  </section>
</div>
