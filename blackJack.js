
const prompt = require('prompt-sync')();



// console.log("Hola " +  input);



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
        // console.log("Congratulations! You advance round");
        // console.log(`Curren round: ${this.round}`)
        
        gambler.increasePrice(this.roundPrice);

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


    setCurrentScore(){

        console.log(this.getCurrentHand()[this.getCurrentHand().length-1].value); //por eliminar

        if(this.getCurrentHand()[this.getCurrentHand().length-1].value  === "J" ||  
        this.getCurrentHand()[this.getCurrentHand().length-1].value  === "Q" || 
        this.getCurrentHand()[this.getCurrentHand().length-1].value  === "K") {
            this.currentScore += 10;
        } else if (this.getCurrentHand()[this.getCurrentHand().length-1].value  === "A"){

           


            //TIMES PRESENT POR SI NO LE PREGUNTABA AL USUARIO
            // let timesAPresent = 0;
            // for(let i = 0; i < this.getCurrentHand().length;i++){
            //     if(this.getCurrentHand()[i].value === "A"){
            //         timesAPresent++;
            //     }
            // }

            // console.log(`times present ${timesAPresent}`);

            // if(timesAPresent > 1){
            //     this.currentScore += 1;
            // } else {
            //     this.currentScore += 11;
            // }

            if(this.getCurrentScore() + 11 <= 18){
                let chosenAValue = prompt("What should A be worth Enter 1 or 11 : ");
                        if(parseInt(chosenAValue) === 1){
                            this.currentScore += 1;
                        } else if(parseInt(chosenAValue) === 11){
                            this.currentScore += 11;
                        }
                        console.log(this.currentScore); //Por eliminar

            } else {
                this.currentScore +=1;
            }

        } else {
            this.currentScore += parseInt(this.getCurrentHand()[this.getCurrentHand().length-1].value);
        }

        if(this.getCurrentScore() >= 18 && this.getCurrentScore() <= 21){
            this.currentGame.advanceRound(this);
            console.log(`Congratulations You Won! Your current round is: ${this.currentGame.getRound()}`);
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

    gambler.drawCard(deck.getCards());



    if(gambler.getCurrentScore() >= 18){
        isGameOn = false;
    }


} while (isGameOn);









        


    // gambler.setCurrentScore();

    // deck.randomizeDeck();

    // gambler.drawCard(deck.getCards());
    
    // console.log(gambler.currentHand);


















