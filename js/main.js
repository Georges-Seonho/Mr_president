import { Ministry } from './modules/ministry_module.js';
import { cards } from './modules/cards_module.js';
import { Player } from './modules/player_module.js';

// HTML GETTERS
const logoName = document.getElementById('logo');
const budgetHTML = document.getElementById('budget');
const scoreHTML = document.getElementById('score');
const bestScoreHTML = document.getElementById('bestscore')
const playAgainBtn = document.querySelector('.againBtn');
const cardContainer = document.getElementById('cardcontainer');
const cardHTML = cardContainer.querySelector('.card');
const choices = cardContainer.querySelector('.choices');
const ministriesContainer = document.getElementById('ministries');
const gobtn = document.querySelector('.gobtn');
const musicIcon = document.getElementById('musicIcon');
const progressBar = document.querySelector('.progress-bar');

// Images references
let armyImg = './ressources/Phatman_x4.gif';
let socialImg = './ressources/one.gif';
let healthImg = './ressources/death.gif';
let commerceImg = './ressources/rich (1).gif';
let budgetMiImg = './ressources/PIC.gif';
let labourImg = './ressources/mario.gif';


// Ministeries 
const army = new Ministry(' Defense', armyImg);
const solidarity = new Ministry(' Education', socialImg);
const health = new Ministry(' Health and Human Services', healthImg);
const commerce = new Ministry(' Commerce', commerceImg);
const budgetMinistry = new Ministry(' Management and Budget', budgetMiImg);
const labour = new Ministry(' Labor', labourImg);

const playingMinistary = [army, solidarity, health, commerce, budgetMinistry, labour];


//INFOS
const currentPlayer = new Player(prompt('Enter Your last name please :'));
logoName.innerText += ` ${currentPlayer.name}`;
let currentCards = [...cards];

// Features 
const displayChoices = () => {
    gobtn.style.display="none";
    choices.innerHTML='<div class="yes">YES</div><div class="no">NO</div>';
    cardHTML.style.backgroundColor = '#FFF';
    displayBar();
    displayCard();
};

const playMusic = () => {
    let musicContent = '<div id="sub-music"><img  src="./ressources/music0n.gif" alt="music ON gif"><audio autoplay src="./ressources/Pickle Rick! [8 Bit Tribute to Rick and Morty & Chetreo] - 8 Bit Universe.mp3"></audio><span>Sound</span></div>';
    let noMusicContent = '<div id="sub-music"><img  src="./ressources/musicof.webp" alt="music ON gif"><span>Sound</span></div>';
    musicIcon.classList.toggle('plop');
    if(musicIcon.className === 'plop') musicIcon.innerHTML= noMusicContent;
    else musicIcon.innerHTML = musicContent;  
}; 

// Functions 
const resetGame = () => {
    currentPlayer.numOfTurn = 0;
    currentPlayer.budget = 100000;
    playingMinistary.forEach(ministry => ministry.happiness = 10);
    currentCards = [...cards];
    gobtn.style.display="";
    choices.innerHTML='';
    cardHTML.style.backgroundColor = '';
    progressBar.style.visibility="hiden";
    progressBar.innerHTML = ''
    startGame();
};

const displayBar = () => {
    progressBar.style.visibility="visible";
    progressBar.innerHTML = ' <span class="bar"><span class="progress"></span></span>'
}

const displayInfos = () => {
    scoreHTML.innerHTML = '';
    budgetHTML.innerHTML = '';
    bestScoreHTML.innerHTML = '';
    scoreHTML.innerHTML += `${currentPlayer.numOfTurn}`;
    budgetHTML.innerHTML += `${currentPlayer.budget}`;
    bestScoreHTML.innerHTML = `${currentPlayer.bestScore}`;
};

const displayMinistries = () => {
    ministriesContainer.innerHTML = '';
    playingMinistary.forEach(ministry => {
        ministriesContainer.innerHTML += `<div class="ministry"><img src="${ministry.icon}" class="icons" ><h3>${ministry.name}</h3><p>${ministry.happiness}</p></div>` ;
    }); 
    let ministriesCards = ministriesContainer.querySelectorAll('.ministry');
    playingMinistary.forEach((ministry, i) => (ministry.happiness <= 3) ? ministriesCards[i].classList.add('vibrate-2') : ministriesCards[i].classList.remove('vibrate-2'));
};

const randomNum = Math.floor(Math.random()*currentCards.length);
const chooseCard = () => currentCards[randomNum];
const displayCard = () => {
    let currentCard = chooseCard();
    cardHTML.innerHTML = '';
    cardHTML.innerHTML += `<p>${currentCard.content}<br><br> GAIN : ${currentCard.price}$</p>`;
    return currentCard;
};
let currentCard = displayCard();

const startGame = () => {
    displayMinistries();
    displayInfos();
    cardHTML.innerHTML='<img src="./ressources/president.gif" alt="president making choices" class="logo">';
};

const isDone = () => {
    if(currentPlayer.bestScore < currentPlayer.numOfTurn) currentPlayer.bestScore = currentPlayer.numOfTurn;
    if(currentCards.length === 0 && currentPlayer.budget > 0) {
        resetGame();
        alert('YOU WIN!!!');
    }
    else if(budget < 0 || playingMinistary.some(elm => elm.happiness < 1)) {
        resetGame();
        alert('YOU LOST!!!');
    };
};

const changeCard = () => {
    currentPlayer.numOfTurn += 1;
    currentCards.splice(randomNum, 1);
    currentCard = displayCard();
    displayBar();
    displayMinistries();
    displayInfos();
    isDone();
}

const progressBarEffect = () => {
    playingMinistary.forEach(ministry => {
        ministry.happiness -=1;
    });
    currentPlayer.budget -= 1000;
    changeCard();
}

const handleChoice = (evt) => {
    const turnOfEvent = (evt.target === choices.querySelector('.yes')) ? currentCard.yes : currentCard.no;
    playingMinistary.forEach(ministry => {
        for(let i=0; i<playingMinistary.length; i++) if(ministry.name === turnOfEvent[i].impactedMinistry) ministry.happiness += turnOfEvent[i].points;
    });
    if(currentCard.price && turnOfEvent === currentCard.yes) currentPlayer.budget += currentCard.price;
    changeCard();
};

startGame();
// Event listeners
gobtn.onclick = displayChoices;
choices.onclick = handleChoice;
playAgainBtn.onclick = resetGame;
musicIcon.onclick = playMusic;
progressBar.onanimationend = progressBarEffect;