class Shape {
    constructor(arr, colour) {
        this.arr = arr;
        this.colour = colour; // 0 means customizable, anything else means all squares are that colour
        this.rotation = 0;
        this.available = true;
    }

    rotateArray(dir) {
        // dir will be "l" or "r"

        let temp = [];
        for (let r = 0; r < this.arr[0].length; r++) {
            let tempRow = [];
            for (let c = 0; c < this.arr.length; c++) {
                tempRow.push("-1");
            }
            temp.push(tempRow);
        }

        if (dir == "l") {
            let oldR = 0;
            let oldC = this.arr[0].length - 1;
            for (let r = 0; r < temp.length; r++) {
                for (let c = 0; c < temp[0].length; c++) {
                    temp[r][c] = this.arr[oldR][oldC];
                    oldR++;
                }
                oldR = 0;
                oldC--;
            }

            this.rotation -= 90;
        }
        else {
            let oldR = this.arr.length - 1;
            let oldC = 0;
            for (let r = 0; r < temp.length; r++) {
                for (let c = 0; c < temp[0].length; c++) {
                    temp[r][c] = this.arr[oldR][oldC];
                    oldR--;
                }
                oldR = this.arr.length - 1;
                oldC++;
            }
            this.rotation += 90;
        }
        this.arr = temp;
    }

    clone()
    {
        let clone = new Shape(this.arr.slice(), this.colour);
        clone.rotation = this.rotation;
        clone.available = this.available;
        return clone;
    }
}