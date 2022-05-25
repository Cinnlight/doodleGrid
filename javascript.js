// ----- HTML Selectors ----- //

let buttons = document.querySelectorAll("button");
let gridContainer = document.querySelector("#gridContainer")

// ----- Interactive button-click scripting ----- //

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        
        // Resize the canvas to user-input size
        if (button.id === "resizeCanvas") {
            gridSize = prompt("Please enter a size between 1-100.");
            if (gridSize <= 100 && gridSize > 0) {
                removeChildren(gridContainer);
                makeGrid(gridSize);
            } else if (gridSize === null || gridSize === "") {
                return;
            } else {
                alert(`${gridSize} is invalid. Please enter a size between 1-100.`)
            }
        }

    });
});

// ----- Function to: ----- //
// Accept user input
// Generate a square grid of divs based on user input

function makeGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for(let x = 1; x <= gridSize; x++) {
            let cell = document.createElement("div");
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