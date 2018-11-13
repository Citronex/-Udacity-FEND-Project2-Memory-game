/*
 * Create a list that holds all of your cards
 */
let deck = document.body.querySelectorAll('li.card');

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

//Timer from stackoverflow questions 5517597
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }
  
  function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

let playingTime = setInterval(function(){ setTime() }, 1000);

function stopTimer() {
    clearInterval(playingTime);
}

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

//Keeps track of flipped pairs
let openShowCards = [];
//Keeps track of total moves
let totalMoves = 0;
//Keeps track of total pairs found
let totalPairsFound = 0;

//Restart the game when icon is clicked;
function restart() {
    window.location.reload(true);
  }

function addToOpenShowArray(event){
    openShowCards.push(event.target.firstElementChild.className);
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
        }}, (500));
}

function movesRating(){
    if (totalMoves > 21 && totalMoves < 31){
        document.body.querySelector('#threeStar').style.cssText = 'color: black';
    } else if(totalMoves > 31){
        document.body.querySelector('#twoStar').style.cssText = 'color: black';
    }
}
let moves = document.body.querySelector('.moves');
document.querySelector('.deck').addEventListener('click',function(event){
	if (event.target.nodeName === 'LI') {
        if (event.target.classList == 'card'){
            //Add a move to totalMoves per every click on a card;
            document.body.querySelector('.moves').textContent = totalMoves+=event.detail;
            //Check Star-score
            movesRating();
            //Show the clicked card
            event.target.classList.add('open', 'show');
            //add the clicked card to 'openShowCards' array
            addToOpenShowArray(event)
            //If array has 2 cards
            if (openShowCards.length == 2){
                //If the 2 cards match
                if(openShowCards[0] == openShowCards[1]){
                    //mark cards as a match
                    cardsMatch();
                    //add a match to totalPairsFound
                    totalPairsFound+=1;
                    console.log(totalPairsFound);
                    //check if game is over
                    if(totalPairsFound == 8){
                        stopTimer();
                    }
                  //if the 2 cards don't match  
                } else if(!(openShowCards[0] == openShowCards[1])) {
                    //Show the unmatched cards for a little
                    // and then flip them back
                    noMatch();
                }
                //Empty the array keeping track of pairs 
                openShowCards = [];  
            } 
        } 
	}
});