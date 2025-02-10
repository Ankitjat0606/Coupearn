const express = require("express");
const route = express.Router();
const {     getUserController,
    createUserController,
    userLoginController,
    verifyUserController,
    updateUserController,
    deleteUserController } = 
require("../controllers/user")
route.get("/", getUserController);
route.post("/", createUserController);
route.post("/login", userLoginController);
route.post("/verify", verifyUserController);
route.patch("/", updateUserController);
route.delete("/", deleteUserController);
module.exports = route;