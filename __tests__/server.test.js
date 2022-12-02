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
  test('Creates an download', async () => {
    let response = await request.post('/download').send({
      buyer: 'Ricky',
      quantity: 3,
      selection: 'game',
    })
    expect(response.status).toEqual(200);
    expect(response.body.buyer).toEqual('Ricky');
    expect(response.body.quantity).toEqual(3);
    expect(response.body.selection).toEqual('game');
  });


  test('finds all items', async () => {
    let response = await request.get('/item');
    expect(response.status).toEqual(200);
    expect(response.body[0].buyer).toEqual('Zozu');
    expect(response.body[0].quantity).toEqual(2);
    expect(response.body[0].selection).toEqual('boots');
  });

  test('finds all downloads', async () => {
    let response = await request.get('/download');

    expect(response.status).toEqual(200);
    expect(response.body[0].buyer).toEqual('Ricky');
    expect(response.body[0].quantity).toEqual(3);
    expect(response.body[0].selection).toEqual('game');
  });


  test('finds a single item', async () => {

    let response = await request.get('/item/1');

    expect(response.body.buyer).toEqual('Zozu');
    expect(response.body.quantity).toEqual(2);
    expect(response.body.selection).toEqual('boots');
  });


  test('finds a single download', async () => {

    let response = await request.get('/download/1');

    expect(response.body.buyer).toEqual('Ricky');
    expect(response.body.quantity).toEqual(3);
    expect(response.body.selection).toEqual('game');
  });


  test('deletes a single item', async () => {
    await request.delete('/item/1');

    let response = await request.get('/item');
    expect(response.body.length).toEqual(0)
    // expect(response.body[0].buyer).toEqual('Zozu-2');
    // expect(response.body[0].quantity).toEqual(2);
    // expect(response.body[0].selection).toEqual('boots');
  });


  test('deletes a single downloaded item', async () => {
    await request.delete('/download/1');

    let response = await request.get('/download');

    expect(response.body.length).toEqual(0)
    // expect(response.body.buyer).toEqual('Ricky');
    // expect(response.body.quantity).toEqual(3);
    // expect(response.body.selection).toEqual('game');
  });

});
