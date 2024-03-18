// shapes
const SMALL_L = [
    [true , false],
    [true , true ]
];

const L = [
    [true , false],
    [true , false],
    [true , true ]
];

const BIG_L = [
    [true , false],
    [true , false],
    [true , false],
    [true , true ]
];

const SMALL_J = [
    [false, true ],
    [true , true ]
];

const J = [
    [false, true ],
    [false, true ],
    [true , true ]
];

const BIG_J = [
    [true , false],
    [true , false],
    [true , false],
    [true , true ]
];

const DOT =
[
    [true]
];

const SMALL_O =
[
    [true]
];

const O =
[
    [true , true ],
    [true , true ]
];

const BIG_O =
[
    [true , true , true ],
    [true , true , true ],
    [true , true , true ]
];

const SMALL_I =
[
    [true],
    [true]
];

const I =
[
    [true],
    [true],
    [true]
];

const BIG_I =
[
    [true],
    [true],
    [true],
    [true]
];

// colours
const red = "#EDC9D4";
const orange = "#FFD3C9";
const yellow = "#FFF7CF";
const green = "#E4F0C9";
const blue = "#C7E0FF";
const purple = "#BAC3FF";

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

let scale = 0.25;
if (!!window.chrome)
{
    scale = 1;
}
const inventoryCanvas = document.getElementById("inventory-canvas");
const inventoryCTX = inventoryCanvas.getContext("2d");

const gridCanvas = document.getElementById("grid");
const gridCTX = gridCanvas.getContext("2d");
gridCanvas.width = 2520 * scale; // 2520 is divisible by 2-10 (allowing for boards up to 10x10 to be cleanly divided)
gridCanvas.height = 2520 * scale;

const goalCanvas = document.getElementById("goal-canvas");
const goalCTX = goalCanvas.getContext("2d");
goalCanvas.width = 2520 * scale; 
goalCanvas.height = 2520 * scale;



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
loadLevel(levelID);

function loadLevel(levelID)
{
    clearAll();
    const gridArray = levelInformation[levelID][0];
    const sideLength = gridArray.length;
    const squareSize = gridCanvas.width / sideLength;
    const goalArray = levelInformation[levelID][1];

    for (let r = 0; r < sideLength; r++)
    {
        for (let c = 0; c < sideLength; c++)
        {
            gridCTX.fillStyle = getColourFromID(gridArray[r][c]);
            gridCTX.fillRect(c * squareSize, r * squareSize, squareSize, squareSize);
        }
    }

    // draw grid lines
    gridCTX.fillStyle = "#37383A";
    for (let r = 1; r < sideLength; r++)
    {
        gridCTX.fillRect(0, r * squareSize - 8 * scale, gridCanvas.width, 16 * scale);
    }

    for (let c = 1; c < sideLength; c++)
    {
        gridCTX.fillRect(c * squareSize - 8 * scale, 0, 16 * scale, gridCanvas.width)
    }

    // draw goal
    for (let r = 0; r < sideLength; r++)
    {
        for (let c = 0; c < sideLength; c++)
        {
            goalCTX.fillStyle = getColourFromID(goalArray[r][c]);
            goalCTX.fillRect(c * squareSize, r * squareSize, squareSize, squareSize);
        }
    }

    goalCTX.fillStyle = "#37383A";
    for (let r = 1; r < sideLength; r++)
    {
        goalCTX.fillRect(0, r * squareSize - 16 * scale, goalCanvas.width, 32 * scale);
    }

    for (let c = 1; c < sideLength; c++)
    {
        goalCTX.fillRect(c * squareSize - 16 * scale, 0, 32 * scale, goalCanvas.width)
    }
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