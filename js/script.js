document.addEventListener("DOMContentLoaded", () => {
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

    // Optionnel : défilement automatique
    setInterval(() => changeSlide(1), 5000);
});

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const quiz = document.getElementById("quiz");
  const validBtn = document.getElementById("valid-btn");
  const resultDiv = document.getElementById("result");

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

    if (score === 0) {
      message = "Félicitations, vous êtes un pollueur certifié.";
    } else if (score >= 1 && score <= 4) {
      message = "Vous y étiez presque… pollueur.";
    } else if (score === 5) {
      message = "Félicitations, vous savez lire.";
    } else if (score >= 6 && score <= 9) {
      message = "Merci pour votre dévouement pour notre planète !";
    } else if (score === 10) {
      message = "Vous êtes un véritable ambassadeur de l'écologie !";
    }

    resultDiv.innerHTML = `<strong>Score :</strong> ${score}/10<br>${message}`;
    launchConfetti();
  });

    function launchConfetti() {
    const duration = 10 * 10; // 10 secondes
    const end = Date.now() + duration;
    const canvas = document.getElementById('confetti-canvas');
    const confetti = window.confetti.create(canvas, {
        resize: true,
        useWorker: true
    });

    (function frame() {
        confetti({
        particleCount: 7,
        angle: 90,
        spread: 100,
        origin: { y: 0.6 }
        });
        if (Date.now() < end) {
        requestAnimationFrame(frame);
        }
    })();
    }
});



