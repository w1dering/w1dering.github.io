// common shapes
const SMALL_L = [
    [false, false, false, false, false],
    [false, false, true , false, false],
    [false, false, true , true , false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];

const L = [
    [false, false, false, false, false],
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, true , true , false],
    [false, false, false, false, false]
];

const BIG_L = [
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, true , true , false],
    [false, false, false, false, false]
];

const SMALL_J = [
    [false, false, false, false, false],
    [false, false, true , false, false],
    [false, true , true , false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];

const J = [
    [false, false, false, false, false],
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, true , true , false, false],
    [false, false, false, false, false]
];

const BIG_J = [
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, true , true , false, false],
    [false, false, false, false, false]
];

const DOT =
[
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true , false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];

const SMALL_O =
[
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true , false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];

const O =
[
    [false, false, false, false, false],
    [false, true , true , false, false],
    [false, true , true , false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];

const BIG_O =
[
    [false, false, false, false, false],
    [false, true , true , true , false],
    [false, true , true , true , false],
    [false, true , true , true , false],
    [false, false, false, false, false]
];

const SMALL_I =
[
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true , false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];

const I =
[
    [false, false, false, false, false],
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, false, false, false]
];

const BIG_I =
[
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, true , false, false],
    [false, false, false, false, false]
];

// colours
const red = "#EDC9D4";
const orange = "#FFD3C9";
const yellow = "#FFF7CF";
const green = "#7DDE92";
const blue = "#C7E0FF";
const purple = "#BAC3FF";
const darkGray = "#37383A";
const lightGray = "#CCCCCC";

class Shape 
{
    constructor(arr, colour)
    {
        this.arr = arr;
        this.colour = colour;
    }

    rotateArray(dir)
    {
        // dir will be "l" or "r"
        
        let temp = [];
        for (let r = 0; r < this.arr[0].length; r++)
        {
            let tempRow = [];
            for (let c = 0; c < this.arr.length; c++)
            {
                tempRow.push("-1");
            }
            temp.push(tempRow);
        }

        if (dir == "l")
        {
            let oldR = 0;
            let oldC = this.arr[0].length - 1;
            for (let r = 0; r < temp.length; r++)
            {
                for (let c = 0; c < temp[0].length; c++)
                {
                    temp[r][c] = this.arr[oldR][oldC];
                    oldR++;
                }
                oldR = 0;
                oldC--;
            }
        }
        else
        {
            let oldR = this.arr.length - 1;
            let oldC = 0;
            for (let r = 0; r < temp.length; r++)
            {
                for (let c = 0; c < temp[0].length; c++)
                {
                    temp[r][c] = this.arr[oldR][oldC];
                    oldR--;
                }
                oldR = this.arr.length - 1;
                oldC++;
            }
        }

        this.arr = temp;
        return this.arr;
    }
}

// list of references
const gameInterfaceDiv = document.querySelector(".game-interface");

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


const gridCanvas = document.getElementById("grid");
const gridCTX = gridCanvas.getContext("2d");
gridCanvas.width = canvasResolution * scale; 
gridCanvas.height = canvasResolution * scale;

const goalCanvas = document.getElementById("goal-canvas");
const goalCTX = goalCanvas.getContext("2d");
goalCanvas.width = canvasResolution * scale; 
goalCanvas.height = canvasResolution * scale;



/* array containing all levels' information
 * the format is:
 * [0]: 2d array containing original layout; each element is a NUMBER
    * the colours are as follows:
    * 0: red
    * 1: orange
    * 2: yellow
    * 3: green
    * 4: blue
    * 5: lilac
    * 6: purple
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
let levelInformation = [
    [
        [
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2]
        ],
        [
            [2, 4, 4, 4],
            [4, 0, 3, 4],
            [4, 3, 0, 4],
            [4, 4, 4, 2]
        ],
        [
            new Shape(O, 0),
            new Shape(SMALL_L, 3),
            new Shape(SMALL_L, 3),
            new Shape(SMALL_J, 4),
            new Shape(SMALL_J, 4),
            new Shape(SMALL_J, 4),
            new Shape(SMALL_J, 4),
        ]
    ]
]
let levelID = 0;
let currentGrid;
let currentInventory;
const inventorySubSquareCount = 5; // number of grid squares per piece slot
let inventorySquareCount = 3;
let inventorySquareSize = inventoryCanvasBackground.width / inventorySquareCount; // size of square each piece is allocated
let inventorySubSquareSize = inventorySquareSize / inventorySubSquareCount; // size of each grid square within each square above

loadLevel(levelID);

function loadLevel(levelID) {
    clearAll();
    currentGrid = levelInformation[levelID][0];
    const goalArray = levelInformation[levelID][1];
    currentInventory = levelInformation[levelID][2];
    
    drawGrid();
    
    const gridSquareCount = currentGrid.length; 
    const squareSize = gridCanvas.width / gridSquareCount;
    // draw goal
    for (let r = 0; r < gridSquareCount; r++)
    {
        for (let c = 0; c < gridSquareCount; c++)
        {
            goalCTX.fillStyle = getColourFromID(goalArray[r][c]);
            goalCTX.fillRect(c * squareSize, r * squareSize, squareSize, squareSize);
        }
    }

    // draw goal gridlines
    goalCTX.fillStyle = darkGray;
    for (let r = 1; r < gridSquareCount; r++)
    {
        goalCTX.fillRect(0, r * squareSize - 12 * scale, goalCanvas.width, 24 * scale); // goal is 66% size of grid, so lines should be 1/66% times larger for even thickness
    }

    for (let c = 1; c < gridSquareCount; c++)
    {
        goalCTX.fillRect(c * squareSize - 12 * scale, 0, 24 * scale, goalCanvas.width)
    }


    drawInventory(inventorySquareCount);
        
}

function drawGrid()
{
    const gridSquareCount = currentGrid.length; // number of squares in the grid and goal 
    const squareSize = gridCanvas.width / gridSquareCount;

    for (let r = 0; r < gridSquareCount; r++) {
        for (let c = 0; c < gridSquareCount; c++) {
            gridCTX.fillStyle = getColourFromID(currentGrid[r][c]);
            gridCTX.fillRect(c * squareSize, r * squareSize, squareSize, squareSize);
        }
    }

    // draw grid lines
    gridCTX.strokeStyle = darkGray;
    gridCTX.lineWidth = scale * 16;
    for (let r = 1; r < gridSquareCount; r++) {
        drawLine(gridCTX, 0, r * squareSize, gridCanvas.width, r * squareSize);
    }

    for (let c = 1; c < gridSquareCount; c++) {
        drawLine(gridCTX, c * squareSize, 0, c * squareSize, gridCanvas.height);
    }
}

function drawInventory(inventorySquareCount) // inventorySquareCount is the number of pieces per row, which can be adjusted
{
    // create pieces array
    
    let piecesSVGArray = [];
    for (let r = 0; r < inventorySquareCount; r++)
    {
        let tempRow = document.createElement("div");
        tempRow.classList.add("inventory-grid-row");
        tempRow.style.aspectRatio = inventorySquareCount;
        
        let tempArray = [];

        for (let c = 0; c < inventorySquareCount; c++)
        {
            let tempSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            let tempDiv = document.createElement("div");

            tempDiv.classList.add("inventory-grid-square-holder");
            tempDiv.style.height = "100%";
            tempDiv.style.width = 100 / inventorySquareCount + "%";

            tempSVG.classList.add("inventory-grid-square");
            tempSVG.addEventListener("mousedown", onPiecePickUp);
            tempSVG.addEventListener("mousemove", onPieceMoving);
            tempSVG.addEventListener("mouseup", onPieceDropOff);
            tempSVG.beingDragged = false;
            tempArray.push(tempSVG);
            tempDiv.appendChild(tempSVG);
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
        piecesSVGArray[baseR][baseC].setAttributeNS(null, "viewBox", "0 0 50 50"); // sets viewBox to be 50x50
        
        for (let r = 0; r < inventorySubSquareCount; r++)
        {
            for (let c = 0; c < inventorySubSquareCount; c++)
            {
                if (currentInventory[i].arr[r][c])
                {
                    // draw SVG shape in shape of a square
                    if (i == 1)
                    {
                        console.log("true at " + r + ", " + c);
                    }
                    let tempPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon"); // creates a polygon (ensures tag is self-closing)
                    tempPolygon.setAttribute("fill", getColourFromID(currentInventory[i].colour));
                    tempPolygon.setAttribute("stroke", darkGray);
                    tempPolygon.setAttribute("stroke-width", 1);
                    tempPolygon.setAttribute("points", (c * 10) + "," + (r * 10) + " " + (c * 10) + "," + ((r + 1) * 10) + " "
                        + ((c + 1) * 10) + "," + ((r + 1) * 10) + " " + ((c + 1) * 10) + "," + (r * 10));
                    piecesSVGArray[baseR][baseC].appendChild(tempPolygon);
                }
            }
        }

    }

    // draw subsquare grid lines
    inventoryCTX.strokeStyle = lightGray + "80"; // adds 50% opacity
    inventoryCTX.lineWidth = scale * 8;
    for (let r = 1; r < inventorySubSquareCount * inventorySquareCount; r++) {
        drawLine(inventoryCTX, 0, r * inventorySubSquareSize, inventoryCanvasBackground.width, r * inventorySubSquareSize);
    }

    for (let c = 1; c < inventorySubSquareCount * inventorySquareCount; c++) {
        drawLine(inventoryCTX, c * inventorySubSquareSize, 0, c * inventorySubSquareSize, inventoryCanvasBackground.height);
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

function drawLine(context, startX, startY, endX, endY)
{
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}

function clearAll()
{
    inventoryCanvasBackground.innerHTML = "";
    gridCanvas.innerHTML = "";
    goalCanvas.innerHTML = "";
}

function getColourFromID(ID)
{
    if (ID == 0) return red;
    else if (ID == 1) return orange;
    else if (ID == 2) return yellow;
    else if (ID == 3) return green;
    else if (ID == 4) return blue;
    else if (ID == 5) return purple;
}

function onPiecePickUp(ev)
{
    let draggedCanvas = ev.currentTarget;
    draggedCanvas.style.width = 0.8 * ((gridCanvas.offsetWidth / currentGrid.length) * inventorySubSquareCount) + "px"; // ensures size of one square in the dragImage is the same as one square in the grid
    draggedCanvas.style.height = 0.8 * ((gridCanvas.offsetHeight / currentGrid.length) * inventorySubSquareCount) + "px"; 
    
    // flag to read mousemove event
    draggedCanvas.beingDragged = true;

    // move piece to cursor
    draggedCanvas.style.left = (ev.clientX - draggedCanvas.offsetWidth / 2) + "px";
    draggedCanvas.style.top = (ev.clientY - draggedCanvas.offsetHeight / 2) + "px";
    draggedCanvas.style.position = "fixed"; // must be used for absolute positioning (else it moves relative to parent)
    draggedCanvas.style.zIndex = 9999;

    redrawPiece(draggedCanvas);
    
}

function onPieceMoving(ev)
{
    if (ev.currentTarget.beingDragged)
    {
        let draggedCanvas = ev.currentTarget;

        // moves canvas
        draggedCanvas.style.left = (ev.clientX - draggedCanvas.offsetWidth / 2) + "px";
        draggedCanvas.style.top = (ev.clientY - draggedCanvas.offsetHeight / 2) + "px";
        
        // redraws shape on canvas
        redrawPiece(draggedCanvas);
    }
}

function onPieceDropOff(ev)
{
    if (ev.currentTarget.beingDragged)
    {
        let draggedCanvas = ev.currentTarget;
        // check if piece can be placed into grid
        ev.currentTarget.beingDragged = false;
        draggedCanvas.style.zIndex = 0;
    }
}

function redrawPiece(draggedCanvas)
{
    let draggedCTX = draggedCanvas.getContext("2d");
    draggedCTX.clearRect(0, 0, draggedCanvas.width, draggedCanvas.height);
    draggedCTX.fillStyle = getColourFromID(draggedCanvas.shape.colour);
    draggedCTX.strokeStyle = darkGray;
    draggedCTX.lineWidth = scale * 4;

    for (let r = 0; r < inventorySubSquareCount; r++) {
        for (let c = 0; c < inventorySubSquareCount; c++) {
            if (draggedCanvas.shape.arr[r][c]) {
                // draw colours of shapes
                draggedCTX.fillRect(c * inventorySubSquareSize, r * inventorySubSquareSize, inventorySubSquareSize, inventorySubSquareSize);

                // draw outlines
                draggedCTX.strokeRect(c * inventorySubSquareSize, r * inventorySubSquareSize, inventorySubSquareSize, inventorySubSquareSize);
            }
        }
    }
}