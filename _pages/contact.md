---
title: "Contact"
permalink: /contact/
author_profile: true
---

<section class="contact-panel">
  <p class="eyebrow">Collaborate</p>
  <h2>Questions are welcome—especially the interdisciplinary ones.</h2>
  <p>I am open to collaborations that connect clinical medicine with tissue imaging, spatial biology, genomics, infectious-disease research, machine learning, and reproducible biomedical analysis.</p>
  <div class="contact-list">
    <div><span>Email</span><strong>k.dauyey.bio.nu [at] gmail [dot] com</strong></div>
    <div><span>Code</span><strong><a href="https://github.com/Kays3">github.com/Kays3</a></strong></div>
    <div><span>Research ID</span><strong><a href="https://orcid.org/0000-0003-0533-9778">ORCID 0000-0003-0533-9778</a></strong></div>
    <div><span>Laboratory</span><strong><a href="https://altair.sci.hokudai.ac.jp/infmcb/index-e.html">Laboratory of Mathematical Biology</a></strong></div>
  </div>
</section>

<p class="contact-note">For project inquiries, a short note about the biological question, data type, and hoped-for outcome is the most helpful place to start.</p>

<section class="contact-question" aria-labelledby="contact-question-title">
  <div class="contact-question__intro">
    <p class="eyebrow">Send a question</p>
    <h2 id="contact-question-title">Start with the research context.</h2>
    <p>This form prepares a message in your email application. Your answers stay in your browser until you choose to send the email.</p>
  </div>

  <form class="contact-question__form" data-contact-form>
    <div class="contact-question__field">
      <label for="contact-name">Name</label>
      <input id="contact-name" name="name" type="text" autocomplete="name" required>
    </div>

    <div class="contact-question__field">
      <label for="contact-email">Reply email</label>
      <input id="contact-email" name="email" type="email" autocomplete="email" required>
    </div>

    <div class="contact-question__field contact-question__field--wide">
      <label for="contact-topic">Topic</label>
      <select id="contact-topic" name="topic" required>
        <option value="">Select a topic</option>
        <option>Research collaboration</option>
        <option>Data or code question</option>
        <option>Speaking or teaching</option>
        <option>Other inquiry</option>
      </select>
    </div>

    <div class="contact-question__field contact-question__field--wide">
      <label for="contact-message">Question</label>
      <textarea id="contact-message" name="message" rows="7" minlength="20" required placeholder="What is the biological or clinical question, what data are available, and what outcome would be useful?"></textarea>
    </div>

    <div class="contact-question__submit contact-question__field--wide">
      <button class="about-button about-button--primary" type="submit">Prepare email <span aria-hidden="true">→</span></button>
      <p class="contact-question__status" data-contact-status role="status" aria-live="polite"></p>
    </div>
  </form>
</section>

<script type="module" src="/assets/js/contact-form.js"></script>
