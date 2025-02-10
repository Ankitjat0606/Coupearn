const express = require("express");
const route = express.Router();
const {    
    getCouponController,
    createCouponController,
    deleteCouponController,
    getMyCouponController,
 } = 
require("../controllers/coupon")
route.get("/", getCouponController);
route.post("/", createCouponController);
route.get("/user", getMyCouponController);
route.delete("/", deleteCouponController);
module.exports = route;