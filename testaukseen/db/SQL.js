


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





module.exports = {

    
    getKayttaja: () => {
        return getKayttajat();
    },


}