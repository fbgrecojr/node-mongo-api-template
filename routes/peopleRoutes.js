import code from 'http-response-codes';
import express from 'express';
import Mongo from '../controllers/mongo.js';
import validator from '../validation/validator.js';

const mongoDriver = process.env.MODE === 'TESTING' ? new Mongo() : new Mongo('people', 'people');
const router = express.Router();

router.route('/')
  .get((req, res) => {
      const startConnection = new Date().getTime();
      res.set('Content-Type', 'application/json');
      res.set('Access-Control-Allow-Origin', '*'); //replace '*' with the proper application domain
      mongoDriver.getAll((err, result) => {
          const endConnection = new Date().getTime();
          req.log.info({
              connectionTime: (endConnection - startConnection),
              httpResponseCode: res.statusCode
          }, 'Request completed');
          if (err) {
              res.sendStatus(code.HTTP_INTERNAL_SERVER_ERROR);
          } else if (result.length === 0) {
              res.sendStatus(code.HTTP_NO_CONTENT);
          } else {
              res.status(code.HTTP_OK).send(JSON.stringify(result));
          }
      });
  })
  .post((req, res) => {
      const startConnection = new Date().getTime();
      res.set('Content-Type', 'application/json');
      validator(req.body, false, (err, response) => {
          if (err) {
              res.sendStatus(code.HTTP_BAD_REQUEST);
          } else {
              mongoDriver.insertOne(response, (err, result) => {
                  const endConnection = new Date().getTime();
                  req.log.info({
                      connectionTime: (endConnection - startConnection),
                      httpResponseCode: res.statusCode
                  }, 'Request completed');
                  if (err) {
                      res.sendStatus(code.HTTP_INTERNAL_SERVER_ERROR);
                  } else {
                      res.location('/${result_id}');
                      res.status(code.HTTP_CREATED).send(JSON.stringify(result));
                  }
              });
          }
      });
  })
  .delete((req, res) => {
      const startConnection = new Date().getTime();
      res.set('Content-Type', 'application/json');
      mongoDriver.deleteAll((err, result) => {
          const endConnection = new Date().getTime();
          req.log.info({
              connectionTime: (endConnection - startConnection),
              httpResponseCode: res.statusCode
          }, 'Request completed');
          if (err) {
              res.sendStatus(code.HTTP_INTERNAL_SERVER_ERROR);
          } else {
              res.status(code.HTTP_NO_CONTENT).send(JSON.stringify(result));
          }
      });
  });

export default router;
