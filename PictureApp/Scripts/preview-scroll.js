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

var container = document.getElementById('preview-images');
container.onwheel = function () {

}