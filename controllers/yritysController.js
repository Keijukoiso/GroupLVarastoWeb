
const { getyritykset, getTilaukset, delYritys } = require('../db/yritysSQL');
const sql = require('../db/yritysSQL');

module.exports = {

    fetch: async (req, res) => {
        console.log("fetch started ...");

        try {
            let n = req.body;
            console.log("body: " + JSON.stringify(req.body));
            
            let y = await sql.getYritys(n.nimi, n.ytunnus, n.selite);
            
            
            console.log("done")

            res.json({ status: "OK", yritykset : y });
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
    },

    del: async (req, res) => {
        console.log("fetch started ...");

        try {
            //Onko yritystä olemassa
            let n = req.body;
            console.log("body: " + JSON.stringify(req.body));
            let y = await sql.getPoistettava(n.id);
            let tilaukset = true;
            
            //jos ei löydy
            if (y == "" || y == undefined) {
                let error_msg = "Ei vastaavia tuloksia";
                console.log(error_msg);
                res.json({status : "NOT OK", msg : error_msg});
                return;
            }
            
            //Onko tilauksia, tämä osa on kamala
            let t = await sql.getTilaukset(n.id);
            
            if ( t == "" ) {
                tilaukset = false;
            }
            
            //Jos löytyy, poista tai päivitä olevaisuus
            await sql.delYritys(n.id, tilaukset);
            

            res.json({ status: "Poisto onnistui", Poistettu : y });
        }
        catch (err) {
            res.json({status : "NOT OK", msg : err});
        }
    },



    
}