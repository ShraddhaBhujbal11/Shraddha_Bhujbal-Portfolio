(function () {
  "use strict";

  /* ---------------- Boot screen ---------------- */
  window.addEventListener("load", function () {
    var boot = document.getElementById("bootScreen");
    setTimeout(function () {
      if (boot) boot.classList.add("hidden");
    }, 550);
  });

  /* ---------------- Theme toggle (persisted) ---------------- */
  var root = document.documentElement;
  var themeToggles = document.querySelectorAll("[data-theme-toggle]");
  var THEME_KEY = "portfolio-theme";

  function getPreferredTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) { }
    // Design defaults to dark (the editor look); only switch to light if the
    // user explicitly toggles it, or has explicitly chosen light previously.
    return "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { }
  }

  applyTheme(getPreferredTheme());

  themeToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });

  /* ---------------- Mobile explorer toggle ---------------- */
  var explorerToggle = document.getElementById("explorerToggle");
  var explorer = document.getElementById("explorer");

  if (explorerToggle && explorer) {
    explorerToggle.addEventListener("click", function () {
      var isOpen = explorer.classList.toggle("open");
      explorerToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    explorer.querySelectorAll(".file-item").forEach(function (link) {
      link.addEventListener("click", function () {
        explorer.classList.remove("open");
        explorerToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Typing animation (hero) ---------------- */
  var typedEl = document.getElementById("typedText");
  var phrases = [
    "Full-Stack Developer",
    "AI / ML Engineer",
    "Building with BERT & Transformers",
    "MERN Stack Enthusiast"
  ];

  function typeLoop() {
    if (!typedEl) return;
    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(tick, 1500);
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }
  typeLoop();

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------------- Active file / tab highlighting on scroll ---------------- */
  var sections = document.querySelectorAll(".pane[id]");
  var fileLinks = document.querySelectorAll(".file-item");
  var tabEls = document.querySelectorAll(".tab");

  function setActive(id) {
    fileLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("data-file") === id);
    });
    tabEls.forEach(function (tab) {
      tab.classList.toggle("active", tab.getAttribute("data-tab") === id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Neural Network Background ---------------- */

  var canvas = document.getElementById("neural-network");

  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var mouse = {
      x: null,
      y: null
    };

    function resizeNeuralCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createNeuralParticles();
    }

    function createNeuralParticles() {
      particles = [];

      var count = Math.min(
        Math.floor((canvas.width * canvas.height) / 10000),
        120
      );

      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 1.8 + 1
        });
      }
    }

    function getNeuralColor() {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
    }

    function updateParticles() {
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= canvas.width) {
          p.vx *= -1;
        }

        if (p.y <= 0 || p.y >= canvas.height) {
          p.vy *= -1;
        }
      }
    }

    function drawConnections() {
      var maxDistance = 140;
      var color = getNeuralColor();

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;

          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            var opacity = 1 - distance / maxDistance;

            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = opacity * 0.3;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function drawNodes() {
      var color = getNeuralColor();

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.fill();

        /* Mouse interaction */
        if (mouse.x !== null) {
          var dx = p.x - mouse.x;
          var dy = p.y - mouse.y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.25;
            ctx.stroke();
          }
        }
      }
    }

    function animateNeuralNetwork() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateParticles();
      drawConnections();
      drawNodes();

      ctx.globalAlpha = 1;

      requestAnimationFrame(animateNeuralNetwork);
    }

    window.addEventListener("mousemove", function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener("mouseleave", function () {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener("resize", resizeNeuralCanvas);

    resizeNeuralCanvas();
    animateNeuralNetwork();
  }

})();
