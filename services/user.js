const { Op } = require("sequelize");
const db = require("../models/index");
const { omitBy, isNil } = require("lodash");
async function getUserFromEmail(email) {
    try {
        const data = await db.User.findOne({
            attributes: ["id", "name", "email", "phone", "dialCode"],
            where: {
                email,
            }
        });
        return data;
    }
    catch (error) {
        throw new Error("Error in getUserFromEmail: ", error);
    }
}

function getRandomPass() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

async function createUser({ name, email, phone, dialCode }) {
    try {
        const payload = {
            [Op.or]: [{ email }],
        };
        if (phone) payload[Op.or].push({ phone });
        const data = await db.User.findOne({
            where: payload,
        });
        if (data?.active === false) {
            await db.User.update({
                active: true,
            }, {
                where: payload,
            });
            await db.UserLogIn.update({
                active: true,
            }, {
                where: {
                    userId: data.id
                },
            });
            const logIn = await db.UserLogIn.findOne({
                userId: data.id,
            });
            return {
                secretKey: logIn.secretKey,
                secretPass: logIn.secretPass,
            }
        } else if (data) {
            throw new Error("User already exists");
        } else {
            const createPayload = omitBy({ name, email, phone, dialCode }, isNil)
            const data = await db.User.create(createPayload);
            const randomPass = getRandomPass(email);
            await db.UserLogIn.create({
                userId: data.id,
                type: "email",
                secretKey: email,
                secretPass: randomPass,
            });
            return {
                secretKey: email,
                secretPass: randomPass,
            }
        }
    }
    catch (error) {
        console.log(error);
        throw new Error("Error in createUser: ", error);
    }
}

async function userLogin({ type, secretKey, secretPass }) {
    try {
        const getUserPayload = {
            active: true,
        };
        if (type === "email") {
            getUserPayload.email = secretKey;
        } else if (type === "phone") {
            getUserPayload.phone = secretKey;
        } else {
            throw new Error("Invalid type");
        }
        const userData = await db.User.findOne({
            where: getUserPayload,
        });
        if (!userData) throw new Error("Invalid user");
        const secretData = await db.UserLogIn.findOne({
            where: {
                userId: userData.id,
                active: true,
                secretKey,
                secretPass,
            },
        });
        if (secretData) return true;
        else throw new Error("Invalid user");
    }
    catch (error) {
        throw new Error("Error in userLogin: ", error);
    }
}

async function updateUser({ email, name }) {
    try {
        if (name && email) {
            await db.User.update({
                name
            }, {
                where: { email },
            });
        }
    }
    catch (error) {
        throw new Error("Error in updateUser: ", error);
    }
}

async function deleteUser({ email }) {
    try {
        await db.User.update({
            active: false,
        }, {
            where: {
                email
            },
        });
    }
    catch (error) {
        throw new Error("Error in deleteUser: ", error);
    }
}

async function verifyUser({ }) {
    try {
        return true;
    }
    catch (error) {
        throw new Error("Error in verifyUser: ", error);
    }
}
module.exports = {
    getUserFromEmail,
    createUser,
    userLogin,
    verifyUser,
    updateUser,
    deleteUser,
}