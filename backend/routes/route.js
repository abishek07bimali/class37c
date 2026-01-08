const express = require("express").Router();
const multer = require("multer");
const upload = multer();

const {getAllUsers,addUser, getUsersById, updateUser, loginUser,deleteUser}=require('../controllers/userController')

express.get("/getallUsers",getAllUsers);
express.post("/register",addUser);
express.get("/getUserByid/:uid",getUsersById);
express.put("/updateUserByid/:id",updateUser);
express.delete("/deleteuser/:id",deleteUser);
express.post("/login",loginUser);

module.exports=express;