'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const { sequelizeDb } = require('../src/models/index.js');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDb.sync();
});

afterAll(async () => {
  await sequelizeDb.drop();
});

describe('REST API', () => {
  test('handles invalid requests', async () => {
    const response = await request.get('/wut');

    expect(response.status).toEqual(404);
  });
  test('Creates an item', async () => {
    let response = await request.post('/item').send({
      buyer: 'Zozu',
      quantity: 2,
      selection: 'boots',
    })

    expect(response.status).toEqual(200);
    expect(response.body.buyer).toEqual('Zozu');
    expect(response.body.quantity).toEqual(2);
    expect(response.body.selection).toEqual('boots');
  });

  // test('finds all buyer purchases', async () => {
  //   let response = await request.get('/item');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].buyer).toEqual('Zozu');
  //   expect(response.body[0].quantity).toEqual(2);
  //   expect(response.body[0].selection).toEqual('boots');
  // });
});