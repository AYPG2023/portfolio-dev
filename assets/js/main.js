"use strict";

/**
 * Contenido editable del portafolio. Sustituye los # cuando existan enlaces públicos.
 * El CV puede configurarse con una ruta local, por ejemplo: assets/docs/Anderson-Perdomo-CV.pdf
 */
const PORTFOLIO = {
  cvUrl: "#",
  linkedinUrl: "#",
  whatsappUrl: "#",
  technologies: [
    {
      group: "Backend",
      items: [
        { name: "Laravel", iconClass: "devicon-laravel-original", level: "advanced" },
        { name: "PHP", iconClass: "devicon-php-plain", level: "advanced" },
        { name: "REST APIs", fallback: "API", level: "advanced" },
        { name: ".NET", iconClass: "devicon-dot-net-plain", level: "intermediate" },
        { name: "C#", iconClass: "devicon-csharp-plain", level: "intermediate" },
        { name: "Python", iconClass: "devicon-python-plain", level: "intermediate" }
      ]
    },
    {
      group: "Frontend",
      items: [
        { name: "Tailwind CSS", fallback: "TW", level: "advanced" },
        { name: "Angular", iconClass: "devicon-angularjs-plain", level: "intermediate" },
        { name: "JavaScript", iconClass: "devicon-javascript-plain", level: "intermediate" },
        { name: "TypeScript", iconClass: "devicon-typescript-plain", level: "intermediate" },
        { name: "React", iconClass: "devicon-react-original", level: "basic" },
        { name: "React Native", iconClass: "devicon-react-original", level: "basic" }
      ]
    },
    {
      group: "Databases",
      items: [
        { name: "MySQL", iconClass: "devicon-mysql-original", level: "advanced" },
        { name: "SQL Server", iconClass: "devicon-microsoftsqlserver-plain", level: "intermediate" },
        { name: "PostgreSQL", iconClass: "devicon-postgresql-plain", level: "intermediate" }
      ]
    },
    {
      group: "Infrastructure",
      items: [
        { name: "Git / GitHub", iconClass: "devicon-git-plain", level: "advanced" },
        { name: "Ubuntu Server", iconClass: "devicon-ubuntu-plain", level: "intermediate" },
        { name: "Fortinet / FortiGate", fallback: "FG", level: "intermediate" },
        { name: "Active Directory", fallback: "AD", level: "intermediate" },
        { name: "Docker", iconClass: "devicon-docker-plain", level: "basic" }
      ]
    }
  ],
  projects: [
    { title: "Sistema de Cobros", category: "Gobierno", description: "Sistema integral para gestión de cuentas, pagos, cortes mensuales, estados de cuenta y reportes financieros.", technologies: ["Laravel", "Livewire", "MySQL"], imageUrl: "assets/img/project/sistema_cobro.png", demoUrl: "#", codeUrl: "#" },
    { title: "Gestor de Expedientes", category: "Gobierno", description: "Plataforma para gestión digital de expedientes, flujos de aprobación, seguimiento y control documental.", technologies: ["Laravel", "Livewire", "MySQL"], imageUrl: "assets/img/project/gestor_expedientes.png", demoUrl: "#", codeUrl: "#" },
    { title: "Sistema de Almacén", category: "Gobierno", description: "Sistema para control de inventario, productos, solicitudes, aprobaciones y movimientos de almacén.", technologies: ["Laravel", "Livewire", "MySQL"], imageUrl: "assets/img/project/almacen.png", demoUrl: "#", codeUrl: "#" },
    { title: "SIIAI", category: "Gobierno", description: "Sistema de información y análisis territorial con mapas interactivos, capas geoespaciales y visualización de datos.", technologies: ["Laravel", "Leaflet", "GeoJSON"], imageUrl: "assets/img/project/siiai.png", demoUrl: "#", codeUrl: "#" },
    { title: "FortuCréditos", category: "Empresarial", description: "Plataforma financiera para gestión de créditos, clientes, pagos y reportes administrativos.", technologies: ["PHP", "MySQL", "Tailwind", "React"], imageUrl: "assets/img/project/fortucreditos.png", demoUrl: "#", codeUrl: "#" },
    { title: "app-backend-rutas-v1", category: "API", description: "Servicio backend para consultas, integraciones y administración de datos basados en rutas comerciales.", technologies: ["Laravel", "FastAPI", "MySQL", "Flutter"], imageUrl: "assets/img/project/app-backend-rutas.png", demoUrl: "#", codeUrl: "#" },
    { title: "DevSysGt", category: "Web", description: "Sitio web corporativo para servicios tecnológicos, desarrollo web, sistemas empresariales y soluciones digitales.", technologies: ["Laravel", "Tailwind CSS", "JavaScript"], imageUrl: "assets/img/project/devsysgt.png", demoUrl: "#", codeUrl: "#" },
    { title: "Otros proyectos", category: "Portfolio", description: "Otros sistemas empresariales, APIs, automatización, landing pages y herramientas personalizadas.", technologies: [".NET", "Angular", "SQL Server"], imageUrl: "assets/img/project/otros_proyectos.png", demoUrl: "#", codeUrl: "#" }
  ]
};

const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
})[char]);

function renderTechnologies() {
  const grid = qs("#tech-grid");
  const renderIcon = (tech) => tech.iconClass
    ? `<i class="${escapeHtml(tech.iconClass)}" aria-hidden="true"></i>`
    : `<span aria-hidden="true">${escapeHtml(tech.fallback || tech.name.slice(0, 2))}</span>`;
  const levelProgress = { advanced: 92, intermediate: 68, basic: 42 };
  const levelLabels = { advanced: "Avanzado", intermediate: "Intermedio", basic: "Básico" };

  grid.innerHTML = `
    <div class="tech-dashboard-grid">
      ${PORTFOLIO.technologies.map((group) => `
        <article class="tech-group">
          <h3>${escapeHtml(group.group)}</h3>
          <div class="tech-skill-list">
            ${group.items.map((tech) => `
              <article class="tech-card" style="--skill-progress:${levelProgress[tech.level] || 50}%">
                <div class="tech-card__top">
                  <span class="icon">${renderIcon(tech)}</span>
                  <span class="skill-level skill-level--${escapeHtml(tech.level)}">${escapeHtml(levelLabels[tech.level] || tech.level)}</span>
                </div>
                <strong>${escapeHtml(tech.name)}</strong>
                <div class="skill-meter" aria-hidden="true"><span></span></div>
              </article>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function projectLink(url, label, icon) {
  const disabled = !url || url === "#";
  if (disabled) return "";
  return `<a class="project-action" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}">${escapeHtml(icon)} ${escapeHtml(label)}</a>`;
}

function renderProjects() {
  const grid = qs("#projects-grid");
  grid.innerHTML = PORTFOLIO.projects.map((project, index) => `
    <article class="project-card project-animate">
      <div class="project-image" role="img" aria-label="Captura de pantalla de ${escapeHtml(project.title)}">
        <div class="project-browser-bar">
          <span class="project-browser-lights" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="project-address">${escapeHtml(project.title.toLowerCase().replace(/\s+/g, "-"))}</span>
        </div>
        <img src="${escapeHtml(project.imageUrl)}" alt="Captura del proyecto ${escapeHtml(project.title)}" loading="lazy" decoding="async">
      </div>
      <div class="project-content">
        <span class="project-number">PROJECT_${String(index + 1).padStart(2, "0")}</span>
        <div class="project-title-row">
          <h3>${escapeHtml(project.title)}</h3>
          <span class="project-category">${escapeHtml(project.category)}</span>
        </div>
        <p>${escapeHtml(project.description)}</p>
        <div class="tech-tags">${project.technologies.map((tech) => `<span class="tech-badge">${escapeHtml(tech)}</span>`).join("")}</div>
        <div class="project-actions">${projectLink(project.demoUrl, "Demo", "↗")}${projectLink(project.codeUrl, "GitHub", "⌘")}</div>
      </div>
    </article>
  `).join("");
}

function setupNavigation() {
  const header = qs("#site-header");
  const toggle = qs("#menu-toggle");
  const menu = qs("#mobile-menu");
  const backToTop = qs("#back-to-top");
  const links = qsa('.nav-link, .mobile-link');

  const closeMenu = () => {
    toggle.classList.remove("open");
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    menu.setAttribute("aria-hidden", "true");
  };

  toggle.addEventListener("click", () => {
    const opening = !menu.classList.contains("open");
    toggle.classList.toggle("open", opening);
    menu.classList.toggle("open", opening);
    toggle.setAttribute("aria-expanded", String(opening));
    toggle.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
    menu.setAttribute("aria-hidden", String(!opening));
    if (opening) qs(".mobile-link", menu)?.focus();
  });

  links.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menu.classList.contains("open")) return;
    closeMenu();
    toggle.focus();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
  }, { passive: true });

  const handleScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    backToTop.classList.toggle("visible", window.scrollY > 650);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));

  const sections = qsa("main section[id]");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

function setupRevealAnimations() {
  const items = qsa(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      instance.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -40px" });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 6, 3) * 55}ms`;
    observer.observe(item);
  });
}

function setupProjectAnimations() {
  const cards = qsa(".project-animate");
  if (!cards.length) return;

  if (reducedMotion) {
    cards.forEach((card) => card.classList.add("visible"));
    return;
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.fromTo(cards,
      { autoAlpha: 0, y: 34, scale: .96 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: .75,
        ease: "power3.out",
        stagger: .11,
        scrollTrigger: {
          trigger: "#projects-grid",
          start: "top 78%",
          once: true
        },
        onComplete: () => {
          cards.forEach((card) => card.classList.add("visible"));
          window.gsap.set(cards, { clearProps: "all" });
        }
      }
    );
    return;
  }

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      instance.unobserve(entry.target);
    });
  }, { threshold: .18, rootMargin: "0px 0px -40px" });

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${Math.min(index, 7) * 75}ms`;
    observer.observe(card);
  });
}

function setupCounters() {
  const counters = qsa("[data-counter]");
  if (!counters.length) return;

  const animate = (element) => {
    const target = Number(element.dataset.counter);
    if (reducedMotion) { element.textContent = target; return; }
    const duration = 1100;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => {
    if (entry.isIntersecting) { animate(entry.target); instance.unobserve(entry.target); }
  }), { threshold: .6 });
  counters.forEach((counter) => observer.observe(counter));
}

function showToast(message) {
  const toast = qs("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
}

function setupConfigurableLinks() {
  const cv = qs("#cv-link");
  cv.href = PORTFOLIO.cvUrl;
  if (PORTFOLIO.cvUrl === "#") cv.removeAttribute("download");

  const socialMap = { linkedin: PORTFOLIO.linkedinUrl, whatsapp: PORTFOLIO.whatsappUrl };
  qsa("[data-social]").forEach((link) => { link.href = socialMap[link.dataset.social] || "#"; });

  document.addEventListener("click", (event) => {
    const placeholder = event.target.closest('[data-placeholder-link], #cv-link, [data-social]');
    if (!placeholder || placeholder.getAttribute("href") !== "#") return;
    event.preventDefault();
    showToast("Enlace pendiente de configurar en assets/js/main.js");
  });
}

function setupParticles() {
  const canvas = qs("#particle-canvas");
  if (!canvas || reducedMotion) return;
  const context = canvas.getContext("2d");
  let particles = [];
  let animationFrame;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(45, Math.floor(window.innerWidth / 28));
    particles = Array.from({ length: count }, () => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, radius: Math.random() * 1.2 + .3, speed: Math.random() * .18 + .06, opacity: Math.random() * .35 + .1 }));
  };

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.y -= particle.speed;
      if (particle.y < -3) { particle.y = window.innerHeight + 3; particle.x = Math.random() * window.innerWidth; }
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(103,232,249,${particle.opacity})`;
      context.fill();
    });
    animationFrame = requestAnimationFrame(draw);
  };

  let resizeTimer;
  window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(animationFrame);
    if (!document.hidden) draw();
  });
  resize();
  draw();
}

function setupHeroCodeTyping() {
  const code = qs("#hero-code");
  if (!code) return;

  const source = code.dataset.code || "";
  const highlight = (value) => escapeHtml(value)
    .replace(/\b(const)\b/g, '<span class="code-token-keyword">$1</span>')
    .replace(/\b(developer)\b/g, '<span class="code-token-name">$1</span>')
    .replace(/\b(name|role|focus|passion|stack)\b(?=:)/g, '<span class="code-token-key">$1</span>')
    .replace(/(&quot;[^&]*?&quot;)/g, '<span class="code-token-string">$1</span>');

  if (reducedMotion) {
    code.innerHTML = highlight(source);
    return;
  }

  let index = 0;
  const typeNext = () => {
    code.textContent = source.slice(0, index);
    index += 1;
    if (index <= source.length) {
      window.setTimeout(typeNext, index < 20 ? 18 : 11);
      return;
    }
    code.innerHTML = highlight(source);
  };

  window.setTimeout(typeNext, 420);
}

function setupAboutTerminal() {
  const code = qs("#about-code");
  const tabs = qsa("[data-about-tab]");
  if (!code || !tabs.length) return;

  const files = {
    perfil: `{
  "nombre": "Anderson Perdomo",
  "rol": "Full Stack Developer",
  "ubicacion": "Guatemala",
  "experiencia": "3+ años",
  "enfoque": [
    "Software escalable",
    "Infraestructura estable",
    "Seguridad y soporte técnico"
  ]
}`,
    stack: `type StackPrincipal = {
  backend: ["Laravel", ".NET", "Python"];
  frontend: ["Angular", "React", "Tailwind CSS"];
  datos: ["SQL Server", "MySQL", "PostgreSQL"];
  entregables: ["REST APIs", "Sistemas empresariales", "Reportes"];
  automatizacion: true;
};`,
    infra: `infraestructura:
  servidores:
    - Ubuntu Server
    - Windows Server
  redes_seguridad:
    firewall: Fortinet / FortiGate
    politicas: seguridad y acceso
    segmentacion: redes internas
    directorio: Active Directory
  despliegue:
    - hosting
    - cPanel
    - configuracion de servidores`
  };

  const highlight = (value) => escapeHtml(value)
    .replace(/\b(type|true)\b/g, '<span class="code-token-keyword">$1</span>')
    .replace(/\b(StackPrincipal|infraestructura|servidores|redes_seguridad|despliegue)\b/g, '<span class="code-token-name">$1</span>')
    .replace(/\b(nombre|rol|ubicacion|experiencia|enfoque|backend|frontend|datos|entregables|automatizacion|firewall|politicas|segmentacion|directorio)\b(?=[:])/g, '<span class="code-token-key">$1</span>')
    .replace(/(&quot;[^&]*?&quot;)/g, '<span class="code-token-string">$1</span>');

  let timer = 0;
  const render = (key, animate = true) => {
    const source = files[key] || files.perfil;
    window.clearTimeout(timer);

    if (reducedMotion || !animate) {
      code.innerHTML = highlight(source);
      return;
    }

    let index = 0;
    const typeNext = () => {
      code.textContent = source.slice(0, index);
      index += 1;
      if (index <= source.length) {
        timer = window.setTimeout(typeNext, index < 18 ? 16 : 7);
        return;
      }
      code.innerHTML = highlight(source);
    };
    typeNext();
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.aboutTab;
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      render(key);
    });
  });

  render("perfil", !reducedMotion);
}

function setupAboutParallax() {
  const section = qs("#sobre-mi");
  const lights = qsa("[data-about-light]", section);
  if (!section || !lights.length || reducedMotion) return;

  section.addEventListener("pointermove", (event) => {
    const rect = section.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
    lights.forEach((light, index) => {
      const depth = index === 0 ? 18 : -14;
      light.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
  }, { passive: true });

  section.addEventListener("pointerleave", () => {
    lights.forEach((light) => { light.style.transform = "translate3d(0, 0, 0)"; });
  }, { passive: true });
}

function setupHeroParallax() {
  const visual = qs(".hero-visual");
  const portrait = qs("[data-portrait]");
  if (!visual || !portrait || reducedMotion) return;
  const floatCards = qsa(".tech-float", visual);

  let raf = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const update = () => {
    currentX += (targetX - currentX) * .12;
    currentY += (targetY - currentY) * .12;

    portrait.style.transform = `translate3d(calc(-50% + ${currentX * 14}px), ${currentY * 10}px, 44px) rotate(${currentX * 3.2}deg)`;
    floatCards.forEach((card) => {
      const depth = Number(card.dataset.depth || .15);
      card.style.setProperty("--parallax-x", `${currentX * depth * 42}px`);
      card.style.setProperty("--parallax-y", `${currentY * depth * 42}px`);
    });

    if (Math.abs(targetX - currentX) > .001 || Math.abs(targetY - currentY) > .001) {
      raf = requestAnimationFrame(update);
    } else {
      raf = 0;
    }
  };

  const queueUpdate = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  visual.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - .5) * 2;
    targetY = ((event.clientY - rect.top) / rect.height - .5) * 2;
    queueUpdate();
  }, { passive: true });

  visual.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    queueUpdate();
  }, { passive: true });
}

function init() {
  renderTechnologies();
  renderProjects();
  qs("#current-year").textContent = new Date().getFullYear();
  setupNavigation();
  setupConfigurableLinks();
  setupRevealAnimations();
  setupProjectAnimations();
  setupCounters();
  setupParticles();
  setupHeroCodeTyping();
  setupAboutTerminal();
  setupAboutParallax();
  setupHeroParallax();
}

document.addEventListener("DOMContentLoaded", init);
