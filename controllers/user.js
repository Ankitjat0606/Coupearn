const { getUserFromEmail,
    createUser,
    userLogin,
    verifyUser,
    updateUser,
    deleteUser, } = require("../services/user");

async function getUserController(req, res) {
    const { email } = req.query;
    const data = await getUserFromEmail(email);
    res.send(data);
}
async function createUserController(req, res) {
    const { name, email, phone, dialCode } = req.body;
    const data = await createUser({ name, email, phone, dialCode });
    res.send(data);
}
async function userLoginController(req, res) {
    const { type, secretKey, secretPass } = req.body;
    const data = await userLogin({ type, secretKey, secretPass });
    res.send(data);
}
async function verifyUserController(req, res) {
    const data = await verifyUser();
    res.send(data);
}
async function updateUserController(req, res) {
    const { email, name } =  req.body;
    const data = await updateUser({ email, name });
    res.send(data);
}
async function deleteUserController(req, res) {
    const { email } =  req.body;
    const data = await deleteUser({ email });
    res.send(data);
}
module.exports = {
    getUserController,
    createUserController,
    userLoginController,
    verifyUserController,
    updateUserController,
    deleteUserController
}