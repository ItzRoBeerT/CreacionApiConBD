
const express = require('express');
const mongodb = require('mongodb');
const app = express();
const port = 3000;

const mongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Puerto2717'
app.use(express.json());
let db;
mongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('No se pudo conectar con la base de datos!')
    }
    db = client.db(databaseName)
})

app.get('', (req, res) => {
    res.send('respuesta');
})

app.post('/create', (req, res) => {
    if (error) {
        res.send('algo ha salido mal')
    }
    let nombre = req.body.nombre

    res.send(nombre);
   /* db.collection('Contacto').insertOne({
        nombre: 'Roberto',
        edad: 20,
        telefono: 615525834,
        dni: '32100933V'
    }), (error, result) => {
        if (error) {
            return console.log('no se puedo añadir alumno');
        }
        console.log(result.op);
    }*/
})

app.get("/api", function (req, res) {
    request(options, function (err, response, body) {
        var json = JSON.parse(body);
        console.log(json); // Logging the output within the request function
        res.json(request.json) //then returning the response.. The request.json is empty over here
    }); //closing the request function      
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})