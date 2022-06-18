// ----- HTML Selectors ----- //

let buttons = document.querySelectorAll("button");
let gridContainer = document.querySelector("#gridContainer");
let gridSquare = document.querySelector(".gridSquare");
let colorBtn = document.querySelector(".colorBtn");
let setColorBtn = document.querySelector("#setColor");
let colorPicker = document.querySelector("#colorChoice");
let toggleShader = document.querySelector("#toggleShader");
let toggleBrighten = document.querySelector("#toggleBrighten");
let toggleGrid = document.querySelector("#toggleGrid");

// ----- Color picker styling and handling ----- //

colorPicker.addEventListener('input', () => {
    drawState = "draw";
    colorPicker.style.setProperty('--color', colorPicker.value);
    userColor = colorPicker.value;
});

// ----- Button press handler and button events ----- //

let currentSize;
let gridToggleStatus = 0;

buttons.forEach((button) => {
    button.addEventListener('click', () => {

        // Reset canvas to original size & clear canvas
        if (button.id === "resetCanvas") {
            if (confirm("Are you sure? This will delete all progress.") == true) {
                if (currentSize != null) {
                    gridSize = currentSize;
                } else { 
                    gridSize = 16;
                }
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
                currentSize = gridSize;
            } else if (gridSize === null || gridSize === "") {
                return;
            } else {
                alert(`${gridSize} is invalid. Please enter a size between 1-100.`)
            }
        }

        // Change color when Set Color button is pressed
        if (button.className === "colorBtn") {
            drawState = "draw";
            userColor = button.id;
        }

        if (button.id === "eraserBtn") {
            drawState = "draw"
            userColor = "whitesmoke";
        }

        // Open/close about-overlay
        if (button.id === "aboutBtn") {
            overlayOn();
        }
        if (button.id === "overlayExitBtn") {
            overlayOff();
        }

        // Toggle grid-lines
        if (button.id === "toggleGrid") {
            if (gridToggleStatus == 0) {
                let squares = document.getElementsByClassName("gridSquare");
                for (i = 0; i < squares.length; i++) {
                    squares[i].style.border = "none";
                }
                gridToggleStatus++;
            } else {
                let squares = document.getElementsByClassName("gridSquare");
                for (i = 0; i < squares.length; i++) {
                    squares[i].style.border = ".5px solid rgba(128, 128, 128, 0.5)";
                }
                gridToggleStatus = 0;
            }
        }

        // Toggle shader
        if (button.id === "toggleShader") {
            if (drawState != "shade") {
                toggleShader.classList.add("toggleBtnActive");
                toggleBrighten.classList.remove("toggleBtnActive");
            } else {
                toggleShader.classList.remove("toggleBtnActive");
            }
            switch (drawState) {
                case "draw":
                    drawState = "shade";
                    break;
                case "shade":
                    drawState = "draw";
                    break;
                case "brighten":
                    drawState = "shade";
                    break;
                default:
                    drawState = "draw";
                    console.log("Error - toggleShader had an invalid case");
            }
        }

        // Toggle brighten
        if (button.id === "toggleBrighten") {
            if (drawState != "brighten") {
                toggleBrighten.classList.add("toggleBtnActive");
                toggleShader.classList.remove("toggleBtnActive");
            } else {
                toggleBrighten.classList.remove("toggleBtnActive");
            }
            switch (drawState) {
                case "draw":
                    drawState = "brighten";
                    break;
                case "shade":
                    drawState = "brighten";
                    break;
                case "brighten":
                    drawState = "draw";
                    break;
                default:
                    drawState = "draw";
                    console.log("Error - toggleShader had an invalid case");
            }
        }
    });
});

// ----- Mouse up/down scripting to track mouse state ----- //

let mouseDown = 0;
document.body.addEventListener('mousedown', () => {
    ++mouseDown;
    if (mouseDown > 1 || mouseDown < 0) {
        mouseDown = 0;
    }
});

document.body.addEventListener('mouseup', () => {
    --mouseDown;
    if (mouseDown > 1 || mouseDown < 0) {
        mouseDown = 0;
    }
});
// ----- Function to: ----- //
// Accept user input
// Generate a square grid of divs based on user input
// Add event-listener to gridSquare
// Draw while mouse is clicked in user-selected color

let userColor = "black";
let drawState = "draw";
let shaderColor;

function makeGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for(let x = 1; x <= gridSize; x++) {
            let cell = document.createElement("div");
            cell.addEventListener('mouseenter', () => {
                if (mouseDown == 1) {
                    let col;
                    switch (drawState) {
                        case "draw":
                            cell.style.background = userColor;
                            break;
                        case "shade":
                            col = window.getComputedStyle(cell).getPropertyValue('background-color');
                            col = RGB_Log_Shade(-.20, col);
                            cell.style.background = col;
                            break;
                        case "brighten":
                            col = window.getComputedStyle(cell).getPropertyValue('background-color');
                            col = RGB_Linear_Shade(.10, col);
                            cell.style.background = col;
                            break;
                        default:
                            console.log("Error - drawState value invalid");
                    }
                }
            });
            cell.addEventListener('mousedown', () => {
                switch (drawState) {
                    case "draw":
                        cell.style.background = userColor;
                        break;
                    case "shade":
                        col = window.getComputedStyle(cell).getPropertyValue('background-color');
                        col = RGB_Log_Shade(-.20, col);
                        cell.style.background = col;
                        break;
                    case "brighten":
                        col = window.getComputedStyle(cell).getPropertyValue('background-color');
                        col = RGB_Linear_Shade(.10, col);
                        cell.style.background = col;
                        break;
                    default:
                        console.log("Error - drawState value invalid");
                }
            });
            cell.className = "gridSquare";
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

// ----- Function to: ----- //
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
    gridSize = 16;
    makeGrid(gridSize);
}

// Function to toggle 'about' overlay

function overlayOn() {
    document.getElementById("aboutOverlay").style.display = "flex";
}

function overlayOff() {
    document.getElementById("aboutOverlay").style.display = "none";
}

// Compact lighten/darken functions by 
// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#stackoverflow-archive-begin

const RGB_Linear_Shade=(p,c)=>{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
}

const RGB_Log_Shade=(p,c)=>{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:p*255**2,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r((P*i(a[3]=="a"?a.slice(5):a.slice(4))**2+t)**0.5)+","+r((P*i(b)**2+t)**0.5)+","+r((P*i(c)**2+t)**0.5)+(d?","+d:")");
}