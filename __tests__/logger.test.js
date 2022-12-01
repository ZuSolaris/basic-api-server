'use strict';

const logger = require('../src/middleware/logger');

describe('Logger middleware', () => {
  let consoleCheck;
  let req = {};
  let res = {};
  let next = jest.fn();
  beforeEach(() => {

    consoleCheck = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleCheck.mockRestore();
  });
it('adds a timestamp', () =>{
  logger(req, res, next);
  expect(req.timestamp).toBeTruthy();
  expect(req.timestamp).toBeInstanceOf(Date);
  expect(typeof(req.timestamp)).toEqual('object');
})

  it('No errors in the logger', () => {
    logger(req, res, next);
    expect(consoleCheck).toHaveBeenCalledWith('logged at:', req.timestamp);
  });
it('calls next as expected', () => {
  logger(req, res, next)
  expect(next).toHaveBeenCalledWith();
});
});



