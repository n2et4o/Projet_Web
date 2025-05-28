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
