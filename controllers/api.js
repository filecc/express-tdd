const express = require("express");
const fs = require("fs");
const path = require("path");
const env = require("dotenv").config();
const Post = require("../lib/Post");
const generateJWT = require("../lib/generateJWT");



const port = process.env.PORT ?? "";
const host = process.env.HOST.includes("localhost")
  ? "localhost"
  : "https://" + process.env.HOST + "/";

const posts = JSON.parse(
  fs.readFileSync(path.resolve("./db/posts.json"), "utf8")
);

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

function index(req, res) {
  if (!posts) {
    res.status(404).json({ error: 404, message: "Posts not found" });
    return;
  }

  res.json(posts);
}

function show(req, res) {
  const post = posts.find((post) => post.id == req.params.id);

  if (!post) {
    res
      .status(404)
      .send({ error: 404, message: `Post with id ${req.params.id} not found` });
    return;
  }
  const imgPath = `http://${host}:${port}/images${post.image}`;
  const downloadLink = `http://localhost:3000/posts/${post.slug}/download`;
  res.json({
    ...post,
    image_url: `${imgPath}`,
    download_link: `${downloadLink}`,
  });
}

function store (req, res) {

  const lastId = posts.map((post) => post.id).sort().reverse()[0]

  const data = req.body
  const tags = data.tags.split(",").map((tag) => tag.trim())

  let imageSlug;

  if(req.file){
    imageSlug = '/'+ req.file.filename + '.jpg'
    fs.renameSync(req.file.path, path.resolve(`./public/images${imageSlug}`))
  }


  const newPost = new Post(
    lastId + 1, 
    data.title, 
    data.content,
    tags,
    imageSlug ?? '/placeholder.webp',
    )

    posts.push(newPost)

    fs.writeFileSync(path.resolve("./db/posts.json"), JSON.stringify(posts, null, 2))

    res.status(300).redirect(`/posts/${newPost.id}`)
  
}

function destroy(req, res) {
  const id = req.body.id
  const postIndex = posts.findIndex((post) => post.id == id)
  if(!postIndex){
    res.status(404).json({error: 404, message: `Post with id ${id} not found`})
    return
  }
  if(posts[postIndex].image !== '/placeholder.webp')
  {
    fs.unlinkSync(path.resolve(`./public/images/${posts[postIndex].image}`))
  }
  
  posts.splice(postIndex, 1)
  fs.writeFileSync(path.resolve("./db/posts.json"), JSON.stringify(posts, null, 2))
  

  res.status(200).redirect('/admin')
}


function login(req, res) {
  
  const token = generateJWT(req, res);
  if (token) {
    res.status(300).redirect('/admin');
  }
}

function edit(req, res){
  const id = req.body.id
  const postIndex = posts.findIndex((post) => post.id == id)
  if(!postIndex){
    res.status(404).json({error: 404, message: `Post with id ${id} not found`})
    return
  }
  const data = req.body
  const tags = data.tags.split(",").map((tag) => tag.trim())

  let imageSlug;

  if(req.file){
    fs.unlinkSync(path.resolve(`./public/images/${posts[postIndex].image}`))
    imageSlug = '/'+ req.file.filename + '.jpg'
    fs.renameSync(req.file.path, path.resolve(`./public/images${imageSlug}`))
  }

  posts[postIndex].title = data.title
  posts[postIndex].body = data.content
  posts[postIndex].tags = tags
  posts[postIndex].image = imageSlug ?? posts[postIndex].image

  fs.writeFileSync(path.resolve("./db/posts.json"), JSON.stringify(posts, null, 2))

  res.status(300).redirect(`/posts/${posts[postIndex].id}`)
}

module.exports = {
  index,
  show,
  store,
  destroy,
  login,
  edit
};
