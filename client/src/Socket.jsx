import { io } from 'socket.io-client';
import { useAuthStore } from './context/store';


let socket;

const initSocket = () => {
   const {user} = useAuthStore()
  if (!socket) {
    socket = io('http://localhost:8000', {
      query: { username:user.user.username },
    });
  }
};
const name = localStorage.getItem('user')
if (name.user.username) {
  initSocket()
}

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket first.");
  }
  return socket;
};
