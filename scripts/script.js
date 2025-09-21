import { okBtn } from "./elements.js";
import { hidePlayerInput } from "./events.js";

export let playerCount = 0;
export let triangleSize = 0;
let currentPlayer = 1;
export let players = [];
export let triangleSets = []

// Popup logic remains same as before for players & triangle input
window.onload = () => {
    okBtn.addEventListener("click", () => hidePlayerInput());
    
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            hidePlayerInput();
        }
    });
};

// Utility: Random pastel color for players
export function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`;
}

// Render Player Table
export function renderPlayerTable() {
    const table = document.getElementById("playerTable");
    table.innerHTML = `
        <tr>
            ${players.map((p, i) => `
                <th class="player-header">
                    <span id="name-${i}" onclick="editPlayerName(${i})">${p.name}</span>
                    <i class="fa-solid fa-pen-to-square" onclick="editPlayerName(${i})"></i>
                </th>`).join('')}
        </tr>
        <tr>
            ${players.map((p, i) => `<td id="score-${i}">${p.score}</td>`).join('')}
        </tr>
        <tr>
            ${players.map((p, i) => `<td><span class="color-box" style="background:${p.color}" onclick="changePlayerColor(${i})"></span></td>`).join('')}
        </tr>
    `;
}

// Render Triangle
export function renderTriangle() {
    const container = document.getElementById("triangleContainer");
    container.innerHTML = "";
    let circleId = 1;

    for (let row = 1; row <= triangleSize; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "triangle-row";

        for (let col = 0; col < row; col++) {
            const circle = document.createElement("div");
            circle.className = "circle";
            circle.dataset.id = circleId++;

            // Add click event for game logic
            circle.addEventListener("click", function handleClick() {
                // If already colored, ignore
                if (circle.style.background && circle.style.background !== "white") {
                    return;
                }

                // Set circle color to current player's color
                circle.style.background = players[currentPlayer - 1].color;
                circle.classList.add("clicked");

                // Remove this listener (circle can't be clicked again)
                circle.removeEventListener("click", handleClick);
                
                // Check the layers with this circle & update score
                processCircleClick(triangleSets, circle.dataset.id, players[currentPlayer - 1]);
            });

            rowDiv.appendChild(circle);
        }

        container.appendChild(rowDiv);
    }
}

/**
 * Process a number click: remove from all layers, check for empty layers, update score
 * @param {Array} sets - Array containing 3 sets of layers
 * @param {string|number} num - Circle/Number clicked
 * @param {Object} player - The current player object {name, score, color}
 */
function processCircleClick(sets, num, player) {
    const value = String(num);
    let score = 0;
    
    sets.forEach((set, setIndex) => {
        // Iterate backward so we can remove layers safely
        for (let i = set.length - 1; i >= 0; i--) {
            const layer = set[i];
            
            // Remove the circle/number from the layer
            layer.circles.delete(value);
            
            // If layer is now empty, award points and remove layer
            if (layer.circles.size === 0) {
                score += layer.originalSize;
                set.splice(i, 1);
            }
        }
    });
    
    // Add the points to the player
    player.score += score;
    renderPlayerTable();
    checkTotalScore();
    
    // Switch to next player
    currentPlayer = (currentPlayer % playerCount) + 1;
    updateCurrentPlayer();
}

/**
 * Check if all points are scored trigger game end
 * @param {Array} players - Array of player objects with a 'score' property
 * @param {number} triangleSize - Size of the triangle
 * @param {Function} onComplete - Function to call when total score is reached
 */
export function checkTotalScore() {
    // Calculate the total sum of all circles in all three sets
    let sum = 0;0
    for (let i = 1; i <= triangleSize; i++) {
        sum += i; // sum of numbers from 1 to size
    }
    sum *= 3; // because there are 3 sets
    sum -= 3; // because we dont count layers of 1
    
    // Calculate current total score
    const totalScore = players.reduce((acc, player) => acc + player.score, 0);
    
    // If total scores match the sum, trigger the function
    if (totalScore === sum) {
        showWinner();
    }
}

function showWinner() {
    const popupWinner = document.getElementById("popupWinner");
    const winnerMessage = document.getElementById("winnerMessage");
    const winnerColor = document.getElementById("winnerColor");
    const winnerScore = document.getElementById("winnerScore");
    
    let player = players.reduce((prev, curr) => (curr.score > prev.score ? curr : prev), players[0]);
    
    winnerMessage.textContent = `Winner: ${player.name}`;
    winnerColor.style.backgroundColor = player.color;
    winnerScore.textContent = `Score: ${player.score}`;
    
    popupWinner.classList.remove("hidden");
    
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", () => {
        location.reload();
    });
}

// Update Current Player Display
export function updateCurrentPlayer() {
    document.getElementById("currentPlayerName").textContent = players[currentPlayer-1].name;
    document.getElementById("currentPlayerColor").style.background = players[currentPlayer-1].color;
}

export function setPlayerCount(count) {
    playerCount = count;
}

export function setPlayers(newPlayers) {
    players = newPlayers;
}

export function setTriangleSize(size) {
    triangleSize = size;
}

export function setTriangleSets(sets) {
    triangleSets = sets;
}
