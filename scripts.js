//Helper Functions
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

var cards = [
  { value: "2", image: "./images/clubs_2.svg", matched: false },
  { value: "3", image: "./images/clubs_3.svg", matched: false },
  { value: "4", image: "./images/clubs_4.svg", matched: false },
  { value: "5", image: "./images/clubs_5.svg", matched: false },
  { value: "6", image: "./images/clubs_6.svg", matched: false },
  { value: "7", image: "./images/clubs_7.svg", matched: false },
  { value: "2", image: "./images/clubs_2.svg", matched: false },
  { value: "3", image: "./images/clubs_3.svg", matched: false },
  { value: "4", image: "./images/clubs_4.svg", matched: false },
  { value: "5", image: "./images/clubs_5.svg", matched: false },
  { value: "6", image: "./images/clubs_6.svg", matched: false },
  { value: "7", image: "./images/clubs_7.svg", matched: false },
];

var cardEls = document.querySelectorAll(".card");
var firstGuess = null;
var canGuess = true;
var flippedCards = 0;
var guess = 0;
shuffle(cards);

function resetGame() {
  canGuess = false;
  setTimeout(function () {
    firstGuess = null;
    canGuess = true;
    flippedCards = 0;
    guess = 0;
    cardEls.forEach(function (el, index) {
      el.setAttribute("src", "./images/blue2.svg");
    });
    cards.forEach(function (card, index) {
      card.matched = false;
    });

    document.querySelector("#guesses").textContent = guess;
    document.querySelector("#win").textContent="";
    shuffle(cards);
  }, 2000);
}

cardEls.forEach(function (el, index) {
  el.addEventListener("click", function () {
    if (index === firstGuess || cards[index].matched || !canGuess) {
      alert("Invalid guess");
      return;
    }
    var clickedCard = cards[index];
    el.setAttribute("src", clickedCard.image);

    if (firstGuess === null) {
      firstGuess = index;
    } else {
      guess++;
      document.querySelector("#guesses").textContent = guess;
      if (cards[firstGuess].value === cards[index].value) {
        //Its a match
        cards[firstGuess].matched = true;
        cards[index].matched = true;
        firstGuess = null;
        flippedCards += 2;
        //Check for win and reset
        if (flippedCards === cards.length) {
          document.querySelector("#win").textContent="You Win";
          resetGame();
        }
      } else {
        canGuess = false;
        setTimeout(function () {
          cardEls[firstGuess].setAttribute("src", "./images/blue2.svg");
          cardEls[index].setAttribute("src", "./images/blue2.svg");
          firstGuess = null;
          canGuess = true;
        }, 600);

        //no match
      }
    }
  });
});

document.querySelector("#reset").addEventListener("click", function () {

  resetGame();
});
