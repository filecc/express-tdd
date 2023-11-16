const express = require("express");
const fs = require("fs");
const path = require("path");
const CustomError = require("../lib/CustomError");
const env = require("dotenv").config();

const port = process.env.PORT ?? ''
const host = process.env.HOST.includes('localhost') ? 'localhost' : ('https://' + process.env.HOST + '/')
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function index (req, res) {
    const linksNoUser = [
      { href: "/", label: "Home"},
      { href: "/posts", label: "Posts", active: true },
      { href: "/login", label: "Login"},
    ];
      const linksYesUser = [
        { href: "/", label: "Home"},
        { href: "/posts", label: "Posts", active: true },
        { href: "/admin", label: "Dashboard"},
        { href: "/logout", label: "Logout"},
      ];
    const posts = JSON.parse(fs.readFileSync(path.resolve("./db/posts.json"), "utf8")).sort((a, b) => b.id - a.id)
    if(!posts){
        res.status(404).send("Not found")
        return
    }
    res.render('posts/index', {posts: posts, user: req.cookies.user, links: req.cookies.user ? linksYesUser : linksNoUser})
    return
   
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function show (req, res) {
    const linksNoUser = [
        { href: "/", label: "Home"},
        { href: "/posts", label: "Posts"},
        { href: "/login", label: "Login"},
      ];
        const linksYesUser = [
          { href: "/", label: "Home"},
          { href: "/posts", label: "Posts" },
          { href: "/admin", label: "Dashboard"},
          { href: "/logout", label: "Logout"},
        ];

    const posts = JSON.parse(fs.readFileSync(path.resolve("./db/posts.json"), "utf8"))
    if(!posts){
        res.status(404).send("Not found")
        return
    }
    
    const post = posts.find(post => post.id == req.params.id)
    if (!post) {
        res.status(404).send({error: 404, message: `Post with id ${req.params.id} not found`})
        return
    }
    const imgPath = (`http://${host}:${port}/images${post.image}`)
    const downloadLink= (`http://localhost:3000/posts/${post.slug}/download`)
    const user = req.cookies.user

    res.render('posts/post', {user: user, links: req.cookies.user ? linksYesUser : linksNoUser, post: post, image: imgPath, download: downloadLink})
    return
    
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function create (req, res) {
    const linksYesUser = [
        { href: "/", label: "Home"},
        { href: "/posts", label: "Posts" },
        { href: "/admin", label: "Dashboard"},
        { href: "/logout", label: "Logout"},
      ];
    
      res.render('create', {user: req.cookies.user, links: linksYesUser})
    
    
}

function store (req, res) {
    console.log(req.body)
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function download (req, res) {
    const posts = JSON.parse(fs.readFileSync(path.resolve("./db/posts.json"), "utf8"))
    const slug = req.params.slug
    const image = posts.find(post => post.slug === slug).image
    res.download(`./public/images${image}`)
}


module.exports = {
    index,
    show,
    create,
    download,
    store
  }