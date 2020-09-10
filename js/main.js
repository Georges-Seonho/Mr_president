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
const infoDiv = document.querySelector('.info-div');
const mainHTML = document.querySelector('.main');
const budgetContainer = document.querySelector('.budget-container');

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
    mainHTML.style.display='flex';
    budgetContainer.style.display ='block';
    infoDiv.innerHTML = '';
    currentPlayer.numOfTurn = 0;
    currentPlayer.budget = 100000;
    playingMinistary.forEach(ministry => ministry.happiness = 10);
    currentCards = [...cards];
    gobtn.style.display="";
    choices.innerHTML='';
    cardHTML.style.backgroundColor = '';
    progressBar.style.visibility="hiden";
    progressBar.innerHTML = '';
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
        ministriesContainer.innerHTML += `<div class="ministry"><h1>${ministry.happiness}</h1><img src="${ministry.icon}" class="icons" ><h3>${ministry.name}</h3></div>` ;
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

const gameIntro = () => {
    infoDiv.innerHTML += `<p class="shadow largeText">Dear President ${currentPlayer.name}, 
    <br><br> As the president, your mission, if you accept it, is to keep your government happy with the choices you make. Choose between YES or NO and according to your decision some ministers will be happy and some not. You lose when any one of the ministers' happy points become 0 or if you run out of budget. 
    <br><br> Best of luck, 
    <br><br> PS : You only have 15 secondes to make your decisions.
    <br><br> PPS : Click anywhere to start playing.</p>`;
    mainHTML.style.display ='none';
    budgetContainer.style.display ='none';
}

const startGame = () => {
    displayMinistries();
    displayInfos();
    cardHTML.innerHTML='<img src="./ressources/president.gif" alt="president making choices" class="logo">';
};

const isDone = () => {
    console.log(currentCards.length);
    if(currentPlayer.bestScore < currentPlayer.numOfTurn) currentPlayer.bestScore = currentPlayer.numOfTurn;
    if(currentCards.length < 1 && currentPlayer.budget > 0) {
        infoDiv.innerHTML += '<img class="grey" src="./ressources/wick.gif"><h1 class="reset-btn shadow">NICE! Wanna play again?</h1>';
        mainHTML.style.display ='none';
        budgetContainer.style.display ='none';
    }
    else if(budget < 0 || playingMinistary.some(elm => elm.happiness < 1)) {
        infoDiv.innerHTML += '<img src="./ressources/lost.gif"><h1 class="reset-btn shadow">I mean you can do better... Play again?</h1>';
        mainHTML.style.display ='none';
        budgetContainer.style.display ='none';
    };
};

const changeCard = () => {
    currentPlayer.numOfTurn += 1;
    currentCards.splice(randomNum, 1);
    isDone();
    currentCard = displayCard();
    displayBar();
    displayMinistries();
    displayInfos();
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


gameIntro();
// Event listeners
gobtn.onclick = displayChoices;
choices.onclick = handleChoice;
playAgainBtn.onclick = resetGame;
musicIcon.onclick = playMusic;
progressBar.onanimationend = progressBarEffect;
infoDiv.onclick = resetGame;