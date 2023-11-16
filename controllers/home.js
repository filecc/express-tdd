const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function index (req, res) {
    let html = fs.readFileSync(path.resolve("./views/index.html"), "utf8");
    if(req.cookies.user){
        html = html.replace('{menuItem1}', '') 
        html = html.replace('{menuItem2}', '<a href="/admin">Dashboard</a>')
        html = html.replace('{menuItem3}', '<a href="/logout">Logout</a>')
    } else {
        html = html.replace('{menuItem1}', '<a href="/login">Login</a>')
        html = html.replace('{menuItem2}', '')
        html = html.replace('{menuItem3}', '')
    }
    
    res.send(html);
   
}

function login (req, res) {
    if(req.cookies.session && jwt.verify(req.cookies.session, process.env.JWT_SECRET)){
      res.redirect('/admin')
      return
    }
    res.sendFile(path.resolve('./views/login.html'))
  }

  function logout (req, res) {
    res.clearCookie('session')
    res.clearCookie('user')
    res.redirect('/')
  }

module.exports = {
    index,
    login,
    logout
  }