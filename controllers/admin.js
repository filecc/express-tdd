const express = require("express");
const fs = require("fs");
const path = require("path");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

function index(req, res) {
  let html = fs.readFileSync(path.resolve("./views/dashboard.html"), "utf8");

  html = html.replace("{{ admin }}", req.cookies.user.username);
  const posts = fs.readFileSync(path.resolve("./db/posts.json"), "utf8");
  const postList = JSON.parse(posts).sort((a, b) => b.id - a.id)

    .map((post) => {
      return `<li style="display: flex; align-items: center; gap: 1rem">
    <span>ID: ${post.id}</span>
    <a href="/posts/${post.id}">${post.title}</a>
    <form action="/admin/edit/${post.id}" method="POST">
    <input type="hidden" name="id" value="${post.id}">
    <input style='margin: 1rem 0;' type="submit" value="Modifica">   
    </form>
    <form action="/api/delete/${post.id}" method="POST">
    <input type="hidden" name="id" value="${post.id}">
    <input style='margin: 1rem 0;' type="submit" value="Cancella">   
    </form>
    
    </li>`;
    })
    .join("");
  html = html.replace("{{ postList }}", postList);

  res.send(html);
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
