const router = require('express').Router();
const {dbConn} = require("../../helpers/db.js");


router.get("/vm1/recommendation",  (req,res) => {


    const sql = "SELECT * FROM iyilestirme_onerisi"

    const policies = dbConn.query(sql, (err,result) => {
        if (err) {
            res.status(500).json({
                message: "Bir hata oluştu",
                error: err
            })
        }
        else {
            res.status(200).json({
                message: "Politikalar başarıyla getirildi",
                result: result
            })
        }
    })



})

module.exports = router;