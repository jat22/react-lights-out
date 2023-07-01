import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const randomTF = () => Math.random() < chanceLightStartsOn;
    let initialBoard = Array.from({ length: nrows})
                              .map( (r) => (Array.from({ length: ncols})
                                    .map((c) => (randomTF()))
                                    )
                              );
                              console.log(initialBoard)
    return initialBoard;
  }

  function hasWon() {
    //check the board in state to determine whether the player has won.
    for(let r of board){
      if(r.includes(true)){
        return false
      }
    }
    return true
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = JSON.parse(JSON.stringify(oldBoard));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);

      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
if(hasWon()){
  return (
    <h1>You WON!!</h1>
  )
}
  // TODO

  // make table board
return (
  <table>
    <tbody>
      {board.map((r, ri) => (
        <tr key={ri}>
          {r.map((c, ci) => (
          <Cell key={`${ri}${ci}`} flipCellsAroundMe={flipCellsAround} isLit={c} cors={`${ri}-${ci}`}/>)
          )}
        </tr>
      ))}
    </tbody>
  </table>
)
  // TODO

}
export default Board;
