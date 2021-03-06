﻿window.onload = () => {
    let currentSlide = 0;
    const slides = document.getElementsByClassName("slide");
    const buttonPrevious = document.getElementById("previous").addEventListener("click", () => {
        previousSlide()
    });
    const buttonNext = document.getElementById("next").addEventListener("click", () => {
        nextSlide()
    });
    const buttonDelete = document.getElementById("deleteImage").addEventListener("click", () => {
        getConfirmation()
    });
    const imageName = document.getElementById("image-name");

    let elementsArray = document.querySelectorAll(".preview-image");
    elementsArray.forEach(function (elem) {
        elem.addEventListener("click", function () {
            var src = elem.src.substring(elem.src.lastIndexOf("/")).replace(/\.[^/.]+$/, "");
            var i = 0;
            Array.from(slides).forEach(e => {
                if (src == e.src.substring(e.src.lastIndexOf("/")).replace(/\.[^/.]+$/, "")) {
                    currentSlide = i;
                }
                i++;
            });
            switchSlide();
        });
    });

    let gifsArray = document.querySelectorAll(".gif");
    gifsArray.forEach(function (elem) {
        elem.addEventListener("mouseover", function () {
            elem.src = "/Content/Images" + elem.src.substring(elem.src.lastIndexOf("/")).replace(/\.[^/.]+$/, ".") + "gif";
        });
    });
    gifsArray.forEach(function (elem) {
        elem.addEventListener("mouseout", function () {
            elem.src = "/Content/GifStatic" + elem.src.substring(elem.src.lastIndexOf("/")).replace(/\.[^/.]+$/, ".") + "jpg";            
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
            if (src.replace(/\.[^/.]+$/, "") == slides[currentSlide].src.substring(slides[currentSlide].src.lastIndexOf("/")).replace(/\.[^/.]+$/, "")) {
                elem.style.border = "2px solid #DDD";
                imageName.innerHTML = slides[currentSlide].src.substring(slides[currentSlide].src.lastIndexOf("/")).substring(1);
            } else {
                elem.style.border = "1px solid #EEE";                
            }
        });
    }

    function getConfirmation() {
        var retVal = confirm("Delete this picture?");
        if (retVal == true) {
            deletePicture();
            return true;
        } else {
            return false;
        }
    }

    function deletePicture() {
        var p = slides[currentSlide].src;
        var s = p.substring(p.lastIndexOf('/') + 1);
        location.href = 'Home/DeleteImage?filename=' + s;
        
        currentSlide = 0;
        switchSlide();
    }
}