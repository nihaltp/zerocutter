import { playerCount, getRandomColor, setPlayerCount, setPlayers, renderPlayerTable, renderTriangle, triangleSets, triangleSize, updateCurrentPlayer, setTriangleSize, setTriangleSets } from "./script.js";

export function hidePlayerInput(gameInstructionDiv, okBtn, playerInputDiv) {
    gameInstructionDiv.classList.add("hidden");
    okBtn.style.display = "none";
    playerInputDiv.classList.remove("hidden");
    okBtn.removeEventListener("click", () => hidePlayerInput(gameInstructionDiv, okBtn, playerInputDiv));
}

export function triangleClick(triangleInputDiv, playerInputDiv, popupPlayers, messagePlayers) {
    setPlayerCount(parseInt(document.getElementById("players").value));
    
    if (playerCount && playerCount > 0) {
        let newPlayers = Array.from({ length: playerCount }, (_, i) => ({
            name: `Player ${i + 1}`,
            score: 0,
            color: getRandomColor()
        }));
        setPlayers(newPlayers);
        
        playerInputDiv.classList.add("hidden");
        triangleInputDiv.classList.remove("hidden");
        
        const triangleInput = document.getElementById("triangleSize");
        triangleInput.min = playerCount + 2;  // Change minimum value
        triangleInput.placeholder = "Eg. " + (playerCount + 2); // Change placeholder
    }
    else {
        messagePlayers.textContent = "⚠️ Please enter a valid number of players.";
        messagePlayers.style.color = "#ff8a8a";
        messagePlayers.style.display = "block";
    }
    
    nextBtn.removeEventListener("click", () => triangleClick(triangleInputDiv, playerInputDiv, popupPlayers, messagePlayers));
}

export function startClick(popupPlayers, gameBoard, messageTriangle) {
    setTriangleSize(parseInt(document.getElementById("triangleSize").value));
    if (triangleSize && triangleSize > playerCount + 1) {
        popupPlayers.classList.add("hidden");
        document.body.style.overflow = "auto";
        gameBoard.classList.remove("hidden");
        
        renderPlayerTable();
        renderTriangle();
        updateCurrentPlayer();
        
        startBtn.removeEventListener("click", () => startClick(popupPlayers, gameBoard, messageTriangle));
    } else {
        messageTriangle.textContent = "⚠️ Please enter a valid triangle size (min player count + 2): " + (playerCount + 2) + ").";
        messageTriangle.style.color = "#ff8a8a";
        messageTriangle.style.display = "block";
    }
}
