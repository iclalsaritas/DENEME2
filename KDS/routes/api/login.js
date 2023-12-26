const {dbConn} = require('../../helpers/db');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post("/login", (req,res) => {
    const kullanici = req.body.username;
    const sifre = req.body.password;

    dbConn.query("SELECT * FROM kullanicilar WHERE kullanici_adi = ?",[kullanici], (err,results) => {
        if (err) {
            res.status(500).json({
                message: "Bir hata oluştu",
                error: err
            })
        }
        else {
            if (results.length > 0) {
                bcrypt.compare(sifre, results[0].parola, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: "Bir hata oluştu",
                            error: err
                        })
                    }
                    else {
                        if (result) {
                            const token = jwt.sign({
                                username: results[0].username,
                                ID: results[0].ID
                            }, process.env.JWT_SECRET, {
                                expiresIn: "1h"
                            })

                            res.cookie("user_jwt", token)

                            res.status(200).json({
                                message: "Giriş başarılı",
                                token: token
                            })
                        }
                        else {
                            res.status(401).json({
                                message: "Hatalı kullanıcı adı veya şifre"
                            })
                        }
                    }
                })
            }
            else {
                res.status(401).json({
                    message: "Hatalı kullanıcı adı veya şifre"
                })
            }
        }
    })
})

module.exports = router;