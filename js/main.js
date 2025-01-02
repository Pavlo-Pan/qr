// Получаем элементы из DOM
const wrapper = document.querySelector('.wrapper'), // Обертка
    form = wrapper.querySelector('.form'),         // Форма
    input = wrapper.querySelector('.form input'),  // Поле ввода
    btn = wrapper.querySelector('.form button'),   // Кнопка
    img = wrapper.querySelector('.qr-code img');   // Изображение QR-кода

let currentValueInput; // Переменная для хранения текущего значения ввода

// Обработчик события отправки формы
form.addEventListener('submit', event => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
    const inputValue = input.value.trim(); // Получаем и очищаем значение ввода
    if (!inputValue || inputValue === currentValueInput) // Проверяем, пустое ли значение или совпадает с предыдущим
        return; // Если да, выходим из функции
    currentValueInput = inputValue; // Обновляем текущее значение ввода

    btn.textContent = "Идет создание QR-кода..."; // Меняем текст кнопки на индикатор процесса
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`; // Устанавливаем источник изображения для генерации QR-кода

    // Обработчик события загрузки изображения
    img.addEventListener("load", () => {
        wrapper.classList.add("active"); // Добавляем класс 'active' к обертке
        btn.textContent = "Сгенерировать QR-код"; // Возвращаем исходный текст кнопки
    });

    // Обработчик ошибки загрузки изображения
    img.addEventListener("error", () => {
        alert("Ошибка при загрузке QR-кода. Пожалуйста, попробуйте еще раз."); // Выводим сообщение об ошибке
        location.reload(); // Перезагружаем страницу
    });
});

// Обработчик события ввода в поле
input.addEventListener('input', function() {
    if (!this.value.trim() && wrapper.classList.contains("active")) {
        wrapper.classList.remove("active"); // Убираем класс 'active' при очистке поля ввода
    }
});
