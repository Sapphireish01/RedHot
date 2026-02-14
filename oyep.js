document.addEventListener("DOMContentLoaded", () => {
    /* ───────────────────────────────────────────────
       1. DRAWER MENU (Consistent Group Style)
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
       3. IMPACT COUNTER ANIMATION
    ────────────────────────────────────────────────*/
    const stats = document.querySelectorAll(".stat-number");
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute("data-target"));
                const suffix = target.getAttribute("data-suffix") || "";
                let current = 0;
                const duration = 2000; // 2 seconds
                const stepTime = Math.abs(Math.floor(duration / countTo));

                const timer = setInterval(() => {
                    current += Math.ceil(countTo / 50);
                    if (current >= countTo) {
                        target.innerText = countTo + suffix;
                        clearInterval(timer);
                    } else {
                        target.innerText = current + suffix;
                    }
                }, 30);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(s => statsObserver.observe(s));

    /* ───────────────────────────────────────────────
       4. CONTACT FORM (Formspree AJAX)
    ────────────────────────────────────────────────*/
    const oyepForm = document.getElementById("oyepContactForm");
    const formSuccess = document.getElementById("formSuccess");
    const formSubmitBtn = document.getElementById("formSubmitBtn");

    if (oyepForm) {
        oyepForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const btnText = formSubmitBtn.querySelector(".btn-text");
            const originalText = btnText.textContent;
            btnText.textContent = "SENDING...";
            formSubmitBtn.disabled = true;

            try {
                const response = await fetch(oyepForm.action, {
                    method: "POST",
                    body: new FormData(oyepForm),
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    oyepForm.reset();
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
       5. BACK-TO-TOP BUTTON
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
