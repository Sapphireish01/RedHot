const toggleBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const iconHamburger = document.getElementById('icon-hamburger');
const iconClose = document.getElementById('icon-close');

const tranpoint = document.getElementById('tranpoint');
const navScreenHeight = window.innerHeight * 0.68; // 70% of viewport height

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > navScreenHeight) {
    tranpoint.classList.add('bg-black/80');
  } else {
    tranpoint.classList.remove('bg-black/80');
  }
});

// Toggle menu open/close and swap icons
function toggleMenu() {
  const isOpen = menu.classList.contains("translate-x-0");

  if (isOpen) {
    // Close menu
    menu.classList.remove("translate-x-0");
    menu.classList.add("-translate-x-full");

    iconHamburger.classList.remove("hidden");
    iconClose.classList.add("hidden");
  } else {
    // Open menu
    menu.classList.remove("-translate-x-full");
    menu.classList.add("translate-x-0");

    iconHamburger.classList.add("hidden");
    iconClose.classList.remove("hidden");
  }
}

// Hamburger click
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("toggle btn clicked");
  toggleMenu();
});


// Click outside menu to close
document.addEventListener('click', (e) => {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnButton = toggleBtn.contains(e.target);
  const isClickOnSlider = e.target.closest('#leftBtn, #rightBtn, #slider');

  if (!isClickInsideMenu && !isClickOnButton && !isClickOnSlider && !menu.classList.contains('hidden')) {
    toggleMenu();
  }
});


// Close when nav link is clicked
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu();
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animate on scroll
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const options = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
 const slides = [
    { type: "video", media: "assets/alterego.mp4", poster: "assets/tff-2.webp", title: "ALTER EGO", description: "A woman who will stop at nothing...", link: "#alter-ego" },
    { type: "image", media: "assets/heroimg-1.png", title: "REDHOT VIBES", description: "Capturing moments that define African entertainment.", link: "#redhot-vibes" },
    { type: "video", media: "assets/vid-1.mp4", poster: "assets/tff-1.webp", title: "Heart Stories", description: "A matter of the heart.", link: "#heart-stories" },
    { type: "image", media: "assets/heroimg-2.jpg", title: "LIGHTS & STORIES", description: "Where powerful narratives meet stunning visuals.", link: "#lights-stories" },
    { type: "video", media: "assets/vid-2.webm", poster: "assets/dd-1.webp", title: "SEE", description: "Power in vision.", link: "#see" },
    { type: "image", media: "assets/heroimg-3.jpeg", title: "Love and Laughs", description: "Serenity.", link: "#love-laughs" }
  ];

  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");
  const image1 = document.getElementById("image1");
  const image2 = document.getElementById("image2");
  const titleEl = document.getElementById("slideTitle");
  const descEl = document.getElementById("slideDesc");
  const linkEl = document.getElementById("slideLink");
  const contentBox = document.getElementById("slideContent");
  const unmuteBtn = document.getElementById("unmuteBtn");

  let currentIndex = 0;
  let showingFirst = true;
  let timer = null;
  let isMuted = true;

  function showSlide(index) {
      // reset all media opacity
      [video1, video2, image1, image2].forEach(el => el.classList.add("opacity-0"));

      const slide = slides[index];
      let active;

      if (slide.type === "video") {
      // show unmute button
      unmuteBtn.classList.remove("hidden");

      active = showingFirst ? video1 : video2;
      active.src = slide.media;
      active.poster = slide.poster || "";
      active.load();
      active.currentTime = 0;   // always restart
      active.muted = isMuted;
      active.classList.remove("opacity-0");
      active.play().catch(()=>{});

      // fade-in description (0.5s delay)
      contentBox.classList.add("opacity-0");
      setTimeout(() => {
          titleEl.textContent = slide.title;
          descEl.textContent = slide.description;
          linkEl.href = slide.link;
          contentBox.classList.remove("opacity-0");
      }, 500);

      // cutoff after 15s
      clearTimeout(timer);
      timer = setTimeout(() => {
          active.classList.add("opacity-0");
          contentBox.classList.add("opacity-0");
          setTimeout(() => {
          active.pause();
          nextSlide();
          }, 1000); // wait fade-out
      }, 15000);

      } else {
      // hide unmute button
      unmuteBtn.classList.add("hidden");

      active = showingFirst ? image1 : image2;
      active.src = slide.media;
      active.classList.remove("opacity-0");

      // delayed description fade-in
      contentBox.classList.add("opacity-0");
      setTimeout(() => {
          titleEl.textContent = slide.title;
          descEl.textContent = slide.description;
          linkEl.href = slide.link;
          contentBox.classList.remove("opacity-0");
      }, 500);

      clearTimeout(timer);
      timer = setTimeout(() => {
          active.classList.add("opacity-0");
          contentBox.classList.add("opacity-0");
          setTimeout(nextSlide, 1000);
      }, 4000);
      }

      showingFirst = !showingFirst;
  }

  function nextSlide() {
      clearTimeout(timer);
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
  }

  // unmute toggle
  unmuteBtn.addEventListener("click", () => {
      isMuted = !isMuted;
      [video1, video2].forEach(v => v.muted = isMuted);
      unmuteBtn.textContent = isMuted ? "🔇 Mute" : "🔊 Unmute";
  });

  // init
  showSlide(currentIndex);
});          


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Find siblings inside the same parent
      const siblings = [...entry.target.parentElement.children].filter(el =>
        el.classList.contains('fade-in-up')
      );

      siblings.forEach((el, i) => {
        setTimeout(() => el.classList.add('show'), i * 150); // stagger delay (150ms)
      });

      observer.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

const slider = document.getElementById("slider");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

leftBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
});
rightBtn.addEventListener("click", () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
});

function openMenu() {
  document.getElementById('menu').classList.add('active');
  document.getElementById('menu-overlay').classList.add('active');
}

function closeMenu() {
  document.getElementById('menu').classList.remove('active');
  document.getElementById('menu-overlay').classList.remove('active');
}

// Auto-close drawer when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.getElementById('menu-overlay').addEventListener('click', closeMenu);
});

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // Change slide every 3 seconds
  setInterval(nextSlide, 3000);
});