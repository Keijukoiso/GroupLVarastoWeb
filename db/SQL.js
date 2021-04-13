var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'mydb'
});

//esimerkki jolla testattiin asioita, jätetään tähän sen varalle että jää aikaa kehittää sisäänkirjautumista tms
const getKayttajat = () => {
    
    return new Promise((resolve, reject) => {

        
        let query = "SELECT * FROM kayttaja"

        

        console.log(query);
        connection.query(query, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    })
}

//tuotteiden haku hakunäkymään
const getTuotteet = (nimi, ktg) => {
    
    return new Promise((resolve, reject) => {
        
        
        let query = "SELECT * FROM tuote "
        let x = "WHERE "
        let params = [];

        if (nimi != null || ktg != null) {

            if ( nimi != null  && nimi != "") {
                query += x + "tuote_nimi LIKE ? ";
                x = "AND "
                let n = nimi + "%"
                params.push(n);
            }

            if ( ktg != null  && ktg != "" && ktg != "Kategoria") {
                query += x + "kategoria = ? ";
                params.push(ktg);
            }
            

        }
        console.log(query);
        connection.query(query, params, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    })
}

//Kategorioiden haku
const getKtg = () => {
    
    return new Promise((resolve, reject) => {
        
        
        let query = "SELECT DISTINCT kategoria FROM tuote "
        

        console.log(query);
        connection.query(query, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    })
}

//Sijaintien haku
const getSij = () => {
    
    return new Promise((resolve, reject) => {
        
        
        let query = "SELECT * idSIJAINTI FROM sijainti WHERE hyllykkö_tunnus = ? AND hylly_nro = ? "
        

        console.log(query);
        connection.query(query, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    })
}

//Hyllyköiden tunnusten haku
const getHyllykot = () => {
    
    return new Promise((resolve, reject) => {
        
        
        let query = "SELECT DISTINCT hyllykkö_tunnus FROM sijainti "
        

        console.log(query);
        connection.query(query, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    })
}

//hyllynumeroiden haku
const getHyllyt = (hl) => {
    
    return new Promise((resolve, reject) => {
        
        
        let query = "SELECT DISTINCT hylly_nro FROM sijainti "
        

        console.log(query);
        connection.query(query, hl, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    })
}

//tuotteiden tietojen haku
const getInfo = (id) => {
    
    return new Promise((resolve, reject) => {
        
        //Lisää: määrän lasku
        let query = "SELECT tuote.*, hyllykkö_tunnus as sijainti FROM tuote LEFT JOIN sijainti ON SIJAINTI_idSIJAINTI = idSIJAINTI WHERE idTUOTE = ?"
        

        console.log(query);
        connection.query(query, id, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                resolve(JSON.parse(JSON.stringify(result)));
            }
        });
    })

    
}

//tarkistukset
const getTark = (taulu, sarake, haettava) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * from ? WHERE ? = ?";

        connection.query(query, taulu, sarake, haettava, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                console.log("status result", result);
                resolve(result);
            }
        });
    })
}

//tuotteen lisäys
const lisTuote = (t) => {
    return new Promise((resolve, reject) => {

        let query = "INSERT INTO tuote (tuote_nimi, maara, kategoria, TOIMITTAJA_idTOIMITTAJA, SIJAINTI_idSIJAINTI) VALUES (?, ?, ?, ?, ?)" ;
        
        connection.query(query, [t.tuote_nimi, t.maara, t.kategoria, t.TOIMITTAJA_idTOIMITTAJA, t.SIJAINTI_idSIJAINTI], function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                console.log("Lisäys onnistui");
                resolve(result);
            }
        });

    })
}




module.exports = {

    
    getKayttaja: () => {
        return getKayttajat();
    },

    getTuote: (nimi, ktg) => {
        return getTuotteet(nimi, ktg);
    },

    getKategoriat: () => {
        return getKtg();
    },

    getTiedot: (id) => {
        return getInfo(id);
    },

    addTuote: (t) => {
        return lisTuote(t);
    },

    getHyllykko: () => {
        return getHyllykot();
    },

    getHylly: () => {
        return getHyllyt();
    },

    getSijainti: () => {
        return getSij(hk, hl);
    },

    getTarkistus: (taulu, sarake, haettava) => {
        return getTark(taulu, sarake, haettava);
    }

}