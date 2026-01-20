const express = require("express").Router();

const {getAllUsers,addUser, getUsersById, updateUser, loginUser,deleteUser, getMe}=require('../controllers/userController');
const authGuard = require("../helpers/authguagrd");
const isAdmin = require("../helpers/isAdmin");

express.get("/getallUsers",authGuard,isAdmin,getAllUsers);
express.get("/getMe",authGuard,getMe);
express.post("/register",addUser);
express.get("/getUserByid/:uid",authGuard,isAdmin,getUsersById);
express.put("/updateUserByid/:id",authGuard,isAdmin,updateUser);
express.delete("/deleteuser/:id",authGuard,isAdmin,deleteUser);
express.post("/login",loginUser);

module.exports=express;