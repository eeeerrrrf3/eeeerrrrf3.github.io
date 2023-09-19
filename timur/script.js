function explodeBox() {
    var message = document.getElementById('message');
    var explosion = document.getElementById('explosion');
    var box = document.getElementById('box');

    message.innerHTML = 'Ты выбил: Халяву из Китая, сам летал(:';
    explosion.style.display = 'block';
    box.style.visibility = 'hidden';
}
