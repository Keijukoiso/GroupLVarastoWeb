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

        res.render('index', {
            kateg : [empty, ...k],
            tuote : [...t]
        });   
    },

    tiedot: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.params.id);
        let n = req.query;
        let t;
        
        try {
            t = await sql.getTiedot(req.params.id);
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }

        
        
        console.log("done")
        console.log(t);
        
        res.render('tiedot', {
            nimi: t[0].tuote_nimi,
            maara: t[0].maara,
            kategoria: t[0].kategoria,
            sijainti: t[0].sijainti,
            
        });   
    },

    kartta: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.params.id);
        let n = req.query;
        let t;
        
        try {
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }

        
        
        console.log("done")
        console.log(t);


        res.render('kartta', {
        });   
    },

}