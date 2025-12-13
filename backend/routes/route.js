const express = require("express").Router();
const { getAllUsers } = require("../controllers/userController");


express.post("/createUsers",getAllUsers);

module.exports=express;