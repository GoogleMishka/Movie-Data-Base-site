/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        listFilms = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        inputForm = addForm.querySelector('.promo__interactive .add input[type="text"]'),
        checkbox = addForm.querySelector('[type=checkbox]');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const favourite = checkbox.checked;
        let movieName = inputForm.value;
        if (movieName) {
            if (movieName.length > 21) {
                movieName = `${movieName.substring(0,22)}...`;
            }
            movieDB.movies.push(movieName);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, listFilms);
        }
        e.target.reset();
        if (favourite) {
            console.log('Добовляем любимый фильм');
        }
    });

    const removeAdv = (arr) => {
        arr.forEach(item => item.remove());
    };

    const makeChanges = () => {
        poster.style.backgroundImage = 'url("img/bg.jpg")';
        genre.textContent = 'Драма';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    const createMovieList = (films, parent) => {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1 } ${film}
            <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                films.splice(i, 1);
                createMovieList(films, parent);          
            });
        });
    };

    removeAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, listFilms);
});