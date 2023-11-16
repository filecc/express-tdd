const express = require("express");
const fs = require("fs");
const path = require("path");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

function index(req, res) {
  const linksYesUser = [
    { href: "/", label: "Home"},
    { href: "/posts", label: "Posts" },
    { href: "/admin", label: "Dashboard", active: true},
    { href: "/logout", label: "Logout"},
  ];

  const posts = fs.readFileSync(path.resolve("./db/posts.json"), "utf8");
  const postList = JSON.parse(posts).sort((a, b) => b.id - a.id)

  res.render("dashboard", { user: req.cookies.user, links: linksYesUser, posts: postList });
  return
}

function edit(req, res){
  let html = fs.readFileSync(path.resolve("./views/edit.html"), "utf8");
  const posts = fs.readFileSync(path.resolve("./db/posts.json"), "utf8")
  const post = JSON.parse(posts).find(post => post.id === parseInt(req.params.id))

 

  html = html.replaceAll("{title}", post.title);
  html = html.replace("{content}", post.body);
  html = html.replace("{tags}", post.tags.join(", "));
  html = html.replace("{id}", post.id);

  res.send(html);
}


module.exports = {
  index,
  edit
};
