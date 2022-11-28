import React, {useState} from 'react';
import io from "socket.io-client";
const socket = io('http://localhost:7777')

const RoomDetails = ({room, onCreateRoom, onFindRoom}) => {
  const [roomSettings, setRoomSettings] = useState({
    name: '',
    rows: 7,
    columns: 7,
    score: 4
  })
  const [roomName, setRoomName] = useState('')

  const onChangeSettings = ({target, preventDefault}) => {
    setRoomSettings({
      ...roomSettings,
      [target.name]: target.value
    })
  }
  const onChangeSearchRoom = ({target}) => {
    setRoomName(target.value)
  }
  return (
    <div className="mt-10">
      <div className="flex flex-col max-w-xl" action="">
        {room ? (
          <>
            <h3 className="text-xl mb-3 font-bold">Room name: {room.name}</h3>
            <div>
              <div className="flex flex-row items-center">
                <div className="bg-blue-500 w-3 h-3 rounded-full mr-4"/>
                <p>{room.player1 ?? 'Connecting...'}</p>
              </div>
              <div className="flex flex-row items-center">
                <div className="bg-red-500 w-3 h-3 rounded-full mr-4"/>
                <p>{room.player2 ?? 'Waiting player 2...'}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-row">
            <form className="bg-gray-50 mx-2 p-8" onSubmit={(e) => {
              e.preventDefault()
              onCreateRoom(roomSettings)
            }}>
              <h3 className="text-xl mb-3 font-bold">Create a new room</h3>
              <div>
                <label htmlFor="">Room name</label>
                <input onChange={onChangeSettings} name="name" className="mx-auto px-4 py-2 border my-2 rounded-lg" type="text" defaultValue={roomSettings['name']} placeholder="Room name or id"/>
              </div>
              <div>
                <label htmlFor="">Board size</label>
                <div className="flex flex-row">
                  <input onChange={onChangeSettings} name="rows" className="px-4 py-2 border my-2 rounded-lg w-24" type="number" defaultValue={roomSettings['rows']} placeholder="Rows"/>
                  <div className="px-1.5 py-4 font-bold text-gray-300">x</div>
                  <input onChange={onChangeSettings} name="columns" className="px-4 py-2 border my-2 rounded-lg w-24" type="number" defaultValue={roomSettings['columns']} placeholder="Columns"/>
                </div>
              </div>
              <div>
                <label htmlFor="">Score to win</label>
                <input onChange={onChangeSettings} name="score" className="mx-auto px-4 py-2 border my-2 rounded-lg" type="number" defaultValue={roomSettings['score']} placeholder="Winner score"/>
              </div>

              <button className="mx-auto text-white px-4 py-2 bg-blue-500 rounded-lg">Create room</button>

            </form>

            <div className="bg-gray-50 mx-2 p-8">
              <h3 className="text-xl mb-3 font-bold">Or join one</h3>
              <label htmlFor="">Room name</label>
              <input onChange={onChangeSearchRoom} name="roomName" className="mx-auto px-4 py-2 border my-2 rounded-lg" type="text" defaultValue={roomName} placeholder="Room name or id"/>
              <button className="mx-auto text-white px-4 py-2 bg-red-500 rounded-lg" onClick={() => onFindRoom(roomName)}>Find room</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RoomDetails;