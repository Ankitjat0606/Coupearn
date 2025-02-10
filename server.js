const express = require("express");
const indexRoute = require("./routers/index");
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
indexRoute(app);
const { testConnection } = require("./databases/mysql")
function main() {
    app.listen(port, () => {
        console.log("Running on port", port)
    });
}
testConnection().then(main);
