// ----- HTML Selectors ----- //

let buttons = document.querySelectorAll("button");
let gridContainer = document.querySelector("#gridContainer");
let gridSquare = document.querySelector(".gridSquare");
let colorBtn = document.querySelector(".colorBtn");
let setColorBtn = document.querySelector("#setColor");
let colorPicker = document.querySelector("#colorChoice");

// ----- Button press handler and button events ----- //

buttons.forEach((button) => {
    button.addEventListener('click', () => {

        // Reset canvas to original size & clear canvas
        if (button.id === "resetCanvas") {
            if (confirm("Are you sure? This will delete all progress.") == true) {
                gridSize = 32;
                removeChildren(gridContainer);
                makeGrid(gridSize);
            }
        }
        
        // Resize the canvas to user-input size
        if (button.id === "resizeCanvas") {
            gridSize = prompt("Please enter a size between 1-100.\nThis will delete all progress.");
            if (gridSize <= 100 && gridSize > 0) {
                removeChildren(gridContainer);
                makeGrid(gridSize);
            } else if (gridSize === null || gridSize === "") {
                return;
            } else {
                alert(`${gridSize} is invalid. Please enter a size between 1-100.`)
            }
        }

        // Change color when Set Color button is pressed
        if (button.id === "setColor") {
            userColor = document.getElementById("colorChoice").value;
        }

        if (button.className === "colorBtn") {
            userColor = button.id;
        }

        if (button.id === "eraserBtn") {
            userColor = "whitesmoke";
        }
    });
});

// Set color-picker accept btn to current color-picker color

colorPicker.addEventListener("mouseleave", () => {
    setColorBtn.style.background = document.getElementById("colorChoice").value;
});

setColorBtn.style.background = document.getElementById("colorChoice").value;

// ----- Mouse up/down scripting to track mouse state ----- //

let mouseDown = 0;
document.body.addEventListener('mousedown', () => {
    ++mouseDown;
    if (mouseDown > 1 || mouseDown < 0) {
        mouseDown = 0;
    }
    console.log('click!')
});

document.body.addEventListener('mouseup', () => {
    --mouseDown;
    if (mouseDown > 1 || mouseDown < 0) {
        mouseDown = 0;
    }
    console.log('un-click!')
});
// ----- Function to: ----- //
// Accept user input
// Generate a square grid of divs based on user input
// Add event-listener to gridSquare
// Draw while mouse is clicked in user-selected color

let userColor = "black";

function makeGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for(let x = 1; x <= gridSize; x++) {
            let cell = document.createElement("div");
            cell.addEventListener('mouseenter', () => {
                if (mouseDown == 1) {
                    cell.style.background = userColor;
                    console.log(`${i},${x}`);
                }
            });
            cell.addEventListener('mousedown', () => {
                cell.style.background = userColor;
            });
            cell.className = "gridSquare";
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

// Function to:
// Remove all children from parent node

function removeChildren(parent) {
    let child = parent.firstElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.firstElementChild;
    }
}

// ----- On-page load grid initialization ----- //
for (let i = 0; i < 1; i++) {
    gridSize = 32;
    makeGrid(gridSize);
}