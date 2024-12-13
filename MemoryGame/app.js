document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#game-grid");
    const scoreDisplay = document.querySelector("#score");
    let score = 0;
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];

    // 1. Defined the card array
    const cardArray = [
        { name: "🍎", dataName: "apple" },
        { name: "🍎", dataName: "apple" },
        { name: "🍌", dataName: "banana" },
        { name: "🍌", dataName: "banana" },
        { name: "🍇", dataName: "grape" },
        { name: "🍇", dataName: "grape" },
        { name: "🍓", dataName: "strawberry" },
        { name: "🍓", dataName: "strawberry" },
    ];

    // 2. Shuffle the cards
    cardArray.sort(() => 0.5 - Math.random());

    // 3. Create the game board dynamically
    function createBoard() {
        cardArray.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.setAttribute("class", "card");
            cardElement.setAttribute("data-id", index);
            cardElement.setAttribute("data-name", card.dataName);
            cardElement.addEventListener("click", flipCard);
            grid.appendChild(cardElement);
        });
    }

    // 4. Flip the card
    function flipCard() {
        const cardId = this.getAttribute("data-id");
        if (!cardsChosenIds.includes(cardId) && cardsChosen.length < 2) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenIds.push(cardId);
            this.classList.add("flipped");
            this.textContent = cardArray[cardId].name;

            if (cardsChosen.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    // 5. Check for a match
    function checkMatch() {
        const cards = document.querySelectorAll(".card");
        const [firstCardId, secondCardId] = cardsChosenIds;

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[firstCardId].classList.add("matched");
            cards[secondCardId].classList.add("matched");
            cardsWon.push(cardsChosen[0]);
            score++;
            scoreDisplay.textContent = score;
        } else {
            cards[firstCardId].classList.remove("flipped");
            cards[secondCardId].classList.remove("flipped");
            cards[firstCardId].textContent = "";
            cards[secondCardId].textContent = "";
        }

        // Reset chosen arrays
        cardsChosen = [];
        cardsChosenIds = [];

        // Check win condition
        if (cardsWon.length === cardArray.length / 2) {
            alert("Congratulations! You've found all pairs!");
        }
    }

    createBoard();
});