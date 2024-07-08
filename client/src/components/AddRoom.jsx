import axios from 'axios'
import React, { useState } from 'react'
import { useAuthStore } from '../context/store'

const AddRoom = ({ closeModal }) => {
  const { user } = useAuthStore()
  const [roomname, setRoomname] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ roomname, user: user.user._id })
    axios.post(`https://chattarpattarkabackend.onrender.com/api/v1/addroom/${user.user._id}`, { groupName: roomname })
      .then((respo) => {
        console.log('room created', respo.data)
        closeModal()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='border absolute top-1/2 p-4 rounded-lg bg-gray-800 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl'>Create Room</h1>
        <button onClick={closeModal} className='text-red-500 text-xl'>✖</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomname" className='block text-lg py-2'>Room Name</label>
          <input type="text" className='border rounded py-2 px-4 w-full bg-gray-700 text-white' value={roomname} onChange={(e) => setRoomname(e.target.value)} />
        </div>
        <button type="submit" className='bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-500 transition'>Create</button>
      </form>
    </div>
  )
}

export default AddRoom
