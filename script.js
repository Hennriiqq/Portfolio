// ---------- Typewriter no terminal do hero ----------
const linhas = [
  "cat trajetoria.log",
  "> Trabalhando Atualmente na Unimed Fortaleza",
  "> Estudante de ADS, UNINASSAU",
  "> Dev Web Júnior... [em progresso]"
];

const typedEl = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function digitar(linhaIndex = 0, charIndex = 0) {
  if (!typedEl) return;

  if (reduceMotion) {
    typedEl.textContent = linhas[linhas.length - 1];
    return;
  }

  if (linhaIndex >= linhas.length) {
    setTimeout(() => digitar(0, 0), 2500);
    typedEl.textContent = "";
    return;
  }

  const linhaAtual = linhas[linhaIndex];

  if (charIndex <= linhaAtual.length) {
    typedEl.textContent = linhaAtual.slice(0, charIndex);
    setTimeout(() => digitar(linhaIndex, charIndex + 1), 35);
  } else {
    setTimeout(() => digitar(linhaIndex + 1, 0), 900);
  }
}

digitar();

// ---------- Menu mobile ----------
const toggle = document.querySelector(".menu-toggle");
const tabsInner = document.querySelector(".tabs-inner");

if (toggle && tabsInner) {
  toggle.addEventListener("click", () => {
    const aberto = tabsInner.classList.toggle("open");
    toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
  });

  tabsInner.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      tabsInner.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------- Aba ativa conforme a seção visível ----------
const tabs = document.querySelectorAll(".tab");
const secoes = document.querySelectorAll("main .block");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tabs.forEach(tab => tab.classList.remove("active"));
        const tabCorrespondente = document.querySelector(`.tab[data-target="${entry.target.id}"]`);
        if (tabCorrespondente) tabCorrespondente.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

secoes.forEach(secao => observer.observe(secao));