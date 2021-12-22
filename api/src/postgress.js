// Express
// const supertest = require('supertest');
const express = require('express');
const app = express();
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
        recieveUsersPostgressData().then((data) => {
            console.log(data);
        });
        recieveSexPostgressData().then((data) => {
            console.log(data);
        });
        res.send("data recieved");
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


}
async function initTables() {
    await createTables();
}

initTables();
startexpress();


// Postgress functions 

// Creates a table or checks if there is already a table with that name
let didAlreadyCreateTable = false;
async function createTables() {
    await pg.schema.hasTable('sex_types').then(function (exists) {
        if (!exists) {
            didAlreadyCreateTable = true
            pg.schema
                .createTable('sex_types', function (t) {
                    t.increments('genderId').primary();
                    t.string('gender', 1);
                })
                .createTable('users', function (t) {
                    t.increments('id').primary();
                    t.string('naam', 100);
                    t.integer('gender', 1).unsigned().references('genderId').inTable('sex_types');
                }).then();
        }
    });
    if (didAlreadyCreateTable) {
        await createSexTypesPostgressData();
        for (let index = 0; index < 5; index++) {
            createPostgressData();
        }
    }
}

// Creates a row inside the users table
async function createPostgressData() {
    await pg.table('users').insert({
        naam: "test",
        gender: 1
    })
}

async function createSexTypesPostgressData() {
    await pg.table('sex_types').insert({
        gender: "male"
    })
    await pg.table('sex_types').insert({
        gender: "female"
    })
}

// Recieve data from the users table
async function recieveUsersPostgressData() {
    return await pg.select('id', 'naam').from('users')
}

async function recieveSexPostgressData() {
    return await pg.select('testsex').from('sex_Types')
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
    app
}

// gen_random_uuid()