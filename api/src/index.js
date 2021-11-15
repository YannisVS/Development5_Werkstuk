
// Express

// const supertest = require('supertest');
const express = require('express');
const app = express();
const port = process.env.APIPORT || 5543;
const bgRouter = express.Router();

// Makes connection with the postgress database in docker


const pg = require('knex')({

    client: 'pg',
    
    searchPath: ['knex', 'public'],
    
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@localhost:5432/users'
    
});


// This is Middleware

bgRouter.route('/users')
    .get((req, res) => {
        recievePostgressData().then((data) => {
            console.log(data);
            res.send("data recieved");
        });
    })
 
bgRouter.route('/updateUser/:id')
    .patch((req, res) => {
        try {
            updatePostgressData(req.params.id);
            res.send("data updated")
        } catch (error) {
            res.send(error)
        }
});

bgRouter.route('/deleteUser/:id')
    .delete((req, res) => {
        try {
            deletePostgressData(req.params.id);
            res.send("data deleted")
        } catch (error) {
            res.send(error)
        }
});

function startexpress() {
    app.use('/api', bgRouter);

    app.get('/', (req, res) => {
        res.send("use /api to go further")
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
        
    });
}
async function initTables() {
    await createTable();
    await createPostgressData();
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
            t.increments('id').primary();
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
    return await pg.select('id', 'naam').from('users')
}

// Update a row inside the users table
async function updatePostgressData(id) {
    return await pg.table('users').where('id', '=', id).update('naam', "UpdatedTest")
}

// Delete a row inside the users table
async function deletePostgressData(id) {
    return await pg.table('users').where('id', '=', id).del()
}

//exports variables to the test js file
module.exports = {
    port,
    app
}

// gen_random_uuid()

