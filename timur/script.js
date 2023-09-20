function explodeBox() {
    var message = document.getElementById('message');
    var explosion = document.getElementById('explosion');
    var box = document.getElementById('box');

    message.innerHTML = 'Открой коробку и забери приз(:';
    explosion.style.display = 'block';
    box.style.visibility = 'hidden';
}
