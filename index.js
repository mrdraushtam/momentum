const time = document.querySelector('.time');
    
function showTime () {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    getTimeOfDay();
    setTimeout(showTime, 1000);
}
showTime()

function showDate () {
    const dateSelector = document.querySelector('.date');
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    const currentDate = date.toLocaleDateString('en-Us', options);
    
    dateSelector.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let result;
    
    if (hours >= 6 && hours < 12) {
        result = "Morning"
    } else if (hours >= 12 && hours < 18) {
        result = "Afternoon"
    } else if (hours >=18 && hours < 24) {
        result = "Evening"
    } else if (hours >= 0 && hours < 6) {
        result = "Night"
    }
    
    return result;
}
getTimeOfDay()

const greetingSelector = document.querySelector('.greeting');
const timeOfDay = greetingSelector.textContent = `Good ${getTimeOfDay()}, `;

const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
      } else {
        city.value = "Minsk";
      }
}
window.addEventListener('load', getLocalStorage)

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum()

const body = document.querySelector('body');
let bgNum = getRandomNum(1, 20).toString().padStart(2, "0");
const timeOfTheDay = getTimeOfDay().toLowerCase();

function setBg() {                       
    const img = new Image();
    img.src = `https://github.com/mrdraushtam/pictures/blob/assets/images/${timeOfTheDay}/${bgNum}.jpg?raw=true`
    img.onload = () => {      
    body.style.backgroundImage = `url('https://github.com/mrdraushtam/pictures/blob/assets/images/${timeOfTheDay}/${bgNum}.jpg?raw=true')`;
  }
}
setBg()

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getSlideNext () {
    const randomNumber = Number(bgNum);

    if (randomNumber < 20) {
        bgNum = String(randomNumber + 1).padStart(2, "0");
    } else {
        bgNum = '01';
    }

    setBg()
}
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
    const randomNumber = Number(bgNum);

    if (randomNumber > 1) {
        bgNum = String(randomNumber - 1).padStart(2, "0");
    } else {
        bgNum = '20';
    }
    
    setBg() 
}
slidePrev.addEventListener('click', getSlidePrev); 

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=9d7ba1aa6fe4a20c674971ba13175783&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    async function getError() {
        if (res.ok) { 
            console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data.wind.speed, data.main.humidity);
        } else {
            temperature.textContent = `Error! City not found for '${city.value}'`;
            weatherDescription.textContent = '';
            wind.textContent = '';
            humidity.textContent = '';
        }
    }
    getError()
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

city.addEventListener('change', getWeather)
window.addEventListener('load', getWeather)

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonChangeQoute = document.querySelector('.change-quote');

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    console.log(data);
    quote.textContent = data[0].text;
    author.textContent = data[0].author;

    function changeQuotes() {
    let randomNumQoutes = getRandomNum(0, 16);

    quote.textContent = data[randomNumQoutes].text;
    author.textContent = data[randomNumQoutes].author;
    }

    changeQuotes()
    buttonChangeQoute.addEventListener('click', changeQuotes);
}
getQuotes();

import playList from './playList.js';
console.log(playList);

const audio = new Audio();
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
let isPlay = false;
let playNum = 0;

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if (!isPlay) {
    audio.play();
    playBtn.classList.add('pause');
    isPlay = true;
    ul.children[playNum].classList.add('item-active')
    } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove('pause');
    } 
    
}
playBtn.addEventListener('click', playAudio);

const ul = document.querySelector('ul');

function playNext() {
    if (playNum < 4) {
       playNum = playNum + 1; 
       ul.children[playNum - 1].classList.remove('item-active')
    } else {
        playNum = 0;
        ul.children[4].classList.remove('item-active')
    }
    isPlay = false;
    playAudio();
}
playNextBtn.addEventListener('click', playNext);

function playPrev() {
    if(playNum > 0) {
       playNum = playNum - 1; 
       ul.children[playNum + 1].classList.remove('item-active')
    } else {
        playNum = 4;
        ul.children[0].classList.remove('item-active')
    }
    isPlay = false;
    playAudio();
}
playPrevBtn.addEventListener('click', playPrev);

const playListContainer = document.querySelector('.play-list');

playList.forEach (item => {
    const li = document.createElement('li');    
    li.classList.add('play-item')
    li.textContent = item.title
    playListContainer.append(li)
})
audio.addEventListener('ended', playNext);

