// import { io } from 'socket.io-client';

// export const createSocketSlice = (set, get) => ({
//   socket: null,

//   initializeSocket: (username) => {
//     const socket = io('http://localhost:8000', {
//       query: {
//         username,
//       },
//     });

//     socket.on('connect', () => {
//       console.log('Connected to socket server');
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from socket server');
//     });

//     set({ socket });
//   },

//   disconnectSocket: () => {
//     const { socket } = get();
//     if (socket) {
//       socket.disconnect();
//       set({ socket: null });
//     }
//   },
// });
