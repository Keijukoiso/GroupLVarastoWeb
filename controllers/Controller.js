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

    lisaa: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.query);
        let k = [];
        let hk = [];
        let hl = [];
        
        try {
            k = await sql.getKategoriat();
            console.log("Kategoriat:", k);
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        
        try {
            hk = await sql.getHyllykko();
            console.log("Hyllyköt:", hk);
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        try {
            hl = await sql.getHylly();
            console.log("Hyllyt:", hl);
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        
        console.log("done")

        let emptyk = {id:-1, kategoria : "Valitse" };
        let emptyhl = {id:-1, hylly_nro : "Valitse" };
        let emptyhk = {id:-1, hyllykkö_tunnus : "Valitse" };
        

        res.render('lisaa', {
            kateg : [emptyk, ...k],
            hyllykko: [emptyhk, ...hk],
            hylly: [emptyhl, ...hl]
        });   
    },

    

    add: async (req, res) => {
        console.log("lisäys ");

        console.log("body: " + JSON.stringify(req.body));
        let t = req.body;
        let s = [];
        

        //tarkistetaan että käyttäjä on valinnut hyllyn ja hyllykön
        if (t.hyllykkö_tunnus == "" || t.hyllykkö_tunnus == undefined || t.hyllykkö_tunnus == "Valitse" ||
            t.hylly_nro == "" || t.hylly_nro == undefined ||t.hylly_nro == "Valitse") {
                let error_msg = "Tarkista annetut arvot";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
        }
        //haetaan sijainnin id annettujen arvojen perusteella
        try {
            s = await sql.getSijainti(t.hyllykkö_tunnus, t.hylly_nro);
            console.log("Sijainti:", s);
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }

        const tt = {
            tuote_nimi: t.tuote_nimi,
            maara: t.maara,
            kategoria: t.kategoria,
            TOIMITTAJA_idTOIMITTAJA: 1, //ei voi vielä valita toimittajaa
            SIJAINTI_idSIJAINTI: 1,
            };

        

        console.log("Tarkistetaan");
 
        //Onko tyhjiä arvoja
        if (tt.tuote_nimi == "" || tt.maara == "" || tt.kategoria == "" || tt.TOIMITTAJA_idTOIMITTAJA == "" || tt.SIJAINTI_idSIJAINTI == ""|| 
            tt.tuote_nimi == undefined || tt.maara == undefined || tt.kategoria == undefined || tt.TOIMITTAJA_idTOIMITTAJA == undefined || tt.SIJAINTI_idSIJAINTI == undefined) {
                let error_msg = "Tarkista annetut arvot";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
        }
        
        //onko nimi jo kannassa
        console.log("Tarkistetaan löytyykö nimi kannasta");
        try {
            let n = await sql.getTuote(tt.tuote_nimi);
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
        console.log("Nimi ok, toim tarkistus");

        /*//Toimittaja id tarkistus KESKEN
        try {
            let toim = await sql.getTarkistus("toimittaja", "idTOIMITTAJA", tt.TOIMITTAJA_idTOIMITTAJA);
            if (toim == "") {
                let error_msg = "Toimittaja on virheellinen";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
            }
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }*/

        console.log("toim ok, sij tarkistus");

        //Sijainti id tarkistus KESKEN
        /*try {
            let sij = await sql.getTarkistus("sijainti", "idSIJAINTI", tt.SIJAINTI_idSIJAINTI);
            if (sij == "") {
                let error_msg = "Sijainti on virheellinen";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
            }
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
*/

        console.log("Tarkistus ok, lisätään")

        try {
            await sql.addTuote(tt);
            console.log("done");
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }

        res.render('lisaa');
    },

    

}