---
permalink: /
title:
description: "Kaisar Dauyey connects clinical questions with tissue imaging, genomics, and computational models."
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<main class="about-visual" aria-labelledby="home-title">
  <section class="about-hero">
    <div class="about-hero__content">
      <div class="about-hero__identity">
        <img src="/images/kaisar-dauyey-2025.jpg" alt="Portrait of Kaisar Dauyey" fetchpriority="high">
        <p class="eyebrow">Physician scientist · Hokkaido University</p>
      </div>
      <h1 id="home-title">Clinical questions deserve evidence you can inspect.</h1>
      <p class="about-hero__lead">I start with questions that matter in medicine and biology. Then I use tissue imaging, genomics, and computational models to find answers that can stand up to scrutiny.</p>

      <dl class="about-hero__affiliations" aria-label="Professional affiliations and training">
        <div><dt>Current</dt><dd>Postdoctoral researcher · Hokkaido University</dd></div>
        <div><dt>Medical training</dt><dd>MD · Nazarbayev University</dd></div>
        <div><dt>Doctorate</dt><dd>PhD in Genetics · SOKENDAI</dd></div>
      </dl>

      <div class="about-hero__actions">
        <a class="about-button about-button--primary" href="/research/">Research <span aria-hidden="true">→</span></a>
        <a class="about-button" href="/cv/">View CV</a>
        <a class="about-button about-button--quiet" href="/publications/">Publications</a>
      </div>
    </div>
  </section>

  <section class="about-perturbation" aria-labelledby="perturbation-title">
    <div class="about-perturbation__intro">
      <div><p class="eyebrow">Geneformer · Current focus</p><h2 id="perturbation-title">In silico gene perturbation</h2></div>
      <p>I use Geneformer to ask a focused question. How does a predicted gene deletion or overexpression change the model of an SCLC T cell? The result helps me choose hypotheses worth testing.</p>
    </div>
    <figure>
      <img src="/images/research/geneformer-in-silico-perturbation.png" alt="Diagram showing a T cell, ranked genes, a change to one model input, and the predicted shift between SCLC and normal cell states" loading="lazy">
      <figcaption><strong>This is a model test, not laboratory gene editing.</strong> I change the model input and measure the predicted shift in cell state. That shift can guide an experiment, but it cannot replace one. <a href="https://github.com/Kays3/geneformer-lung-tcell">View the Geneformer workflow <span aria-hidden="true">↗</span></a></figcaption>
    </figure>
  </section>

  <section class="about-story" aria-labelledby="story-title">
    <div class="section-heading">
      <p class="eyebrow">How I work</p>
      <h2 id="story-title">One question can move across several scales</h2>
    </div>

    <div class="about-story__grid">
      <a class="about-story__card" href="/research/#digital-pathology">
        <figure><img src="/images/research/digital-pathology-spatial-cover.jpg" alt="Spatial molecular measurements aligned with whole slide tissue morphology" loading="lazy"><figcaption><span>01 · Tissue</span><strong>Tissue context</strong><small>Test whether predicted T cell states make sense in the tissue around them.</small></figcaption></figure>
      </a>
      <a class="about-story__card" href="https://github.com/Kays3/geneformer-lung-tcell">
        <figure><img src="/images/projects/geneformer-celltype-umap.png" alt="Geneformer embedding of lung cells organized by cell type and disease" loading="lazy"><figcaption><span>02 · Cells</span><strong>Computational genomics</strong><small>Model cell states while keeping each donor and assumption visible.</small></figcaption></figure>
      </a>
      <a class="about-story__card" href="/research/#marine-genomics">
        <figure><img src="/images/research/marine/stichodactyla-ocellaris.jpg" alt="Ocellaris clownfish sheltering in a Stichodactyla sea anemone" loading="lazy"><figcaption><span>03 · Environment</span><strong>Comparative biology</strong><small>Study adaptation and symbiosis under environmental change.</small></figcaption></figure>
      </a>
    </div>
  </section>

  <section class="about-focus" aria-labelledby="focus-title">
    <div class="section-heading">
      <p class="eyebrow">Selected research</p>
      <h2 id="focus-title">The work I am building now</h2>
      <p class="section-lead">These projects share a simple standard. Each claim should lead back to its evidence and method.</p>
    </div>

    <div class="about-focus__grid">
      <article class="about-focus__card">
        <span class="about-focus__number">01</span>
        <p class="eyebrow">Model to counterfactual</p>
        <h3>Geneformer In Silico Perturbation</h3>
        <p>I test how a modeled gene deletion or overexpression shifts SCLC T cell representations. I keep donor effects visible and separate predictions from laboratory evidence.</p>
        <div class="tag-row"><span>Geneformer</span><span>gene perturbation</span><span>T cell states</span></div>
        <a class="text-link" href="https://github.com/Kays3/geneformer-lung-tcell">View workflow <span aria-hidden="true">↗</span></a>
      </article>

      <article class="about-focus__card">
        <span class="about-focus__number">02</span>
        <p class="eyebrow">Patient to pathogen</p>
        <h3>Infectious Disease and Clinical Evidence</h3>
        <p>I connect patient recruitment with microbiology and epidemiology. The goal is evidence that fits the reality of clinical care.</p>
        <div class="tag-row"><span><em>H. pylori</em></span><span>AMR</span><span>epidemiology</span></div>
        <a class="text-link" href="/research/#infectious-disease">Research focus <span aria-hidden="true">→</span></a>
      </article>

      <article class="about-focus__card">
        <span class="about-focus__number">03</span>
        <p class="eyebrow">Genome to mechanism</p>
        <h3>Genomics and Reproducible Computation</h3>
        <p>I build workflows that can be checked, restarted, and handed to another researcher. That matters as much as the final figure.</p>
        <div class="tag-row"><span>Python</span><span>R</span><span>single cell</span></div>
        <a class="text-link" href="/research/#machine-learning">Research focus <span aria-hidden="true">→</span></a>
      </article>
    </div>
  </section>

  <aside class="about-more" aria-label="Additional research areas">
    <div><p class="eyebrow">More of my work</p><h2>Population risk, clinical systems, and marine genomics</h2></div>
    <p>My earlier work still shapes the questions I ask today, especially when a result depends on population or environmental context.</p>
    <a class="about-button" href="/interests/">Explore broader interests</a>
  </aside>

  <section class="visitor-tracker" aria-labelledby="visitor-tracker-title">
    <div class="section-heading"><p class="eyebrow">Site reach</p><h2 id="visitor-tracker-title">Visitors worldwide</h2></div>
    <a href="https://mapmyvisitors.com/web/1c7ga" title="View visitor tracker" rel="noopener noreferrer">
      <img src="https://mapmyvisitors.com/map.png?cl=ffffff&amp;w=300&amp;t=tt&amp;d=EbdIQeVXNWfqNGr9-LK8xxs9Vwb5DnKww9qk4xH2RAQ&amp;co=2d78ad&amp;ct=ffffff" alt="Map showing the countries and regions from which this website has been visited" width="300" loading="lazy" referrerpolicy="no-referrer">
    </a>
  </section>
</main>
