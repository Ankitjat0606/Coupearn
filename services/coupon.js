const { Op } = require("sequelize");
const db = require("../models/index");

async function getMyCoupon(userId) {
    try {
        return await getCoupon({ userId })
    }
    catch (error) {
        throw new Error("Error in getMyCoupon: ", error);
    }
}

async function getCoupon({ name, userId }) {
    try {
        const payload = { active: true };
        if (name)
            payload.name = {
                [Op.like]: `%${name}%`,
            };
        else payload.userId = userId;
        const coupons = await db.Coupon.findAll({
            where: payload
        });
        const couponIds = coupons.map((ele) => ele.id);
        const couponMetrics = await db.CouponMetric.findAll({
            where: {
                couponId: couponIds,
                active: true,
            }
        });
        const couponMetricMap = {};
        for (let couponMetric of couponMetrics) {
            if (!couponMetricMap[couponMetric.couponId])
                couponMetricMap[couponMetric.couponId] = {};
            couponMetricMap[couponMetric.couponId][couponMetric.type] = couponMetric.value;
        }
        const couponList = [];
        for (let coupon of coupons) {
            couponList.push({
                id: coupon.id,
                name: coupon.name,
                expiryDate: coupon.expiryTime,
                metaData: couponMetricMap[coupon.id],
            })
        }
        return couponList;
    }
    catch (error) {
        throw new Error("Error in getCoupon: ", error);
    }
}

async function createCoupon({ name, expiryDate, tags, userId }) {
    try {
        console.log(tags);
        const coupon = await db.Coupon.create({
            name,
            expiryTime: expiryDate,
            userId,
        });
        const bulkPayload = [];
        for (let key of Object.keys(tags)) {
            bulkPayload.push({
                couponId: coupon.id,
                type: key,
                value: tags[key]
            })
        }
        await db.CouponMetric.bulkCreate(bulkPayload);
        return true;
    }
    catch (error) {
        throw new Error("Error in createCoupon: ", error);
    }
}

async function deleteCoupon({ id }) {
    try {
        await db.Coupon.update({
            active: false,
        }, {
            where: { id }
        });
        return true;
    }
    catch (error) {
        throw new Error("Error in createCoupon: ", error);
    }
}

module.exports = { getCoupon, createCoupon, deleteCoupon, getMyCoupon };