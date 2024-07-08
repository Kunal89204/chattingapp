import React from 'react'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../context/store'

const Navbar = () => {
    const { logoutHook } = useLogout()
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutHook()
        navigate('/')
    }

    const gradientText = {
        backgroundImage: 'linear-gradient(45deg, #FFD700, #FF8C00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }

    return (
        <nav className="bg-gray-800 p-4 shadow-md fixed w-full top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    Welcome{' '}
                    <span className="text-3xl" style={gradientText}>
                        {user.user.username}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
