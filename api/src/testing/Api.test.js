const { test, expect } = require("@jest/globals");
const { help } = require("yargs");
const helpers = require("./../helpers")
const apiVariables = require("./../index")

const apiroutes = require("../index.js");
const request = require('supertest');

test("testing port length", () => {
    expect(helpers.checkPortLength(apiVariables.port.toString())).toBeFalsy();
})

test("testing url", () => {
    expect(helpers.checkIfURL(`http://localhost:${apiVariables.port}`)).toBeFalsy();
})


it('tests if connection to endpoint is successful', async() => {
    const response = await request(apiroutes.app).get('/api/users');
    expect(response.statusCode).toEqual(200);
    expect(response.body.naam).toBe("poggy");
});