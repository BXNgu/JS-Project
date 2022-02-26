class Reversi {
    constructor(table) {
        this.table = table;
        this.board = this.createBoard();
        this.updateBoard();
        
    }

    copyBoard() {
        let temp_board = this.createBoard();
        
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                temp_board[row][col] = this.board[row][col];
            }
        }

        return temp_board;
    }

    updateNumber(x, y, player) {
        this.board[x][y] = player;
        // console.log(this.board)
        this.table.rows[x].cells[y].innerHTML = player;
    }

    updateBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j] != 0) {
                    this.table.rows[i].cells[j].innerHTML = this.board[i][j];
                    // this.table.rows[i].cells[j].style.fontWeight = "bold";
                }
            }
        }
    }

    createBoard() {
        return [[0, 0, 0, 0, 0, 0 ,0 ,0],
                [0, 0, 0, 0, 0, 0 ,0 ,0],
                [0, 0, 0, 0, 0, 0 ,0 ,0],
                [0, 0, 0, 1, 2, 0 ,0 ,0],
                [0, 0, 0, 2, 1, 0 ,0 ,0],
                [0, 0, 0, 0, 0, 0 ,0 ,0],
                [0, 0, 0, 0, 0, 0 ,0 ,0],
                [0, 0, 0, 0, 0, 0 ,0 ,0]];
    }

    score(board) {
        let s1 = 0;
        let s2 = 0;
        for (let row of board) {
            for (let col of row) {
                if (col == 1) {
                    s1 += 1;
                } else if (col == 2) {
                    s2 += 1;
                }
            }
        }
        return [s1, s2]
    }

    enclosing(player, position, direction) {
        let count = 0;
        let row = position[0] + direction[0];
        let col = position[1] + direction[1];
        let valid = false;

        while (col > -1 && col < 8 && row > -1 && row < 8) {
            if (count == 0 && this.board[row][col] == player) {
                break;
            }

            if (this.board[row][col] == 0) {
                break;
            }

            if (count != 0 && this.board[row][col] == player) {
                valid = true;
                break;
            }

            row += direction[0];
            col += direction[1];
            count += 1;
        }

        return valid;
    }

    validMoves(player) {
        let opponent = (player == 1) ? 2 : 1;
        let temp = [];
        let moves = [];

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == player) {
                    temp.push([i, j]);
                }
            }
        }
        // console.log(temp)

        let directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        for (let direction of directions) {
            let temp_moves = this.checkDirections(player, opponent, temp, direction);
            // console.log("temp_moves", temp_moves)
            for (let move of temp_moves) {
                moves.push([move[0], move[1]]);
            }
        }
        // console.log(moves)
        return moves;
    }

    checkDirections(player, opponent, temp, direction) {
        let moves = [];
        let valid, row, col, neighbour;
        for (let i = 0; i < temp.length; i++) {
            valid = false;
            row = temp[i][0] + direction[0];
            col = temp[i][1] + direction[1];
            neighbour = true;

            while (col < 8 && row < 8 && row > -1 && col > -1) {
                if (neighbour && this.board[row][col] != opponent) {
                    break;
                }

                if (this.board[row][col] == opponent) {
                    valid = true;
                }

                if (this.board[row][col] == player) {
                    break;
                }

                if (valid && this.board[row][col] == 0) {
                    moves.push([row, col]);
                    break;
                }

                row += direction[0];
                col += direction[1];
                neighbour = false;
            }
        }

        return moves;
    }

    nextState(board, player, position) {
        let nextPlayer = (player == 1) ? 2 : 1;
        
        let row = position[0];
        let col = position[1];

        board[row][col] = player;

        let validDirection = []

        let directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

        for (let direction of directions) {
            if (this.enclosing(player, position, direction)) {
                validDirection.push(direction);
            }
        }

        for (let direction of validDirection) {
            row = position[0] + direction[0];
            col = position[1] + direction[1];
            while (col > -1 && col < 8 && row > -1 && row < 8 && board[row][col] != player) {
                board[row][col] = player;
                row += direction[0];
                col += direction[1];
            }
        }

        return nextPlayer;
    }
}

let previous;
let previousColor;
let positionTriggered = "";
let reversi;
let table;

let hello = async () => "Hello";

function func(event) {
    positionTriggered = event.target.id;
}

async function sing() {
    document.addEventListener("click", func);
    
    let invalid = false;
    let player = 1;

    console.log(player);

    while (reversi.validMoves(1) != 0 && reversi.validMoves(2).length != 0) {
        if (player == 1) {
            // console.log(reversi.validMoves(player));
            // console.log("Player", player, "turn");
            
            let promise = new Promise(function (resolve, reject) {
                if (buttonClicked) {
                    resolve(positionTriggered);
                    buttonClicked = false;
                } else {
                    reject("No position")
                }
            });

            let some;
            await promise.then((result) => {
                some = result
            });

            x = parseInt(some[0]);
            y = parseInt(some[1]);

            if (some == null) {
                continue;
            }

            for (let pos of reversi.validMoves(player)) {
                console.log(x, "vs", pos[0], y, "vs", pos[1])
                if (x == pos[0] && y == pos[1]) {
                    console.log("valid")
                    player = reversi.nextState(reversi.board, player, [x, y]);
                    break;
                }
            }

            reversi.updateBoard();
            
            console.log("Next:", player);

        } else {
            // console.log("win");

            let states = [];
            let scores = [];
            let positions = []

            for (let pos of reversi.validMoves(player)) {
                tempBoard = reversi.copyBoard();
                console.log("pushing")
                console.log(pos)
                console.log(tempBoard)
                console.log("Score", reversi.score(tempBoard)[1])
                states.push([tempBoard, reversi.nextState(tempBoard, player, pos)]);
                scores.push(reversi.score(tempBoard)[1]);
                positions.push(pos);
            }

            if (states.length == 0) {
                player = 1;
                continue;
            }

            let index = 0;
            let maximum = scores[index];
            for (let i = 0; i< scores.length; i++) {
                if (maximum < scores[i]) {
                    index = i;
                    maximum = scores[i];
                }
            }

            console.log(states[index][0])

            reversi.board = states[index][0];

            player = states[index][1];

            console.log(reversi.board)

            reversi.updateBoard();


            // break;
            console.log("From 2", player)

        }

        //     print("Player", player, "turn")
        //     states = []
        //     scores = []
        //     positions = []
        //     for pos in valid_moves(board, player):
        //         temp_board = copy_board(board)
        //         states += [next_state(temp_board, player, pos)]
        //         scores += [score(temp_board)[1]]
        //         positions += [pos]

        //     index = 0
        //     maximum = scores[index]
            
        //     for i in range(len(scores)):
        //         if maximum < scores[i]:
        //             index = i
        //             maximum = scores[i]

        //     print("Player", player, "chooses", positions[index])
        //     board = states[index][0]
            
        //     player = states[index][1]
            
        //     print(score(board))
    }
}

let buttonClicked = false;

function somePromise() {
    let promise =  new Promise(function (resolve, reject) {
        if (buttonClicked) {
            resolve(positionTriggered);
            buttonClicked = false;
        } else {
            reject("No position")
        }
    });

    return promise;
}

function pause() {
    setTimeout()
}

async function singlePlayer() {
    document.getElementById("single").disabled = true;
    document.getElementById("multi").disabled = true;
    document.getElementById("end").disabled = false;

    table = document.getElementById("reversi-table");
    // console.log(table);
    reversi = new Reversi(table);

    document.addEventListener("click", func);
    
    let invalid = false;
    let player = 1;

    console.log(player);

    while (reversi.validMoves(1) != 0 && reversi.validMoves(2).length != 0) {
        if (player == 1) {
            console.log(reversi.validMoves(player));
            console.log("Player", player, "turn");
            
            // positionTriggered = "";
            let promise = new Promise(function (resolve, reject) {
                if (buttonClicked) {
                    resolve(positionTriggered);
                    buttonClicked = false;
                } else {
                    reject("No position")
                }
            });

            let some;
            await promise.then((result) => {
                some = result
            });

            // console.log(some);
            x = parseInt(some[0]);
            y = parseInt(some[1]);

            if (some == null) {
                continue;
            }

            

            // console.log("valid moves", reversi.validMoves(player))

            for (let pos of reversi.validMoves(player)) {
                console.log(x, "vs", pos[0], y, "vs", pos[1])
                if (x == pos[0] && y == pos[1]) {
                    console.log("HERE")
                    // reversi.updateNumber(x, y, player);
                    // console.log(reversi.board)
                    // reversi.updateBoard();
                    player = reversi.nextState(reversi.board, player, [x, y]);
                }
            }

            reversi.updateBoard();
            
            console.log("NExt", player);
            
            // if (!invalid) {
            //     for (let pos of reversi.validMoves(player)) {
            //         if (x == pos[0] && y == pos[1]) {
            //             player = reversi.nextState(player, [x, y])
            //             console.log(reversi.score());
            //         }
            //     }
            // }
            // console.log(reversi.score())
        } else {
            // console.log("win");

            let states = [];
            let scores = [];
            let positions = []

            for (let pos of reversi.validMoves(player)) {
                tempBoard = reversi.copyBoard();
                console.log("pushing")
                console.log(pos)
                console.log(tempBoard)
                console.log(reversi.nextState(tempBoard, player, pos))
                states.push([tempBoard, reversi.nextState(tempBoard, player, pos)]);
                scores.push(reversi.score(tempBoard)[1]);
                positions.push(pos);
            }

            let index = 0;
            let maximum = scores[index];
            for (let i = 0; i< scores.length; i++) {
                if (maximum < scores[i]) {
                    index = i;
                    maximum = scores[i];
                }
            }

            console.log(states[index][0])

            reversi.board = states[index][0];

            player = states[index][1];

            console.log(reversi.board)

            reversi.updateBoard();


            // break;

        }

        //     print("Player", player, "turn")
        //     states = []
        //     scores = []
        //     positions = []
        //     for pos in valid_moves(board, player):
        //         temp_board = copy_board(board)
        //         states += [next_state(temp_board, player, pos)]
        //         scores += [score(temp_board)[1]]
        //         positions += [pos]

        //     index = 0
        //     maximum = scores[index]
            
        //     for i in range(len(scores)):
        //         if maximum < scores[i]:
        //             index = i
        //             maximum = scores[i]

        //     print("Player", player, "chooses", positions[index])
        //     board = states[index][0]
            
        //     player = states[index][1]
            
        //     print(score(board))
    }
}

let player = 1;

async function multiplayer() {
    document.getElementById("single").disabled = true;
    document.getElementById("multi").disabled = true;
    document.getElementById("end").disabled = false;

    table = document.getElementById("reversi-table");
    // console.log(table);
    reversi = new Reversi(table);

    document.addEventListener("click", func);
    
    let invalid = false;
    // let player = 1;

    console.log(player);

    while (reversi.validMoves(1) != 0 && reversi.validMoves(2).length != 0) {
        // if (player == 1) {
            console.log(reversi.validMoves(player));
            console.log("Player", player, "turn");
            
            // positionTriggered = "";
            let promise = new Promise(function (resolve, reject) {
                if (buttonClicked) {
                    resolve(positionTriggered);
                    buttonClicked = false;
                } else {
                    reject("No position")
                }
            });

            let some;
            await promise.then((result) => {
                some = result
            });

            // console.log(some);
            x = parseInt(some[0]);
            y = parseInt(some[1]);

            if (some == null) {
                continue;
            }

            

            // console.log("valid moves", reversi.validMoves(player))

            for (let pos of reversi.validMoves(player)) {
                console.log(x, "vs", pos[0], y, "vs", pos[1])
                if (x == pos[0] && y == pos[1]) {
                    console.log("HERE")
                    // reversi.updateNumber(x, y, player);
                    // console.log(reversi.board)
                    // reversi.updateBoard();
                    player = reversi.nextState(reversi.board, player, [x, y]);
                }
            }

            reversi.updateBoard();
            
            console.log("NExt", player);
            
            // if (!invalid) {
            //     for (let pos of reversi.validMoves(player)) {
            //         if (x == pos[0] && y == pos[1]) {
            //             player = reversi.nextState(player, [x, y])
            //             console.log(reversi.score());
            //         }
            //     }
            // }
            // console.log(reversi.score())
        // } else {
        //     // console.log("win");

        //     let states = [];
        //     let scores = [];
        //     let positions = []

        //     for (let pos of reversi.validMoves(player)) {
        //         tempBoard = reversi.copyBoard();
        //         console.log("pushing")
        //         console.log(pos)
        //         console.log(tempBoard)
        //         console.log(reversi.nextState(tempBoard, player, pos))
        //         states.push([tempBoard, reversi.nextState(tempBoard, player, pos)]);
        //         scores.push(reversi.score(tempBoard)[1]);
        //         positions.push(pos);
        //     }

        //     let index = 0;
        //     let maximum = scores[index];
        //     for (let i = 0; i< scores.length; i++) {
        //         if (maximum < scores[i]) {
        //             index = i;
        //             maximum = scores[i];
        //         }
        //     }

        //     console.log(states[index][0])

        //     reversi.board = states[index][0];

        //     player = states[index][1];

        //     console.log(reversi.board)

        //     reversi.updateBoard();


        //     // break;

        

        //     print("Player", player, "turn")
        //     states = []
        //     scores = []
        //     positions = []
        //     for pos in valid_moves(board, player):
        //         temp_board = copy_board(board)
        //         states += [next_state(temp_board, player, pos)]
        //         scores += [score(temp_board)[1]]
        //         positions += [pos]

        //     index = 0
        //     maximum = scores[index]
            
        //     for i in range(len(scores)):
        //         if maximum < scores[i]:
        //             index = i
        //             maximum = scores[i]

        //     print("Player", player, "chooses", positions[index])
        //     board = states[index][0]
            
        //     player = states[index][1]
            
        //     print(score(board))
    }
}


// function multiplayer() {
//     document.getElementById("single").disabled = true;
//     document.getElementById("multi").disabled = true;
//     document.getElementById("end").disabled = false;
// }

function end() {
    document.getElementById("single").disabled = false;
    document.getElementById("multi").disabled = false;
    document.getElementById("end").disabled = true;
}

function waitForPosition() {
    while (true) {
        if (positionTriggered != "") {
            return positionTriggered;
        }
    }
}

window.onclick = e => {
    if (e.target.tagName == "TD") {
        // if (errorFlag){
        //     document.body.removeChild(errorMessage);
        //     errorFlag = false;
        // }
        if (previous) {
            document.getElementById(previous).style.backgroundColor = "whitesmoke";
        }

        document.getElementById(e.target.id).style.backgroundColor = "rgb(152,251,152)"
        previous = e.target.id
        previousColor = document.getElementById(previous).style.backgroundColor;

        buttonClicked = true;

        positionTriggered = previous;
        
        
    }
} 