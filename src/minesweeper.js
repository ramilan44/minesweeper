// Stopped on step 24 of Adding Class Structure to game
class Game {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowsIndex, columnIndex) {
    this._board.flipTile(rowsIndex, columnIndex);
    if (this._board.playerBoard[rowsIndex][columnIndex] === 'B') {
      console.log('The game is over!');
      this._board.print();
    } else if (this._board.hasSafeTiles()) {
      console.log('You have won the game!');
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowsIndex, columnIndex) {
    if (this._playerBoard[rowsIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowsIndex][columnIndex] === 'B'){
      this._playerBoard[rowsIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowsIndex][columnIndex] = this.getNumberOfNeighborBombs(bombBoard, rowsIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowsIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];
    //const numberOfRows = this._bombBoard.length;
    //const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowsIndex + offset[1];
      const neighborColumnIndex = columnIndex + offset[0];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] = 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;

    }

  print() {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    for (let rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      };
      board.push(row);
    };
    return board;
  }
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      };
      board.push(row);
    };
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    // Need to learn about Control Flow to stop bombs from stacking
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++
    }
  }
    return board;
  }

}



const g = new Game(3, 3, 3);
g.playMove(0,0);
