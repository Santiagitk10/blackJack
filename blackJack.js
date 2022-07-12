


const rlp = require('readline');

const rl = rlp.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, input => resolve(input));
  });
}

ask("Enter your name: ")
  .then(result => { 

    console.log(result + " Welcome to BlackJack!")

    const gambler = new Gambler(result);
    const deck = new CardsDeck();
    const game = new Game();
    
    deck.createNewDeck();
    


    do {

        gambler.drawCard(deck.getCards());

    
    } while (gambler.getCurretScore() < 18);


    // gambler.setCurrentScore();



    // deck.randomizeDeck();

    // gambler.drawCard(deck.getCards());
    
    // console.log(gambler.currentHand);




    ; return ask("Second question"); })
  .then(result => { console.log(result); return ask(); })
  .then(result => { console.log(result); rl.close() });




//GAMBLER CLASS
class Gambler {
    constructor(name){
        this.name = name;
        this.price = 0;
        this.currentHand = [];
        this.currentScore = 0;
    }

    getName(){
        return this.name;
    }

    getCurrentHand(){
        return this.currentHand;
    }

    getCurretScore(){
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
        console.log(this.getCurretScore());

    }


    increasePrice(increase){
        this.price += increase;
        console.log(`Your current Price is: $${this.getPrice()}`);
    }


    setCurrentScore(){


        console.log("Hello");

        if(this.getCurrentHand()[this.getCurrentHand().length-1].value  === "J" ||  
        this.getCurrentHand()[this.getCurrentHand().length-1].value  === "Q" || 
        this.getCurrentHand()[this.getCurrentHand().length-1].value  === "K") {
            this.currentScore += 10;
        } else if (this.getCurrentHand()[this.getCurrentHand().length-1].value  === "A"){
            if(this.getCurretScore() + 11 <= 18){
                ask(`Your current Score is ${this.getCurretScore()} What should A be worth Enter 1 or 11 :` )
                    .then(result => { 
                        if(result === 1){
                            this.currentScore += 1;
                        } else if(result === 11){
                            this.currentScore += 11;
                        }
                    ; rl.close() });
                }
        } else {
            this.currentScore += parseInt(this.getCurrentHand()[this.getCurrentHand().length-1].value);
        }

        if(this.getCurretScore() >= 18 && this.getCurretScore <= 21){
            Game.advanceRound(this);
        }

    }
}


    


//GAME CLASS
class Game {
    constructor(){
        let roundPrice = 1000;
        this.round = 1;
    }

    advanceRound(gambler){
        this.round++;
        console.log("Congratulations! You advance round");
        console.log(`Curren round: ${this.round}`)
        
        gambler.increasePrice(roundPrice);
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








// ask("Enter your name: ")
//   .then(result => { 

//     ; return ask("Second question"); })
//   .then(result => { console.log(result); return ask(); })
//   .then(result => { console.log(result); rl.close() });







