const userRoute = require("./user");
const couponRoute = require("./coupon");
module.exports = (app) => {
    app.use("/v1/user", userRoute);
    app.use("/v1/coupon", couponRoute);
}
