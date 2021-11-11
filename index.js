
// Express

// const supertest = require('supertest');

const express = require('express');
const app = express();
const port = process.env.PORT || 5543;
const bgRouter = express.Router();

// Makes connection with the postgress database in docker
const pg = require('knex')({

    client: 'pg',
  
    searchPath: ['knex', 'public'],
  
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@localhost:5432/Users'
  
});

// Calls postgress database in docker to recieve database data from the table "users"
async function RecievePostgressData() {
      await pg.select().table("users");
}


// Middleware
const { request } = require('http');


bgRouter.route('/users')
    .get((req, res) => {
        // this code is temporrary to test my route
        let data = {
            naam: "poggy"
        }
        res.send(data)
        // RecievePostgressData();

        // RecieveData(req,res)
    })
 
bgRouter.route('/updateUser/:id')
    .patch((req, res) => {
        //UpdateUsers(req, res);     
});

bgRouter.route('/deleteUser/:id')
    .delete((req, res) => {
        //deleteUser(res,res);
});

app.use('/api', bgRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


//exports variables to the test js file
module.exports = {
    port,
    app
}

// Functions
// Calls to a pgadmin application database to getdata (not dockerised)
function RecieveData(req, res) {
    client.query(`Select * from users`, (err, res) => {
        if (!err) {
            console.log(res.rows);
        } else {
            console.log(err.message);
        }
    });
    res.send("succesfully read");
}

// Calls to a pgadmin application database to delete data (not dockerised)
async function deleteUser(req,res) {
    await client.query(
        `DELETE FROM public.users WHERE "id" = '${req.params.id}';`,
        (err, res) => {
            console.log(err, res);
        }
    );
    res.send("succefully deleted!")
}

// Calls to a pgadmin application database to update data (not dockerised)
async function UpdateUsers(req, res) {
    request.post
    await client.query(
        `UPDATE public.users
        SET "naam" = '${req.body.naam}'
        WHERE "id" = '${req.params.id}'`,
        (err, res) => {
            console.log(err, res);
        }
    );
    res.send("Succesfully updated!")
}


// post route die een row aanmaakt in de database (not dockerised)
// app.post('/addUser', (req, res) => {
//     client.query(
//         "INSERT INTO users(id, naam)VALUES(gen_random_uuid(), 'Jeff')",
//         (err, res) => {
//             console.log(err, res);
//             client.end();
//         }
//     );
//     res.send("Succesfully added")
// });

