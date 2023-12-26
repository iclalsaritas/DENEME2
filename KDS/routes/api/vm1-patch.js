const router = require('express').Router();
const {dbConn} = require("../../helpers/db.js");


router.get("/vm1/patch",  (req,res) => {


    const sql = "SELECT * FROM makine1_yama"

    const yamalar = dbConn.query(sql, (err,result) => {
        if (err) {
            res.status(500).json({
                message: "Bir hata oluştu",
                error: err
            })
        }
        else {
            res.status(200).json({
                message: "Yamalar başarıyla getirildi",
                result: result
            })
        }
    })



})

module.exports = router;