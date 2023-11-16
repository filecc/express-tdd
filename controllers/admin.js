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
  const linksYesUser = [
    { href: "/", label: "Home"},
    { href: "/posts", label: "Posts" },
    { href: "/admin", label: "Dashboard", active: true},
    { href: "/logout", label: "Logout"},
  ];

  const posts = fs.readFileSync(path.resolve("./db/posts.json"), "utf8")
  const post = JSON.parse(posts).find(post => post.id === parseInt(req.params.id))


  res.render("edit", { user: req.cookies.user, links: linksYesUser, post: post });
  return



}


module.exports = {
  index,
  edit
};
