const {
    app
} = require("./postgress")

const request = require('supertest');


it('tests if / route is succesfull', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
});

it('tests if recieving users data is succesfull', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toEqual(200);
});

it('tests if recieving genders data is succesfull', async () => {
    const response = await request(app).get('/api/genders');
    expect(response.statusCode).toEqual(200);
});

it('tests if deleting user data is succesfull', async () => {
    const response = await request(app).delete('/api/deleteUser/1');
    expect(response.statusCode).toEqual(200);
});

it('tests if deleting Gender data is succesfull', async () => {
    const response = await request(app).delete('/api/deleteGender/3');
    expect(response.statusCode).toEqual(200);
});


it('tests if updating user data is succesfull', async () => {
    const response = await request(app).patch('/api/updateUser/3/testvalue');
    expect(response.statusCode).toEqual(200);
});

it('tests if updating gender data is succesfull', async () => {
    const response = await request(app).patch('/api/updateGender/2/testvalue');
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