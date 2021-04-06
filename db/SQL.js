var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'mydb'
});


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


}