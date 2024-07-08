import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../context/store'
import AddRoom from '../components/AddRoom'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'


const Home = () => {
  const [members, setMembers] = useState([])
  const [rooms, setRooms] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user } = useAuthStore()

  useEffect(() => {
    if (user && user.accessToken) {
      axios.get('https://chattarpattarkabackend.onrender.com/api/v1/testroute', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      })
      .then((respo) => {
        const filteredMembers = respo.data.filter(member => member.username !== user.user.username);
        setMembers(filteredMembers);
      })
      .catch((error) => {
        console.error('Error fetching members:', error);
      });
    }
  }, [user]);

  useEffect(() => {
    axios.get('https://chattarpattarkabackend.onrender.com/api/v1/getrooms')
      .then((respo) => {
        setRooms(respo.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleModalClose = (e) => {
    if (e.target.id === 'modal-overlay') {
      setIsModalOpen(false);
    }
  }

  return (
    <>
    <Navbar />
    <div className='flex flex-col items-center gap-10 p-10 bg-gray-900 min-h-screen text-white'>
      {isModalOpen && (
        <div id="modal-overlay" onClick={handleModalClose} className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <AddRoom closeModal={() => setIsModalOpen(false)} />
        </div>
      )}
      <div className='w-full max-w-4xl'>
        <h1 className='text-center text-4xl py-4 border-b border-gray-700 my-6'>Users</h1>
        <div className='space-y-4'>
          {members.map((users, index) => (
            <div key={index} className='flex justify-between items-center bg-gray-800 p-4 rounded-lg'>
              <p>{users.username}</p>
              <Link to={`/chat/private/${user.user._id}/${users._id}`}>
                <button className='py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition'>Chat</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full max-w-4xl mt-10'>
        <div className='relative mb-6'>
          <h1 className='text-center text-4xl py-4 border-b border-gray-700 mb-6'>Groups</h1>
          <button onClick={() => setIsModalOpen(!isModalOpen)} className='absolute top-0 right-0 py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition'>Create Group</button>
        </div>
        <div className='space-y-4'>
          {rooms.map((room, index) => (
            <div key={index} className='flex justify-between items-center bg-gray-800 p-4 rounded-lg'>
              <p>{room.groupName}</p>
              <Link to={`/chat/group/${room._id}`}>
                <button className='py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 transition'>Join and Visit</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
              </>
  )
}

export default Home
