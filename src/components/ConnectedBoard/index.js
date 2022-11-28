import React, {useEffect, useState} from 'react'
import classNames from "classnames"
import io from 'socket.io-client'

const NO_PLAYER = 0
const PLAYER_ONE = 1
const PLAYER_TWO = 2
const MAX_SCORE = 4

const PLAYER_NAME = {
  [PLAYER_ONE]: 'Red',
  [PLAYER_TWO]: 'Blue'
}



const socket = io()

const ConnectedBoard = ({rows = 7, columns = 7, data = [], onChooseTile, room}) => {
  // Player one starts playing ever
  const [player, setPlayer] = useState(PLAYER_ONE)
  const [moveCount, setMoveCount] = useState(0)
  const [emptySpots, setEmptySpots] = useState([])
  const [winner, setWinner] = useState(null)
  const [playerColors, setPlayerColors] = useState({})

  const initializeBoardColors = (room) => {
    setPlayerColors({
      [room?.player2]: 'bg-red-500',
      [room?.player1]: 'bg-blue-500'
    })
  }

  useEffect(() => {
    initializeBoardColors(room)
  }, [room])

  useEffect(() => {
    if (!data.length) {
      initializeEmptySpots()
    }
  }, [])

  useEffect(() => {
    initializeEmptySpots()
  }, [winner])

  useEffect(() => {

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

  const setTile = (x, y) => {
    if (!!data[x][y]) return
    const updatedBoardArray = Array.from(data)
    const rowIsEven = data[x]?.length % 2 === 1
    const rowHalf = data[x]?.length / 2
    const isLeft = y < Math.round(rowHalf)
    const isRight = y + 1 > Math.round(rowHalf)
    const isCenter = rowIsEven && (y + 1 === Math.round(rowHalf))
    const canChooseCenter = data[x][y - 1] || data[x][y + 1]

    let tile;

    if (isCenter) {
      if (canChooseCenter) tile = y
      else return
    } else {
      if (isLeft) tile = data[x].indexOf(null)
      if (isRight) tile = data[x].lastIndexOf(null)
    }

    updatedBoardArray[x][tile] = player

    onChooseTile(x, tile)

    // setEmptySpots(updatedEmptySpots)
    setMoveCount(moveCount + 1)
    // if (player === PLAYER_ONE) setPlayer(PLAYER_TWO)
    // if (player === PLAYER_TWO) setPlayer(PLAYER_ONE)
  }

  return (
    <>
      {winner && <span>{PLAYER_NAME[winner]} Wins!</span>}
      <div className={classNames(`mx-auto max-w-2xl grid grid-rows-${rows} grid-cols-${columns}`)}>
        {data.map((row, x) => row.map((tile, y) => (
          <div
            className={
              classNames(
                'w-20 h-20 border m-2 rounded-full', playerColors[data[x][y]]
              )
            }
            onClick={() => setTile(x, y)}>
          </div>
        )))}
      </div>
    </>
  )
}

export default ConnectedBoard
