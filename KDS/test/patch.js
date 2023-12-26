const {dbConn} = require("../helpers/db.js");


const addPatchs = async () => {


    const yama_adi = (year) => {
        // random cve
        const cve = "CVE-"+year+"-" + Math.floor(Math.random() * 10000);

        return cve;
    }

    dbConn.query("SELECT * FROM tehditler", (err,results) => {
        if(results?.length > 0) {

            let i = 0;

            results?.map((result) => {
                i++;

                const date = new Date(result.bitis_tarihi);
                const year = date.getFullYear();

                console.log(i, result.tehdit_id, yama_adi(year), result.baslangic_tarihi)

                dbConn.query("INSERT INTO yamalar(yama_id, tehdit_id, yama_adi, yama_tarihi) VALUES(?,?,?,?)", [i, result.tehdit_id, yama_adi(year), result.baslangic_tarihi],(err,result)=> {

                })

            })


        }


    })



}



addPatchs()
