const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const port = 3000;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "TestContactos";
app.use(express.json());
let db;

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("No se pudo conectar con la base de datos!");
    }
    db = client.db(databaseName);
  }
);

app.get("", (req, res) => {
  res.send("Hola");
});

app.post("/create", (req, res) => {
  let nombre = req.body.nombre;
  let edad = req.body.edad;
  let telefono = req.body.telefono;
  let dni = req.body.dni;

  db.collection("Contacto").insertOne({
    nombre: nombre,
    edad: edad,
    telefono: telefono,
    dni: dni,
  }),
    (error, result) => {
      if (error) {
        return console.log("no se puedo añadir alumno");
      }
      console.log(result.op);
    };
  res.end();
});

app.get("/getContacto", function (req, res) {
  db.collection("Contacto").findOne(
    { _id: new ObjectID("63cea749b64a8544ab31aaa0") },
    (error, task) => {
      res.send(task);
    }
  );
});
app.put("/updateContacto", (req, res) => {
  let id = req.body.id;
  let edad = req.body.edad;
  let telefono = req.body.telefono;
  let dni = req.body.dni;
  let nombre = req.body.nombre+"";
  
  console.log("el dni: "+dni)
  db.collection("Contacto")
    .updateOne(
      {
        _id: new ObjectID(id),
      },
      {
        $set: {
          nombre: nombre,
          edad: edad,
          telefono: telefono,
          dni: dni,
        },
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.delete("/deleteContacto", (req, res) => {
  let id = req.body.id;

  db.collection("Contacto")
    .deleteOne({
      _id: new ObjectID(id),
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
