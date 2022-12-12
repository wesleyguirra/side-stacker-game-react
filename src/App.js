import './App.css';
import io from 'socket.io-client';
import Rules from "./components/Rules";
import React, {useEffect, useState} from "react";
import ConnectedBoard from "./components/ConnectedBoard";
import RoomDetails from "./components/RoomDetails";
import {PLAYER_NAME} from "./constants";
import {getPlayerNumber} from "./helpers";
import Dialog from "./components/Dialog";

const socket = io('http://localhost:7777')

function App() {
  const [room, setRoom] = useState(null)
  const [board, setBoard] = useState({})
  const [winner, setWinner] = useState(undefined)
  const [dialogVisible, setDialogVisible] = useState(false)

  useEffect(() => {
    socket.on('room created', (room) => {
      setRoom(room)
    })

    socket.on('room found', (room) => {
      setDialogVisible(true)
      setRoom(room)
      setBoard(room.Board)
    })

    socket.on('new player joined', (room) => {
      setRoom(room)
    })

    socket.on('board created', (board) => {
      setDialogVisible(true)
      setBoard(board)
    })

    socket.on('board updated', ({board, room}) => {
      setBoard(board)
      setRoom(room)
    })
    socket.on('game over', (winner) => {
      setWinner(winner)
      return alert('game over')
    })
  }, [])

  const createRoom = (data) => {
    const {name, ...boardSettings} = data
    socket.emit('create room', {name, boardSettings})
  }
  const findRoom = (name) => {
    socket.emit('find room', name)
  }

  const sendMove = (x, y) => {
    socket.emit('make move', {x, y, room: room.name})
  }

  return (
    <>
      <Dialog dialog={{visible: dialogVisible}} onClose={() => setDialogVisible(false)}>
        <Rules />
      </Dialog>
      <div className="container flex flex-col xl:flex-row mx-auto">
        <div className="flex flex-col">
          <RoomDetails onCreateRoom={createRoom} onFindRoom={findRoom} room={room} player={socket.id} />
        </div>
        <div className="relative">
          {(!room?.player2 || parseInt(room?.turn) !== getPlayerNumber(socket.id, room)) && (
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-70 flex justify-center items-center">
              <div>{!room?.player2 ? 'Waiting other player...' : 'Waiting other player turn...'}</div>
            </div>
          )}
          {winner && <span>{PLAYER_NAME[winner]} Wins!</span>}
          <ConnectedBoard
            player={socket.id}
            data={board?.values}
            rows={board?.rows}
            columns={board?.columns}
            onChooseTile={sendMove}
            room={room}
          />
        </div>
      </div>
    </>
  );
}

export default App;
