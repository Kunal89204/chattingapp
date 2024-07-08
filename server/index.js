const app = require("./app");
const PORT = process.env.PORT || 8000;
const connectDB = require('./db/connectDB');
const userRoutes = require("./routes/user.routes");
const roomRoutes = require("./routes/room.routes");
const http = require("http");
const { Server } = require("socket.io");
const User = require('./models/user.model')
const PrivateRoom = require('./models/chat.model')
const RoomChat = require('./models/roomChat.model')
const chatRoutes = require("./routes/chats.routes")
const roomChatRoutes = require("./routes/roomChats.routes")

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

connectDB();

app.use('/api/v1', userRoutes);
app.use('/api/v1', chatRoutes);
app.use('/api/v1', roomRoutes);
app.use('/api/v1', roomChatRoutes);

io.on("connection", (socket) => {
  console.log('User connected', socket.id);


  // Private chat sockets
  socket.on('joinRoom', ({ room }) => {
    socket.join(room);

    console.log(`User joined room: ${room}`);
  });

  socket.on('leaveRoom', ({ room }) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on('message', async ({ room, text, username }) => {
    console.log(`Message received in room ${room}: ${text} with username : ${username}`);

    try {
      const senderId = await User.findOne({ username })
      const idArr = room.split('-')

      for (let i = 0; i < idArr.length; i++) {
        if (idArr[i] !== senderId._id)
          console.log(idArr[i])
        const createChat = await PrivateRoom.create({ roomId: room, sender: senderId._id, receiver: idArr[i], message:text })
        console.log('chat created successfully: ', { roomId: room, sender: senderId._id, receiver: idArr[i], message:text })

        break;
      }
    } catch (error) {
      console.log(error)
    }



    io.to(room).emit('message', { message:text, sender:{username} });
  });




  // Group chat sockets
  socket.on('joinGroup', ({room}) => {
    socket.join(room)
    console.log(`User joined group: ${room}`)
  })

  socket.on('leaveGroup', ({ room }) => {
    socket.leave(room);
    console.log(`User left group: ${room}`);
  });

  socket.on('groupMessage',async (data) => {
    try {
      const username = data.username
      const senderId = await User.findOne({ username })
      const message = data.message
      console.log()
      const newRoomChat = await RoomChat.create({roomId:data.room, sender:senderId._id, message})
      console.log('new group chat created:', newRoomChat)
    } catch (error) {
      console.log(error)
    }

    io.to(data.room).emit('groupMessage', data)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
