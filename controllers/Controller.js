const sql = require('../db/SQL');

module.exports = {

    fetch: async (req, res) => {           
        console.log("fetch started ...");
        console.log(req.query);
        let n = req.query;
        let t;

        try {
            

            //let k = await sql.getKayttaja();
            t = await sql.getTuote(n.nimi);
            
            
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
        
        console.log("done")

        res.render('index', {               //Tällä saa index.html näkyviin!!
            //kayttaja : [...k],
            tuote : [...t]
        });   
    },


}