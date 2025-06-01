document.addEventListener("DOMContentLoaded", () => {
  // === Carousel ===
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  window.changeSlide = function(step) {
    showSlide(currentSlide + step);
  }

  setInterval(() => changeSlide(1), 5000);

  // === Quiz QCM ===
  const startBtn = document.getElementById("start-btn");
  const quiz = document.getElementById("quiz");
  const validBtn = document.getElementById("valid-btn");
  const resultDiv = document.getElementById("result");

  if (startBtn && validBtn && quiz && resultDiv) {
    startBtn.addEventListener("click", () => {
      quiz.classList.remove("hidden");
      startBtn.classList.add("hidden");
    });

    validBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let score = 0;
      const reponses = {
        q1: "b",
        q2: "b",
        q3: "c"
      };

      for (let [key, goodAnswer] of Object.entries(reponses)) {
        const selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === goodAnswer) {
          score += 3;
        }
      }

      let message = "";
      if (score === 0) message = "Félicitations, vous êtes un pollueur certifié.";
      else if (score <= 4) message = "Vous y étiez presque… pollueur.";
      else if (score === 5) message = "Félicitations, vous savez lire.";
      else if (score <= 9) message = "Merci pour votre dévouement pour notre planète !";
      else message = "Vous êtes un véritable ambassadeur de l'écologie !";

      resultDiv.innerHTML = `<strong>Score :</strong> ${score}/10<br>${message}`;
      launchConfetti();
    });
  }

  function launchConfetti() {
    const duration = 1000;
    const end = Date.now() + duration;
    const canvas = document.getElementById('confetti-canvas');
    const confetti = window.confetti.create(canvas, { resize: true, useWorker: true });

    (function frame() {
      confetti({ particleCount: 7, angle: 90, spread: 100, origin: { y: 0.6 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  // === Jeu Trouve l'intrus ==============================================================
  const questions = [
    {
      texte: "Laquelle de ces sources d’énergie est NON renouvelable ?",
      propositions: ["Solaire", "Charbon", "Éolienne", "Hydraulique"],
      intrus: "Charbon"
    },
    {
      texte: "Quel intrus consomme une ressource fossile ?",
      propositions: ["Gaz naturel", "Géothermie", "Solaire", "Éolienne"],
      intrus: "Gaz naturel"
    },
    {
      texte: "Laquelle de ces options ne produit PAS d’électricité ?",
      propositions: ["Éolienne", "Panneau solaire", "Chauffage au bois", "Barrage hydraulique"],
      intrus: "Chauffage au bois"
    },
    {
      texte: "Laquelle de ces solutions est la moins écologique ?",
      propositions: ["Bicyclette", "Covoiturage", "Voiture diesel", "Transports en commun"],
      intrus: "Voiture diesel"
    },
    {
      texte: "Quel mode de transport est le plus polluant ?",
      propositions: ["Avion", "Train électrique", "Tramway", "Vélo"],
      intrus: "Avion"
    }
  ];

  let indiceQuestion = 0;
  let score = 0;
  const zoneTexte = document.getElementById("intrus-question");
  const zoneBoutons = document.getElementById("intrus-options");
  const zoneResultat = document.getElementById("intrus-result");
  const zoneScore = document.getElementById("intrus-score");

  function melanger(liste) {
    return liste.sort(() => Math.random() - 0.5);
  }

  function afficherQuestion() {
    if (!zoneTexte || !zoneBoutons || !zoneResultat) return;

    zoneResultat.textContent = "";
    const question = questions[indiceQuestion];
    zoneTexte.textContent = question.texte;
    zoneBoutons.innerHTML = "";

    const choixMelanges = melanger([...question.propositions]);

    choixMelanges.forEach((texte) => {
      const bouton = document.createElement("button");
      bouton.textContent = texte;
      bouton.className = "intrus-btn";

      bouton.addEventListener("click", () => {
        if (texte === question.intrus) {
          score++;
          zoneResultat.textContent = "✅ Bravo, c'était l'intrus !";
          zoneResultat.style.color = "green";
        } else {
          zoneResultat.textContent = `❌ Mauvaise réponse. C'était "${question.intrus}".`;
          zoneResultat.style.color = "red";
        }

        setTimeout(() => {
          indiceQuestion++;
          if (indiceQuestion < questions.length) {
            afficherQuestion();
          } else {
            zoneTexte.textContent = "🎉 Tu as terminé toutes les questions !";
            zoneBoutons.innerHTML = "";
            zoneResultat.textContent = "";
            zoneScore.textContent = `Ton score : ${score} / ${questions.length}`;
            zoneScore.style.color = "blue";
            zoneScore.style.fontWeight = "bold";
          }
        }, 2000);
      });

      zoneBoutons.appendChild(bouton);
    });
  }

  afficherQuestion();



// === Jeu défi écologique  ==============================================================
  const listeDefis = [
  "Éteins la lumière en quittant une pièce.",
  "Prends une douche rapide de moins de 5 minutes.",
  "Débranche ton chargeur quand il ne sert pas.",
  "Utilise une gourde plutôt qu'une bouteille plastique.",
  "Fais un trajet à pied ou à vélo cette semaine.",
  "Trie correctement tes déchets aujourd’hui.",
  "Parle d’un geste écolo à quelqu’un autour de toi.",
  "Laisse ton ordinateur éteint pendant 24h.",
  "Remplace un repas industriel par du fait-maison.",
  "Écris une idée écolo et colle-la sur ton frigo !"
];

const boutonDefi = document.getElementById("btn-defi");
const messageDefi = document.getElementById("defi-message");

if (boutonDefi && messageDefi) {
  boutonDefi.addEventListener("click", () => {
    const index = Math.floor(Math.random() * listeDefis.length);
    messageDefi.textContent = "🌱 Défi du jour : " + listeDefis[index];
    messageDefi.style.color = "#2e7d32";
    messageDefi.style.fontWeight = "bold";
  });
}

});