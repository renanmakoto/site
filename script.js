const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");
const themeButton = document.getElementById("theme-button");
const sections = document.querySelectorAll("section[id]");
const loader = document.getElementById("loader");
const skillItems = document.querySelectorAll(".skill-item");
const typedTextElement = document.querySelector(".typed-text");
const contactForm = document.getElementById("contact-form");

const typedStrings = [
  "Software Developer",
  "Full Stack Engineer",
  "JavaScript Expert",
  "React Native Developer",
  "Problem Solver"
];

let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentString = typedStrings[stringIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentString.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedTextElement.textContent = currentString.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentString.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    stringIndex = (stringIndex + 1) % typedStrings.length;
    typingSpeed = 500;
  }

  setTimeout(typeEffect, typingSpeed);
}

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.add("loaded");
    typeEffect();
    animateSkillsOnScroll();
  }, 1500);
});

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
});

document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("show-menu");
  }
});

function scrollHeader() {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active-link");
      } else {
        navLink.classList.remove("active-link");
      }
    }
  });
}

window.addEventListener("scroll", scrollActive);

function showScrollUp() {
  if (window.scrollY >= 400) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", showScrollUp);

scrollUp.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const darkTheme = "dark-theme";
const iconTheme = "fa-sun";
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

function animateSkillsOnScroll() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillItem = entry.target;
        const level = skillItem.getAttribute("data-level");
        skillItem.style.setProperty("--skill-level", `${level}%`);
        skillItem.classList.add("animate");
        observer.unobserve(skillItem);
      }
    });
  }, observerOptions);

  skillItems.forEach((item) => {
    observer.observe(item);
  });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".about-container, .skills-group, .services-card, .contact-card, .contact-form"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", revealOnScroll);

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const mailtoLink = `mailto:contactrenanmakoto@gmail.com?subject=${encodeURIComponent(
      subject || "Contact from Website"
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;

    contactForm.reset();
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  });
});

const serviceCards = document.querySelectorAll(".services-card");

serviceCards.forEach((card) => {
  card.addEventListener("touchstart", function () {
    this.querySelector(".services-card-inner").style.transform = "rotateY(180deg)";
  });

  card.addEventListener("touchend", function () {
    setTimeout(() => {
      this.querySelector(".services-card-inner").style.transform = "rotateY(0deg)";
    }, 3000);
  });
});

const inputs = document.querySelectorAll(".contact-input");

inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    if (this.value === "") {
      this.parentElement.classList.remove("focused");
    }
  });
});

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      scrollHeader();
      scrollActive();
      showScrollUp();
      ticking = false;
    });
    ticking = true;
  }
});
