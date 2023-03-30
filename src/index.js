let currentGame;
const gameTitle = document.getElementById('detail-title');
const gameDetails = document.getElementById('game-details');
const gameImage = document.getElementById('detail-image');
const gameHighScore = document.getElementById('detail-high-score');
const gameList = document.getElementById('game-list');
const scoreForm = document.getElementById('high-score-form');
scoreForm.addEventListener('submit', updateHighScore);

fetch (" http://localhost:3000/games")
.then(response => response.json())
.then(games => {
    games.forEach(displayGames);
    displayGameDetails(games[0]);
})

function displayGames(game) {
    const gameListItem = document.createElement('h5');
    gameListItem.textContent = game.name + (" ") + `(${game.manufacturer_name})`;
    gameList.append(gameListItem)
    gameListItem.addEventListener('click', () => displayGameDetails(game))
    gameListItem.style.cursor = 'crosshair';
}

function displayGameDetails(game) {
    currentGame = game;
    gameImage.src = currentGame.image;
    gameTitle.textContent = currentGame.name;
    gameHighScore.textContent = currentGame.high_score;
    console.log(currentGame);

}
function updateHighScore(event) {
    event.preventDefault();
    let score = document.getElementById('score-input').value;
    score = parseInt(score);
    currentGame.high_score += score;
    gameHighScore.textContent = currentGame.high_score;
    event.target.reset();

    fetch(`http://localhost:3000/games/${currentGame.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentGame)
    })

}


