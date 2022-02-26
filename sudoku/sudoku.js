class Sudoku {
    constructor(table, type) {
        this.table = table;

        this.board = this.emptyBoard();
        this.clearBoard();

        if (type == "customize") {
            this.board = this.emptyBoard();
        } else if (type == "sampleBoard") {
            this.board = this.sampleBoard();
        } else {
            console.log(1, this.board);
            this.generateBoard();
        }
        
        // console.log(this.board);
        
        this.updateBoard();
    }

    clearBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.board[i][j] = 0;
                this.table.rows[i].cells[j].innerHTML = "";
                this.table.rows[i].cells[j].style.backgroundColor = "whitesmoke";
                this.table.rows[i].cells[j].style.fontWeight = "normal";
            }
        }
    }

    updateBoard() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] != 0) {
                    this.table.rows[i].cells[j].innerHTML = this.board[i][j];
                    this.table.rows[i].cells[j].style.fontWeight = "bold";
                }
            }
        }
    }

    updateNumber(position, num) {
        let x = parseInt(position[0]);
        let y = parseInt(position[1]);
        this.table.rows[x].cells[y].style.fontWeight = "normal";
        if (num == 0) {
            this.board[x][y] = num;
            this.table.rows[x].cells[y].innerHTML = "";
            return true;
        }

        if (this.checkCondition([x,y], num)) {
            this.board[x][y] = num;
            this.table.rows[x].cells[y].innerHTML = num;
            return true;
        }

        

        return false;
    }

    gameOver() {
        for (let item of this.board) {
            for (let element of item) {
                if (element == 0) {
                    return false;
                }
            }
        }

        return true;
    }

    generateBoard() {
        this.board = this.emptyBoard();
        this.counter = 0
        for (let i = 0; i < 9; i++) {
            // how many to be filled up in a row
            let fillRow = Math.floor(Math.random() * 6) + 1;
            this.counter = i;
            for (let j = 0; j < fillRow; j++) {
                // which position to be filled up
                // rmb to check position is taken or not
                let fillPosition = Math.floor(Math.random() * 9);
                
                while (this.board[i][fillPosition] != 0) {
                    fillPosition = Math.floor(Math.random() * 9);
                }

                // console.log(fillPosition)

                // // what number to be filled
                let fillNumber = Math.floor(Math.random() * 9) + 1;
                
                // let previousBoard = this.copyBoard(this.board);
                // this.board[i][fillPosition] = fillNumber;
                
                // while (!this.checkCondition([i,fillPosition], fillNumber) || !this.solve()) {
                //     console.log(1)
                //     this.board[i][fillPosition] = 0;
                //     fillNumber = Math.floor(Math.random() * 9) + 1;
                //     // this.board = this.copyBoard(previousBoard);
                //     this.board[i][fillPosition] = fillNumber;
                // }

                this.check(i, fillPosition, fillNumber);

                // while (!this.checkCondition([i,fillPosition], fillNumber)) {
                //     fillNumber = Math.floor(Math.random() * 9) + 1;
                // } 

                // let previousBoard = this.copyBoard(this.board);
                // this.board[i][fillPosition] = fillNumber;

                // if (!this.solve()) {
                //     // generate fillNumber again
                //     // chceck condition again
                //     // check for solve again
                // }





                // console.log(previousBoard[0])
                // console.log(this.board[0])
                // this.board[i][fillPosition] = fillNumber;
                // this.board = this.copyBoard(previousBoard);


                /*
                let fillNumber = Math.floor(Math.random() * 9) + 1;
                
                while (!this.checkCondition([i,fillPosition], fillNumber) ) {
                    console.log(1)
                    fillNumber = Math.floor(Math.random() * 9) + 1;
                }
                
                this.board[i][fillPosition] = fillNumber;
                */
                
            }
        }
    }

    check(i, fillPosition, fillNumber) {
        console.log(1)
        // debugger;
        while (!this.checkCondition([i,fillPosition], fillNumber)) {
            fillNumber = Math.floor(Math.random() * 9) + 1;
        } 
        // debugger;
        console.log(2)
        let previousBoard = this.copyBoard();
        this.board[i][fillPosition] = fillNumber;
        console.log(this.board);
        // debugger;
        if (this.counter > 2) {
            // debugger;
            if (!this.solve()) {
                // generate fillNumber again
                // chceck condition again
                // check for solve again
                // console.log(3);
                // debugger;
                this.board[i][fillPosition] = 0;
                this.check(i, fillPosition, Math.floor(Math.random() * 9) + 1);
            }
            this.board = previousBoard;
        }
        

    }

    copyBoard() {
        let previousBoard = this.emptyBoard();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                previousBoard[i][j] = this.board[i][j];
            }
        }

        return previousBoard;
    }

    sampleBoard() {
        return [[3, 0, 6, 5, 0, 8, 4, 0, 0],
          [5, 2, 0, 0, 0, 0, 0, 0, 0],
          [0, 8, 7, 0, 0, 0, 0, 3, 1],
          [0, 0, 3, 0, 1, 0, 0, 8, 0],
          [9, 0, 0, 8, 6, 3, 0, 0, 5],
          [0, 5, 0, 0, 9, 0, 6, 0, 0],
          [1, 3, 0, 0, 0, 0, 2, 5, 0],
          [0, 0, 0, 0, 0, 0, 0, 7, 4],
          [0, 0, 5, 2, 0, 6, 3, 0, 0]]
    }

    emptyBoard() {
        return [[0, 0, 0, 0, 0, 0 ,0 ,0, 0],
                [0, 0, 0, 0, 0, 0 ,0 ,0, 0],
                [0, 0, 0, 0, 0, 0 ,0 ,0, 0],
                [0, 0, 0, 0, 0, 0 ,0 ,0, 0],
                [0, 0, 0, 0, 0, 0 ,0 ,0, 0],
                [0, 0, 0, 0, 0, 0 ,0 ,0, 0],
                [0, 0, 0, 0, 0, 0 ,0 ,0, 0],
                [0, 0, 0, 0, 0, 0 ,0 ,0, 0],
                [0, 0, 0, 0, 0, 0 ,0 ,0, 0]]
    }

    checkCondition(position, number) {
        let x = position[0];
        let y = position[1];
        
        for (let item of this.board[x]) {
            if (item == number) {
                return false;
            }
        }
        
        for (let item of this.board) {
            if (item[y] == number) {
                return false;
            }
        }
        // console.log("here", number)
        let minRow = this.sectionRange(x);
        let minCol = this.sectionRange(y);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[minRow+i][minCol+j] == number) {
                    // console.log("here", number)
                    return false;
                }
            }
        }

        return true;
    }
    
    sectionRange(x) {
        if (x % 3 == 0) {
            return x;
        } else if (x % 3 == 1) {
            return x - 1;
        } else {
            return x - 2;
        }
    }

    findEmptyLoaction(x=0, y=0) {
        if (x == this.board.length) {
            return [false, 0, 0]
        }

        if (this.board[x][y] != 0) {
            if (y == this.board.length - 1) {
                return this.findEmptyLoaction(x+1, 0)
            } else {
                return this.findEmptyLoaction(x, y+1)
            }
        } else {
            return [true, x, y]
        }
    }

    solve() {
        let retVal = this.findEmptyLoaction(0,0);
        let check = retVal[0];
        let x = retVal[1];
        let y = retVal[2];

        if (!check) {
            return true;
        }

        for (let num = 1; num < 10; num++) {
            if (this.checkCondition([x,y], num)) {
                this.table.rows[x].cells[y].innerHTML = num;
                this.board[x][y] = num;

                if (this.solve()) {
                    // this.updateBoard("normal");
                    this.updateNumber([x,y], num);
                    return true;
                }

                this.board[x][y] = 0
            }
        }

        return false;
    }

}

let sudoku;
let previous;
let previousColor;
let errorMessage;
let errorFlag = false;

function sampleBoard() {
    if (sudoku) {
        clearSudoku();
    }

    if (errorFlag){
        document.body.removeChild(errorMessage);
        errorFlag = false;
    }
    console.log("sample game");
    let table = document.getElementById("sudoku-table");
    sudoku = new Sudoku(table, "sampleBoard");
    document.getElementById("clearButton").disabled = false;
}

function newGame() {
    if (sudoku) {
        clearSudoku();
    }

    if (errorFlag){
        document.body.removeChild(errorMessage);
        errorFlag = false;
    }
    console.log("new game");
    let table = document.getElementById("sudoku-table");
    sudoku = new Sudoku(table, "newGame");

    
}

function solution() {
    if (errorFlag){
        document.body.removeChild(errorMessage);
        errorFlag = false;
    }
    console.log("Solved");
    sudoku.solve();
    console.log(sudoku.board);
    document.getElementById("saveButton").disabled = true;
}

function customize() {
    if (errorFlag){
        document.body.removeChild(errorMessage);
        errorFlag = false;
    }
    
    if (sudoku) {
        clearSudoku();
    }
    
    let table = document.getElementById("sudoku-table");
    sudoku = new Sudoku(table, "customize");
    
    document.getElementById("saveButton").disabled = false;
}

function save() {
    document.getElementById("clearButton").disabled = false;
    sudoku.updateBoard();
}

function clearSudoku() {
    if (errorFlag){
        document.body.removeChild(errorMessage);
        errorFlag = false;
    }
    console.log("Cleared");
    sudoku.clearBoard();
    document.getElementById("clearButton").disabled = true;
    document.getElementById("saveButton").disabled = true;
}

window.onclick = e => {
    if (e.target.tagName == "TD") {
        if (errorFlag){
            document.body.removeChild(errorMessage);
            errorFlag = false;
        }
        if (previous) {
            document.getElementById(previous).style.backgroundColor = "whitesmoke";
        }

        document.getElementById(e.target.id).style.backgroundColor = "rgb(152,251,152)"
        previous = e.target.id
        previousColor = document.getElementById(previous).style.backgroundColor

        
    }
} 

document.addEventListener('keydown', function(event) {
            
    let key = event.keyCode;
    let num;
    let is_null = false;
    switch (true) {
        case (key >= 49 && key <= 57):
            num = key - 48;
            is_null = false;
            break;
        case (key == 8 || key == 46):
            num = 0;
            is_null = false;
            break;
        default:
            is_null = true;
            break;
    }
    if (errorFlag){
            document.body.removeChild(errorMessage);
            errorFlag = false;
        }
    if (!is_null) {
        let updated = sudoku.updateNumber(previous, num);
        console.log(updated)
        
        if (!updated) {
            errorMessage = document.createTextNode("Invalid Move");
            errorFlag = true;
            document.body.appendChild(errorMessage);
            
        }
    }
})