const bcrypt = require("bcrypt");
const dbConn = require("../helpers/db.js");

const kullanici = "admin"
const parola = "admin123"
let hash_parola = ""
let hata = false

let a = bcrypt
  .hash(parola, 10)
  .then(hash => {
    hash_parola = hash
    console.log(hash)
  })
  .catch(err => {
    console.log(err)
      hata = true
  })

  if (hata || hash_parola==="") {
    console.log("Şifre oluşturulamadı")
    process.exit()
  }

  dbConn.query("SELECT * FROM kullanicilar WHERE kullanici_adi=?", kullanici,(err,result)=>{
    if (err) {

    console.log("Veritabanı Hatası : " + err.message)
    process.exit()
    }
    if(result.length>0){
        console.log("Böyle bir kullanıcı mevcut")
        process.exit()
    }

    dbConn.query("INSERT INTO kullanicilar(kullanici_adi,parola) VALUES(?,?)",[kullanici,parola],(err,result) =>{
        if (err) {

            console.log("Veritabanı Hatası : " + err.message)
            process.exit()
            }
    console.log("Kullanıcı oluşturuldu")
    })
    

  })



console.log(a)
dbConn.destroy()