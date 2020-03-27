const express = require('express');
const app = express();
const dotenv = require('dotenv');
const database = require('./database/index');
const cors = require('cors');

app.use(cors())
app.use(express.json());

//cfg dotenv
dotenv.config();

app.post('/register', (req, res) => {
    var register_sucess = false
    const { username, password, email, whatsapp, city, uf } = req.body

    var hash = database.createNewOngAccount( username, password, email, whatsapp, city, uf)
    register_sucess = true

    return res.json({
        hash, register_sucess, username, password: hash, email, whatsapp, city, uf
    })
});

app.post('/createNewIncident', (req, res) => {
    var register_sucess = false
    const { title, description, value } = req.body 
    const  ong_hex  = req.headers.authorization

    

    database.createNewIncident( title, description, value, ong_hex)
    register_sucess = true

    return res.json({
        register_sucess, title, description, value, ong_hex
    })
}); 

app.get('/incidents', (req, res) => {

    database.getAllIncidents().then((data) => {

        console.log(data);
        res.status(200).send({ "status" : true, data});

    })
    .catch((error) => {

        res.status(400).send({"status" : false, error});

    })

});

app.post("/getIncidentByID", (req, res) => {
    const id = req.body.id
    console.log(id)
    database.getIncidentByID(id).then(data => { 
        res.status(200).send({
            data
        })
    }).catch(err => {
        res.status(400).send({
            status: false
        })
    })

})

app.post('/DeleteIncident', (req, res) => {
    const id = req.body.id
    const ong_hex = req.headers.authorization

    database.verifyOngHexWithIncident(id, ong_hex).then(data => {
        //console.log(data)

        if (data[0]) {
            res.status(200).send({"have_permission": true, data})
            database.deleteIncident(id)
        } else {
            res.status(401).send({"have_permission": false, data })
        }
        
    }).catch(err => {
        console.log(err)
    })
})

app.get('/getIncidentsOfaUser', (req ,res) => {
    const ong_hex = req.headers.authorization
    
    database.getIncidentsOfAong(ong_hex).then(data => {
        console.log(data)
        res.status(200).send({
            "status": true, data
        })    
    }).catch(err => {
        console.log(err)
        res.status(400).send({
            "status": false, err
        })
    })
})

app.post("/verifyAccountInfo", (req, res) => {
    const { username, password } = req.body
    database.checkAccountInfo(username, password).then(data => {
        res.status(200).send({
            "exist_account": true
        })
    }).catch(err => {
        res.status(400).send({
            "exist_account": false
        })
    })
});

app.post("/getAccountByOngHash", (req, res) => {
    const ong_hex = req.body.ong_hex

    database.getAccountByOngHash(ong_hex).then(response => {
        res.status(200).send({
            result: response
        })
    }).catch(err => {
        res.status(400).send({
            error: err
        })
    })
});

app.listen(process.env.PORT_THIS_SERVER, () => {
    console.log(`Server is running in port: ${process.env.PORT_THIS_SERVER}`)
});