const WHATSAPP_NUMBER = "242065746134";

const PROGRAMME = {
  vendredi: {
    label: "Vendredi — Ouverture",
    items: [
      {
        time: "18h00",
        title: "Ouverture des portes & vernissage lumière",
        desc: "Premières installations d'art lumineux dans l'allée centrale, cocktail de bienvenue.",
      },
      {
        time: "19h30",
        title: "Défilé Sape d'ouverture",
        desc: "Parade des Sapeurs invités, présentation des créateurs de la soirée.",
      },
      {
        time: "21h00",
        title: "Scène live — Rumba & Fusion",
        desc: "Premier concert de la soirée, scène principale en plein air.",
      },
      {
        time: "23h00",
        title: "DJ set nocturne",
        desc: "Set électro-afro sous les installations lumineuses jusqu'à minuit.",
      },
    ],
  },
  samedi: {
    label: "Samedi — Grand jour",
    items: [
      {
        time: "16h00",
        title: "Ouverture des portes",
        desc: "Accès libre aux stands, à la galerie Art Lumière et à la restauration.",
      },
      {
        time: "17h30",
        title: "Ateliers Sape",
        desc: "Rencontres avec des créateurs, conseils de style, démonstrations de tissus.",
      },
      {
        time: "20h00",
        title: "Grand concert",
        desc: "Tête d'affiche musique sur la scène principale.",
      },
      {
        time: "22h30",
        title: "Parade lumineuse",
        desc: "Déambulation costumée dans l'espace public, installations interactives.",
      },
    ],
  },
  dimanche: {
    label: "Dimanche — Clôture",
    items: [
      {
        time: "15h00",
        title: "Ouverture des portes",
        desc: "Journée familiale, entrée facilitée pour les plus jeunes.",
      },
      {
        time: "16h30",
        title: "Scène acoustique",
        desc: "Concerts en formats réduits, ambiance détendue.",
      },
      {
        time: "18h30",
        title: "Défilé de clôture",
        desc: "Dernier défilé Sape réunissant tous les créateurs du week-end.",
      },
      {
        time: "20h00",
        title: "Concert de clôture",
        desc: "Dernière scène live suivie d'un mot de remerciement du comité.",
      },
    ],
  },
};

const FAQ = [
  {
    q: "Y a-t-il un âge minimum pour entrer ?  ",
    a: "Le festival est accessible dès 12 ans. Les moins de 16 ans doivent être accompagnés d'un adulte le soir.",
  },
  {
    q: "Peut-on se restaurer sur place ?",
    a: "Oui, plusieurs stands de restauration locale et de boissons sont installés sur le site pendant les trois jours.",
  },
  {
    q: "Y a-t-il du parking ?",
    a: "Un parking gratuit est disponible à proximité immédiate de l'entrée principale, avec un service d'orientation les soirs de forte affluence.",
  },
  {
    q: "Le festival a-t-il lieu en intérieur ou en extérieur ?",
    a: "L'essentiel du festival se déroule en extérieur. En cas de pluie, les concerts et défilés sont maintenus sous les structures couvertes du site.",
  },
];

/* ---------- MENU ---------- */

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

function closeMenu() {
  primaryNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
}

menuToggle.addEventListener("click", function () {
  const isOpen = primaryNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fermer le menu" : "Ouvrir le menu",
  );
});

primaryNav.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

/* ---------- ---------- */

const OPENING_DATE = new Date("2026-09-25T18:00:00+01:00");

const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMinutes = document.getElementById("cd-minutes");
const cdSeconds = document.getElementById("cd-seconds");
const countdownCaption = document.getElementById("countdownCaption");

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const diff = OPENING_DATE - now;

  if (diff <= 0) {
    cdDays.textContent = "00";
    cdHours.textContent = "00";
    cdMinutes.textContent = "00";
    cdSeconds.textContent = "00";
    countdownCaption.textContent = "le festival a commencé — bonne fête !";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  cdDays.textContent = pad(days);
  cdHours.textContent = pad(hours);
  cdMinutes.textContent = pad(minutes);
  cdSeconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const tabPanels = document.getElementById("tabPanels");
const tabs = document.querySelectorAll(".tab");

function renderProgramme() {
  tabPanels.innerHTML = Object.keys(PROGRAMME)
    .map(function (day, index) {
      const data = PROGRAMME[day];
      const items = data.items
        .map(function (item) {
          return (
            '<li class="schedule-item">' +
            '<span class="schedule-time">' +
            item.time +
            "</span>" +
            "<div>" +
            '<p class="schedule-title">' +
            item.title +
            "</p>" +
            '<p class="schedule-desc">' +
            item.desc +
            "</p>" +
            "</div>" +
            "</li>"
          );
        })
        .join("");

      return (
        '<div class="day-panel' +
        (index === 0 ? " is-active" : "") +
        '" id="jour-' +
        day +
        '" role="tabpanel" aria-labelledby="tab-' +
        day +
        '">' +
        '<p class="day-heading">' +
        data.label +
        "</p>" +
        '<ul class="schedule">' +
        items +
        "</ul>" +
        "</div>"
      );
    })
    .join("");
}

function setActiveDay(day) {
  tabs.forEach(function (tab) {
    const isSelected = tab.dataset.day === day;
    tab.setAttribute("aria-selected", String(isSelected));
  });
  document.querySelectorAll(".day-panel").forEach(function (panel) {
    panel.classList.toggle("is-active", panel.id === "jour-" + day);
  });
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    setActiveDay(tab.dataset.day);
  });
});

renderProgramme();

// ---------- FILTRAGE ARTISTES/SAPEURS ----------
const filterButtons = document.querySelectorAll(".filter-btn");
const lineupCards = document.querySelectorAll(".artiste-carte");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filterValue = button.dataset.filter;

    // Retirer la classe active de tous les boutons
    filterButtons.forEach(function (btn) {
      btn.classList.remove("filter-active");
    });

    // Ajouter la classe active au bouton cliqué
    button.classList.add("filter-active");

    // Filtrer les cartes
    lineupCards.forEach(function (card) {
      if (filterValue === "tous") {
        card.style.display = "block";
      } else {
        const cardType = card.dataset.type;
        card.style.display = cardType === filterValue ? "block" : "none";
      }
    });
  });
});

// ---------- ----------
function lienWhatsapp(passName) {
  const message =
    "Bonjour, je souhaite réserver un Pass " +
    passName +
    " pour le Festival Sapé & Lumière";
  return (
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message)
  );
}

document.getElementById("wa-pass-1").href = lienWhatsapp("1 jour");
document.getElementById("wa-pass-3").href = lienWhatsapp("3 jours");

// --------------------------------------------------
const faqConteneur = document.getElementById("accordion");

faqConteneur.innerHTML = FAQ.map(function (question, index) {
  return (
    '<div class="accordion-item">' +
    '<button class="accordion-trigger" aria-expanded="false" aria-controls="faq-panel-' +
    index +
    '" id="faq-trigger-' +
    index +
    '">' +
    "<span>" +
    question.q +
    "</span>" +
    '<span class="accordion-icon" aria-hidden="true"></span>' +
    "</button>" +
    '<div class="accordion-panel" id="faq-panel-' +
    index +
    '" role="region" aria-labelledby="faq-trigger-' +
    index +
    '">' +
    "<p>" +
    question.a +
    "</p>" +
    "</div>" +
    "</div>"
  );
}).join("");

function fermerToutesLesQuestions() {
  const boutons = faqConteneur.querySelectorAll(".accordion-trigger");

  boutons.forEach(function (bouton) {
    bouton.setAttribute("aria-expanded", "false");

    const panneau = document.getElementById(
      bouton.getAttribute("aria-controls"),
    );
    if (panneau) {
      panneau.style.maxHeight = null;
    }
  });
}

function ouvrirQuestion(bouton) {
  const panneau = document.getElementById(bouton.getAttribute("aria-controls"));

  if (!panneau) return;

  const estOuvert = bouton.getAttribute("aria-expanded") === "true";

  fermerToutesLesQuestions();

  if (!estOuvert) {
    bouton.setAttribute("aria-expanded", "true");
    panneau.style.maxHeight = panneau.scrollHeight + "px";
  }
}

faqConteneur.querySelectorAll(".accordion-trigger").forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    ouvrirQuestion(bouton);
  });
});
// --------------------------------------------

const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

const champs = {
  name: {
    input: document.getElementById("f-name"),
    error: document.getElementById("err-name"),
    message: "Merci d'indiquer votre nom.",
  },
  phone: {
    input: document.getElementById("f-phone"),
    error: document.getElementById("err-phone"),
    message: "Merci d'indiquer un numéro de téléphone valide.",
  },
  message: {
    input: document.getElementById("f-message"),
    error: document.getElementById("err-message"),
    message: "Merci d'écrire votre message.",
  },
};

function validatePhone(value) {
  const digits = value.replace(/[\s.-]/g, "");
  return /^\+?\d{6,15}$/.test(digits);
}

function champValidation(key) {
  const champ = champs[key];
  const value = champ.input.value.trim();
  let valid = true;

  if (value === "") {
    valid = false;
  } else if (key === "phone" && !validatePhone(value)) {
    valid = false;
  }

  champ.input.closest(".champ").classList.toggle("has-error", !valid);
  champ.error.textContent = valid ? "" : champ.message;
  return valid;
}

Object.keys(champs).forEach(function (key) {
  champs[key].input.addEventListener("blur", function () {
    champValidation(key);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  formSuccess.textContent = "";

  const results = Object.keys(champs).map(champValidation);
  const allValid = results.every(Boolean);

  if (allValid) {
    formSuccess.textContent =
      "Merci, votre message a bien été enregistré. Nous vous répondrons rapidement.";
    form.reset();
  } else {
    formSuccess.textContent = "";
    const firstInvalid = Object.keys(champs).find(function (key) {
      return champs[key].input
        .closest(".champ")
        .classList.contains("has-error");
    });
    if (firstInvalid) champs[firstInvalid].input.focus();
  }
});
