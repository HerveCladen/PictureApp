window.onload = () => {
    let currentSlide = 0;
    const slides = document.getElementsByClassName("slide");
    const buttonPrevious = document.getElementById("previous").addEventListener("click", () => {
        previousSlide()
    });
    const buttonNext = document.getElementById("next").addEventListener("click", () => {
        nextSlide()
    });
    const buttonDelete = document.getElementById("deleteImage").addEventListener("click", () => {
        deleteImage()
    });

    let elementsArray = document.querySelectorAll(".preview-image");
    elementsArray.forEach(function (elem) {
        elem.addEventListener("click", function () {
            var src = elem.src.substring(elem.src.lastIndexOf("/"));
            var i = 0;
            Array.from(slides).forEach(e => {
                if (src == e.src.substring(e.src.lastIndexOf("/"))) {
                    currentSlide = i;
                }
                i++;
            });
            switchSlide();
        });
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

        let elementsArray = document.querySelectorAll(".preview-image");
        elementsArray.forEach(function (elem) {
            var src = elem.src.substring(elem.src.lastIndexOf("/"));
            if (src == slides[currentSlide].src.substring(slides[currentSlide].src.lastIndexOf("/"))) {
                elem.style.border = "2px solid #DDD";
            } else {
                elem.style.border = "none";
            }
        });
    }

    function deleteImage() {
        var p = slides[currentSlide].src;
        var s = p.substring(p.lastIndexOf('/') + 1);
        location.href = 'Home/DeleteImage?filename=' + s;
        
        currentSlide = 0;
        switchSlide();
    }
}