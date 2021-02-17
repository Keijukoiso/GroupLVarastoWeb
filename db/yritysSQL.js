var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'yrityskanta'
});


const getYritykset = (nimi, ytun, toim) => {
    
    return new Promise((resolve, reject) => {
        let query = ("SELECT yritys.id, yritys.nimi, yritys.ytunnus, yritys.osoite, yritys.toimiala_id, "
                    + "toimiala.selite as toimiala, COUNT(tilaus.id) as tilaukset, ROUND(SUM(tilaus.veroton), 2) "
                    + "as summa_veroton, ROUND(SUM(tilaus.veroton) + SUM(tilaus.veroton)*0.24, 2) as summa_verollinen "
                    + "FROM yritys LEFT JOIN toimiala ON yritys.toimiala_id = toimiala.id LEFT JOIN tilaus ON tilaus.y_id = yritys.id ")
                    
        let x = "WHERE "
        let params = [];

        if (nimi != null || ytun != null || toim != null) {

            if ( nimi != null ) {
                query += x + "yritys.nimi = ? ";
                x = "AND "
                params.push(nimi);
            }
            if ( ytun != null ) {
                query += x + "yritys.ytunnus = ? ";
                x = "AND "
                params.push(ytun);
            }
            if ( toim != null ) {
                query += x + "toimiala.selite = ? ";
                params.push(toim);
            }


        }
        query += "GROUP BY yritys.id "
        console.log(query);
        connection.query(query, params, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                console.log("result", result);
                resolve(result);
            }
        });
    })
}

const getDel = (id) => {
    
    return new Promise((resolve, reject) => {
        let query = ( "SELECT yritys.id, yritys.nimi, yritys.ytunnus, yritys.osoite, "
                    + "COUNT(tilaus.id) as tilaukset FROM yritys LEFT JOIN tilaus ON "
                    + "tilaus.y_id = yritys.id WHERE yritys.id = ? AND yritys.olemassa "
                    + "= 1 GROUP BY yritys.id ")
                    
        console.log(query);
        connection.query(query, id, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                console.log("result", result);
                resolve(result);
            }
        });
        

            
    })
}

const getTil = (id) => {
    
    return new Promise((resolve, reject) => {
        let query = "SELECT id FROM tilaus WHERE y_id = ? "
        console.log(query);
        connection.query(query, id, function (error, result, fields) {

            if (error) {
                console.log("Virhe", error);
                reject(error);
            }
            else {
                console.log("result", result);
                resolve(result);
            }
        });
        

            
    })
}

const deleteYritys = (id, t) => {
    
    return new Promise((resolve, reject) => {
        let query = "";
        if (!t) {
             query = "DELETE FROM yritys WHERE id = " + id;
        } 
        else {
            query = "UPDATE yritys SET olemassa = '0' WHERE id = " + id;    // 0 = ei olemassa
        }
        
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


module.exports = {

    getYritys: (nimi, ytun, toim) => {
        return getYritykset(nimi, ytun, toim);
    },

    getPoistettava: (id) => {
        return getDel(id);
    },
    
    getTilaukset: (id) => {
        return getTil(id);
    },

    delYritys: (id, t) => {
        return deleteYritys(id, t);
    }

}