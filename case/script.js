// Загрузка сохраненных данных из куков
function loadSavedData() {
    var money = getCookie("money");
    if (money) {
        money = parseInt(money);
        updateMoney(money);
    }
    
    var items = getCookie("items");
    if (items) {
        items
