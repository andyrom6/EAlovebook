document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cards");
    const startButton = document.getElementById("start-button");
    const images = [
        "https://i.imgur.com/l4hAZo7.png",
        "https://i.imgur.com/S8KSfAJ.png",
        "https://i.imgur.com/Ke7dlAN.jpg",
        "image4.jpgs",
        "image5.jpg",
        "image6.jpg",
        "image7.jpg",
        "image8.jpg"
    ];

    let flippedCards = [];
    let matchedPairs = 0;
    let isFlipping = false;

    startButton.addEventListener("click", startGame);

    function startGame() {
        cardsContainer.innerHTML = "";
        matchedPairs = 0;
        flippedCards = [];
        isFlipping = false;

        const shuffledImages = shuffleArray(images.concat(images));
        shuffledImages.forEach((imageName, index) => {
            const card = createCard(imageName, index);
            cardsContainer.appendChild(card);
        });

        startButton.disabled = true;
    }

    function createCard(imageName, index) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = imageName;
        card.addEventListener("click", () => flipCard(card));

        const front = document.createElement("div");
        front.classList.add("front");
        card.appendChild(front);

        const back = document.createElement("div");
        back.classList.add("back");
        back.style.backgroundImage = `url(${imageName})`;
        card.appendChild(back);

        return card;
    }

    function flipCard(card) {
        if (isFlipping || flippedCards.includes(card)) return;

        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            isFlipping = true;
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const image1 = card1.dataset.image;
        const image2 = card2.dataset.image;

        if (image1 === image2) {
            card1.removeEventListener("click", flipCard);
            card2.removeEventListener("click", flipCard);
            matchedPairs++;

            if (matchedPairs === images.length) {
                alert("Congratulations! You've matched all pairs.");
                startButton.disabled = false;
            }
        } else {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }

        flippedCards = [];
        isFlipping = false;
    }

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
});
