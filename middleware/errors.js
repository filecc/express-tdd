const fs = require("fs");
const path = require("path");


module.exports = function (err, req, res, next) {
    let html = fs.readFileSync(path.resolve("./views/500.html"), "utf8");
    html = html.replace("{{ message }}", err.message);
    res.send(html);
};