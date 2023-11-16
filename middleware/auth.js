const jwt = require('jsonwebtoken')

function isUserAuthenticated(req, res, next){
    // get cookie from request
    const token = req.cookies.session
    const user = req.cookies.user
    if(!token || !user){
        res.redirect('/login')
        return
    }
    if(jwt.verify(token, process.env.JWT_SECRET)){
        next()
        return
    }

    
    res.status(401).redirect('/login')
   
}

module.exports = isUserAuthenticated