import { Ministry } from './modules/ministry_module.js';
import { cards } from './modules/cards_module.js';
import { Player } from './modules/player_module.js';

// HTML GETTERS
const cardContainer = document.getElementById('cardcontainer');
const cardHTML = cardContainer.querySelector('.card');
const choices = cardContainer.querySelector('.choices');
const ministriesContainer = document.getElementById('ministries');

// Images references
let armyImg = '';
let socialImg = '';

// Ministeries 
const army = new Ministry('Armed Forces', armyImg);
const solidarity = new Ministry('Solidarity and Health', socialImg);

const playingMinistary = [army, solidarity];


//PLAYER info 
const currentPlayer = new Player(/*prompt('Enter Your name please')*/ 'plop');


// Functions 
const displayMinistries = () => {
    ministriesContainer.innerHTML = '';
    playingMinistary.forEach(ministry => {
        ministriesContainer.innerHTML = <div><img src= ><h1>${}</h1></div> ;
    })
    
};

const chooseCard = () => {
    const randomNum = Math.floor(Math.random()*cards.length);
    const cardJS = cards[randomNum];
    return cardJS
};

const displayCard = () => {
    const currentCard = chooseCard();
    cardHTML.innerHTML = '';
    cardHTML.innerHTML += `<p>${currentCard.content}</p>`;
    return currentCard;
};

const handleChoice = (evt) => {
    const currentCard = displayCard();
    const turnOfEvent = (evt.target === choices.querySelector('.yes')) ? currentCard.yes : currentCard.no;
    console.log(turnOfEvent);
};

const startGame = () => {
    
}

displayCard()
// Event listeners
choices.onclick = handleChoice;

