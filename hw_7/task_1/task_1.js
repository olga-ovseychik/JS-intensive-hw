const btn = document.querySelector('#btn');

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function setCoordinates(element) {
    const clientWidth = document.documentElement.clientWidth-50;
    const clientHeight = document.documentElement.clientHeight-50;
    const xPos = getRandomValue(50, clientWidth);
    const yPos = getRandomValue(50, clientHeight);

    element.style.position = "absolute";
    element.style.left = `${xPos}px`;
    element.style.top = `${yPos}px`;
}

btn.addEventListener('click', function onClick(event) {
    setCoordinates(event.target);
});

btn.addEventListener('mouseover', function onMouseOver(event) {
    if (Math.random() < 0.5) {
        setCoordinates(event.target);
    }
});