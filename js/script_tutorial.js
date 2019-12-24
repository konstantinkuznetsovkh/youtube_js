const switcher = document.querySelector('#cbx'),
    more = document.querySelector('.more'),
    modal = document.querySelector('.modal'),
    videos = document.querySelectorAll('.videos__item'),
    videosWrapper = document.querySelector('.videos__wrapper');
// если мы пишем querySelector то мы получаем первый параметр подходящий нам в вёрстке с начала
let player;

// function calc(a, b) {
//     return a + b;
// }
//
// console.log(calc(4, 5));
// alert("Hello Word");

function bindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };

    const box = document.querySelector(boxBody),
        boxContent = document.querySelector(content);

    button.element.addEventListener('click', () => {
        //функция обратного вызова callback происходит тогда когда произвели какое-то действие
        if (button.active === false) {
            // проверяем меню на неактивность.
            button.active = true; //  если она не активна включаем ее!
            // один знак равенства так как мы устанавливаем
            box.style.height = boxContent.clientHeight + 'px';
            box.classList.add(openClass); // активный класс для меню
        } else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
        // button.active = !button.active;
    });
}

bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() {
    if (night === false) {
        night = true;
        document.body.classList.add('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = "#fff";
        }); //forEach пройдётся по каждому элементу как метот for
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = "#fff";
        });
        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = "#fff";
        });
        document.querySelector('.header__item-descr').style.color = '#fff';
        document.querySelector('.logo>img').src = './logo/youtube_night.svg';
    } else {
        night = false;
        document.body.classList.remove('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = "#000";
        });
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = "#000";
        });
        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = "#000";
        });
        document.querySelector('.header__item-descr').style.color = '#000';
        document.querySelector('.logo>img').src = './logo/youtube.svg';
    }
}

let night = false;
switcher.addEventListener('change', () => {
    //у инпута есть такое свойиство как change когда он изменяется
    switchMode();
}); // этой фунцией мы говорим джавва скрипту чтоб он отслеживал состояние этой кнопки и запускал эту фунцию
//switchMode()

// const data = [
//     ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
//     ['#3 вёрстка на flexbox CSS | Блок преимущества и галерея | Марафон вёрстки | Артем Исламов',
//         '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки урок 2',
//         '#1 Вёрстка реального заказа Landing Page | Марафон вёрстки | артём Исламов'
//     ],
//     ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
//     ['X9SmcY3LM-U', '7BvHoh0BrMw', 'mC8Jw_aG2EM']
// ];


// more.addEventListener('click', () => {
//     const videosWrapper = document.querySelector('.videos__wrapper');
//     more.remove();
//     //    this не работает в стрелочных функциях this.remove();
//     let time = 500;
//     for (let i = 0; i < data[0].length; i++) {
//         let card = document.createElement('a'); //создаём элемент
//         card.classList.add('videos__item', 'videos__item-active');
//         card.setAttribute('data-url', data[3][i]); //число 3 это строка в массиве. мы берем от туда каждый по счёту url
//         card.innerHTML = `
//                             <img src="${data[0][i]}" alt="thumb">
//                             <div class="videos__item-descr">
//                             ${data[1][i]}
//                             </div>
//                             <div class="videos__item-views">
//                             ${data[2][i]}
//                             </div>
//                         `; // косые ковычки-созданы для интерполяции - для того чтоб мы смогли в джаваскрипте во внутрь строк помещать переменные
//         videosWrapper.appendChild(card); //appendChild помещает элемент в конец другого элемента
//         setTimeout(() => {
//             card.classList.remove('videos__item-active');
//         }, time);
//         time = time + 500; // увеличивается по прохождению +500мс

//             if(night === true){
//                 card.querySelector('.videos__item-descr').style.color="#fff";
//                 card.querySelector('.videos__item-views').style.color="#fff";
//             } ;
//         bindNewModal(card);
//     }
//     sliceTitle('.videos__item-descr', 100);


// });
// start google  api for youtube////////////

//создаём функцию которая будет загружать данные с ютуба
function load() {
    gapi.client.init({ //во внутрь мы помещаем обьект ({})
        'apiKey': 'AIzaSyDr6mhn4HuvdG2ls17KZPsAjnpSzzqN0mk', // подставляем наш реальный API key
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then(() => { //когда сервер вернул обещания  я выполняю функцию
        return gapi.client.youtube.playlistItems.list({ //https://developers.google.com/youtube/v3/docs/playlistItems/list?apix=true click see code samples -titorial и выбрать джс или полистать ниже - пример кода
            "part": "snippet,contentDetails", // просто инфа которая будет выводиться нам этого хватит.
            "maxResults": '17', //кол-во видосов
            // "playlistId": "PLnP4EuRGIgUGVyBXg7OFuN15NSIGnXLCV"//работает
            // "playListId":"PLAHYlR-JrIbJaZ78kqzOqIl5Z0Gk6jyH2"   //id плейлиста это часть которая начинается с PL
            // 'playlistId': 'PL3kOLBNL3lQjkx4n0ql5I3gL6vzvmF6QD'//работает
            // 'playlistId': 'PL3LQJkGQtzc4gsrFkm4MjWhTXhopsMgpv'//работает
            'playlistId': 'PLAHYlR-JrIbJaZ78kqzOqIl5Z0Gk6jyH2' //работает 
            // у видео и плейлистов есть свои настройки которые задаются владельцем

        }); //https://developers.google.com/youtube/v3/getting-started  посмотреть что вообще умеет эта апи Resources and resource types - это всё иформация с которой мы можем работать  но смотрим справоник о функциях этого апи
    }).then((response) => {
        console.log(response.result); // говорим что результат нашего запроса нужен а е техническая инфа лишняя    

        response.result.items.forEach(item => {
            let card = document.createElement('a'); //создаём элемент
            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.contentDetails.videoId); //число 3 это строка в массиве. мы берем от туда каждый по счёту url
            card.innerHTML = `
                                        <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                                        <div class="videos__item-descr">
                                        ${item.snippet.title}
                                        </div>
                                        <div class="videos__item-views">
                                        сколькото просмотров
                                        </div>
                                    `; // косые ковычки-созданы для интерполяции - для того чтоб мы смогли в джаваскрипте во внутрь строк помещать переменные
            videosWrapper.appendChild(card); //appendChild помещает элемент в конец другого элемента

            let time = +500; // увеличивается по прохождению +500мс
            setTimeout(() => {
                card.classList.remove('videos__item-active');
            }, time);
            if (night === true) {
                card.querySelector('.videos__item-descr').style.color = "#fff";
                card.querySelector('.videos__item-views').style.color = "#fff";
            }
        });
        sliceTitle('.videos__item-descr', 100);
        bindModal(document.querySelectorAll('.videos__item'));
    }).catch(e => {
        console.log(e); //если сервер не ответит в консоль выводим-ловит ошибки сервера
    });
    //запрос мы можем формировать из кусочков через ампесант &
}
more.addEventListener('click', () => {
    // more.remove(); //кнопку удалять не обязательно
    gapi.load('client', load); //создаю на клиенте запрос и во время этого будет запускаться функция лоад,этот метод сам запустит функцию-ему просто надо сказать какую функцию необходимо запустить
});
//промисы это обещания что чтото ктото комуто сделает к ютубу кчерез промисы обращаемся
//чтоб получить видосы playlistitems
// end google  api for youtube//////////////

//start search youtube////
//search and load можно обЪединить 
function search(target) {
    gapi.client.init({
        'apiKey': 'AIzaSyDr6mhn4HuvdG2ls17KZPsAjnpSzzqN0mk',
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
    }).then(() => {
        return gapi.client.youtube.search.list({
            'maxResults': '10',
            'part': 'snippet',
            'q': `${target}`,
            'type': ''
        });
    }).then((response) => {
        console.log(response.result);
        // videosWrapper.innerHTML = ''; // говорят что такой метод удаления не правильный -долго работает надо использовать цикл
        while (videosWrapper.firstChild) {
            videosWrapper.removeChild(videosWrapper.firstChild);
        } //одно из редких применений этого цикла
        response.result.items.forEach(item => {
            let card = document.createElement('a');
            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.id.videoId);
            card.innerHTML = `
                                <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                                <div class="videos__item-descr">
                                ${item.snippet.title}
                                </div>
                                <div class="videos__item-views">
                                сколькото просмотров
                                </div>
                            `;
            videosWrapper.appendChild(card);
            let time = +500;
            setTimeout(() => {
                card.classList.remove('videos__item-active');
            }, time);
            if (night === true) {
                card.querySelector('.videos__item-descr').style.color = "#fff";
                card.querySelector('.videos__item-views').style.color = "#fff";
            }
        });
        sliceTitle('.videos__item-descr', 100);
        bindModal(document.querySelectorAll('.videos__item'));
    })
    more.remove();
}
//подвязываем форму
document.querySelector('.search').addEventListener('submit', (e) => {
    e.preventDefault(); //чтоб страница не перезагружалась после нажатия на кнопку поиск-submit
    gapi.load('client', () => {// функция не вызывается сразу а только потом сама когда будет запрос это просто название которое просто существует
        search(document.querySelector('.search > input').value);
    });
    document.querySelector('.search > input').value = '';
});
//end search youtube//////


//обрезаем title
function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        item.textContent.trim(); //команда обрезания пробелов метод trim() отрезаем лишние пробелы 
        // textContent используется только когда нам необходимо взять только текст или дописать только текст
        if (item.textContent.length < count) {
            return; //если return ничего не возвращает то функция останавливается
        } else {
            const str = item.textContent.slice(0, count + 1) + "..."; //метод slice() преобразует нашу строку 0-начало а 101 это последний из 100символов
            item.textContent = str;
        }
    });
}
sliceTitle('.videos__item-descr', 100);

// start modal window//////////
// в модальное окно подставляем youtube плеер
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    player.stopVideo();
}

function bindModal(cards) { //эта функция получает массив карточек
    cards.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); //отменяем стандартное поведение браузера
            const id = item.getAttribute('data-url');
            //const каждый цикл создаёт новую переменную а старая удаляется сборщиком мусора, так как она не нужна
            loadVideo(id);
            openModal();
        });
    });
}
// bindModal(videos);

function bindNewModal(cards) { //эта функция получает одну карточку
    cards.addEventListener('click', (event) => {
        event.preventDefault();
        const id = cards.getAttribute('data-url');
        openModal();
    });
}
modal.addEventListener('click', (e) => { //если клик был не по телу modal
    //classList очень классное св-во которое позволяет нам работать со списком классов можем добавлять, удалять, проверять методом contains
    if (!e.target.classList.contains('modal__body')) { // если там где мы нажали нет (!) класса , так можно проверять всё- и атрибуты и айдишники селекторы
        //чтоб добавить несколько проверок !e.target.classList.contains('modal__body') && !e.target.classList.contains('modal__body') - && -это,  значит И ; ||- означает или
        closeModal();
    }
});
document.addEventListener('keydown', (e) => { //если была нажата кнопка esc   
    if (e.keyCode === 27) {
        closeModal();
    }
}); //не срабаывает после расширения экрана

// end modal window////////////
//start work with youtube iframe api ///////////
//iframe- это возможность вставлять кусочки сайта из другого сайта в сайт
// при помощи iframe youtube мы можем делать плееры на своей  стр https://developers.google.com/youtube/iframe_api_reference?hl=ru
function createVideo() { //создаем новый плеер
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(() => {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE'
        });
    }, 1111);

}
createVideo();

function loadVideo(id) {
    player.loadVideoById({
        'videoId': `${id}`
    });
    //loadVideoById из документации

}
//end work with youtube iframe api /////////////


// для post запросов LIveServer не подойдёт, а для GET подойдёт потомучто мы будем только получать данные из ютуба
//API набор каких-то значений какой-то информации и набор каких-то действий которые мы можем совершать-интерфейс программы с которой мы работаем
//погода-получить погоду по названию города, на след день, температуру в городе.
//карта- загруженность дорог, место здания
//ютую - загружать , останавливать, с датами   
//документация ютуб API https://developers.google.com/youtube/iframe_api_reference?hl=ru
//смысл в том чтоб не  создавать каждый раз плеер а один раз создать а потом подгружать его с новым ид
// alert("fffff");
//dataBase API это база данных всего что есть на ютубе и каналы и пользователи и плейлисты и видео и всё всё что есть на ютубе

//youtube Date API https://developers.google.com/youtube/v3/getting-started это более мощная вещь которая позволяет нам работать с разными языками программирования, позволяет получать все данные с ютуба которые есть в открытом доступе. - это маленькая часть большой API Google . API повсюду!!!чтоб работать с этой API нам необходим гугл акк. когда у нас уже есть акк мы должны сказать ютубу что у нас есть его айпи-получить ключ переходим на пункт 2 Create a project in the Google Developers Console теперь создаем проект под задачу, этот ключ необходим чтоб уникально взаимодействовать с ютубом, потом вкл апи и сервисы и выбираем Youtube Data API v3  и просто ВКЛЮЧИТЬ и появится аналитика. Теперь получаем API ключ. Есть вкладка Учетные данные-переходим  и еще раз учетные данные и создать ключ! AIzaSyDr6mhn4HuvdG2ls17KZPsAjnpSzzqN0mk Теерь пункт 5 на youtube Date API https://developers.google.com/youtube/v3/getting-started и выбираем свой язык переходим на documetation =>getting started =>подключаем <script src="https://apis.google.com/js/api.js"></script> и это апи для всего гугл окружения
// существует библиотеки которые встроееные в гугл  на основе нативного джс и позволяют работать быстрее с апи, можно и без библиотеки, но лучше сней. это 5 пункт client library
// ключ API только чтоб взять инфу для GET запросов
// Индентификатор клиента OAuth для того чтоб запостить к примеру видос с моб приложения-нужен и пароль и логин.
// myintensive22122019@gmail.com


//02.03.00