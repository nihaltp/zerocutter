import { players, renderPlayerTable, updateCurrentPlayer } from "./script.js";

window.editPlayerName = editPlayerName;
window.changePlayerColor = changePlayerColor;

// Edit Player Name
function editPlayerName(index) {
    const newName = prompt("Enter new name:", players[index].name);
    if (newName) {
        players[index].name = newName;
        renderPlayerTable();
        updateCurrentPlayer();
    }
}

// Change Player Color
function changePlayerColor(index) {
    const input = document.createElement("input");
    input.type = "color";
    input.value = players[index].color;
    input.click();
    input.addEventListener("input", () => {
        if (players.some((p, i) => i !== index && p.color === input.value)) {
            alert("⚠️ This color is already taken. Choose another.");
        } else {
            players[index].color = input.value;
            renderPlayerTable();
            updateCurrentPlayer();
        }
    });
}
