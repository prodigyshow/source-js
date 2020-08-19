const timer = (id, deadline) => {

    // Выдает время которое осталось
    const getTimeRemaining = (endtime) => {
        const time = Date.parse(endtime) - Date.parse(new Date()),         // разница времени в милисек
              seconds = Math.floor((time / 1000) % 60),
              minutes = Math.floor((time / 1000 / 60) % 60),
              hours = Math.floor((time / ( 1000 * 60 * 60 )) % 24),
              days = Math.floor((time / ( 1000 * 60 * 60 * 24 )));

              
        return {
            'total': time,
            'days': days,
            'hours' : hours,
            "minutes": minutes,
            'seconds': seconds
        };
    };

    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else return num;
    };


    // Помещаем на страницу
    const setClock = (selector, endtime) => {

        // находим все селекторы
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock();
              
              // функция апдейта времени
              function updateClock() {
                  const t = getTimeRemaining(endtime);

                  days.textContent = addZero(t.days);
                  hours.textContent = addZero(t.hours);
                  minutes.textContent = addZero(t.minutes);
                  seconds.textContent = addZero(t.seconds);

                  // если тотал время не больше 0
                  if (t.total <= 0 )  {
                    days.textContent = "00";
                    hours.textContent = "00";
                    minutes.textContent = "00";
                    seconds.textContent = "00";

                    // останавливаем и очищаем интервал
                    clearInterval(timeInterval);
                  }
              }
    };

    setClock(id, deadline);
};

export default timer;