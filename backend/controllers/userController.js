const User = require("../models/user.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const addUser = async (req, res) => {
  console.log(req.body)
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success:false,
        message: "All fields are required"
      });
    }

    const isUser = await User.findOne({ where: { username } })
    const isemail = await User.findOne({ where: { email } })
    if (isUser || isemail) {
      return res.json({ message: "user withawdkhukab  this email exist!!", success: false })
    }

    const hassed = await bcrypt.hash(password, 10)

    console.log(hassed)
    const newUser = await User.create({
      username,
      email,
      password: hassed
    });

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding user",
      error: error.message
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll({ attributes: { exclude: ["password"] } })
    return res.json({ success: true, user, message: "User fetched successfully" })
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

const getUsersById = async (req, res) => {
  try {
    const id = req.params.uid
    const user = await User.findByPk(id)
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }
    return res.json({
      success: true,
      user: { email: user.email, username: user.username },
      message: "User fetched successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (username) {
      const isexistinguser = await User.findOne({ where: { username } })
      if (isexistinguser && isexistinguser.id !== user.id) {
        return res.status(400).json({
          success: false,
          message: "user with that username exist!",
        })
      }

      let hashedPassword = user.password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
      await user.update({
        username: username || user.username,
        email: email || user.email,
        password: hashedPassword,
      });
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: {
          id: user.id
        },
      });

    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await user.destroy();
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: "User not found!!" })
    }
    const isvalidUser = await bcrypt.compare(password, user.password)
    if (!isvalidUser) {
      return res.status(400).json({ message: "Invalid email or password!!" })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ success: true, message: "user logged in successfully!!", token })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};


const getMe = async (req, res) => {
  const id = req.user.id
  try {
    const user = await User.findByPk(id)
    return res.json({
      success: true, user: {
        id: user.id,
        username: user.username,
        email: user.email,
        // role:user.role
      }, message: "User fetched successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
}

module.exports = {
  addUser, getAllUsers, updateUser, deleteUser, getUsersById, loginUser, getMe
}