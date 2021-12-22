const {
    test,
    expect
} = require("@jest/globals");
const {
    help
} = require("yargs");
const helpers = require("../helpers");
const apiVariables = require("../index");

const apiroutes = require("../index.js");
const request = require('supertest');

test("testing port length", () => {
    expect(helpers.checkPortLength(apiVariables.port.toString())).toBeFalsy();
})

test("testing url", () => {
    expect(helpers.checkIfURL(`http://localhost:${apiVariables.port}`)).toBeFalsy();
})

it('tests if connection base is succesfull', async () => {
    const response = await request(apiroutes.app).get('/');
    expect(response.statusCode).toEqual(200);
});

it('tests if recieving data is succesfull', async () => {
    const response = await request(apiroutes.app).get('/api/users');
    expect(response.statusCode).toEqual(200);
});

it('tests if deleting data is succesfull', async () => {
    const response = await request(apiroutes.app).delete('/api/deleteUser/1');
    expect(response.statusCode).toEqual(200);
});

it('tests if updating data is succesfull', async () => {
    const response = await request(apiroutes.app).patch('/api/updateUser/2');
    expect(response.statusCode).toEqual(200);
});

it('tests if creating user data is succesfull', async () => {
    const response = await request(apiroutes.app).patch('/api/createUser/tesitfy/2');
    expect(response.statusCode).toEqual(200);
});

it('tests if creating gender data is succesfull', async () => {
    const response = await request(apiroutes.app).patch('/api/createGender/genderyTestName');
    expect(response.statusCode).toEqual(200);
});