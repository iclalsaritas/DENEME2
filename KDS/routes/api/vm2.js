const router = require('express').Router();
const {dbConn} = require("../../helpers/db.js");


router.get("/vm2",  (req,res) => {


    const sql1 = "SELECT * FROM makine2"

    dbConn.query(sql1, (err,result) => {
        if (err) {
            res.status(500).json({
                message: "Bir hata oluştu",
                error: err
            })
        } else {
            res.status(200).json({
                message: "Politikalar başarıyla getirildi",
                result: result
            })
        }
    })



})

module.exports = router;