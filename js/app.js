/*
 * Create a list that holds all of your cards
 */
let deck = document.body.querySelectorAll('li.card');

/*
* This is how I'd turn the above list into an actual array, JIC:
* let nodesArray = [].slice.call(deck);
*  
* For testing:	
*  deck.forEach(card => {
*     card.className = "card";});
*   }
*/

//icons list to be shuffled
let listaIconos = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
let shuffledIcons = function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

const shuffleAndDisplayAsHidden = function(){
    //shuffle cards
    shuffledIcons(listaIconos);

    //add the shuffled icons to the cards
    for (let i = 0; i < deck.length; i++) {
        const newElement = document.createElement('i');
        // newElement.className = ['fa ' + listaIconos[i]];
	    newElement.setAttribute('class', 'fa ' + listaIconos[i]);
	    deck[i].appendChild(newElement);
    }
};

shuffleAndDisplayAsHidden();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let openShowCards = [];

// function cardOpenShow(event) {
//     event.target.classList.add('open', 'show');
//      //Add it to temp array
//         addToOpenShowArray(event);
//         return openShowCards.length;
// }

function cardRemoveOpenShow(event) {
    event.target.classList.remove('open', 'show');
}

function addToOpenShowArray(event){
    openShowCards.push(event.target.firstElementChild.className);
    console.log(event.target.firstElementChild.className);
}

function cardsMatch(){
        //mark cards as 'card match'
        let pairedCards = document.body.getElementsByClassName(openShowCards[0]); 
        for (let card of pairedCards) {
            card.parentElement.className = 'card match';
        }
}

function noMatch() {
        //remove 'open' 'show' classes from elements
        let unPairedCards = document.body.getElementsByClassName('card open show');
        setTimeout(function(){
        for (let i = 1; i >= 0; i--){
           unPairedCards[i].classList.remove('open', 'show');
        }}, (1000));
    }

document.querySelector('.deck').addEventListener('click',function(event){
	if (event.target.nodeName === 'LI') {
        if (event.target.classList == 'card'){
            //Show the clicked card
            event.target.classList.add('open', 'show');
            //add the clicked card to 'openShowCards' array
            openShowCards.push(event.target.firstElementChild.className);
            // console.log(event.target.firstElementChild.className);
            // console.log(openShowCards.length);
            if (openShowCards.length == 2){
                if(openShowCards[0] == openShowCards[1]){
                    //mark cards as 'card match'
                    let pairedCards = document.body.getElementsByClassName(openShowCards[0]); 
                    for (let card of pairedCards) {
                    card.parentElement.className = 'card match';
                    }
                } else if(!(openShowCards[0] == openShowCards[1])) {
                    //need to make this wait so 2nd card can be seen!
                    noMatch();
                } 
                openShowCards = [];  
        } 
    } 
    // else if (event.target.nodeName === 'LI' && event.target.classList.contains('show')) {
    //     cardRemoveOpenShow(event);
    //     }
	}
});
