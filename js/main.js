import { Ministry } from './modules/ministry_module.js';
import { cards } from './modules/cards_module.js';
import { Player } from './modules/player_module.js';

// HTML GETTERS
const budgetHTML = document.getElementById('budget');
const scoreHTML = document.getElementById('score');
const cardContainer = document.getElementById('cardcontainer');
const cardHTML = cardContainer.querySelector('.card');
const choices = cardContainer.querySelector('.choices');
const ministriesContainer = document.getElementById('ministries');

// Images references
let armyImg = '../ressources/26803260.jpg';
let socialImg = '../ressources/26803260.jpg';

// Ministeries 
const army = new Ministry('Armed Forces', armyImg);
const solidarity = new Ministry('Solidarity and Health', socialImg);

const playingMinistary = [army, solidarity];


//PLAYER info 
const currentPlayer = new Player(/*prompt('Enter Your name please')*/ 'plop');


// Functions 
const displayInfos = () => {
    scoreHTML.innerHTML = '';
    budgetHTML.innerHTML = '';
    scoreHTML.innerHTML += `${currentPlayer.numOfTurn}`;
    budgetHTML.innerHTML += `${currentPlayer.budget}`;
}

const displayMinistries = () => {
    ministriesContainer.innerHTML = '';
    playingMinistary.forEach(ministry => {
        ministriesContainer.innerHTML += `<div><img src="${ministry.icon}" class="icons" ><h3>${ministry.name}</h3><p>${ministry.happiness}</p></div>` ;
    });   
};

const chooseCard = () => {
    const randomNum = Math.floor(Math.random()*cards.length);
    const cardJS = cards[randomNum];
    return cardJS;
};

const displayCard = () => {
    const currentCard = chooseCard();
    cardHTML.innerHTML = '';
    cardHTML.innerHTML += `<p>${currentCard.content}<br> Cost : ${currentCard.price}$</p>`;
    return currentCard;
};

const handleChoice = (evt) => {
    const currentCard = displayCard();
    const turnOfEvent = (evt.target === choices.querySelector('.yes')) ? currentCard.yes : currentCard.no;
    console.log(turnOfEvent);
    playingMinistary.forEach(ministry => {
        for(let i=0; i<playingMinistary.length; i++) {
            if(ministry.name === turnOfEvent[i].impactedMinistry) ministry.happiness = ministry.happiness + turnOfEvent[i].points;
        }
    });
    displayMinistries();
};

const startGame = () => {
    displayMinistries();
    displayCard();
    displayInfos();
}

startGame();
// Event listeners
choices.onclick = handleChoice;

