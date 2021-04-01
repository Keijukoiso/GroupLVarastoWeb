const sql = require('../db/SQL');

module.exports = {

    fetch: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.query);
        let n = req.query;
        let t;
        let k = [];
        
        
        try {
            //let k = await sql.getKayttaja();
            t = await sql.getTuote(n.nimi, n.kategoria);
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }try {
            k = await sql.getKategoriat();
            console.log("Kategoriat:", k);
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }

        
        
        console.log("done")

        let empty = {id:-1, kategoria : "Kategoria" };

        res.render('index', {               //Tällä saa index.html näkyviin!!
            //kayttaja : [...k],
            kateg : [empty, ...k],
            tuote : [...t]
        });   
    },


}