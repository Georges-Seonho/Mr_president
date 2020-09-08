import { Ministry } from './modules/ministry_module.js';
import { cards } from './modules/cards_module.js';
import { Player } from './modules/player_module.js';

// HTML GETTERS
const budgetHTML = document.getElementById('budget');
const scoreHTML = document.getElementById('score');
const bestScoreHTML = document.getElementById('bestscore')
const playAgainBtn = document.querySelector('.againBtn');
const cardContainer = document.getElementById('cardcontainer');
const cardHTML = cardContainer.querySelector('.card');
const choices = cardContainer.querySelector('.choices');
const ministriesContainer = document.getElementById('ministries');
const gobtn = document.querySelector('.gobtn');


// Images references
let armyImg = '../ressources/Phatman_x4.gif';
let socialImg = '../ressources/one.gif';
let healthImg = '../ressources/death.gif';
let commerceImg = '../ressources/rich.gif';
let budgetMiImg = '../ressources/PIC.gif';
let labourImg = '../ressources/mario.gif';


// Ministeries 
const army = new Ministry('Secretary of Defense', armyImg);
const solidarity = new Ministry('Secretary of Education', socialImg);
const health = new Ministry('Secretary of Health and Human Services', healthImg);
const commerce = new Ministry('Secretary of Commerce', commerceImg);
const budgetMinistry = new Ministry('Office of Management and Budget', budgetMiImg);
const labour = new Ministry('Secretary of Labor', labourImg);

const playingMinistary = [army, solidarity, health, commerce, budgetMinistry, labour];


//INFOS
const currentPlayer = new Player(/*prompt('Enter Your name please')*/ 'lol');
let currentCards = [...cards];

// Features 
const displayChoices = () => {
    gobtn.style.display="none";
    choices.innerHTML='<div class="yes">YES</div><div class="no">NO</div>';
    displayCard();
};

const playMusic = () => {} 

// Functions 
const resetGame = () => {
    currentPlayer.numOfTurn = 0;
    currentPlayer.budget = 100000;
    playingMinistary.forEach(ministry => ministry.happiness = 10);
    currentCards = [...cards];
    gobtn.style.display="";
    choices.innerHTML='';
    startGame();
};

const displayInfos = () => {
    scoreHTML.innerHTML = '';
    budgetHTML.innerHTML = '';
    bestScoreHTML.innerHTML = '';
    scoreHTML.innerHTML += `${currentPlayer.numOfTurn}`;
    budgetHTML.innerHTML += `${currentPlayer.budget}`;
    bestScoreHTML.innerHTML = `${currentPlayer.bestScore}`;
}

const displayMinistries = () => {
    ministriesContainer.innerHTML = '';
    playingMinistary.forEach(ministry => {
        ministriesContainer.innerHTML += `<div><img src="${ministry.icon}" class="icons" ><h3>${ministry.name}</h3><p>${ministry.happiness}</p></div>` ;
    });   
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
    cardHTML.innerHTML='<img src="../ressources/president.gif" alt="president making choices" class="logo">';
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

const annimateCardContainer = () => {
    cardContainer.classList.remove('scale-in-ver-center');
    cardContainer.classList.add('scale-in-ver-center');
}

const handleChoice = (evt) => {
    const turnOfEvent = (evt.target === choices.querySelector('.yes')) ? currentCard.yes : currentCard.no;
    playingMinistary.forEach(ministry => {
        for(let i=0; i<playingMinistary.length; i++) {
            if(ministry.name === turnOfEvent[i].impactedMinistry) ministry.happiness = ministry.happiness + turnOfEvent[i].points;
        }
    });
    if(currentCard.price && turnOfEvent === currentCard.yes) currentPlayer.budget += currentCard.price;
    currentPlayer.numOfTurn += 1;
    currentCards.splice(randomNum, 1);
    annimateCardContainer();
    currentCard = displayCard();
    displayMinistries();
    displayInfos();
    isDone();
};

startGame();
// Event listeners
gobtn.onclick = displayChoices;
choices.onclick = handleChoice;
playAgainBtn.onclick = resetGame;

