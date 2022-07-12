


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

    deck.createNewDeck();
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
    }

    getName(){
        return this.name;
    }

    drawCard(cardsDeck){
        this.currentHand.push(cardsDeck.pop());
    }
}


    


//GAME CLASS
class Game {
    constructor(){
        let roundPrice = 1000;
        this.round = 1;
    }

    advanceRound(){
        this.round++;
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








// let deck1 = new CardsDeck();
// deck1.createNewDeck();
// deck1.randomizeDeck();





























