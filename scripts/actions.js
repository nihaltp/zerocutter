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
        saveName(index, newName);
    }
}

// Save Player Name
function saveName(index, newName) {
    localStorage.setItem(`playerName${index}`, newName);
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
            let previousColor = players[index].color;
            players[index].color = input.value;
            renderPlayerTable();
            updateCurrentPlayer();
            changeColor(previousColor, input.value);
        }
    });
}

// Change all circle colors to match the new color
function changeColor(previousColor, newColor) {
    previousColor = normalizeColor(previousColor);
    newColor = normalizeColor(newColor);
    
    document.querySelectorAll(".circle").forEach(circle => {
        if (getComputedStyle(circle).backgroundColor === previousColor) {
            circle.style.backgroundColor = newColor;
        }
    });
}

function normalizeColor(color) {
    const div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);
    const rgb = getComputedStyle(div).color;
    document.body.removeChild(div);
    return rgb;
}
