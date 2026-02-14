document.addEventListener("DOMContentLoaded", () => {
    /* ───────────────────────────────────────────────
       1. DRAWER MENU (Consistent with RedHot style)
    ────────────────────────────────────────────────*/
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const menuDrawer = document.getElementById("menuDrawer");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuPanel = document.getElementById("menuPanel");
    const closeDrawerBtn = document.getElementById("closeDrawer");

    function openDrawer() {
        if (!menuDrawer) return;
        menuDrawer.classList.remove("hidden");
        setTimeout(() => {
            menuOverlay.classList.remove("opacity-0");
            menuPanel.classList.remove("-translate-x-full");
        }, 10);
    }
    function closeDrawerFn() {
        if (!menuOverlay) return;
        menuOverlay.classList.add("opacity-0");
        menuPanel.classList.add("-translate-x-full");
        setTimeout(() => menuDrawer.classList.add("hidden"), 300);
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener("click", openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawerFn);
    if (menuOverlay) menuOverlay.addEventListener("click", closeDrawerFn);

    lucide.createIcons();

    /* ───────────────────────────────────────────────
       2. SCROLL-REVEAL ANIMATIONS
    ────────────────────────────────────────────────*/
    const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ───────────────────────────────────────────────
       3. CONTACT FORM (Formspree AJAX)
    ────────────────────────────────────────────────*/
    const contactForm = document.getElementById("osealContactForm");
    const formSuccess = document.getElementById("formSuccess");
    const formSubmitBtn = document.getElementById("formSubmitBtn");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const btnText = formSubmitBtn.querySelector(".btn-text");
            const originalText = btnText.textContent;
            btnText.textContent = "SENDING...";
            formSubmitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    contactForm.reset();
                    formSuccess.classList.remove("hidden");
                    btnText.textContent = "SENT ✓";
                    setTimeout(() => {
                        formSuccess.classList.add("hidden");
                        btnText.textContent = originalText;
                    }, 5000);
                } else {
                    btnText.textContent = "ERROR — RETRY";
                    setTimeout(() => { btnText.textContent = originalText; }, 3000);
                }
            } catch (err) {
                btnText.textContent = "ERROR — RETRY";
                setTimeout(() => { btnText.textContent = originalText; }, 3000);
            }

            formSubmitBtn.disabled = false;
        });
    }

    /* ───────────────────────────────────────────────
       4. BACK-TO-TOP BUTTON
    ────────────────────────────────────────────────*/
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTop.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
                backToTop.classList.add("opacity-100", "translate-y-0");
            } else {
                backToTop.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
                backToTop.classList.remove("opacity-100", "translate-y-0");
            }
        });
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
