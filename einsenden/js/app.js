// The Card List

//const pictures = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
//"fa fa-anchor", "fa fa-anchor", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf",
//"fa fa-bomb", "fa fa-bomb", "fa fa-bolt", "fa fa-bolt", "fa fa-bicycle", "fa fa-bicycle"];

var pics1 = ["fa fa-diamond", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-cube", "fa fa-leaf", 
"fa fa-bomb", "fa fa-bolt", "fa fa-bicycle"];

//var pics2 = ["fa fa-diamond", "fa fa-paper-plane-o",
//"fa fa-anchor", "fa fa-cube", "fa fa-leaf", 
//"fa fa-bomb", "fa fa-bolt", "fa fa-bicycle"];

const pictures = pics1.concat(pics1);


const cardsContainer = document.querySelector(".deck");

let openCards = [];
let matchedCards = [];
let firstClick = true;
let wintime
let timerlet



// Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }
  
// start the game - create the cards
function GameStarter(){

// Shuffle the pictures ----use the given shuffle function----
  let shuffleCards = shuffle (pictures);


// create the cards
    let i;
    for (i = 0; i < pictures.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = "<i class='"+pictures[i]+"'</i>"
        cardsContainer.appendChild(card);

        // set timer
        document.getElementById("timer").innerHTML = "0:0:0";
        // Add Click Event to each card
        click(card);
    }
}

// The Click Event

 function click(card){

     // card click Event
     card.addEventListener("click", function(){

        const secondCard = this;
        const firstCard = openCards[0];

        // start timer
        if(firstClick) {
            firstClick = false;
            timerlet = setInterval(startTimer, 1000);
            startTimer();
        }

        // We have an existing open card
        if(openCards.length === 1) {

            card.classList.add("open", "show", "closed");
            openCards.push(this);       
            
            // compare the 2 open cards!
            compare(secondCard, firstCard);
   

    } else {
    // We don't have any open cards
        card.classList.add("open", "show", "closed");
        openCards.push(this);
    }
  });
 }


 // comparing cards

function compare(secondCard, firstCard) {
  // compare 2 open cards!
  if(secondCard.innerHTML === firstCard.innerHTML) {

     //Matched
     secondCard.classList.add("match");
     firstCard.classList.add("match");

     matchedCards.push(secondCard,firstCard);

     openCards =[];

} else {

  // Wait 500ms, then, close the cards!
  setTimeout(function() {
      secondCard.classList.remove("open", "show", "closed");
      firstCard.classList.remove("open", "show", "closed");

  }, 500);

  openCards =[];

  }
  // add new Move
  addMove();
  // Check if the game isOver();
  solved();
}


// game solved

function solved() {
  if (matchedCards.length === 16) {
      stopTimer();
      togglePopup();
  }
}


// The star rating

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove(){
  moves++;
  movesContainer.innerHTML = moves;

    if (moves === 14) {
    let el = document.getElementById("star3");
    el.style.opacity = '0';
    }
    if (moves === 17) {
    let el = document.getElementById("star2");
    el.style.opacity = '0';
    }
    if (moves === 19) {
    let el = document.getElementById("star1");
    el.style.opacity = '0';
  }
}

// The winner popup
let popup = document.querySelector(".popup");
let playAgainButton = document.querySelector(".playAgain-button");
let offclick = document.querySelector(".popup");

function togglePopup() {
        popup.classList.toggle("show-popup");

  if(moves <= 13) {
      document.getElementById('winnertext').innerHTML = 'You did it in '+ moves+ ' moves\n'  
      + ' and your time is ' + wintime+'<br /> Perfekt! <br /> Gratulations!<br /> you got a 3 star rating!';
      }
  if(moves >= 14) {
      document.getElementById('winnertext').innerHTML = 'You did it in '+ moves+ ' moves\n'  
      + ' and your time is ' + wintime + '<br /> not bad! <br /> you got a 2 star rating!';
      }
  if(moves >= 17) {
      document.getElementById('winnertext').innerHTML = 'You did it in '+ moves+ ' moves\n'
      + ' and your time is ' + wintime+ '<br /> gives a 1 star rating for you! <br /> Go on and practise!';
      }
  if(moves >= 19){
      document.getElementById('winnertext').innerHTML = 'You did it in '+ moves+ ' moves\n'  
      + ' and your time is ' + wintime+'<br />you solved it!<br /> but you can do it better! <br /> work harder for your stars!';
      }
}

playAgainButton.addEventListener("click", restart);
offclick.addEventListener('click', togglePopup);


// The timer

let totalSeconds = 0;

function startTimer(){
   totalSeconds+= 1;

   if(firstClick === false){
   let hour = Math.floor(totalSeconds /3600);
   let minute = Math.floor((totalSeconds - hour*3600)/60);
   let seconds = totalSeconds - (hour*3600 + minute*60);

   document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
   wintime = hour + ":" + minute + ":" + seconds;
  }
}

// Stop Timer
function stopTimer() {

  firstClick = true;
  clearInterval(timerlet);
  }


// The restart button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", restart)
function restart(){
  // Delete all cards
  cardsContainer.innerHTML = "";
  // reset any related letiables
  matchedCards =[];
  moves = 0;
  movesContainer.innerHTML = moves;
  totalSeconds = 0;
  stopTimer();

  var el = document.getElementById("star1");
  el.style.opacity = '1';
  var el = document.getElementById("star2");
  el.style.opacity = '1';
  var el = document.getElementById("star3");
  el.style.opacity = '1';
  GameStarter();

}

//Game starter
GameStarter();


// The info Popup
function infoPopup() {
    var infopopup = document.getElementById('GameInfoPopup');
    infopopup.classList.toggle('show');
}