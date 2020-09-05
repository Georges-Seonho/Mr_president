// const Ministery = require('./modules/ministery_module.js');
// const cards = require('./modules/cards_module.js');
// const Player = require('./modules/player_module.js');
import { Ministry } from './modules/ministry_module.js';
import { cards } from './modules/cards_module.js';
import { Player } from './modules/player_module.js';

// Images references
let armyImg = '';
let socialImg = '';

// Ministeries 
const army = new Ministry('Armed Forces', armyImg);
const solidarity = new Ministry('Solidarity and Health', socialImg);

const playingMinistary = [army.name, solidarity.name];


//PLAYER info 
const currentPlayer = new Player();

// Functions 
const makeChoice = () => {

}

const displayCard = () => {
    let randomNum = Math.floor(Math.random()*cards.length);
    console.log(cards[randomNum].content);
    prompt 
}

const startGame = playerName => {

}

displayCard()