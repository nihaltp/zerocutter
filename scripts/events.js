import { playerCount, getRandomColor, setPlayerCount, setPlayers } from "./script.js";

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
    }
    else {
        messagePlayers.textContent = "⚠️ Please enter a valid number of players.";
        messagePlayers.style.color = "#ff8a8a";
        messagePlayers.style.display = "block";
    }
    
    nextBtn.removeEventListener("click", () => triangleClick(triangleInputDiv, playerInputDiv, popupPlayers, messagePlayers));
}
