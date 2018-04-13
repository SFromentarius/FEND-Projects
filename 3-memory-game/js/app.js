/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function adapted from http://stackoverflow.com/a/2450976, thanks to Cedric F :)
function shuffle(array = Array.from(cards)) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    deck.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        deck.appendChild(array[i]);
    }
}

shuffle();


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

let cardList = [];
var moves = 0;
let stars = document.querySelector('.stars');
let restart = document.querySelector('.restart');
let cardMatched = [];

// the restart button
restart.addEventListener('click', function () {
    location.reload();
});

//When the user clicks on a card
deck.addEventListener('click', function (e) {
    showSymbol(e); //the card is flipped
    cardHolder(e); //the first and second card are "saved" in cardList, to check if:
    if (cardList.length > 1) {
        if (cardList[0].innerHTML == cardList[1].innerHTML) { //if the two cards are the same
            cardMatch(cardList[0]);
            cardMatch(cardList[1]);
            cardList = [];
        } else { //if the two cards are different
            cardList[1].classList.add('show');
            cardList[1].classList.add('open');
            setTimeout(function () {
                cardDontMatch(cardList[0]);
                cardDontMatch(cardList[1]);
                cardList = [];
            }, 500);

        }
    }

    increaseMove();


});

//When a card is clicked-> opened and shown
function showSymbol(e) {
    e.target.classList.toggle('open');
    e.target.classList.toggle('show');
}

//The card is "saved" in cardList, to compare then with the second card
function cardHolder(e) {
    if (e.target.classList.contains('open')) {
        cardList.push(e.target);
    }
}

//Function when the two cards match
function cardMatch(e) {
    e.classList.add('match');
    e.classList.remove('open', 'show');
    cardMatched.push(e);
    //If all cards matched 
    if (cardMatched.length == cards.length) {
        // add that the timer stop
        openModal();
    }
}

//And when they don't match
function cardDontMatch(e) {
    e.classList.remove('open', 'show');
}


//To increase the moves count
function increaseMove() {
    moves += 1;
    // TIMER start at the first card clicked
    if (moves == 1) {
        startTimer();
    }

    document.querySelector('.moves').innerHTML = moves;
    // Stars disappear if too much moves
    if (moves == 14) {
        stars.firstElementChild.remove();
    }
    if (moves == 25) {
        stars.firstElementChild.remove();
    }
    if (moves == 40) {
        stars.firstElementChild.remove();
        stars.innerHTML = '';
    }

}

/*
 * TIMER
 */
let sec = 0,
    min = 0;
let interval;
var timer = document.querySelector('.timer');

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = min + ' min ' + sec + ' sec';
        if (sec == 60) {
            min++;
            sec = 0;
        } else {
            sec++;
        }
    }, 1000);
}
let finalSec, finalMin;

function stopTimer() {
    finalSec = sec;
    finalMin = min;
    document.querySelector('.timer').innerHTML = finalMin + ' min ' + finalSec + ' sec';
    clearInterval(interval);
}

/*
 * MODAL
 */
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
let retryButton = document.querySelector('.retry-button');
let starsRate = document.querySelector('.stars-rate');
let timePassed = document.querySelector('.time-passed');

//openModal function
function openModal() {
    stopTimer();
    modal.style.display = 'block';
    if (stars.innerHTML == '') {
        starsRate.innerHTML = '0 star';
    } else {
        starsRate.innerHTML = stars.innerHTML;
    }
    document.querySelector('.moves-total').innerHTML = moves;
    timePassed.innerHTML = timer.innerHTML;
}

// 2 options to close the modal
closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

if (modal.style.display == 'block') {
    window.addEventListener('click', function () {
        modal.style.display = 'none';
    });
}
//Want to retry button
retryButton.addEventListener('click', function () {
    location.reload();
});
