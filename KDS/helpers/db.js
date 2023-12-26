const mysql = require('mysql')
require('dotenv/config')

let dbConn = mysql.createConnection({
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST
})

dbConn.connect((err) => {
    if(!err){
    // console.log("Veritabanına Bağlandı") 
    }else{
        console.log("Bağlantı Hatası"+err)
    }
})

const kapat = () => {
    return new Promise((resolve, reject) => {
        dbConn.destroy(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    dbConn,
    kapat
}