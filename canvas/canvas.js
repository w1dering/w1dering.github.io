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

let scale = 1;
if (!!window.chrome)
{
    scale = 4;
}
const inventoryCanvas = document.getElementById("inventory-canvas");
const inventoryCTX = inventoryCanvas.getContext("2d");
inventoryCanvas.width = 1440 * scale;
inventoryCanvas.height = 1440 * scale;

const gridCanvas = document.getElementById("grid");
const gridCTX = gridCanvas.getContext("2d");
gridCanvas.width = 1440 * scale; 
gridCanvas.height = 1440 * scale;

const goalCanvas = document.getElementById("goal-canvas");
const goalCTX = goalCanvas.getContext("2d");
goalCanvas.width = 1440 * scale; 
goalCanvas.height = 1440 * scale;



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


    drawInventory(3);
        
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
    const inventorySubSquareCount = 5; // number of grid squares per piece slot
    let inventorySquareSize = inventoryCanvas.width / inventorySquareCount; // size of square each piece is allocated
    let inventorySubSquareSize = inventorySquareSize / inventorySubSquareCount; // size of each grid square within each square above

    // draw pieces
    for (let i = 0; i < currentInventory.length; i++) {
        let baseR = Math.floor(i / inventorySquareCount) * inventorySquareSize;
        let baseC = (i % inventorySquareCount) * inventorySquareSize;
        for (let r = 0; r < inventorySubSquareCount; r++)
        {
            for (let c = 0; c < inventorySubSquareCount; c++)
            {
                if (currentInventory[i].arr[r][c])
                {
                    inventoryCTX.fillStyle = getColourFromID(currentInventory[i].colour);
                }
                else
                {
                    inventoryCTX.fillStyle = "#FFFFFF00";
                }
                inventoryCTX.fillRect(baseC + c * inventorySubSquareSize, baseR + r * inventorySubSquareSize, inventorySubSquareSize, inventorySubSquareSize);
            }
        }
    }

    // draw subsquare grid lines
    inventoryCTX.strokeStyle = lightGray + "80"; // adds 50% opacity
    inventoryCTX.lineWidth = scale * 8;
    for (let r = 1; r < inventorySubSquareCount * inventorySquareCount; r++) {
        drawLine(inventoryCTX, 0, r * inventorySubSquareSize, inventoryCanvas.width, r * inventorySubSquareSize);
    }

    for (let c = 1; c < inventorySubSquareCount * inventorySquareCount; c++) {
        drawLine(inventoryCTX, c * inventorySubSquareSize, 0, c * inventorySubSquareSize, inventoryCanvas.height);
    }

    // draw square grid lines
    inventoryCTX.strokeStyle = darkGray;
    inventoryCTX.lineWidth = scale * 16;

    for (let r = 1; r < inventorySquareCount; r++) {
        drawLine(inventoryCTX, 0, r * inventorySquareSize, inventoryCanvas.width, r * inventorySquareSize);
    }   

    for (let c = 1; c < inventorySquareCount; c++) {
        drawLine(inventoryCTX, c * inventorySquareSize, 0, c * inventorySquareSize, inventoryCanvas.height);
    }

    // draw outlines of shapes
    for (let i = 0; i < currentInventory.length; i++) {
        let baseR = Math.floor(i / inventorySquareCount) * inventorySquareSize;
        let baseC = (i % inventorySquareCount) * inventorySquareSize;
        inventoryCTX.strokeStyle = darkGray;
        inventoryCTX.lineWidth = scale * 12 ;
        for (let r = 0; r < inventorySubSquareCount; r++) {
            for (let c = 0; c < inventorySubSquareCount; c++) {
                if (currentInventory[i].arr[r][c]) {
                    inventoryCTX.strokeRect(baseC + c * inventorySubSquareSize, baseR + r * inventorySubSquareSize, inventorySubSquareSize, inventorySubSquareSize);
                }
            }
        }
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
    inventoryCanvas.innerHTML = "";
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