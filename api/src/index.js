
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

    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@localhost:5432/users'

});

// Middleware

bgRouter.route('/users')
    .get((req, res) => {
        createPostgressData();
    })
 
bgRouter.route('/updateUser/:id')
    .patch((req, res) => {
});

bgRouter.route('/deleteUser/:id')
    .delete((req, res) => {
});


function startexpress() {
    app.use('/api', bgRouter);

    app.get('/', (req, res) => {
        recievePostgressData().then((data) => {
            console.log(data);
            res.send("data recieved");
        });
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
        
    });
}
async function initTables() {
    await createTable();
    await createPostgressData();
}

initTables();
startexpress();


// Postgress functions 

// Creates a table or checks if there is already a table with that name
async function createTable() {
    await pg.schema.hasTable('users').then(function(exists) {
        if (!exists) {
          return pg.schema.createTable('users', function(t) {
            // t.increments('id').primary();
            t.string('naam', 100);
          });
        }
      });
}

// Creates a row inside the users table
async function createPostgressData() {
    await pg.table('users').insert({naam: "test"})
}

// Recieve data from the users table
async function recievePostgressData() {
    return await pg.select('naam').from('users')
}

// Update a row inside the users table
async function updatePostgressData() {
    return await pg.select('naam').from('users')
}

// Delete a row inside the users table
async function deletePostgressData() {
    return await pg.select('naam').from('users')
}



//exports variables to the test js file
module.exports = {
    port,
    app
}


// gen_random_uuid()

