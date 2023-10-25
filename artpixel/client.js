const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colorPalette = document.querySelector('.color-palette');

const ws = new WebSocket('ws://localhost:3000');

ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'DRAW') {
        draw(data.data);
    }
});

colors.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    colorDiv.style.backgroundColor = color;
    colorPalette.appendChild(colorDiv);
    colorDiv.addEventListener('click', () => {
        context.fillStyle = color;
        context.strokeStyle = color;
    });
});

let painting = false;

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

function startPosition() {
    painting = true;
    draw(event);
}

function endPosition() {
    painting = false;
    context.beginPath();
}

function draw(event) {
    if (!painting) return;

    context.lineWidth = 5;
    context.lineCap = 'round';

    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

    const data = {
        type: 'DRAW',
        data: {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
            color: context.fillStyle
        }
    };

    ws.send(JSON.stringify(data));
}

let saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveCanvas);

function saveCanvas() {
    var link = document.createElement('a');
    link.download = 'artwork.png';
    link.href = canvas.toDataURL()
    link.click();
}
