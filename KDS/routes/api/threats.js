const router = require('express').Router();
const {dbConn} = require("../../helpers/db.js");


router.get("/threats",  (req,res) => {

    const startDate = req.query?.startDate;
    const endDate = req.query?.endDate;
    const threatType = req.query?.threatType;

    let sql = "SELECT * FROM `tehditler`";

    // sql join
    sql += " INNER JOIN yamalar ON tehditler.tehdit_id = yamalar.tehdit_id";

    sql += " WHERE ";


    if (startDate) {
        sql += "baslangic_tarihi >= '" + startDate + "' AND "
    }

    if (endDate) {
        sql += "bitis_tarihi <= '" + endDate + "' AND "
    }

    if (threatType) {
        sql += "tehdit_ad = '" + threatType + "' AND "
    }

    sql += "1=1";

    if(!endDate && !startDate && !threatType && !req?.query?.limit) {
        sql = "SELECT * FROM `tehditler` INNER JOIN yamalar ON tehditler.tehdit_id = yamalar.tehdit_id WHERE bitis_tarihi >= DATE_SUB(NOW(), INTERVAL 1 MONTH)";
    }

    // last 1 month
    const threats = dbConn.query(sql, (err,result) => {
        if (err) {
            res.status(500).json({
                message: "Bir hata oluştu",
                error: err
            })
        }
        else {
            res.status(200).json({
                message: "Tehditler başarıyla getirildi",
                result: result
            })
        }
    })



})

module.exports = router;