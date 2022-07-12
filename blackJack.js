
const prompt = require('prompt-sync')();



//PREGUNTA SANTIAGO REQUIRE
// const rlp = require('readline');

// const rl = rlp.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function ask(prompt) {
//   return new Promise(resolve => {
//     rl.question(prompt, input => resolve(input));
//   });
// }

// ask("Enter your name: ")
//   .then(result => { 
//     ; return ask("Second question"); })
//   .then(result => { console.log(result); return ask(); })
//   .then(result => { console.log(result); rl.close() });



//GAME CLASS
class Game {

    constructor(){
        this.roundPrice = 1000;
        this.round = 1;
    }

    getRound(){
        return this.round;
    }

    advanceRound(gambler){
        this.round++;
        gambler.increasePrice(this.roundPrice);
    }

    resetGame(gambler){
        this.round = 1;
        gambler.decreasePrice();
    }

}


//GAMBLER CLASS
class Gambler {
    constructor(name, currentGame){
        this.name = name;
        this.price = 0;
        this.currentHand = [];
        this.currentScore = 0;
        this.currentGame = currentGame;
        this.status = "Active";
    }

    getName(){
        return this.name;
    }

    getCurrentHand(){
        return this.currentHand;
    }

    getCurrentScore(){
        return this.currentScore;
    }

    getPrice(){
        return this.price;
    }

    drawCard(cardsDeck){
        this.currentHand.push(cardsDeck.pop());
        this.setCurrentScore();
        console.log("Your current Hand")
        console.log(this.getCurrentHand());
        console.log("Your current Score");
        console.log(this.getCurrentScore());

    }


    increasePrice(increase){
        this.price += increase;
        console.log(`Your current Price is: $${this.getPrice()}`);
    }

    decreasePrice(){
        this.price = 0;
        console.log(`Your current Price is: $${this.getPrice()}`);
    }

    setCurrentScore(){

        if(this.getCurrentHand()[this.getCurrentHand().length-1].value  === "J" ||  
        this.getCurrentHand()[this.getCurrentHand().length-1].value  === "Q" || 
        this.getCurrentHand()[this.getCurrentHand().length-1].value  === "K") {
            this.currentScore += 10;
        } else if (this.getCurrentHand()[this.getCurrentHand().length-1].value  === "A"){

            if(this.getCurrentScore() + 11 <= 18){
                let chosenAValue = prompt("What should A be worth Enter 1 or 11 : ");
                        if(parseInt(chosenAValue) === 1){
                            this.currentScore += 1;
                        } else if(parseInt(chosenAValue) === 11){
                            this.currentScore += 11;
                        }

            } else {
                this.currentScore +=1;
            }

        } else {
            this.currentScore += parseInt(this.getCurrentHand()[this.getCurrentHand().length-1].value);
        }

        if(this.getCurrentScore() >= 18 && this.getCurrentScore() <= 21){
            this.currentGame.advanceRound(this);
            console.log(`That´s Because You Rule ${this.getName()}!  Your current round is: ${this.currentGame.getRound()}`);
            this.status = "Won";
            // this.currentScore = 0;
        } else if(this.getCurrentScore() > 21){
            this.currentGame.resetGame(this);
            console.log(`That Because You Lost :( Your current round is: ${this.currentGame.getRound()}`);
            this.status = "Lost";
        }

    }
}





//CARD CLASS
class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }
}





//CARDSDECK CLASS
class CardsDeck{
    constructor(){
        this.cards = [];
    }

    getCards(){
        return this.cards;
    }

    createNewDeck(){
        const values = ["A","2","3","4","5","6", "7", "8", "9", "10", "J", "Q", "K"];
        const suits = ["S","H","C","D"];

        let temporalDeck = [];

        for(let i = 0; i < values.length; i++){
            for(let j = 0; j < suits.length; j++){
                temporalDeck.push(values[i] + "-" + suits[j])
            }
        }

        this.randomizeDeck(temporalDeck);
    
    }

    randomizeDeck(temporalDeck){

        for(let i = 0; i < temporalDeck.length; i++){
            let j = Math.floor(Math.random() * temporalDeck.length);
            let temporal = temporalDeck[i];
            temporalDeck[i] = temporalDeck[j];
            temporalDeck[j] = temporal;
        }

        for(let i = 0; i < temporalDeck.length; i++){
            let split = temporalDeck[i].split("-");
            let first = split[0];
            let second = split[1];
            this.cards.push(new Card(first,second));
        }
        
    }
    
}


//GAME INITIALIZATION
const game = new Game();
console.log("Welcome To BlackJack!")
let name = prompt("Enter your name: ")
const gambler = new Gambler(name, game);
const deck = new CardsDeck();
deck.createNewDeck();

let isGameOn = true;

do {

    gambler.currentScore = 0;

    do {
        
        if(game.getRound() > 1){
            deck.createNewDeck();
        }
        gambler.drawCard(deck.getCards());

        if(gambler.getCurrentScore() >= 18){
            isGameOn = false;
        }

    } while (isGameOn);
    

    let statusChanger = prompt("Enter 1 to advance round if you Won or to close if you Lost. Enter 2 to retire: ");
    if(parseInt(statusChanger) === 2){
        gambler.status = "Retired";
        gambler.currentHand = [];
    } else if(parseInt(statusChanger) === 1 && gambler.status != "Lost"){
        gambler.status = "Active";
        gambler.currentHand = [];
        isGameOn = true;
    }

    if(game.getRound() > 3){
        gambler.status = "Retired";
    }

    console.log(`Gambler Status: ${gambler.status}`);

} while (gambler.status === "Active" || gambler.status === "Won");



























