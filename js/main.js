const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".global-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const opened = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(opened));
    button.querySelector("span").textContent = opened ? "-" : "+";
  });
});

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const lines = Array.from(formData.entries())
      .map(([key, value]) => `${key}: ${value || "未入力"}`);
    const isAdult = form.id === "adult-form";
    const subject = isAdult
      ? "N.I.A. Handball Club 高校生以上・社会人 参加申し込み"
      : "N.I.A. Handball Club 小中学生 体験参加・見学申し込み";
    const body = [
      subject,
      "",
      ...lines,
    ].join("\n");
    const mailTo = form.getAttribute("action") || "mailto:nia.handball.club@gmail.com";
    const url = `${mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.innerHTML = "メールソフトを起動します";
    }

    window.location.href = url;
  });
});
