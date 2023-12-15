const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const {
    initPageRoutes
} = require('./helpers/routes');

require('dotenv/config')

const app = express();

app.use(express.json({limit:'50mb',extended:true,parameterLimit:50000}))
app.use("*", function(req,res,next) {

    const acceptables = [
        "js","css","jpg","jpeg","png"
    ]
const split = req.baseUrl.split(".")
    const last = split[split.length - 1];
    if (acceptables.includes(last)) {
        next()
        return
    }
    const token = req.headers.authorization?.split(' ')[1];
    if (req.baseUrl=="/login") {
        if (!token) {
            next()
            return
        } else {
            jwt.verify(token, process.env.JWT_SECRET, function(err,decoded){
                if (err){
                    next()
                    return
                
                } else {
                    req.user= decoded;
                    res.redirect("/")
                    return
            }

            })
        }
        
    }
    else { 
        if (!token) {
            res.redirect("/login")
            return
        }
        else {
            jwt.verify(token, process.env.JWT_SECRET, function(err,decoded) {
            if (err){
                res.redirect("/login")
                return
            } else {
                req.user= decoded;
                next()
                return
            }
            })
        }
    }

});


initPageRoutes(app, express)
// app.use('/api', apiRoutes)




app.listen(process.env.SERVER_PORT, () => {
    console.log("Sunucu başlatıldı: "+ process.env.BASE_URL + ":" + process.env.SERVER_PORT)
})
