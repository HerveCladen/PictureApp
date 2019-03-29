var button = document.getElementById('slide');
button.onclick = function () {
    var container = document.getElementById('preview-images');
    scroll(container, 'up', 25, 100, 10);
};

var back = document.getElementById('slideBack');
back.onclick = function () {
    var container = document.getElementById('preview-images');
    scroll(container, 'down', 25, 100, 10);
};

function scroll(element, direction, speed, distance, step) {
    scrollAmount = 0;
    var slideTimer = setInterval(function () {
        if (direction == 'down') {
            element.scrollTop -= step;
        } else {
            element.scrollTop += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }
    }, speed);
}

function scrolled(o) {
    if (o.offsetHeight + o.scrollTop == o.scrollHeight) {
        document.getElementById("slide").classList.add("preview-scrolled");
    } else {
        document.getElementById("slide").classList.remove("preview-scrolled");
    }
    if (o.scrollTop <= 0) {
        document.getElementById("slideBack").classList.add("preview-scrolled");
    } else {
        document.getElementById("slideBack").classList.remove("preview-scrolled");
    }
}