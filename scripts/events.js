import { playerCount, getRandomColor, setPlayerCount, setPlayers } from "./script.js";

export function hidePlayerInput(okBtn, playerInputDiv) {
    okBtn.style.display = "none";
    playerInputDiv.classList.remove("hidden");
    okBtn.removeEventListener("click", () => hidePlayerInput(okBtn, playerInputDiv));
}

export function triangleClick(popupPlayers, popupTriangle, messagePlayers) {
    setPlayerCount(parseInt(document.getElementById("players").value));
    
    if (playerCount && playerCount > 0) {
        let newPlayers = Array.from({ length: playerCount }, (_, i) => ({
            name: `Player ${i + 1}`,
            score: 0,
            color: getRandomColor()
        }));
        setPlayers(newPlayers);
        
        setTimeout(() => {
            popupPlayers.classList.add("hidden");
            popupTriangle.classList.remove("hidden");
        }, 1000);
    }
    else {
        messagePlayers.textContent = "⚠️ Please enter a valid number of players.";
        messagePlayers.style.color = "#ff8a8a";
        messagePlayers.style.display = "block";
    }
    nextBtn.removeEventListener("click", () => triangleClick(popupPlayers, popupTriangle, messagePlayers));
}
