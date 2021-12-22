// Express
// const supertest = require('supertest');
const express = require('express');
const app = express();
const bgRouter = express.Router();

// Makes connection with the postgress database in docker


const pg = require('knex')({

    client: 'pg',

    searchPath: ['knex', 'public'],

    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@localhost:5432/Users'

});


// This is Middleware

//--------------------GET--------------------------

bgRouter.route('/users')
    .get((req, res) => {
        recieveUsersPostgressData().then((data) => {
            res.send("data recieved");
        });
    })


//----------------------------------------------------


//--------------------UPDATE--------------------------

bgRouter.route('/updateUser/:id/:change')
    .patch((req, res) => {
        updatePostgressData(req.params.id, req.params.change);
        res.send("data updated")
    });

//----------------------------------------------------


//--------------------DELETE--------------------------

bgRouter.route('/deleteUser/:id')
    .delete((req, res) => {
        deletePostgressData(req.params.id);
        res.send("data deleted")
    });

//--------------------------------------------------

//--------------------POST--------------------------

bgRouter.route('/createUser/:naam/:gender')
    .post((req, res) => {
        createPostgressData(req.params.naam, req.params.gender);
        res.send("data added")
    });

bgRouter.route('/createGender/:genderNaam')
    .post((req, res) => {
        createSexTypesPostgressData(req.params.genderNaam);
        res.send("data added")
    });

//---------------------------------------------------


function startexpress() {
    app.use('/api', bgRouter);

    app.get('/', (req, res) => {
        res.send("use /api to go further");
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
                    t.string('gender', 20);
                })
                .createTable('users', function (t) {
                    t.increments('id').primary();
                    t.string('naam', 100);
                    t.integer('gender', 1).unsigned().references('genderId').inTable('sex_types');
                }).then();
        }
    });
    if (didAlreadyCreateTable) {
        await createDummySexTypeData();
        for (let index = 0; index < 5; index++) {
            createDummyData();
        }
    }
}

// Creates dummy data -------------------

async function createDummyData() {
    await pg.table('users').insert({
        naam: 'Jhon Doe',
        gender: 1
    })
}

async function createDummySexTypeData() {
    await pg.table('sex_types').insert({
        gender: "male"
    })
    await pg.table('sex_types').insert({
        gender: "female"
    })
}

//----------------------------------------


// Creates a row inside the users table
async function createPostgressData(naam, gender) {
    await pg.table('users').insert({
        naam: naam,
        gender: gender
    })
}

// Creates a row inside the sextype
async function createSexTypesPostgressData(genderNaam) {
    await pg.table('sex_types').insert({
        gender: genderNaam
    })
}

// Recieve data from the users table
async function recieveUsersPostgressData() {
    return await pg.select('id', 'naam').from('users')
}

async function recieveSexPostgressData() {
    return await pg.select('genderId').from('sex_types')
}
// Update a row inside the users table
async function updatePostgressData(id, change) {
    return await pg.table('users').where('id', '=', id).update('naam', change)
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