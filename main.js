const symbols = [
    '¯\\_(ツ)_/¯', '( ͡° ͜ʖ ͡°)', '(⊙ _ ⊙ )', '( -_•)╦̵̵̿╤─',
    '༼ つ ◕_◕ ༽つ', '◝(ᵔᗜᵔ)◜', '¯\\_(ツ)_/¯', '( ͡° ͜ʖ ͡°)', 
    '(⊙ _ ⊙ )', '( -_•)╦̵̵̿╤─', '༼ つ ◕_◕ ༽つ', '◝(ᵔᗜᵔ)◜'
];

const memoryGame = document.getElementById('memory-game');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.innerHTML = `<p>${symbol}</p>`;
    card.addEventListener('click', flipCard);
    return card;
}

function startGame() {
    const shuffledSymbols = shuffle(symbols);
    shuffledSymbols.forEach(symbol => {
        const card = createCard(symbol);
        memoryGame.appendChild(card);
    });
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

startGame();
