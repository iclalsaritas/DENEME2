const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const apiRoutes = require('./config/apiRoutes');
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv/config')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:'50mb',extended:true,parameterLimit:50000}));
app.use(cookieParser());
app.use(cors())

// app.use("*", function(req,res,next) {
//
//     const acceptables = [
//         "js","css","jpg","jpeg","png"
//     ]
// const split = req.baseUrl.split(".")
//     const last = split[split.length - 1];
//     if (acceptables.includes(last)) {
//         next()
//         return false;
//     }
//
//     const token = req.cookies?.["user_jwt"];
//
//     if (req.baseUrl.includes('/login')) {
//         if (!token) {
//             next()
//             return false;
//         } else {
//             jwt.verify(token, process.env.JWT_SECRET, function(err,decoded){
//                 if (err){
//                     next()
//                     return false;
//
//                 } else {
//                     req.user= decoded;
//                     res.redirect("/")
//                     return false;
//             }
//
//             })
//         }
//
//     }
//     else {
//         if (!token) {
//             res.redirect("/login")
//             return false;
//         }
//         else {
//             jwt.verify(token, process.env.JWT_SECRET, function(err,decoded) {
//             if (err){
//                 res.redirect("/login")
//                 return false;
//             } else {
//                 req.user= decoded;
//                 next()
//                 return false;
//             }
//             })
//         }
//     }
//
// });

app.use('/api', apiRoutes)


app.listen(process.env.SERVER_PORT, () => {
    console.log("Sunucu başlatıldı: "+ process.env.BASE_URL + ":" + process.env.SERVER_PORT)
})
