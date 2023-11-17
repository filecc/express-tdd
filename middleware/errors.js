const fs = require("fs");
const path = require("path");


module.exports = function (err, req, res, next) {
    const linksYesUser = [
        { href: "/", label: "Home"},
        { href: "/posts", label: "Posts" },
        { href: "/admin", label: "Dashboard"},
        { href: "/logout", label: "Logout"},
      ];
      const linksNoUser = [
        { href: "/", label: "Home"},
        { href: "/posts", label: "Posts" },
        { href: "/login", label: "Login"},
      ];
      res.status(500).send("ERRORE")
    /* res.render("serverError", {error: err}) */
};