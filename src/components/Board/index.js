import React, {useEffect, useState} from 'react'
import classNames from "classnames"
import {checkDiagonal, checkDiagonalForward, checkHorizontal, checkVertical} from "../../helpers";

const NO_PLAYER = 0
const PLAYER_ONE = 1
const PLAYER_TWO = 2
const MAX_SCORE = 4

const PLAYER_NAME = {
  [PLAYER_ONE]: 'Red',
  [PLAYER_TWO]: 'Blue'
}

const PLAYER_COLOR = {
  [PLAYER_ONE]: 'bg-red-500',
  [PLAYER_TWO]: 'bg-blue-500'
}

const Board = ({rows = 7, columns = 7}) => {
  // Player one starts playing ever
  const [player, setPlayer] = useState(PLAYER_ONE)
  const [board, setBoard] = useState([])
  const [moveCount, setMoveCount] = useState(0)
  const [emptySpots, setEmptySpots] = useState([])
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    if (!board.length) {
      initializeEmptySpots()
      initializeBoard()
    }
  }, [])

  useEffect(() => {
    initializeEmptySpots()
    initializeBoard()
  }, [winner])

  useEffect(() => {
    if (moveCount >= 7)
      checkWinner()
  }, [player])

  const initializeEmptySpots = () => {
    setEmptySpots([])
    const tempArray = []
    for (let r = 0; r < rows; r++) {
      tempArray.push([])
      for (let c = 0; c < columns; c++) {
        tempArray[r]?.push(c)
      }
    }
    setEmptySpots(tempArray)
  }

  const initializeBoard = () => {
    if (board.length) setBoard([])
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

  const setTile = (x, y) => {
    if (board[x][y]) return
    const updatedBoardArray = Array.from(board)
    const updatedEmptySpots = Array.from(emptySpots)
    const rowIsEven = board[x]?.length % 2 === 1
    const rowHalf = board[x]?.length / 2
    const isLeft = y < Math.round(rowHalf)
    const isRight = y + 1 > Math.round(rowHalf)
    const isCenter = rowIsEven && (y + 1 === Math.round(rowHalf))
    const canChooseCenter = board[x][y - 1] || board[x][y + 1]

    let tile;

    if (isCenter) {
      if (canChooseCenter) tile = y
      else return
    } else {
      if (isLeft) tile = updatedEmptySpots[x].shift()
      if (isRight) tile = updatedEmptySpots[x].pop()
    }

    updatedBoardArray[x][tile] = player

    setEmptySpots(updatedEmptySpots)
    setBoard(updatedBoardArray)
    setMoveCount(moveCount + 1)
    if (player === PLAYER_ONE) setPlayer(PLAYER_TWO)
    if (player === PLAYER_TWO) setPlayer(PLAYER_ONE)
  }

  const checkWinner = () => {
    let winnerId = undefined;
    checkHorizontal(board, rows, columns, MAX_SCORE, (player) => {
      setWinner(player)
      return setBoard([])
    })
    checkVertical(board, rows, columns, MAX_SCORE, (player) => {
      setWinner(player)
      return setBoard([])
    })
    checkDiagonal(board, rows, columns, MAX_SCORE, (player) => {
      setWinner(player)
      return setBoard([])
    })
    checkDiagonalForward(board, rows, columns, MAX_SCORE, (player) => {
      setWinner(player)
      return setBoard([])
    })
  }

  return (
    <>
      {winner && <span>{PLAYER_NAME[winner]} Wins!</span>}
      <div className={classNames(`mx-auto max-w-2xl grid grid-rows-${rows} grid-cols-${columns}`)}>
        {board.map((row, x) => row.map((tile, y) => (
          <div
            className={
              classNames(
                'w-20 h-20 border m-2 rounded-full',
                {[PLAYER_COLOR[PLAYER_ONE]]: board[x][y] === PLAYER_ONE},
                {[PLAYER_COLOR[PLAYER_TWO]]: board[x][y] === PLAYER_TWO}
              )
            }
            onClick={() => setTile(x, y)}>

          </div>
        )))}
      </div>
    </>
  )
}

export default Board
