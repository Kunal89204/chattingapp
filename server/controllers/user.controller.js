const User = require("../models/user.model")

const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
    }
  };
  
  const registerUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" }); // Conflict status code
      }
  
      const newUser = await User.create({
        username,
        password,
      });
  
      // Generate access and refresh tokens
      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id);
  
      // Set refresh token as a cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: true, // Use secure cookies in production
        sameSite: "strict",
      });
  
      // Exclude the password field from the response
      const userWithoutPassword = newUser.toObject();
      delete userWithoutPassword.password;
  
      // Send access token along with user data
      res.status(201).json({ accessToken, user: userWithoutPassword }); // Created status code
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = registerUser;
  
  const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
  
      if (!existingUser) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
  
      const isPasswordValid = await existingUser.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Generate access and refresh tokens
      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser._id);
  
      // Set refresh token as a cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
      // Exclude the password field from the response
      const userWithoutPassword = existingUser.toObject();
      delete userWithoutPassword.password;
  
      res.json({ accessToken, user: userWithoutPassword });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = loginUser;
  
  
  const testRoute = async (req, res) => {
      try {
          const data = await User.find()
          res.json(data)
      } catch (error) {
          console.log(object)
      }
  }
  
 

  const validate_token = async (req, res) => {
    try {
      res.status(200).json({ valid: true })
    } catch (error) {
      console.log(error)
    }
  }
  

  const userInfo = async (req, res) => {
    try {
      const {id} = req.params
      const data = await User.findById(id)
      res.json(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  module.exports = {
      registerUser,
      loginUser,
      testRoute,
      userInfo,
      validate_token
  }