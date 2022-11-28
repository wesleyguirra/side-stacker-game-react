import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Rules from "./components/Rules";
import {useEffect, useRef, useState} from "react";
import ConnectedBoard from "./components/ConnectedBoard";
import RoomDetails from "./components/RoomDetails";
import Board from "./components/Board";

const socket = io('http://localhost:7777')

function App() {
  const [room, setRoom] = useState(null)
  const [board, setBoard] = useState({})
  const [winner, setWinner] = useState(undefined)

  useEffect(() => {
    socket.on('room created', (room) => {
      setRoom(room)
    })

    socket.on('room found', (room) => {
      console.log(room)
      setRoom(room)
      setBoard(room.Board)
    })

    socket.on('player2 found', (room) => {
      setRoom(room)
    })

    socket.on('board created', (board) => {
      console.log(board)
      setBoard(board)
    })

    socket.on('board updated', ({board, room}) => {
      setBoard(board)
      setRoom(room)
    })
    socket.on('game over', (winner) => {
      setWinner(winner)
      alert('game over')
    })
  }, [])

  const createRoom = (data) => {
    const {name, ...boardSettings} = data
    console.log({name, boardSettings})
    socket.emit('create room', {name, boardSettings})
  }
  const findRoom = (name) => {
    socket.emit('find room', name)
  }

  const sendMove = (x, y) => {
    socket.emit('make move', {x, y, room: room.name})
  }

  return (
    <div className="flex flex-row">
      <div className="max-w-lg mx-auto">
        <Rules />
        <RoomDetails onCreateRoom={createRoom} onFindRoom={findRoom} room={room} />
      </div>
      <div className="relative mx-auto">
        {(!room?.player2 || room?.turn !== socket.id) && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-70 flex justify-center items-center">
            <div>{!room?.player2 ? 'Waiting other player...' : 'Waiting other player turn...'}</div>
          </div>
        )}
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
  );
}

export default App;
