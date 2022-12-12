import React, {useEffect, useState} from 'react'
import classNames from "classnames"
import {PLAYER_COLORS} from "../../constants";

const ConnectedBoard = ({rows = 7, columns = 7, data = [], onChooseTile, room}) => {
  // Player one starts playing ever
  const [moveCount, setMoveCount] = useState(0)
  const [emptySpots, setEmptySpots] = useState([])
  const {turn} = room || {}

  useEffect(() => {
    if (!data.length) {
      initializeEmptySpots()
    }
  }, [])

  // useEffect(() => {
  //   initializeEmptySpots()
  // }, [winner])

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

    updatedBoardArray[x][tile] = turn

    onChooseTile(x, tile)

    setMoveCount(moveCount + 1)
  }

  return (
    <>
      <div className={classNames(`mx-auto max-w-2xl grid grid-rows-${rows} grid-cols-${columns}`)}>
        {data.map((row, x) => row.map((tile, y) => (
          <div
            className={
              classNames(
                'w-20 h-20 border m-2 rounded-full', PLAYER_COLORS[data[x][y]]
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
