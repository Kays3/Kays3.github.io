const form = document.querySelector("[data-contact-form]");
const status = document.querySelector("[data-contact-status]");

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      status.textContent = "Please complete the required fields before preparing the email.";
      return;
    }

    const fields = new FormData(form);
    const name = String(fields.get("name")).trim();
    const email = String(fields.get("email")).trim();
    const topic = String(fields.get("topic")).trim();
    const message = String(fields.get("message")).trim();
    const recipient = ["k.dauyey.bio.nu", "gmail.com"].join("@");
    const subject = `Website question: ${topic}`;
    const body = [`Name: ${name}`, `Reply email: ${email}`, "", message].join("\n");
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = "Opening your email application with the question prepared.";
    window.location.assign(mailto);
  });
}
