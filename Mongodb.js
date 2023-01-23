const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Puerto2717'

mongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('No se pudo conectar con la base de datos!')
    }

    const db = client.db(databaseName)
    
    db.collection('Contacto').insertOne({
        nombre: 'Roberto',
        edad: 20,
        telefono: 615525834,
        dni: '32100933V'
    }),(error,result) =>{
        if (error) {
            return console.log('no se puedo añadir alumno');
        }
        console.log(result.op);
    }

    db.collection('Contacto').updateOne({
        _id: new ObjectID("5c0fe6634362c1fb75b9d6b5")
    }, {
        $inc: {
            edad: 1,
            telefono: 111111111,
            dni: 'dniCambiado'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('Contacto').findOne({ _id: new ObjectID("5c0fec243ef6bdfbe1d62e2f") }, (error, task) => {
        console.log(task)
    })

    db.collection('Contacto').deleteOne({
        nombre: "Robert"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})
