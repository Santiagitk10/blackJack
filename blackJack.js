

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(userPrompt){
    readLine.question(userPrompt + "\n", (userInput) => {
        return userInput;
    });
}





class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
        
    }
}


class CardsDeck{
    constructor(){
        this.cards = [];
    }


    createNewDeck(){
        const values = ["A","2","3","4","5","6", "7", "8", "9", "10", "J", "Q", "K"];
        const suits = ["S","H","C","D"];
    
    
        for(let i = 0; i < values.length; i++){
            for(let j = 0; j < suits.length; j++){
                let card = new Card(values[i] + "-" + suits[j]);
                this.cards.push(card)
            }
        }
    
    }

    randomizeDeck(){
        for(let i = 0; i < this.cards.length; i++){
            let j = Math.floor(Math.random() * this.cards.length);
            let temporal = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temporal;
        }
    }

}



let deck1 = new CardsDeck();
deck1.createNewDeck();

console.log(deck1.cards);
console.log("Half");
deck1.randomizeDeck();
console.log(deck1.cards);





