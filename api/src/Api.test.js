const {
    app
} = require("./postgress")

const helpers = require("./helpers");

const request = require('supertest');


it('tests if / route is succesfull', async () => {
    const response = await request(app).get('/');
    console.log(app);
    expect(response.statusCode).toEqual(200);
});

it('tests if recieving users data is succesfull', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toEqual(200);
});

it('tests if deleting data is succesfull', async () => {
    const response = await request(app).delete('/api/deleteUser/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body.statusCode).toBe("data deleted");
});

it('tests if updating data is succesfull', async () => {
    const response = await request(app).patch('/api/updateUser/2');
    expect(response.statusCode).toEqual(200);
});

it('tests if creating user data is succesfull', async () => {
    const response = await request(app).post('/api/createUser/tesitfy/2');
    expect(response.statusCode).toEqual(200);
});

it('tests if creating gender data is succesfull', async () => {
    const response = await request(app).post('/api/createGender/genderyTestName');
    expect(response.statusCode).toEqual(200);
});