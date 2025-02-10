const { sequelize } = require("../databases/mysql");
const User = require("./user"); // Import User model
const Coupon = require("./coupon");
const CouponMetric = require("./coupon_metric");
const UserLogIn = require("./user_log_in");
const UserMetric = require("./user_metric");

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Coupon = Coupon;
db.CouponMetric = CouponMetric;
db.UserLogIn = UserLogIn;
db.UserMetric = UserMetric;

module.exports = db;
