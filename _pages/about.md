---
permalink: /
title:
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
        <p class="eyebrow">Physician-scientist · Hokkaido University</p>
      </div>
      <h1 id="home-title">From bedside questions to tissue, genomes, and code.</h1>
      <p class="about-hero__lead">I connect clinical medicine with tissue imaging, genomics, and reproducible computational biology—building analyses whose assumptions, limits, and biological meaning remain visible.</p>

      <dl class="about-hero__affiliations" aria-label="Professional affiliations and training">
        <div><dt>Current</dt><dd>Postdoctoral researcher · Hokkaido University</dd></div>
        <div><dt>Training</dt><dd>MD · Nazarbayev University</dd></div>
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
      <p>Geneformer enables counterfactual tests of how modeled gene deletion or overexpression changes a cell's representation. In SCLC T cells, I use these predicted shifts to prioritize hypotheses about disease-associated cell states.</p>
    </div>
    <figure>
      <img src="/images/research/geneformer-in-silico-perturbation.png" alt="Diagram showing a T cell, its ranked genes, deletion or overexpression of one model input, and the predicted shift between SCLC and normal cell states" loading="lazy">
      <figcaption><strong>Model perturbation, not laboratory gene editing.</strong> The edit is applied to the model input, and the predicted cell-state shift is a hypothesis generator that requires experimental validation. <a href="https://github.com/Kays3/geneformer-lung-tcell">View the Geneformer workflow <span aria-hidden="true">↗</span></a></figcaption>
    </figure>
  </section>

  <section class="about-story" aria-labelledby="story-title">
    <div class="section-heading">
      <p class="eyebrow">Three scales of inquiry</p>
      <h2 id="story-title">Clinical questions, viewed through complementary evidence</h2>
    </div>

    <div class="about-story__grid">
      <a class="about-story__card" href="/research/#digital-pathology">
        <figure><img src="/images/research/digital-pathology-spatial-cover.jpg" alt="Spatial molecular measurements aligned with whole-slide tissue morphology" loading="lazy"><figcaption><span>01 · Tissue</span><strong>Tissue context</strong><small>Relate predicted T-cell states to spatial and morphological evidence.</small></figcaption></figure>
      </a>
      <a class="about-story__card" href="https://github.com/Kays3/geneformer-lung-tcell">
        <figure><img src="/images/projects/geneformer-celltype-umap.png" alt="Geneformer embedding of lung cells organized by cell type and disease" loading="lazy"><figcaption><span>02 · Cells</span><strong>Computational genomics</strong><small>Model cell states with donor-aware, testable workflows.</small></figcaption></figure>
      </a>
      <a class="about-story__card" href="/research/#marine-genomics">
        <figure><img src="/images/research/marine/stichodactyla-ocellaris.jpg" alt="Ocellaris clownfish sheltering in a Stichodactyla sea anemone" loading="lazy"><figcaption><span>03 · Environment</span><strong>Comparative biology</strong><small>Study adaptation and symbiosis under environmental change.</small></figcaption></figure>
      </a>
    </div>
  </section>

  <section class="about-focus" aria-labelledby="focus-title">
    <div class="section-heading">
      <p class="eyebrow">Selected research</p>
      <h2 id="focus-title">A focused translational program</h2>
      <p class="section-lead">The homepage highlights three current directions; the Research page preserves the complete program and its supporting publications.</p>
    </div>

    <div class="about-focus__grid">
      <article class="about-focus__card">
        <span class="about-focus__number">01</span>
        <p class="eyebrow">Model to counterfactual</p>
        <h3>Geneformer In Silico Perturbation</h3>
        <p>Testing how modeled gene deletion or overexpression shifts SCLC T-cell representations, with donor-aware evaluation and a clear boundary between model predictions and laboratory validation.</p>
        <div class="tag-row"><span>Geneformer</span><span>gene perturbation</span><span>T-cell states</span></div>
        <a class="text-link" href="https://github.com/Kays3/geneformer-lung-tcell">View workflow <span aria-hidden="true">↗</span></a>
      </article>

      <article class="about-focus__card">
        <span class="about-focus__number">02</span>
        <p class="eyebrow">Patient to pathogen</p>
        <h3>Infectious Disease &amp; Clinical Evidence</h3>
        <p>Integrating clinical recruitment, microbiology, epidemiology, and antimicrobial-resistance analysis into evidence that fits real care settings.</p>
        <div class="tag-row"><span><em>H. pylori</em></span><span>AMR</span><span>epidemiology</span></div>
        <a class="text-link" href="/research/#infectious-disease">Research focus <span aria-hidden="true">→</span></a>
      </article>

      <article class="about-focus__card">
        <span class="about-focus__number">03</span>
        <p class="eyebrow">Genome to mechanism</p>
        <h3>Genomics &amp; Reproducible Computation</h3>
        <p>Building restartable workflows for population genomics, transcriptomics, and biological foundation models with explicit evaluation boundaries.</p>
        <div class="tag-row"><span>Python</span><span>R</span><span>single-cell</span></div>
        <a class="text-link" href="/research/#machine-learning">Research focus <span aria-hidden="true">→</span></a>
      </article>
    </div>
  </section>

  <aside class="about-more" aria-label="Additional research areas">
    <div><p class="eyebrow">Additional directions</p><h2>Population risk, clinical systems, and marine genomics</h2></div>
    <p>Earlier and continuing work provides comparative depth without competing with the central clinical and computational narrative.</p>
    <a class="about-button" href="/interests/">Explore broader interests</a>
  </aside>
</main>
