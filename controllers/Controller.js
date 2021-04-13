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

    //Haetaan tuotetiedot kannasta
    tiedot: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.params.id);
        let n = req.query;
        let t;
        
        //Kokeillaan hakea tiedot id:n perusteella
        try {
            t = await sql.getTiedot(req.params.id);
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }

        
        //Ilmoitetaan onnistumisesta, näytetään saadut tiedot
        console.log("done")
        console.log(t);
        
        //Renderöidään tiedot-sivu saaduilla tiedoilla
        res.render('tiedot', {
            id: t[0].idTUOTE,
            nimi: t[0].tuote_nimi,
            maara: t[0].maara,
            kategoria: t[0].kategoria,
            sijainti: t[0].sijainti,
            
        });   
    },

    //Tuotteiden lisäyssivu
    /*Todo:
    - Toimittajan valinta
    - 
    */
    lisaa: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.query);
        let k = [];
        let hk = [];
        let hl = [];
        
        //Haetaan kategoriat
        try {
            k = await sql.getKategoriat();
            console.log("Kategoriat:", k);
            
        }
        catch (err) {
            res.json({status : "NOT OK1", msg : err});
        }
        
        //Haetaan hyllyköt
        try {
            hk = await sql.getHyllykko();
            console.log("Hyllyköt:", hk);
        }
        catch (err) {
            res.json({status : "NOT OK2", msg : err});
        }
        //Haetaan hyllyt
        try {
            hl = await sql.getHylly();
            console.log("Hyllyt:", hl);
        }
        catch (err) {
            res.json({status : "NOT OK3", msg : err});
        }
        
        console.log("done")

        let emptyk = {id:-1, kategoria : "Valitse" };
        let emptyhl = {id:-1, hylly_nro : "Valitse" };
        let emptyhk = {id:-1, hyllykkö_tunnus : "Valitse" };
        
        //Renderöidään lisäyssivu saaduilla tiedoilla
        res.render('lisaa', {
            kateg : [emptyk, ...k],
            hyllykko: [emptyhk, ...hk],
            hylly: [emptyhl, ...hl]
        });   
        
    },

    
    //Tuotteiden lisäys kantaan
    add: async (req, res, next) => {
        console.log("lisäys ");

        console.log("body: " + JSON.stringify(req.body));
        let t = req.body;
        let s = [];
        
        console.log("Sijaintia: ", t.hyllykkö_tunnus, t.hylly_nro);
        //tarkistetaan että käyttäjä on valinnut hyllyn ja hyllykön
        if (t.hyllykkö_tunnus == "" || t.hyllykkö_tunnus == undefined || t.hyllykkö_tunnus == "Valitse" ||
            t.hylly_nro == "" || t.hylly_nro == undefined ||t.hylly_nro == "Valitse") {
                let error_msg = "Tarkista annetut arvot";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
        }

        console.log("Sijainti haku",);
        //haetaan sijainnin id annettujen arvojen perusteella
        try {
            let hk = t.hyllykkö_tunnus;
            let hl = t.hylly_nro;
            let sija = await sql.getSijainti(hk, hl);
            console.log("Sijainti:", sija);
            
        }
        catch (err) {
            res.json({status : "NOT OKkk", msg : err});
        }

        //Kantaan lisättävän tuotteen tiedot
        const tt = {
            tuote_nimi: t.tuote_nimi,
            maara: t.maara,
            kategoria: t.kategoria,
            TOIMITTAJA_idTOIMITTAJA: 1, //ei voi vielä valita toimittajaa
            SIJAINTI_idSIJAINTI: 1, // Eikä sijaintia:)
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
        console.log("Nimi ok");

        /*//Toimittaja id tarkistus KESKEN
        console.log("Tarkistetaan toimiala");
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
        }
        
        console.log("Toimiala ok")
        */

        ;

        //Sijainti id tarkistus KESKEN
        /*
        console.log("Sijainnin tarkistus");

        try {
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

        console.log("Sijainti ok");
        */

        console.log("Tarkistus ok, lisätään")

        try {
            await sql.addTuote(tt);
            console.log("done");
        }
        catch (err) {
            res.json({status : "NOT OK1", msg : err});
        }
        res.redirect('/lisaa');
        //
        //res.render('lisaa'); //Ei pelaa sitten millään, ratkaise tämä 
    },

    //Tuotteen poisto kannasta
    del: async (req, res) => {
        console.log("fetch started ...");

        try {
            //Onko tuotetta olemassa
            let n = req.body;
            console.log("body: " + JSON.stringify(req.body));
            let t = await sql.getTiedot(n.id);
            let tuote = true;
            
            //jos ei löydy
            if (t == "" || t == undefined) {
                let error_msg = "Ei vastaavia tuloksia";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
            }
            
            //Onko tilauksia (korvaa tarkistuksilla)
            /*
            let t = await sql.getTilaukset(n.id);
            
            if ( t == "" ) {
                tilaukset = false;
            }
            */
            
            //Jos löytyy, poista (tarkistuksiin joo)
            await sql.delTuote(t.id);
            

            res.json({ status: "Poisto onnistui", Poistettu : t });
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
    },

    lis: (req, res) => {
        return lisaatest(req, res);
    },

}