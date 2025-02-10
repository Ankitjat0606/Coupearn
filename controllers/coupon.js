const { getCoupon, createCoupon, deleteCoupon, getMyCoupon } = require("../services/coupon");
async function getCouponController(req, res) {
    const { name } = req.query;
    const data = await getCoupon({ name });
    res.send(data);
}

async function createCouponController(req, res) {
    const { name, expiryDate, tags, userId } = req.body;
    const data = await createCoupon({ name, expiryDate, tags, userId });
    res.send(data);
}

async function deleteCouponController(req, res) {
    const { id } = req.body;
    const data = await deleteCoupon({ id });
    res.send(data);
}

async function getMyCouponController(req, res) {
    const { userId } = req.query;
    const data = await getMyCoupon(userId);
    res.send(data);
}

module.exports = {
    getCouponController,
    createCouponController,
    deleteCouponController,
    getMyCouponController,
}