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
        <img src="/images/kaisar-dauyey-2025.webp" alt="Portrait of Kaisar Dauyey" width="918" height="940" fetchpriority="high">
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
        <a class="about-button about-button--primary" href="/research/">Research &amp; People <span aria-hidden="true">→</span></a>
        <a class="about-button" href="/cv/">View CV</a>
        <a class="about-button about-button--quiet" href="/publications/">Publications</a>
      </div>
    </div>
  </section>

  <section class="about-perturbation" aria-labelledby="perturbation-title">
    <div class="about-perturbation__intro">
      <div><p class="eyebrow">Geneformer · Current focus</p><h2 id="perturbation-title">In silico gene perturbation</h2></div>
      <p>Geneformer reads a cell as an ordered list of genes, with the most expressed gene first. Change one gene in that list and read the cell again. Would it now look more like another state?</p>
    </div>

    <div class="perturbation-lab" data-perturbation-lab>
      <div class="perturbation-lab__topbar">
        <p><strong>Try the model test.</strong> Choose a step or use the controls below.</p>
        <div class="perturbation-lab__mode" aria-label="Choose a model edit">
          <span>Model edit</span>
          <button type="button" data-perturbation-mode="delete" aria-pressed="true">Delete TIGIT</button>
          <button type="button" data-perturbation-mode="overexpress" aria-pressed="false">Overexpress TIGIT</button>
        </div>
      </div>

      <div class="perturbation-lab__steps" role="tablist" aria-label="In silico perturbation steps">
        <button type="button" role="tab" id="perturbation-step-1" aria-controls="perturbation-panel-1" aria-selected="true" tabindex="0" data-perturbation-step="1"><span>1</span>One T cell</button>
        <button type="button" role="tab" id="perturbation-step-2" aria-controls="perturbation-panel-2" aria-selected="false" tabindex="-1" data-perturbation-step="2"><span>2</span>Rank its genes</button>
        <button type="button" role="tab" id="perturbation-step-3" aria-controls="perturbation-panel-3" aria-selected="false" tabindex="-1" data-perturbation-step="3"><span>3</span>Edit one gene</button>
        <button type="button" role="tab" id="perturbation-step-4" aria-controls="perturbation-panel-4" aria-selected="false" tabindex="-1" data-perturbation-step="4"><span>4</span>Measure the move</button>
      </div>

      <div class="perturbation-lab__workspace">
        <section class="perturbation-lab__panel" role="tabpanel" id="perturbation-panel-1" aria-labelledby="perturbation-step-1" data-perturbation-panel="1">
          <div class="cell-model" aria-hidden="true"><span class="cell-model__nucleus">nucleus</span><i></i><i></i><i></i><i></i><i></i></div>
          <div class="perturbation-lab__copy"><p class="eyebrow">Step 1</p><h3>Start with one SCLC T cell</h3><p>The model does not see a microscope image. It sees the genes active in that cell.</p></div>
        </section>

        <section class="perturbation-lab__panel" role="tabpanel" id="perturbation-panel-2" aria-labelledby="perturbation-step-2" data-perturbation-panel="2">
          <ol class="gene-rank" aria-label="Genes ranked from most expressed to least expressed">
            <li><span>CD3D</span><i style="--gene-level: 92%"></i></li>
            <li><span>IL7R</span><i style="--gene-level: 72%"></i></li>
            <li class="gene-rank__target"><span>TIGIT</span><i style="--gene-level: 54%"></i></li>
            <li><span>GZMB</span><i style="--gene-level: 39%"></i></li>
            <li><span>TOX</span><i style="--gene-level: 25%"></i></li>
          </ol>
          <div class="perturbation-lab__copy"><p class="eyebrow">Step 2</p><h3>Rank genes by expression</h3><p>CD3D leads this example. TIGIT sits in the middle of the ordered model input.</p></div>
        </section>

        <section class="perturbation-lab__panel" role="tabpanel" id="perturbation-panel-3" aria-labelledby="perturbation-step-3" data-perturbation-panel="3">
          <div class="perturbation-lab__mode-view" data-perturbation-view="delete">
            <ol class="gene-rank gene-rank--edited" aria-label="Ranked genes after TIGIT deletion">
              <li><span>CD3D</span><i style="--gene-level: 92%"></i></li>
              <li><span>IL7R</span><i style="--gene-level: 72%"></i></li>
              <li class="gene-rank__deleted"><span>TIGIT</span><b aria-label="deleted">×</b></li>
              <li class="gene-rank__moved"><span>GZMB</span><b aria-label="moves up">↑</b></li>
              <li class="gene-rank__moved"><span>TOX</span><b aria-label="moves up">↑</b></li>
            </ol>
          </div>
          <div class="perturbation-lab__mode-view" data-perturbation-view="overexpress">
            <ol class="gene-rank gene-rank--edited" aria-label="Ranked genes after TIGIT overexpression">
              <li class="gene-rank__target gene-rank__moved"><span>TIGIT</span><b aria-label="moves to the top">↑</b></li>
              <li><span>CD3D</span><i style="--gene-level: 92%"></i></li>
              <li><span>IL7R</span><i style="--gene-level: 72%"></i></li>
              <li><span>GZMB</span><i style="--gene-level: 39%"></i></li>
              <li><span>TOX</span><i style="--gene-level: 25%"></i></li>
            </ol>
          </div>
          <div class="perturbation-lab__copy perturbation-lab__mode-view" data-perturbation-view="delete"><p class="eyebrow">Step 3 · Delete</p><h3>Remove TIGIT from the input</h3><p>Every gene below TIGIT moves up one place. The change happens only in the model input.</p></div>
          <div class="perturbation-lab__copy perturbation-lab__mode-view" data-perturbation-view="overexpress"><p class="eyebrow">Step 3 · Overexpress</p><h3>Move TIGIT to the top</h3><p>TIGIT becomes the strongest signal in the model input. The laboratory cell does not change.</p></div>
        </section>

        <section class="perturbation-lab__panel" role="tabpanel" id="perturbation-panel-4" aria-labelledby="perturbation-step-4" data-perturbation-panel="4">
          <div class="state-map perturbation-lab__mode-view" data-perturbation-view="delete" aria-label="Illustration of a predicted shift from the SCLC state toward the Normal state">
            <span class="state-map__state state-map__state--sclc">SCLC</span><span class="state-map__arrow state-map__arrow--normal" aria-hidden="true"></span><span class="state-map__state state-map__state--normal">Normal</span>
          </div>
          <div class="state-map perturbation-lab__mode-view" data-perturbation-view="overexpress" aria-label="Illustration of a predicted shift away from the Normal state toward the SCLC state">
            <span class="state-map__state state-map__state--normal">Normal</span><span class="state-map__arrow state-map__arrow--sclc" aria-hidden="true"></span><span class="state-map__state state-map__state--sclc">SCLC</span>
          </div>
          <div class="perturbation-lab__copy perturbation-lab__mode-view" data-perturbation-view="delete"><p class="eyebrow">Step 4 · Delete</p><h3>Measure the predicted shift</h3><p>Read the edited list again. This illustration moves toward the Normal reference state.</p></div>
          <div class="perturbation-lab__copy perturbation-lab__mode-view" data-perturbation-view="overexpress"><p class="eyebrow">Step 4 · Overexpress</p><h3>Look for the opposite shift</h3><p>A stronger candidate should move in the opposite direction when TIGIT is overexpressed.</p></div>
        </section>
      </div>

      <div class="perturbation-lab__controls">
        <button type="button" data-perturbation-action="previous" disabled>Previous</button>
        <span data-perturbation-status aria-live="polite">Step 1 of 4</span>
        <button type="button" data-perturbation-action="next">Next</button>
      </div>

      <p class="perturbation-lab__note"><strong>This is a model test, not laboratory gene editing.</strong> The movement shown here explains the method. It is not a measured result. <a href="https://github.com/Kays3/geneformer-lung-tcell">View the Geneformer workflow <span aria-hidden="true">↗</span></a></p>
    </div>
  </section>

  <section class="about-story" aria-labelledby="story-title">
    <div class="section-heading">
      <p class="eyebrow">How I work</p>
      <h2 id="story-title">One question can move across several scales</h2>
    </div>

    <div class="about-story__grid">
      <a class="about-story__card" href="/research/#digital-pathology">
        <figure><img src="/images/research/digital-pathology-spatial-cover.webp" alt="Spatial molecular measurements aligned with whole slide tissue morphology" loading="lazy"><figcaption><span>01 · Tissue</span><strong>Tissue context</strong><small>Test whether predicted T cell states make sense in the tissue around them.</small></figcaption></figure>
      </a>
      <a class="about-story__card" href="https://github.com/Kays3/geneformer-lung-tcell">
        <figure><img src="/images/projects/geneformer-celltype-umap.png" alt="Geneformer embedding of lung cells organized by cell type and disease" loading="lazy"><figcaption><span>02 · Cells</span><strong>Computational genomics</strong><small>Model cell states while keeping each donor and assumption visible.</small></figcaption></figure>
      </a>
      <a class="about-story__card" href="/research/#marine-genomics">
        <figure><img src="/images/research/marine/stichodactyla-ocellaris.webp" alt="Ocellaris clownfish sheltering in a Stichodactyla sea anemone" loading="lazy"><figcaption><span>03 · Environment</span><strong>Comparative biology</strong><small>Study adaptation and symbiosis under environmental change.</small></figcaption></figure>
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
    <div class="visitor-tracker__grid">
      <div class="visitor-tracker__widget" aria-label="OhayoWorld visitor globe">
        <iframe
          src="https://www.ohayoworld.com/widgets/globe-widget.php?width=360&amp;ohayos=1&amp;lang=en"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          title="OhayoWorld visitor globe"></iframe>
      </div>
      <div class="visitor-tracker__widget" aria-label="LiveTrafficFeed visitor globe">
        <script src="https://cdn.livetrafficfeed.com/static/revolver-maps/live.js?c=ffffff&amp;cw=e63100&amp;l=1&amp;hi=10&amp;he=10&amp;root=0&amp;st=1&amp;s=360&amp;mv=a814544e2ee74d56" async></script>
        <noscript><a href="https://livetrafficfeed.com/revolver-maps" rel="noopener noreferrer">Free Revolver Maps</a></noscript>
      </div>
    </div>
  </section>
</main>
