window.onload = () => {
    let currentSlide = 0;
    const slides = document.getElementsByClassName("slide");
    const buttonPrevious = document.getElementById("previous").addEventListener("click", () => {
        previousSlide()
    });
    const buttonNext = document.getElementById("next").addEventListener("click", () => {
        nextSlide()
    });

    switchSlide();

    function previousSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        switchSlide();
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide > slides.length - 1) {
            currentSlide = 0;
        }
        switchSlide();
    }

    function switchSlide() {
        Array.from(slides).forEach(element => {
            element.style.display = "none"
        });
        slides[currentSlide].style.display = "inline-block";
    }
}