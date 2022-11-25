import React, {useEffect, useState} from 'react';
import classNames from "classnames";

const NO_PLAYER = 0
// const PLAYER_ONE = 1
// const PLAYER_TWO = 2

const Board = ({rows = 7, columns = 7}) => {
  const [board, setBoard] = useState([])

  useEffect(() => {
    createBoard()
  }, [])

  const createBoard = () => {
    const boardCopy = Array.from(board)
    for (let r = 0; r < rows; r++) {
      //Push a row
      boardCopy.push([])
      for (let c = 0; c < columns; c++) {
        //Push column
        boardCopy[r]?.push(NO_PLAYER)
      }
    }
    setBoard(boardCopy)
  }

  return (
    <div className={classNames(`grid grid-rows-${rows} grid-cols-${columns}`)}>
      {board.map((row, rowNumber) => {
        return row.map((tile, columnNumber) => (
          <div>{rowNumber}, { columnNumber}</div>
        ))
      })}
    </div>
  );
};

export default Board;