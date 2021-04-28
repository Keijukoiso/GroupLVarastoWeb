const sql = require('../db/SQL');

module.exports = {

    fetch: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.query);
        let n = req.query;
        let t;
        let k = [];
        
        
        try {
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
    */
    lisaa: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.query);
        let k = [];
        let hk = [];
        let hl = [];
        let sek = [];
        
        //Haetaan kategoriat
        try {
            k = await sql.getKategoriat();
            console.log("Kategoriat:", k);
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        
        //Haetaan hyllyköt
        try {
            hk = await sql.getHyllykko();
            console.log("Hyllyköt:", hk);
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        //Haetaan hyllyt
        try {
            hl = await sql.getHylly();
            console.log("Hyllyt:", hl);
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        //Haetaan sektorit
        try {
            sek = await sql.getSek();
            console.log("sektorit:", sek);
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        
        console.log("done")

        let emptyk = {id:-1, kategoria : "Valitse" };
        let emptyhl = {id:-1, hylly_nro : "Valitse" };
        let emptyhk = {id:-1, hyllykkö_tunnus : "Valitse" };
        let emptysek = {id:-1, hylly_sektori : "Valitse" };
        
        //Renderöidään lisäyssivu saaduilla tiedoilla
        res.render('lisaa', {
            kateg : [emptyk, ...k],
            hyllykko: [emptyhk, ...hk],
            hylly: [emptyhl, ...hl],
            sektori: [emptysek, ...sek]
        });   
        
    },


    //Tuotteiden lisäys kantaan
    add: async (req, res) => {
        console.log("lisäys ");

        console.log("body: " + JSON.stringify(req.body));
        let t = req.body;
        let s;
        
        console.log("Sijaintia: ", t.hyllykkö_tunnus, t.hylly_nro);
        //tarkistetaan että käyttäjä on valinnut hyllyn ja hyllykön
        if (t.hyllykkö_tunnus == "" || t.hyllykkö_tunnus == undefined || t.hyllykkö_tunnus == "Valitse" ||
            t.hylly_nro == "" || t.hylly_nro == undefined ||t.hylly_nro == "Valitse" ||
            t.hylly_sektori == "" || t.hylly_sektori == undefined || t.hylly_sektori == "Valitse") {
                let error_msg = "Tarkista annetut arvot";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
        }

        console.log("Sijainti haku",);
        //haetaan sijainnin id annettujen arvojen perusteella
        try {
            s = await sql.getSijainti(t.hyllykkö_tunnus, t.hylly_nro, t.hylly_sektori);
            console.log("Sijainti:", s);
            
        }
        catch (err) {
            res.json({status : "NOT OKkk", msg : err});
            return;
        }

        //Kantaan lisättävän tuotteen tiedot
        const tt = {
            tuote_nimi: t.tuote_nimi,
            maara: t.maara,
            kategoria: t.kategoria,
            TOIMITTAJA_idTOIMITTAJA: 1, //ei voi vielä valita toimittajaa--------------------------KESKEN
            SIJAINTI_idSIJAINTI: 1, // Eikä sijaintia:)--------------------------------------------KESKEN, helppo!!!
            //sijainti pitää muuttaa fiksummaksi muuten kaikki ovat id:llä 1. s ei sovi koska tieto on Rowdatapackettina :D
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

        /*
        Tarkistusten ideana siis:
        Pistä menemään taulu, sarake ja tarkistettava arvo
        SQL.js pitäisi olla yksi ja sama funktio millä molemmat tarkistukset hoidetaan.
        
        
        //Toimittaja id tarkistus------------------------------------------------------------------KESKEN
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
        
        console.log("Toimiala ok");
        */

        

        //Sijainti id tarkistus------------------------------------------------------------------KESKEN
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
    },

    //Tuotteen poisto kannasta
    del: async (req, res) => {
        console.log("Delete ...");
        console.log(req.params.id);
        let t;
        
        try {
            //Onko tuotetta olemassa
            console.log("Tarkistetaan onko tuotetta olemassa ...");
            t = await sql.getTiedot(req.params.id);

            console.log("Tuote löydetty!", t);

            //jos ei löydy
            if (t == "" || t == undefined) {
                let error_msg = "Ei vastaavia tuloksia";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
            }
            
        }
        catch (err) {
            res.json({status : "NOT OK1", msg : err});
        }
        try {
            await sql.delTuote(req.params.id);
            
            //Jos löytyy, poista
            console.log({ status: "Poisto onnistui", Poistettu : t });
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        res.redirect('/');
    },

    //kirjautuminen
    kirjaudu: async (req, res) => {
        console.log("HAETAAN KÄYTTÄJÄT")
        let k = [];
        /*
        //Haetaan käyttäjänimet alasveto valikkoon
        try {
            k = await sql.getKayttaja();
            console.log("Käyttäjät:", k);
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        
        console.log("done")

        let emptyk = {id:-1, kayttaja_nimi : "Valitse" };
        */
        //Renderöidään lisäyssivu saaduilla tiedoilla
        res.render('kirjautuminen', {
            //kaytn : [emptyk, ...k]
        });   
    },



    //Salasanan tarkastaminen kirjautuessa
    salasana: async (req, res) => {
        console.log("tarkista täsmääkö salasana");
        console.log("body: " + JSON.stringify(req.body))
        let k = req.body; //JOSTAIN syystä req.body on undefined ja koko paska kuolee siihen jos alasvetovalikost käyttäjä_nimi
        let s;
        let status = false; //tarkoituksen että kertoisiko onko kirjauduttu vai ei

        console.log("kayttis: ",k.kayttaja_nimi);
        console.log("salasana: ",k.salasana);
        
        
        //Tarkistetaan että salasana ja käyttäjä on annettu
        if(k.kayttaja_nimi == "" || k.kayttaja_nimi == undefined || // k.kayttaja_nimi == "Valitse" || (jos käyttää listaa tarvitaan)
        k.salasana == "" || k.salasana == undefined){
            let error_msg = "Tarkista tiedot";
            console.log(error_msg);
            res.json({status : "NOT OK", msg : error_msg});
            return;
        }
        

        console.log("kayttajan id haku...");
        //Haetaan idKAYTTAJA salasanan ja kayttajanimen mukaan jos ei löydy tiedot väärin
        try{
            s = await sql.getSalasana(k.kayttaja_nimi, k.salasana);
            console.log("idKAYTTAJA: ", s);
            if(s != "" && s != undefined){
                console.log("Käyttäjä löytyi"); //LÖYTÄÄ ID:n RowDataPackettina mikä sotkee kaiken eli jää jumiin
                status = true;
                res.render('kirjautuminen', {

                });
                return;
            }
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
            return;
        }
        
    }
}