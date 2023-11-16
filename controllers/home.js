const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function index (req, res) {
    const linksNoUser = [
      {href: '/', label: 'Home', active: true},
    {href: '/posts', label: 'Posts'},
      {href: '/login', label: 'Login'}
  ]
    const linksYesUser = [
      {href: '/', label: 'Home'},
      {href: '/posts', label: 'Posts'},
      {href: '/admin', label: 'Dashboard'},
      {href: '/logout', label: 'Logout'}
    
    ]

      res.render('index', {user: req.cookies.user, links: req.cookies.user ? linksYesUser : linksNoUser})
        return
    

     
      
      
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