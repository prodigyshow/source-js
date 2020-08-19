const forms = () => {
    
    // Получаем все формы и инпуты
    const form = document.querySelectorAll('form'),             
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]'); 

    // Валидация
    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            
            item.value = item.value.replace(/\D/, '');      // если находит не число заменяет пустой строкой
        });
    });

    // Объект для вывода сообщения о процессе
    const message = {
        loading: 'Загрузка...', 
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // Функция отправки запроса
    const postData = async (url, data) => {                                     // с помощью есинк джс узнает о ассинхронной операции
        document.querySelector('.status').textContent = message.loading;        // находим наш блок и добавляем сообщение 
        // ассинхроная операция отправки
        let res = await fetch(url, {                                            // с помощью евейт джс ждет окончания отправки запроса и получаем результат в res
            method: 'POST',
            body: data
        });

        return await res.text();                //промис
    };  

    //очистка всех инпутов
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    // Для каждой формы
    form.forEach(item => {

        item.addEventListener('submit', (e) => {
            e.preventDefault();                 //Отменяем перезагрузку страницы

            // Создаем блок для сообщения
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');                  // Добавляем класс блоку
            item.appendChild(statusMessage);                        // Помещаем блок на страницу в конец формы

            const formData = new FormData(item);                    // Собираем все данные в форме с помощью FormData()

            // Цепочка операции отправки
            postData('assets/server.php', formData)
                    .then(res => {                                   // при результате
                        console.log(res);
                        statusMessage.textContent = message.success;       // вывод успеха
                    })
                    .catch(() => {                                         // отлавливаем ошибку
                        statusMessage.textContent = message.failure;        // вывод ошибки
                    })
                    .finally(() => {                                        // выполнится в любом случае результата промиса
                        clearInputs();                                      // очистка всех инпутов
                        setTimeout(() => {                                  // удаляем созданный блок через некоторое время
                            statusMessage.remove();
                        }, 5000);
                    });
        });

    } );
};

export default forms;