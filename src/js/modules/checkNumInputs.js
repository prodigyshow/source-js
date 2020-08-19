const checkNumInputs = (selector) => {

    const numInputs = document.querySelectorAll(selector);

        // Валидация
        numInputs.forEach(item => {
            item.addEventListener('input', () => {
                
                item.value = item.value.replace(/\D/, '');      // если находит не число заменяет пустой строкой
            });
        });
};

export default checkNumInputs;