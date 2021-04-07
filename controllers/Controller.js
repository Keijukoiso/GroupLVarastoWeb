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

    add: async (req, res) => {
        console.log("lisäys ");

        console.log("body: " + JSON.stringify(req.body));
        let t = req.body;
        
        const tuote = {
            tuote_nimi: t.tuote_nimi,
            maara: t.maara,
            kategoria: t.kategoria,
            TOIMITTAJA_idTOIMITTAJA: t.TOIMITTAJA_idTOIMITTAJA,
            SIJAINTI_idSIJAINTI: t.SIJAINTI_idSIJAINTI,
            };

        

        console.log("Tarkistetaan")
 
        //Onko tyhjiä arvoja
        if (t.tuote_nimi == "" || t.maara == "" || t.kategoria == "" || t.TOIMITTAJA_idTOIMITTAJA == "" || t.SIJAINTI_idSIJAINTI == ""|| 
            t.tuote_nimi == undefined || t.maara == undefined || t.kategoria == undefined || t.TOIMITTAJA_idTOIMITTAJA == undefined || t.SIJAINTI_idSIJAINTI == undefined) {
                let error_msg = "Tarkista annetut arvot";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
        }
        
        //onko nimi jo kannassa
        
        try {
            let n = await sql.getTuote(t.tuote_nimi);
            if (n != "") {
                let error_msg = "Nimi on jo tietokannassa";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
            }
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }

        //Toimittaja id tarkistus KESKEN
        try {
            let t = await sql.getjotainjotain(t.TOIMITTAJA_idTOIMITTAJA);
            if (t == "") {
                let error_msg = "Toimittaja on virheellinen";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
            }
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }

        //Sijainti id tarkistus KESKEN
        try {
            let t = await sql.getjotainjotain(t.SIJAINTI_idSIJAINTI);
            if (t == "") {
                let error_msg = "Sijainti on virheellinen";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
            }
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }


        console.log("Tarkistus ok, lisätään")

        try {
            let l = await sql.addTuote(t);
            console.log("done")
            res.json(l);
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
    },

}