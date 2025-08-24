import { hidePlayerInput, triangleClick } from "./events.js";

export let playerCount = 0;
let triangleSize = 0;
let currentPlayer = 1;
export let players = [];

// Popup logic remains same as before for players & triangle input
window.onload = () => {
    const gameInstructionDiv = document.getElementById("gameInstruction");
    const okBtn = document.getElementById("okBtn");
    
    const playerInputDiv = document.getElementById("playerInput");
    const nextBtn = document.getElementById("nextBtn");
    
    const triangleInputDiv = document.getElementById("triangleInput");
    const startBtn = document.getElementById("startBtn");
    
    const popupPlayers = document.getElementById("popupPlayers");
    const gameBoard = document.getElementById("gameBoard");
    
    const messagePlayers = document.getElementById("messagePlayers");
    const messageTriangle = document.getElementById("messageTriangle");

    // Step 1: Show input field when OK is clicked
    okBtn.addEventListener("click", () => hidePlayerInput(gameInstructionDiv, okBtn, playerInputDiv));

    // Step 2: Validate players, then go to triangle popup
    nextBtn.addEventListener("click", () => triangleClick(triangleInputDiv, playerInputDiv, popupPlayers, messagePlayers));

    // Step 3: Validate triangle size, then start game
    startBtn.addEventListener("click", () => {
        triangleSize = parseInt(document.getElementById("triangleSize").value);
        if (triangleSize && triangleSize > playerCount + 1) {
            popupPlayers.classList.add("hidden");
            document.body.style.overflow = "auto";
            gameBoard.classList.remove("hidden");

            renderPlayerTable();
            renderTriangle();
            updateCurrentPlayer();
            
            triangleSets = createTriangleSets(triangleSize);
            console.log("Triangle sets created:", triangleSets);
        } else {
            messageTriangle.textContent = "⚠️ Please enter a valid triangle size (min player count + 2): " + (playerCount + 2) + ").";
            messageTriangle.style.color = "#ff8a8a";
            messageTriangle.style.display = "block";
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
                    <span id="name-${i}">${p.name}</span>
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
function renderTriangle() {
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

                // Remove this listener (circle can't be clicked again)
                circle.removeEventListener("click", handleClick);

                // Switch to next player
                currentPlayer = (currentPlayer % playerCount) + 1;
                updateCurrentPlayer();
            });

            rowDiv.appendChild(circle);
        }

        container.appendChild(rowDiv);
    }
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
