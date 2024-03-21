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

const SMALL_T =
[
    [false, false, false , false, false],
    [false, false, true , false, false],
    [false, true , true , true , false],
    [false, false, false , false, false],
    [false, false, false, false, false]
]

const TWO_BY_THREE =
[
    [false, false, false, false, false],
    [false, true , true , false, false],
    [false, true , true , false , false],
    [false, true , true , false, false],
    [false, false, false, false, false]
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

document.addEventListener("keydown", undoOrRedo);
document.getElementById("level-button").addEventListener("click", chooseLevel);

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
        [ // starting grid
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2]
        ],
        [ // goal
            [2, 4, 4, 4],
            [4, 0, 3, 4],
            [4, 3, 0, 4],
            [4, 4, 4, 2]
        ],
        [ // inventory
            new Shape(O, 0),
            new Shape(SMALL_L, 3),
            new Shape(SMALL_L, 3),
            new Shape(SMALL_J, 4),
            new Shape(SMALL_J, 4),
            new Shape(SMALL_J, 4),
            new Shape(SMALL_J, 4),
        ]
    ],
    [
        [
            [2, 2, 2, 2],
            [2, 3, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 3, 2]
        ],
        [
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3],
            [3, 3, 3, 3]
        ],
        [
            new Shape(L, 3),
            new Shape(SMALL_J, 3),
            new Shape (J, 3),
            new Shape (SMALL_O, 3),
            new Shape (SMALL_I, 3)
        ]
    ],
    [
        [
            [0, 5, 0, 5, 0],
            [5, 0, 5, 0, 5],
            [0, 5, 0, 5, 0],
            [5, 0, 5, 0, 5],
            [0, 5, 0, 5, 0]
        ],
        [
            [0, 5, 5, 5, 0],
            [0, 0, 0, 0, 0],
            [0, 5, 5, 5, 0],
            [0, 0, 0, 0, 0],
            [0, 5, 5, 5, 0]
        ],
        [
            new Shape(BIG_O, 5),
            new Shape(BIG_O, 5),
            new Shape(SMALL_O, 0),
            new Shape(SMALL_O, 0),
            new Shape(SMALL_O, 0),
            new Shape(J, 0),
            new Shape(BIG_J, 0),
        ]
    ],
    [
        [
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2]
        ],
        [
            [2, 3, 3, 3],
            [4, 4, 3, 0],
            [0, 3, 4, 4],
            [3, 3, 3, 2]
        ],
        [
            new Shape(SMALL_T, 3),
            new Shape(SMALL_T, 3),
            new Shape(O, 0),
            new Shape(O, 0),
            new Shape(I, 4),
            new Shape(I, 4)
        ]
    ],
    [
        [
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2]
        ],
        [
            [2, 0, 0, 2, 2],
            [3, 0, 4, 4, 4],
            [3, 3, 4, 3, 3],
            [4, 4, 4, 0, 3],
            [2, 2, 0, 0, 2]
        ],
        [
            new Shape(SMALL_T, 3),
            new Shape(SMALL_T, 3),
            new Shape(O, 0),
            new Shape(O, 0),
            new Shape(L, 4),
            new Shape(I, 4)
        ]
    ],
    [
        [
            [2, 2, 2, 2, 2, 3],
            [2, 3, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2],
            [2, 2, 2, 3, 2, 2],
            [2, 3, 2, 2, 2, 2],
            [2, 2, 2, 2, 3, 2],
        ],
        [
            [5, 5, 5, 5, 5, 3],
            [5, 3, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5],
            [5, 5, 5, 3, 5, 5],
            [5, 3, 5, 5, 5, 5],
            [5, 5, 5, 5, 3, 5]
        ],
        [
            new Shape(O, 5),
            new Shape(O, 5),
            new Shape(BIG_O, 5),
            new Shape(SMALL_L, 5),
            new Shape(BIG_J, 5),
            new Shape(SMALL_L, 5),
            new Shape(J, 5)
        ]
    ],
    [
        [
            [1, 1, 2, 1, 2, 1],
            [1, 2, 1, 2, 1, 2],
            [2, 1, 2, 1, 2, 1],
            [1, 2, 1, 2, 1, 2],
            [2, 1, 2, 1, 2, 1],
            [1, 2, 1, 2, 1, 1]
        ],
        [
            [0, 0, 1, 1, 2, 2],
            [0, 0, 1, 1, 2, 2],
            [0, 1, 2, 2, 0, 1],
            [0, 1, 2, 2, 0, 1],
            [2, 2, 0, 0, 1, 1],
            [2, 2, 0, 0, 1, 1],
        ],
        [
            new Shape(SMALL_J, 0),
            new Shape(SMALL_J, 0),
            new Shape(J, 0),
            new Shape(J, 0),
            new Shape(J, 1),
            new Shape(J, 1),
            new Shape(TWO_BY_THREE, 1),
            new Shape(BIG_O, 2),
            new Shape(BIG_O, 2),
            
        ]
    ],
    [
        [
            [0, 0, 1, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 1]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            new Shape(O, 0),
            new Shape(BIG_L, 0),
            new Shape(BIG_L, 1),
            new Shape(SMALL_I, 1)
        ]
    ]
]
let levelID = 0;
let currentGrid = [];
let currentInventory;
let goalArray;
const inventorySubSquareCount = 5; // number of grid squares per piece slot
let inventorySquareCount = 3;
let inventorySquareSize = inventoryCanvasBackground.width / inventorySquareCount; // size of square each piece is allocated
let inventorySubSquareSize = inventorySquareSize / inventorySubSquareCount; // size of each grid square within each square above
let piecesSVGArray;
let gridPolygonArray;
let draggedShape;
let gridSquareCount;
let squareHoveringOver; // the square a dragged piece is being hovered over
let canDropOff; //variable that determines if a piece can be dropped off at squareHoveringOver
let previousMouseCoordinates;
let history = [];
let historyIndex = -1;
let intervalsArray = [];


document.addEventListener('contextmenu', event => event.preventDefault()); // disables right click menu from appearing on right click

loadLevel(levelID);

function loadLevel(levelID) {
    history = [];
    historyIndex = -1;
    intervalsArray = [];
    squareHoveringOver = [-1, -1];
    canDropOff = false;
    draggedShape = null;
    
    clearAll();
    currentGrid = []; // replace grid with history clone
    for (let r = 0; r < levelInformation[levelID][0].length; r++) {
        let tempRow = [];
        for (let c = 0; c < levelInformation[levelID][0].length; c++) {
            tempRow.push(levelInformation[levelID][0][r][c]);
        }
        currentGrid.push(tempRow);
    }

    currentInventory = [];
    for (let i = 0; i < levelInformation[levelID][2].length; i++) {
        currentInventory.push(levelInformation[levelID][2][i].clone());
    }


    goalArray = levelInformation[levelID][1].slice();
    
    drawGrid();

    drawGoal();

    drawInventory();

    makeHistory();
}

function drawGrid()
{
    const gridSquareCount = currentGrid.length; // number of squares in the grid and goal 
    gridSVG.setAttributeNS(null, "viewBox", `0 0 ${10 * gridSquareCount} ${10 * gridSquareCount}`);
    
    gridPolygonArray = [];
    for (let r = 0; r < gridSquareCount; r++)
    {
        let tempRow = [];
        for (let c = 0; c < gridSquareCount; c++)
        {
            let tempPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            tempPolygon.setAttribute("fill", getColourFromID(currentGrid[r][c]));
            tempPolygon.setAttribute("stroke", darkGray);
            tempPolygon.setAttribute("stroke-width", 0.5);
            tempPolygon.setAttribute("points", (c * 10) + "," + (r * 10) + " " + (c * 10) + "," + ((r + 1) * 10) + " "
                + ((c + 1) * 10) + "," + ((r + 1) * 10) + " " + ((c + 1) * 10) + "," + (r * 10));

            tempPolygon.x = c;
            tempPolygon.y = r;
             
            gridSVG.appendChild(tempPolygon);
            tempRow.push(tempPolygon);
        }
        gridPolygonArray.push(tempRow);
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
            tempSVG.addEventListener("mouseup", onPieceDropOff);
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
        for (let r = 0; r < inventorySubSquareCount; r++)
        {
            for (let c = 0; c < inventorySubSquareCount; c++)
            {
                if (currentInventory[i].available && currentInventory[i].arr[r][c])
                {
                    // draw SVG shape in shape of a square
                    let tempPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon"); // creates a polygon (ensures tag is self-closing)
                    tempPolygon.setAttribute("fill", getColourFromID(currentInventory[i].colour));
                    tempPolygon.setAttribute("stroke", darkGray);
                    tempPolygon.setAttribute("stroke-width", 0.5);
                    tempPolygon.setAttribute("points", (c * 10) + "," + (r * 10) + " " + (c * 10) + "," + ((r + 1) * 10) + " "
                        + ((c + 1) * 10) + "," + ((r + 1) * 10) + " " + ((c + 1) * 10) + "," + (r * 10));
                    tempPolygon.style.pointerEvents = "auto"; // in tandem with setting SVG pointers-event to none above, only polygons can be selected
                    // thus, the effective hitbox is only the actual shape, not the 5x5 canvas around it
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
    for (let id of intervalsArray)
    {
        clearTimeout(id);
    }
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

function getIDFromColour(colour)
{
    if (colour == red) return 0;
    else if (colour == orange) return 1;
    else if (colour = yellow) return 2;
    else if (colour == green) return 3;
    else if (colour == blue) return 4;
    else if (colour == purple) return 5;
}

function onPiecePickUp(ev) {
    let draggedSVG = ev.currentTarget;
    draggedSVG.initialStyle = draggedSVG.style;

    // draggedSVG.style.opacity = "100"; // code for repicking up pieces
    draggedSVG.style.width = 0.8 * ((gridHolderDiv.offsetWidth / currentGrid.length) * inventorySubSquareCount) + "px"; // ensures size of one square in the dragImage is the same as one square in the grid
    draggedSVG.style.height = 0.8 * ((gridHolderDiv.offsetHeight / currentGrid.length) * inventorySubSquareCount) + "px";

    // flag to read mousemove event
    draggedSVG.beingDragged = true;

    // move piece to cursor
    draggedSVG.style.left = (ev.clientX - parseInt(draggedSVG.style.width, 10) / 2) + "px";
    draggedSVG.style.top = (ev.clientY - parseInt(draggedSVG.style.height) / 2) + "px";
    draggedSVG.style.position = "fixed"; // must be used for absolute positioning (else it moves relative to parent)
    
    // make svg appear in front of everything
    draggedSVG.style.zIndex = 9999;
    draggedSVG.style.pointerEvents = "auto"; // this (along with setting it to none upon dropping) lets the player move the mouse within a 5x5 area, reducing the chance that you move the mouse too fast and drop the piece
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
                gridPolygonArray[r][c].setAttribute("fill", getColourFromID(currentGrid[r][c]));
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
            let targetSquare = gridPolygonArray[squareHoveringOver[0]][squareHoveringOver[1]];

            canDropOff = true; // iterates through the 5x5 array of the piece to see if the piece can be dropped without it going out of bounds
            outer:
            for (let r = 0; r < inventorySubSquareCount; r++) {
                for (let c = 0; c < inventorySubSquareCount; c++) {
                    if (draggedShape.arr[r][c]) {
                        if (targetSquare.x + (c - 2) < 0 || targetSquare.x + (c - 2) >= currentGrid.length ||
                            targetSquare.y + (r - 2) < 0 || targetSquare.y + (r - 2) >= currentGrid.length) // subtract 2 because the center of the 5x5 piece is (2, 2)
                        {
                            canDropOff = false;
                            break outer;
                        }
                    }
                }
            }

            if (canDropOff) {
                
                for (let r = 0; r < inventorySubSquareCount; r++) { // gives a faded outline of the piece being dropped into valid square
                    for (let c = 0; c < inventorySubSquareCount; c++) {
                        if (draggedShape.arr[r][c]) {
                            gridPolygonArray[targetSquare.y + (r - 2)][targetSquare.x + (c - 2)].setAttribute("fill", getColourFromID(draggedShape.colour) + "80");
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
        // check if piece can be placed into grid
        ev.currentTarget.beingDragged = false;
        draggedSVG.style.zIndex = 0;
        draggedSVG.blur(); // unfocuses piece, disabling it from reading keydown event

        if (canDropOff && !(squareHoveringOver[0] == -1 && squareHoveringOver[1] == -1)) // drops piece into grid
        {
            let targetSquare = gridPolygonArray[squareHoveringOver[0]][squareHoveringOver[1]];
            for (let r = 0; r < gridSquareCount; r++) // iterates through the grid, clearing outlines from every square
            {
                for (let c = 0; c < gridSquareCount; c++) {
                    gridPolygonArray[r][c].setAttribute("fill", getColourFromID(currentGrid[r][c]));
                }
            }

            draggedSVG.removeEventListener("mousedown", onPiecePickUp);
            draggedSVG.removeEventListener("mousemove", onPieceMoving);
            draggedSVG.removeEventListener("mouseup", onPieceDropOff);
            
            
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
            
            let colour = draggedShape.colour;
            let arr = draggedShape.arr;
            draggedShape = null;
            
            for (let r = 0; r < inventorySubSquareCount; r++) { // changes colour of grid to outline colour
                for (let c = 0; c < inventorySubSquareCount; c++) {
                    if (arr[r][c]) {
                        gridPolygonArray[targetSquare.y + (r - 2)][targetSquare.x + (c - 2)].setAttribute("fill", getColourFromID(colour) + "80");
                        currentGrid[targetSquare.y + (r - 2)][targetSquare.x + (c - 2)] = colour;
                    }
                }
            }
            
            let start = Date.now();
            let addedToArray = false;
            let id = setInterval(() => {
                if (!addedToArray)
                {
                    addedToArray = true;
                    intervalsArray.push(id);
                }

                let interval = Date.now() - start;
                for (let r = 0; r < inventorySubSquareCount; r++) { // changes colour of grid
                    for (let c = 0; c < inventorySubSquareCount; c++) {
                        if (arr[r][c]) {
                            gridPolygonArray[targetSquare.y + (r - 2)][targetSquare.x + (c - 2)].setAttribute("fill", getColourFromID(colour) + (Math.floor(interval / 500 * 127) + 128).toString(16));
                        } // progressively fades the colour towards true colour
                    }
                }
                if (interval > 500) 
                {
                    for (let r = 0; r < inventorySubSquareCount; r++) { // changes colour of grid
                        for (let c = 0; c < inventorySubSquareCount; c++) {
                            if (arr[r][c]) {
                                gridPolygonArray[targetSquare.y + (r - 2)][targetSquare.x + (c - 2)].setAttribute("fill", getColourFromID(colour));
                            }
                        }
                    } // makes sure that the final colour is the true colour of the grid
                    clearInterval(id); // breaks out of interval
                }
            }, 50);
            
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
                // setTimeout(showMenu(), 2000);
                setTimeout(() => {
                    alert("WOOOOOOOOO");
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
        if (ev.key == "e" || ev.key == "d" || ev.key == "ArrowRight") // right arrow key, e, or d
        {
            draggedSVG.shape.rotateArray("r");
            draggedSVG.style.transform = `rotate(${draggedSVG.shape.rotation}deg)`; 
        }
        else if (ev.key == "q" || ev.key == "a" || ev.key == "ArrowLeft") // left arrow key, q, or a
        {
            draggedSVG.shape.rotateArray("l");
            draggedSVG.style.transform = `rotate(${draggedSVG.shape.rotation}deg)`;
        }
        onPieceMoving(ev);
    }
}

function undoOrRedo(ev)
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
    drawGrid();
    drawInventory();
    drawGoal();

}

function chooseLevel(ev)
{
    let response = prompt("choose levelID from 0 to 7");
    if (!isNaN(parseInt(response)) && parseInt(response) <= 7 && parseInt(response) >= 0)
    {
        loadLevel(response);
    }
}