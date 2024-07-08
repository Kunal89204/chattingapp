const Room = require("../models/room.model")

const getroom = async (req, res) => {
    try {
        const data = await Room.find()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}


const addRoom = async (req, res) => {
    try {
      const { userId } = req.params; // Creator's ID
      const { groupName } = req.body; // Room name
  

  
      // Validate groupName
      if (!groupName || typeof groupName !== 'string' || groupName.trim().length === 0) {
        return res.status(400).json({ message: "Invalid group name" });
      }

    //   exisiting room name 
    const existingRoom = await Room.findOne({groupName})

    if (existingRoom) {
        res.json({message: "room name already taken"})
    }
  
      else if(!existingRoom){
        // Create a new room
      const newRoom = new Room({
        members: [userId], // Adding the creator as the first member
        groupName: groupName.trim() // Trim any extra spaces
      });
  
      // Save the room to the database
      await newRoom.save();
  
      res.status(201).json({ message: "Room created successfully", room: newRoom });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


module.exports = {getroom, addRoom}