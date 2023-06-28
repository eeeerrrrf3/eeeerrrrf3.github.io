function startRoulette() {
  var items = document.getElementById("items").getElementsByTagName("li");
  var spinButton = document.getElementById("spinButton");

  // Отключение кнопки крутить
  spinButton.disabled = true;

  // Генерация случайного числа для остановки рулетки
  var stopIndex = Math.floor(Math.random() * items.length);

  // Запуск анимации
  var currentIndex = 0;
  var interval = setInterval(function() {
    items[currentIndex].style.color = "black"; // Сброс цвета предыдущего элемента
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].style.color = "red"; // Выделение текущего элемента

    // Проверка на остановку рулетки
    if (currentIndex === stopIndex) {
      clearInterval(interval);
      spinButton.disabled = false; // Включение кнопки крутить
      alert("Выпал скин: " + items[currentIndex].innerHTML);
    }
  }, 1000); // Измените значение на 12000 для 12-секундной рулетки
}
