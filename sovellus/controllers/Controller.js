const sql = require('../db/SQL');

module.exports = {

    fetch: async (req, res) => {           
        console.log("fetch started ...");

        try {
            let n = req.body;
            console.log("body: " + JSON.stringify(req.body));

            let k = await sql.getKayttaja();
            let t = await sql.getTuote();
            
            console.log("done")

            res.render('index', {               //Tällä saa index.html näkyviin!!
                kayttaja : [...k],
                tuote : [...t]
            });   
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
    },


}