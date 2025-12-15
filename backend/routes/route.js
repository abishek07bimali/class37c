const express = require("express").Router();

const {getAllUsers}=require('../controllers/userController')

express.get("/getallUsers",getAllUsers);

module.exports=express;