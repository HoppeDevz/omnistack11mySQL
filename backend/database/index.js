const mysql = require('mysql');
const dotenv = require('dotenv');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

//cfg .env
dotenv.config();

var con = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('Conectado com o banco de dados!');
});

exports.createNewOngAccount = ( useraname, password, email, whatsapp, city, uf ) => {

    const ong_hex = crypto.randomBytes(4).toString('HEX');


    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    con.query(`INSERT INTO ongs_account (ong_hex, username, password, email, whatsapp, city, uf) VALUES ("${ong_hex}", "${useraname}", "${hash}", "${email}", "${whatsapp}", "${city}", "${uf}")`);

    return ong_hex
}

exports.createNewIncident = ( title, description, value, ong_hex ) => {
    
    con.query(`INSERT INTO incidents (title, description, value, ong_hex) VALUES ("${title}", "${description}", "${value}", "${ong_hex}")`);

}

exports.getAllIncidents = () => {

    return new Promise((resolve, reject) => {

        con.query('SELECT * FROM incidents', (error, results, fields) => {
           
            if(error) {

                console.log(error);
                reject(error);

            }
            
            var incidents = []

            for (j = 0; j <= results.length; j++) {
                if (results[j]) {
                    incidents.push(results[j])
                }  
            }

            let getInfo = (ong_hex, i) => {
                return new Promise((resolve, reject) => {
                    con.query(`SELECT * FROM ongs_account WHERE ong_hex = "${ong_hex}"`, (error, results, fields) => {

                        if (error) {
                            console.log(err)
                            reject(err)
                        }

                        resolve({
                            result: results[0],
                            id: i
                        })

                    });
                });
            }

            for ( var i = 0; i <= incidents.length; i++) {
                if (incidents[i]) {
                    var ong_hex = incidents[i].ong_hex

                    getInfo(incidents[i].ong_hex, i).then(data => {
                        incidents[data.id].name = data.result.username
                        incidents[data.id].email = data.result.email
                        incidents[data.id].whatsapp = data.result.whatsapp
                        //console.log( incidents[data.id] )
                        //console.log(data.id)

                        if (data.id == results.length - 1) {
                            return resolve(incidents);
                        }

                    })
                }
            }

           

        });
        
    });

}

exports.getIncidentByID = (id) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM incidents  WHERE ID = ${id}`, (error, results, fields) => {
        
            if (error) {
                console.log(error)
                reject(error)
            }

            console.log(results)
            return resolve(results)

        });
    });
}

exports.getAccountByOngHash = (ong_hex) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM ongs_account WHERE ong_hex = "${ong_hex}"`, (error, results, fields) => {


            if (error) {
                console.log(error)
                reject(error)
            }

            return resolve(results)

        });
    });
}

exports.deleteIncident = (id) => {

    con.query(`DELETE FROM incidents WHERE ID = ${id}`);
}

exports.verifyOngHexWithIncident = (id_incident, ong_hex) => {

    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM incidents WHERE ID = ${id_incident} AND ong_hex = "${ong_hex}"`, (error, results, fields) => {
            
            if (error) {
                //console.log(error)
                reject(error)
            }
        

            return resolve(results)

        });
    })

    
}

exports.getIncidentsOfAong = (ong_hex) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM incidents WHERE ong_hex = "${ong_hex}"`, (error, results, fields) => {

            if (error ) {
                console.log(error)
                reject(error)
            } 


            resolve(results)

        });
    });
}

exports.checkAccountInfo = (username, password) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM ongs_account WHERE username = "${username}"`, (error, results, fields) => {
            var exist_account = false
            for (var i = 0; i <= results.length; i++ ) {
                if (results[i]) {
                    if (bcrypt.compareSync(password, results[i].password)) {
                        exist_account = true
                    }    
                }  
            }

            if (exist_account) {
                resolve(true)
            } else {
                reject(false)
            }

        });
    });
}