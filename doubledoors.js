document.addEventListener("DOMContentLoaded", () => {
    /* ───────────────────────────────────────────────
       1. DRAWER MENU
    ────────────────────────────────────────────────*/
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const menuDrawer = document.getElementById("menuDrawer");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuPanel = document.getElementById("menuPanel");
    const closeDrawerBtn = document.getElementById("closeDrawer");

    function openDrawer() {
        menuDrawer.classList.remove("hidden");
        setTimeout(() => {
            menuOverlay.classList.remove("opacity-0");
            menuPanel.classList.remove("-translate-x-full");
        }, 10);
    }
    function closeDrawerFn() {
        menuOverlay.classList.add("opacity-0");
        menuPanel.classList.add("-translate-x-full");
        setTimeout(() => menuDrawer.classList.add("hidden"), 300);
    }
    hamburgerBtn.addEventListener("click", openDrawer);
    closeDrawerBtn.addEventListener("click", closeDrawerFn);
    menuOverlay.addEventListener("click", closeDrawerFn);

    lucide.createIcons();

    /* ───────────────────────────────────────────────
       2. INFINITE LOOP GALLERY SLIDESHOW
    ────────────────────────────────────────────────*/
    const slides = document.querySelectorAll(".gallery-slide");
    const dots = document.querySelectorAll(".gallery-dot");
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");
    let current = 0;
    let autoTimer;
    const INTERVAL = 4000;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.remove("opacity-100");
            s.classList.add("opacity-0");
            if (i === index) {
                s.classList.remove("opacity-0");
                s.classList.add("opacity-100");
            }
        });
        dots.forEach((d, i) => {
            d.classList.toggle("bg-white", i === index);
            d.classList.toggle("scale-125", i === index);
            d.classList.toggle("bg-white/40", i !== index);
        });
        current = index;
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }
    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }

    function startAuto() {
        autoTimer = setInterval(nextSlide, INTERVAL);
    }
    function stopAuto() {
        clearInterval(autoTimer);
    }

    nextBtn.addEventListener("click", () => { stopAuto(); nextSlide(); startAuto(); });
    prevBtn.addEventListener("click", () => { stopAuto(); prevSlide(); startAuto(); });
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => { stopAuto(); showSlide(i); startAuto(); });
    });

    const galleryContainer = document.getElementById("gallerySlider");
    galleryContainer.addEventListener("mouseenter", stopAuto);
    galleryContainer.addEventListener("mouseleave", startAuto);

    showSlide(0);
    startAuto();

    /* ───────────────────────────────────────────────
       3. LIGHTBOX
    ────────────────────────────────────────────────*/
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");
    let lbIndex = 0;
    const galleryImages = Array.from(slides).map(s => s.querySelector("img").src);

    function openLightbox(index) {
        lbIndex = index;
        lightboxImg.src = galleryImages[lbIndex];
        lightbox.classList.remove("hidden");
        lightbox.classList.add("flex");
        document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("flex");
        document.body.style.overflow = "";
    }

    slides.forEach((s, i) => {
        s.addEventListener("click", () => openLightbox(i));
        s.style.cursor = "zoom-in";
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

    lightboxPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        lbIndex = (lbIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[lbIndex];
    });
    lightboxNext.addEventListener("click", (e) => {
        e.stopPropagation();
        lbIndex = (lbIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[lbIndex];
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("hidden")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") { lbIndex = (lbIndex + 1) % galleryImages.length; lightboxImg.src = galleryImages[lbIndex]; }
        if (e.key === "ArrowLeft") { lbIndex = (lbIndex - 1 + galleryImages.length) % galleryImages.length; lightboxImg.src = galleryImages[lbIndex]; }
    });

    /* ───────────────────────────────────────────────
       4. SCROLL-REVEAL ANIMATIONS
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
       5. PARALLAX HERO IMAGE
    ────────────────────────────────────────────────*/
    const parallaxImg = document.getElementById("parallaxHero");
    if (parallaxImg) {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            const offset = scrollY * 0.3;
            parallaxImg.style.transform = `translateY(${offset}px)`;
        });
    }

    /* ───────────────────────────────────────────────
       6. STATS COUNTER ANIMATION
    ────────────────────────────────────────────────*/
    const counters = document.querySelectorAll(".stat-number");
    let counted = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const suffix = counter.dataset.suffix || "";
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const tick = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString() + suffix;
                    return;
                }
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
                requestAnimationFrame(tick);
            };
            tick();
        });
        counted = true;
    }

    const statsSection = document.getElementById("stats");
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.4 });
        statsObserver.observe(statsSection);
    }

    /* ───────────────────────────────────────────────
       7. BACK-TO-TOP BUTTON
    ────────────────────────────────────────────────*/
    const backToTop = document.getElementById("backToTop");
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

    /* ───────────────────────────────────────────────
       8. CONTACT MODAL (if exists)
    ────────────────────────────────────────────────*/
    const openContactBtn = document.getElementById("openContact");
    const contactModal = document.getElementById("contactModal");
    const closeContactBtn = document.getElementById("closeContact");
    if (openContactBtn && contactModal) {
        openContactBtn.addEventListener("click", () => contactModal.classList.remove("hidden"));
    }
    if (closeContactBtn && contactModal) {
        closeContactBtn.addEventListener("click", () => contactModal.classList.add("hidden"));
    }

    /* ───────────────────────────────────────────────
       9. AVAILABILITY FORM (Formspree AJAX)
    ────────────────────────────────────────────────*/
    const availForm = document.getElementById("availabilityForm");
    const formSuccess = document.getElementById("formSuccess");
    const formSubmitBtn = document.getElementById("formSubmitBtn");

    if (availForm) {
        availForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitLabel = formSubmitBtn.querySelector("span:first-child");
            const originalText = submitLabel.textContent;
            submitLabel.textContent = "SENDING...";
            formSubmitBtn.disabled = true;

            try {
                const response = await fetch(availForm.action, {
                    method: "POST",
                    body: new FormData(availForm),
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    availForm.reset();
                    formSuccess.classList.remove("hidden");
                    submitLabel.textContent = originalText;
                    setTimeout(() => formSuccess.classList.add("hidden"), 5000);
                } else {
                    submitLabel.textContent = "ERROR — TRY AGAIN";
                    setTimeout(() => { submitLabel.textContent = originalText; }, 3000);
                }
            } catch (err) {
                submitLabel.textContent = "ERROR — TRY AGAIN";
                setTimeout(() => { submitLabel.textContent = originalText; }, 3000);
            }

            formSubmitBtn.disabled = false;
        });
    }
});
