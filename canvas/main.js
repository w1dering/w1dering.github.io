// common shapes

const SMALL_L = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const L = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const BIG_L = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const SMALL_J = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const J = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
];

const BIG_J = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
];

const DOT =
[
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const SMALL_O =
[
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const O =
[
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const BIG_O =
[
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const SMALL_I =
[
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const I =
[
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
];

const BIG_I =
[
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
];

const SMALL_T =
[
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]

const TWO_BY_THREE =
[
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
]

const DIAGONAL =
[
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0]
]

const SMALL_DIAGONAL =
[
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]

const BIG_DIAGONAL =
[
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0]
]

// colours
const red = "#EDC9D4";
const orange = "#FFBB69";
const yellow = "#FFF7CF";
const green = "#7DDE92";
const blue = "#C7E0FF";
const purple = "#C2A1FF";
const darkGray = "#37383A";
const lightGray = "#CCCCCC";



// list of references
const gameInterfaceDiv = document.querySelector(".game-interface");
const levelTitleHeader = document.querySelector(".level-title");

let canvasResolution = 1440;
let scale = 1;
if (!!window.chrome)
{
    scale = 4;
}
const inventoryCanvasBackground = document.getElementById("inventory-canvas-background");
const inventoryCTX = inventoryCanvasBackground.getContext("2d");
inventoryCanvasBackground.width = canvasResolution * scale;
inventoryCanvasBackground.height = canvasResolution * scale;

const inventoryDivOverlay = document.getElementById("inventory-div-overlay");

const gridSVG = document.getElementById("grid");
const gridHolderDiv = document.getElementById("grid-holder");

const goalCanvas = document.getElementById("goal-canvas");
const goalCTX = goalCanvas.getContext("2d");
goalCanvas.width = canvasResolution * scale; 
goalCanvas.height = canvasResolution * scale;

document.addEventListener("keydown", shortcutHandler);
document.querySelector(".level-button").addEventListener("click", chooseLevel);

document.querySelector(".popup-level-button").addEventListener("click", chooseLevel);

document.querySelector(".restart-button").addEventListener("click", confirmRestartLevel);

document.querySelector(".next-button").addEventListener("click", () => {
    loadLevel(parseInt(levelID) + 1);
});

document.querySelector(".help-button").addEventListener("click", () => {
    alert("Drag or click pieces from the inventory onto the board to transform it into the goal.\n" +
    "Placing a piece will fully override the colours present on the board.\n" + 
    "While dragging pieces, use q, a, or the left arrow to rotate counterclockwise, and e, d, or the right arrow to rotate clockwise.\n" +
    "Use Ctrl + Z to undo and Ctrl + Y to redo.\n" +
    "Use Shift + R to quickly restart the level, Ctrl + Enter to quickly choose a level, and Ctrl + Shift + Alt + Arrow Key to move between levels");
});

const forPopupDiv = document.getElementById("for-popup");
const forPopupDivOriginalStyle = forPopupDiv.style;
const popupSVG = document.getElementById("popup");

const windowSizeAlert = document.getElementById("window-size-alert");

/* array containing all levels' information
 * the format is:
 * [0]: 2d array containing original layout; each element is a NUMBER
    * the colours are as follows:
    * 1: red
    * 2: orange
    * 3: yellow
    * 4: green
    * 5: blue    * 6: purple
* [1]: 2d array containing goal 
* [2]: 2d array containing pieces; each piece is a 2d array:
    * [0]: shape, in the form of array or string ids for shorthand:
        * SMALL_L
            * [
                * [true, false],
                * [true, true]
            * ]
        * L
        * BIG_L
        * SMALL_J
        * J
        * BIG_J
        * DOT
        * O
        * BIG_O
        * SMALL_I (2 long)
        * I (3 long)
        * BIG_I (4 long)
        * array format: 2d bool array, true means tile is there, false means tile isn't
    * [1]: colour by number
 */
let levelInformation = new LevelInformation();
let dailyLevelInformation;
let levelID = 0;
let currentGrid = [];
let currentInventory;
let goalArray;
const inventorySubSquareCount = 7; // number of grid squares per piece slot
const pieceSubSquareCount = inventorySubSquareCount - 2; // the size of the pieces's internal array
let inventorySquareCount = 3;
let inventorySquareSize = inventoryCanvasBackground.width / inventorySquareCount; // size of square each piece is allocated
let inventorySubSquareSize = inventorySquareSize / inventorySubSquareCount; // size of each grid square within each square above
let piecesSVGArray;
let gridRectArray;
let draggedShape;
let gridSquareCount;
let squareHoveringOver; // the square a dragged piece is being hovered over
let canDropOff; //variable that determines if a piece can be dropped off at squareHoveringOver
let previousMouseCoordinates;
let history = [];
let historyIndex = -1;
let intervalsArray = [];
let timer;
let timerID;
let canUndoOrRedo = true;



loadLevel(levelID);
document.addEventListener("contextmenu", event => event.preventDefault()); // disables right click menu from appearing on right click
window.onresize = (event) => {
    console.log("window size changed");
    if (window.innerWidth < window.innerHeight)
    {
        windowSizeAlert.style.visibility = "visible";
    }
    else
    {
        windowSizeAlert.style.visibility = "hidden";
    }
    loadHistory(historyIndex); // refreshes canvas size to prevent a glitch in which loading a level with a smaller window size then resizing would cause the grid to not resize
}

function loadLevel(loadedLevelID) {
    if (loadedLevelID < 0 || loadedLevelID > levelInformation.length - 1)
    {
        return;
    }
    canUndoOrRedo = true;
    forPopupDiv.style.animation = "fadeOut 0.5s"; // fades the popup in
    popupSVG.style.transform = "translate(0%, -20%)"; // shifts popup downwards

    setTimeout(() => {
        forPopupDiv.style = forPopupDivOriginalStyle; // resets style and animation of popup
    }, 400);

    let currentLevel;
    if (loadedLevelID > -1)
    {
        currentLevel = levelInformation[loadedLevelID];
    }
    else
    {
        currentLevel = levelInformation[loadedLevelID]; // ADD DAILY LEVELS
    }
    
    levelID = JSON.parse(JSON.stringify(loadedLevelID)); // deep copy so it takes the value rather than the reference
    history = [];
    historyIndex = -1;
    squareHoveringOver = [-1, -1];
    canDropOff = false;
    draggedShape = null;
    
    clearAll();
    resetIntervals();

    currentGrid = []; // replace grid with history clone
    for (let r = 0; r < currentLevel[0].length; r++) {
        let tempRow = [];
        for (let c = 0; c < currentLevel[0].length; c++) {
            tempRow.push(currentLevel[0][r][c]);
        }
        currentGrid.push(tempRow);
    }

    currentInventory = []; 
    for (let i = 0; i < currentLevel[2].length; i++) {
        currentInventory.push(currentLevel[2][i].clone());
    }


    goalArray = currentLevel[1].slice();
    
    drawGrid();

    drawGoal();

    drawInventory();

    makeHistory();

    timer = document.getElementById("timer");
    let timeTaken = 0;

    timer.innerText = `${Math.floor(timeTaken / 60)}:${timeTaken % 60 < 10 ? 0 : ""}${timeTaken % 60}`;
    timeTaken++;

    timerID = setInterval(() => {
        timer.innerText = `${Math.floor(timeTaken / 60)}:${timeTaken % 60 < 10 ? 0 : ""}${timeTaken % 60}`;
        timeTaken++;
    }, 1000);
    intervalsArray.push(timerID);

    levelTitleHeader.innerText = `Level ${(parseInt(loadedLevelID) + 1)}`;
}

function drawGrid()
{
    const gridSquareCount = currentGrid.length; // number of squares in the grid and goal 
    gridSVG.setAttributeNS(null, "viewBox", `0 0 ${10 * gridSquareCount} ${10 * gridSquareCount}`);
    
    gridRectArray = [];
    for (let r = 0; r < gridSquareCount; r++)
    {
        let tempRow = [];
        for (let c = 0; c < gridSquareCount; c++)
        {
            let tempRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            tempRect.setAttribute("fill", getColourFromID(currentGrid[r][c]));
            tempRect.setAttribute("stroke", darkGray);
            tempRect.setAttribute("stroke-width", 0.5);
            tempRect.setAttribute("x", c * 10);
            tempRect.setAttribute("y", r * 10);
            tempRect.setAttribute("width", 10);
            tempRect.setAttribute("height", 10);
            tempRect.c = c;
            tempRect.r = r;
             
            gridSVG.appendChild(tempRect);
            tempRow.push(tempRect);
        }
        gridRectArray.push(tempRow);
    }
}

function drawInventory() // inventorySquareCount is the number of pieces per row, which can be adjusted
{
    // create pieces array
    
    piecesSVGArray = [];
    for (let r = 0; r < inventorySquareCount; r++)
    {
        let tempRow = document.createElement("div");
        tempRow.classList.add("inventory-grid-row");
        tempRow.style.aspectRatio = inventorySquareCount;
        
        let tempArray = [];

        for (let c = 0; c < inventorySquareCount; c++)
        {
            let tempDiv = document.createElement("div");
            
            tempDiv.classList.add("inventory-grid-square-holder");
            tempDiv.style.height = "100%";
            tempDiv.style.width = 100 / inventorySquareCount + "%";
            
            let tempSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            tempSVG.classList.add("inventory-grid-square");
            tempSVG.addEventListener("mousedown", onPiecePickUp);
            tempSVG.addEventListener("mousemove", onPieceMoving);
            tempSVG.addEventListener("keydown", onKeyDown);

            tempSVG.beingDragged = false;
            tempDiv.appendChild(tempSVG);

            tempArray.push(tempSVG);
            
            tempRow.appendChild(tempDiv);
        }

        inventoryDivOverlay.appendChild(tempRow);
        piecesSVGArray.push(tempArray);
    }


    // draw pieces
    for (let i = 0; i < currentInventory.length; i++) {
        let baseR = Math.floor(i / inventorySquareCount);
        let baseC = i % inventorySquareCount;
        piecesSVGArray[baseR][baseC].shape = currentInventory[i];
        piecesSVGArray[baseR][baseC].setAttributeNS(null, "viewBox", `0 0 ${10 * inventorySubSquareCount} ${10 * inventorySubSquareCount}`); // sets viewBox to be 50x50
        //piecesSVGArray[baseR][baseC].setAttribute("pointer-events", "none"); // see below: pointerEvents = "auto"
        piecesSVGArray[baseR][baseC].setAttribute("tabindex", "0"); // allows the pieces to be focused
        for (let r = 0; r < currentInventory[i].arr.length; r++)
        {
            for (let c = 0; c < currentInventory[i].arr[r].length; c++)
            {
                if (currentInventory[i].available && currentInventory[i].arr[r][c])
                {
                    // draw SVG shape in shape of a square
                    let colour = currentInventory[i].arr[r][c]; // read the colour of the tile
                    let tempRect = document.createElementNS("http://www.w3.org/2000/svg", "rect"); // creates a rect (ensures tag is self-closing)
                    tempRect.setAttribute("fill", getColourFromID(colour));
                    tempRect.setAttribute("stroke", darkGray);
                    tempRect.setAttribute("stroke-width", 0.5);
                    tempRect.setAttribute("x", (c + 1) * 10);
                    tempRect.setAttribute("y", (r + 1) * 10);
                    tempRect.setAttribute("width", 10);
                    tempRect.setAttribute("height", 10);

                    tempRect.setAttribute("points", (c * 10) + "," + (r * 10) + " " + (c * 10) + "," + ((r + 1) * 10) + " "
                        + ((c + 1) * 10) + "," + ((r + 1) * 10) + " " + ((c + 1) * 10) + "," + (r * 10));
                    // tempRect.style.pointerEvents = "auto"; // in tandem with setting SVG pointers-event to none above, only rect can be selected
                    // thus, the effective hitbox is only the actual shape, not the 5x5 canvas around it
                    piecesSVGArray[baseR][baseC].appendChild(tempRect);
                }
            }
        }

    }

    // draw subsquare grid lines
    inventoryCTX.strokeStyle = lightGray + "80"; // adds 50% opacity
    inventoryCTX.lineWidth = scale * 8;
    for (let r = 0; r < inventorySubSquareCount * inventorySquareCount; r++) {
        drawLine(inventoryCTX, 0, (r) * inventorySubSquareSize, inventoryCanvasBackground.width, (r) * inventorySubSquareSize);
    }

    for (let c = 0; c < inventorySubSquareCount * inventorySquareCount; c++) {
        drawLine(inventoryCTX, (c) * inventorySubSquareSize, 0, (c) * inventorySubSquareSize, inventoryCanvasBackground.height);
    }

    // draw square grid lines
    inventoryCTX.strokeStyle = darkGray;
    inventoryCTX.lineWidth = scale * 16;

    for (let r = 1; r < inventorySquareCount; r++) {
        drawLine(inventoryCTX, 0, r * inventorySquareSize, inventoryCanvasBackground.width, r * inventorySquareSize);
    }   

    for (let c = 1; c < inventorySquareCount; c++) {
        drawLine(inventoryCTX, c * inventorySquareSize, 0, c * inventorySquareSize, inventoryCanvasBackground.height);
    }
}

function drawGoal()
{
    gridSquareCount = currentGrid.length;
    const squareSize = goalCanvas.width / gridSquareCount;
    // draw goal
    for (let r = 0; r < gridSquareCount; r++) {
        for (let c = 0; c < gridSquareCount; c++) {
            goalCTX.fillStyle = getColourFromID(goalArray[r][c]);
            goalCTX.fillRect(c * squareSize, r * squareSize, squareSize, squareSize);
        }
    }

    // draw goal gridlines
    goalCTX.fillStyle = darkGray;
    for (let r = 1; r < gridSquareCount; r++) {
        goalCTX.fillRect(0, r * squareSize - 12 * scale, goalCanvas.width, 24 * scale); // goal is 66% size of grid, so lines should be 1/66% times larger for even thickness
    }

    for (let c = 1; c < gridSquareCount; c++) {
        goalCTX.fillRect(c * squareSize - 12 * scale, 0, 24 * scale, goalCanvas.width)
    }
}

function drawLine(context, startX, startY, endX, endY)
{
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}

function clearAll()
{
    inventoryDivOverlay.innerHTML = "";
    gridSVG.innerHTML = "";
    goalCTX.clearRect(0, 0, goalCanvas.width, goalCanvas.height);
    inventoryCTX.clearRect(0, 0, inventoryCanvasBackground.width, inventoryCanvasBackground.height);
}

function resetIntervals()
{
    for (let intervalID of intervalsArray) {
        clearInterval(intervalID);
    }
    intervalsArray = [];
}

function resetNonTimerIntervals()
{
    for (let intervalID of intervalsArray) {
        if (intervalID != timerID)
        {
            clearInterval(intervalID);
        }
    }
    intervalsArray = [timerID];
}

function getColourFromID(ID)
{
    if (ID == 1) return red;
    else if (ID == 2) return orange;
    else if (ID == 3) return yellow;
    else if (ID == 4) return green;
    else if (ID == 5) return blue;
    else if (ID == 6) return purple;
}

function getIDFromColour(colour)
{
    if (colour == red) return 1;
    else if (colour == orange) return 2;
    else if (colour = yellow) return 3;
    else if (colour == green) return 4;
    else if (colour == blue) return 5;
    else if (colour == purple) return 6;
}

function onPiecePickUp(ev) {
    let draggedSVG = ev.currentTarget;
    draggedSVG.initialStyle = draggedSVG.style;

    draggedSVG.removeEventListener("mousedown", onPiecePickUp); // prevents another piece from being picked up
    setTimeout(() => {
        console.log("mouseup added");
        draggedSVG.addEventListener("mouseup", onPieceDropOff); // pieces can be click-moved if the click is less than 0.2s
    }, 200);

    previousMouseCoordinates = [ev.clientX, ev.clientY];

    // draggedSVG.style.opacity = "100"; // code for repicking up pieces


    // scales squares to proper size
    draggedSVG.style.width = 0.8 * ((gridHolderDiv.offsetWidth / currentGrid.length) * inventorySubSquareCount) + "px"; // ensures size of one square in the dragImage is the same as one square in the grid
    draggedSVG.style.height = 0.8 * ((gridHolderDiv.offsetHeight / currentGrid.length) * inventorySubSquareCount) + "px";
    
    // for (let rect of draggedSVG.children)
    // {
    //     rect.style.display = "inline-block"; // makes squares no longer scale to parent
    // }


    // draggedSVG.style.width = window.innerWidth;
    // draggedSVG.style.height = window.innerHeight; // makes area in which mouse movement is read massive

    // flag to read mousemove event
    draggedSVG.beingDragged = true;

    // move piece to cursor
    draggedSVG.style.left = (ev.clientX - parseInt(draggedSVG.style.width, 10) / 2) + "px";
    draggedSVG.style.top = (ev.clientY - parseInt(draggedSVG.style.height) / 2) + "px";
    draggedSVG.style.position = "fixed"; // must be used for absolute positioning (else it moves relative to parent)
    
    // make svg appear in front of everything
    draggedSVG.style.zIndex = 9999;
    // draggedSVG.style.pointerEvents = "auto"; // this (along with setting it to none upon dropping) lets the player move the mouse within a 5x5 area, reducing the chance that you move the mouse too fast and drop the piece
    draggedSVG.focus(); // focuses the piece, enabling keydown events

    draggedShape = draggedSVG.shape; // used to read what shape is being dragged
}

function onPieceMoving(ev)
{
    if (ev.currentTarget.beingDragged)
    {
        if (ev.clientX == undefined) // when this method is called via the rotate method, ev doesn't have these mouse coords; thus, they must be supplied
        {
            ev.clientX = previousMouseCoordinates[0];
            ev.clientY = previousMouseCoordinates[1];
        }
        else
        {
            previousMouseCoordinates = [ev.clientX, ev.clientY];
        }
        let draggedSVG = ev.currentTarget;

        // moves center of piece to mouse cursor
        draggedSVG.style.left = (ev.clientX - parseInt(draggedSVG.style.width, 10) / 2) + "px";
        draggedSVG.style.top = (ev.clientY - parseInt(draggedSVG.style.height, 10) / 2) + "px";

        // console.log("being dragged");

        for (let r = 0; r < gridSquareCount; r++) // iterates through the grid, clearing outlines from every square
        {
            for (let c = 0; c < gridSquareCount; c++) {
                gridRectArray[r][c].setAttribute("fill", getColourFromID(currentGrid[r][c]));
            }
        }

        // check which grid squares the piece is hovering over
        squareHoveringOver = [-1, -1];
        outer: // iterates through all grid squares to find if the mouse is hovering over one of them
        for (let r = 0; r < gridSquareCount; r++){ 
            for (let c = 0; c < gridSquareCount; c++) 
            {
                let gridSquareSize = gridHolderDiv.offsetWidth / gridSquareCount;
                let baseX = gridHolderDiv.getBoundingClientRect().left;
                let baseY = gridHolderDiv.getBoundingClientRect().top;
                if (ev.clientX >= (baseX + c * gridSquareSize) && ev.clientX <= (baseX + (c + 1) * gridSquareSize)
                && ev.clientY >= (baseY + r * gridSquareSize) & ev.clientY <= (baseY + (r + 1) * gridSquareSize))
                {
                    squareHoveringOver = [r, c];
                    break outer;
                }
            }
        }

        if (!(squareHoveringOver[0] == -1 && squareHoveringOver[1] == -1)) {
            let targetSquare = gridRectArray[squareHoveringOver[0]][squareHoveringOver[1]];

            canDropOff = true; // iterates through the 5x5 array of the piece to see if the piece can be dropped without it going out of bounds
            outer:
            for (let r = 0; r < pieceSubSquareCount; r++) {
                for (let c = 0; c < pieceSubSquareCount; c++) {
                    if (draggedShape.arr[r][c]) {
                        if (targetSquare.c + (c - 2) < 0 || targetSquare.c + (c - 2) >= currentGrid.length ||
                            targetSquare.r + (r - 2) < 0 || targetSquare.r + (r - 2) >= currentGrid.length) // subtract 2 because the center of the 5x5 piece is (2, 2)
                        {
                            canDropOff = false;
                            break outer;
                        }
                    }
                }
            }

            if (canDropOff) {
                for (let r = 0; r < pieceSubSquareCount; r++) { // gives a faded outline of the piece being dropped into valid square
                    for (let c = 0; c < pieceSubSquareCount; c++) {
                        if (draggedShape.arr[r][c]) {
                            gridRectArray[targetSquare.r + (r - 2)][targetSquare.c + (c - 2)].setAttribute("fill", getColourFromID(draggedShape.arr[r][c]) + "80");
                        }
                    }
                }
            }
        }
    }
}

function onPieceDropOff(ev)
{
    if (ev.currentTarget.beingDragged)
    {
        let draggedSVG = ev.currentTarget;
        draggedSVG.removeEventListener("mouseup", onPieceDropOff); // disables dropping pieces off while re-enabling picking them up
        draggedSVG.addEventListener("mousedown", onPiecePickUp);

        console.log("mouseup removed");
        // check if piece can be placed into grid
        ev.currentTarget.beingDragged = false;
        draggedSVG.style.zIndex = 0;
        draggedSVG.blur(); // unfocuses piece, disabling it from reading keydown event

        if (canDropOff && !(squareHoveringOver[0] == -1 && squareHoveringOver[1] == -1)) // drops piece into grid
        {
            let targetSquare = gridRectArray[squareHoveringOver[0]][squareHoveringOver[1]];
            for (let r = 0; r < gridSquareCount; r++) // iterates through the grid, clearing outlines from every square
            {
                for (let c = 0; c < gridSquareCount; c++) {
                    gridRectArray[r][c].setAttribute("fill", getColourFromID(currentGrid[r][c]));
                }
            }

            draggedSVG.removeEventListener("mousedown", onPiecePickUp);
            draggedSVG.removeEventListener("mousemove", onPieceMoving);
            
            
            //draggedSVG.style.visibility = "hidden"; // makes it non-interactable
            draggedShape.available = false;
            
            // code for if i want to make dropped pieces re-pickupable: it makes piece invisible but pick-uppable
            // not implemented:
            // redrawing grid after pickup (use mouse coords to check but unsure how to revert canvas)
            // checking if a piece is underneath another piece
            // draggedSVG.style.opacity = "0";
            let gridSquareSize = gridHolderDiv.offsetWidth / gridSquareCount;
            let baseX = gridHolderDiv.getBoundingClientRect().left;
            let baseY = gridHolderDiv.getBoundingClientRect().top;
            
            draggedSVG.style.transform = `translate(${(gridSquareSize * (squareHoveringOver[1] + 0.5) + baseX - parseInt(draggedSVG.style.width, 10) / 2 ) - parseInt(draggedSVG.style.left, 10)}px, 
            ${(gridSquareSize * (squareHoveringOver[0] + 0.5) + baseY - parseInt(draggedSVG.style.height, 10) / 2) - parseInt(draggedSVG.style.top, 10)}px) rotate(${draggedSVG.shape.rotation}deg)`;
            
            setTimeout(() => {
                draggedSVG.style.animation = "fadeOut 0.5s";
            }, 300);
            setTimeout(() => {
                draggedSVG.style.visibility = "hidden";
            }, 800);
            
            let arr = draggedShape.arr;
            draggedShape = null;
            
            for (let r = 0; r < pieceSubSquareCount; r++) { // changes colour of grid to outline colour
                for (let c = 0; c < pieceSubSquareCount; c++) {
                    if (arr[r][c]) {
                        gridRectArray[targetSquare.r + (r - 2)][targetSquare.c + (c - 2)].setAttribute("fill", getColourFromID(arr[r][c]) + "80");
                        currentGrid[targetSquare.r + (r - 2)][targetSquare.c + (c - 2)] = arr[r][c];
                    }
                }
            }
            
            let start = Date.now();
            let id = setInterval(() => {
                let interval = Date.now() - start;
                for (let r = 0; r < pieceSubSquareCount; r++) { // changes colour of grid
                    for (let c = 0; c < pieceSubSquareCount; c++) {
                        if (arr[r][c]) {
                            gridRectArray[targetSquare.r + (r - 2)][targetSquare.c + (c - 2)].setAttribute("fill", getColourFromID(arr[r][c]) + (Math.floor(interval / 500 * 127) + 128).toString(16));
                        } // progressively fades the colour towards true colour
                    }
                }
                if (interval > 500) 
                {
                    for (let r = 0; r < pieceSubSquareCount; r++) { // changes colour of grid
                        for (let c = 0; c < pieceSubSquareCount; c++) {
                            if (arr[r][c]) {
                                gridRectArray[targetSquare.r + (r - 2)][targetSquare.c + (c - 2)].setAttribute("fill", getColourFromID(arr[r][c]));
                            }
                        }
                    } // makes sure that the final colour is the true colour of the grid, rather than some mathematical imperfection
                    clearInterval(id); // stops the fading process
                }
            }, 50);
            intervalsArray.push(id);
            
            canDropOff = false;
            squareHoveringOver = [-1, -1];
            makeHistory();
            
            // draggedSVG.setAttribute("pointer-events", "none");


            // check win
            let winned = true;
            outer:
            for (let r = 0; r < gridSquareCount; r++)
            {
                for (let c = 0; c < gridSquareCount; c++)
                {
                    if (currentGrid[r][c] != goalArray[r][c])
                    {
                        winned = false;
                        break outer;
                    }
                }
            }
            if (winned) 
            {
                canUndoOrRedo = false;
                // setTimeout(showMenu(), 2000);
                clearInterval(timerID); 
                intervalsArray = [];
                setTimeout(() => {
                    forPopupDiv.style.visibility = "visible";
                    forPopupDiv.style.animation = "fadeIn 0.5s"; // fades the popup in
                    popupSVG.style.transform = "translate(0%, 0%)"; // shifts popup downwards
                    document.getElementById("popup-timer").textContent = `Time: ${timer.innerText}`;
                }, 1000);
            }
        }
        else // returns piece to inventory slot
        {
            draggedSVG.style = draggedSVG.initialStyle; // resets style to default
            while (draggedShape.rotation > 0) // resets piece to initial position
            {
                while (draggedShape.rotation >= 360) draggedShape.rotation -= 360;
                draggedShape.rotateArray("l");
            }

            while (draggedShape.rotation < 0)
            {
                while (draggedShape.rotation <= -360) draggedShape.rotation += 360;
                draggedShape.rotateArray("r");
            }
        }
    }
}

function onKeyDown(ev)
{
    let draggedSVG = ev.currentTarget;
    if (ev.currentTarget.beingDragged)
    {
        if (ev.key == "e" || ev.key == "E" || ev.key == "d" || ev.key == "D" || ev.key == "ArrowRight") // right arrow key, e, or d
        {
            draggedSVG.shape.rotateArray("r");
            draggedSVG.style.transform = `rotate(${draggedSVG.shape.rotation}deg)`; 
        }
        else if (ev.key == "q" || ev.key == "Q" || ev.key == "a" || ev.key == "A" || ev.key == "ArrowLeft") // left arrow key, q, or a
        {
            draggedSVG.shape.rotateArray("l");
            draggedSVG.style.transform = `rotate(${draggedSVG.shape.rotation}deg)`;
        }
        onPieceMoving(ev);
    }
}

function shortcutHandler(ev)
{
    if (canUndoOrRedo)
    {
        if (ev.ctrlKey && ev.key == "z") // undo
        {
            if (historyIndex > 0)
            {
                historyIndex--;
                loadHistory();
            }
            ev.preventDefault();
        }
        else if (ev.ctrlKey && ev.key == "y") // redo
        {
            if (historyIndex < history.length - 1)
            {
                historyIndex++;
                loadHistory();
            }
            ev.preventDefault();
        }
    }

    if (ev.key == "R") // shift R restarts the level
    {
        confirmRestartLevel();
    }
    else if (ev.ctrlKey && ev.key == "Enter")
    {  
        chooseLevel();
    }
    else if (ev.ctrlKey && ev.shiftKey && ev.altKey)
    {
        if (ev.key == "ArrowRight")
        {
            loadLevel(levelID + 1);
        }
        else if (ev.key == "ArrowLeft")
        {
            loadLevel(levelID - 1);
        }
    }
}

function makeHistory()
{
    if (historyIndex < history.length - 1)
    {
        history = history.slice(0, historyIndex + 1); // removes all redo's after
    }
    let currentGridClone = []; // make clone of grid in history
    for (let r = 0; r < currentGrid.length; r++)
    {
        let tempRow = [];
        for (let c = 0; c < currentGrid.length; c++)
        {
            tempRow.push(currentGrid[r][c]);
        }
        currentGridClone.push(tempRow);
    }
    
    let currentInventoryClone = [];
    for (let i = 0; i < currentInventory.length; i++)
    {
        currentInventoryClone.push(currentInventory[i].clone());
    }

    history.push(new Log(currentGridClone, currentInventoryClone));
    historyIndex++;
}

function loadHistory()
{

    currentGrid = []; // replace grid with history clone
    for (let r = 0; r < history[historyIndex].grid.length; r++) {
        let tempRow = [];
        for (let c = 0; c < history[historyIndex].grid.length; c++) {
            tempRow.push(history[historyIndex].grid[r][c]);
        }
        currentGrid.push(tempRow);
    }


    currentInventory = [];
    for (let i = 0; i < history[historyIndex].inventory.length; i++) {
        currentInventory.push(history[historyIndex].inventory[i].clone());
    }

    clearAll();
    resetNonTimerIntervals();
    drawGrid();
    drawInventory();
    drawGoal();

}

function chooseLevel(ev)
{
    let response = prompt(`Choose level from 1 to ${levelInformation.length}`); // 0 for daily eventually
    if (!isNaN(parseInt(response)) && parseInt(response) <= levelInformation.length && parseInt(response) > 0)
    {
        loadLevel(parseInt(response) - 1);
    }
}

function confirmRestartLevel()
{
    if (confirm("Restart the level?")) {
        historyIndex = 0;
        history = [history[0]];
        loadHistory();
    }
}