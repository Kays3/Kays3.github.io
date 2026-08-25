(function () {
  "use strict";

  var lab = document.querySelector("[data-perturbation-lab]");
  if (!lab) {
    return;
  }

  var tabs = Array.prototype.slice.call(lab.querySelectorAll("[data-perturbation-step]"));
  var panels = Array.prototype.slice.call(lab.querySelectorAll("[data-perturbation-panel]"));
  var modeButtons = Array.prototype.slice.call(lab.querySelectorAll("[data-perturbation-mode]"));
  var modeViews = Array.prototype.slice.call(lab.querySelectorAll("[data-perturbation-view]"));
  var previousButton = lab.querySelector("[data-perturbation-action='previous']");
  var nextButton = lab.querySelector("[data-perturbation-action='next']");
  var status = lab.querySelector("[data-perturbation-status]");
  var currentStep = 1;
  var currentMode = "delete";

  lab.classList.add("is-enhanced");

  function render() {
    tabs.forEach(function (tab) {
      var isCurrent = Number(tab.getAttribute("data-perturbation-step")) === currentStep;
      tab.setAttribute("aria-selected", String(isCurrent));
      tab.setAttribute("tabindex", isCurrent ? "0" : "-1");
    });

    panels.forEach(function (panel) {
      panel.hidden = Number(panel.getAttribute("data-perturbation-panel")) !== currentStep;
    });

    modeButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.getAttribute("data-perturbation-mode") === currentMode)
      );
    });

    modeViews.forEach(function (view) {
      view.hidden = view.getAttribute("data-perturbation-view") !== currentMode;
    });

    previousButton.disabled = currentStep === 1;
    nextButton.disabled = currentStep === tabs.length;
    status.textContent = "Step " + currentStep + " of " + tabs.length;
  }

  function setStep(step, moveFocus) {
    currentStep = Math.max(1, Math.min(tabs.length, step));
    render();
    if (moveFocus) {
      tabs[currentStep - 1].focus();
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setStep(Number(tab.getAttribute("data-perturbation-step")), false);
    });

    tab.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        setStep(currentStep === tabs.length ? 1 : currentStep + 1, true);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        setStep(currentStep === 1 ? tabs.length : currentStep - 1, true);
      } else if (event.key === "Home") {
        event.preventDefault();
        setStep(1, true);
      } else if (event.key === "End") {
        event.preventDefault();
        setStep(tabs.length, true);
      }
    });
  });

  modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      currentMode = button.getAttribute("data-perturbation-mode");
      if (currentStep < 3) {
        currentStep = 3;
      }
      render();
    });
  });

  previousButton.addEventListener("click", function () {
    setStep(currentStep - 1, false);
  });

  nextButton.addEventListener("click", function () {
    setStep(currentStep + 1, false);
  });

  render();
})();
