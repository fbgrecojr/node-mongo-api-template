import code from 'http-response-codes';
import express from 'express';
import Mongo from '../controllers/mongo.js';
import validator from '../validation/validator.js';

const mongoDriver = process.env.MODE === 'TESTING' ? new Mongo() : new Mongo('people', 'people');
const router = express.Router();

router.route('/:id')
  .get((req, res) => {
      const startConnection = new Date().getTime();
      res.set('Content-Type', 'application/json');
      res.set('Access-Control-Allow-Origin', '*'); //replace '*' with the proper application domain
      mongoDriver.getOne(req.params.id, (err, result) => {
          const endConnection = new Date().getTime();
          req.log.info({
              connectionTime: (endConnection - startConnection),
              httpResponseCode: res.statusCode
          }, 'Request completed');
          if (err) {
              res.sendStatus(code.HTTP_INTERNAL_SERVER_ERROR);
          } else if (!result) {
              res.sendStatus(code.HTTP_NO_CONTENT);
          } else {
              res.status(code.HTTP_OK).send(JSON.stringify(result));
          }
      });
  })
  .post((req, res) => {
      const startConnection = new Date().getTime();
      res.set('Content-Type', 'application/json');
      validator(req.body, true, (err, response) => {
          if (err) {
              res.sendStatus(code.HTTP_BAD_REQUEST);
          } else {
              mongoDriver.updateOne(req.params.id, response, (err, result) => {
                  const endConnection = new Date().getTime();
                  req.log.info({
                      connectionTime: (endConnection - startConnection),
                      httpResponseCode: res.statusCode
                  }, 'Request completed');
                  if (err) {
                      res.sendStatus(code.HTTP_INTERNAL_SERVER_ERROR);
                  } else if (!result) {
                      res.sendStatus(code.HTTP_BAD_REQUEST);
                  } else {
                      res.sendStatus(code.HTTP_OK);
                  }
              });
          }
      });
  })
  .delete((req, res) => {
      const startConnection = new Date().getTime();
      res.set('Content-Type', 'application/json');
      mongoDriver.deleteOne(req.params.id, (err, result) => {
          const endConnection = new Date().getTime();
          req.log.info({
              connectionTime: (endConnection - startConnection),
              httpResponseCode: res.statusCode
          }, 'Request completed');
          if (err) {
              res.sendStatus(code.HTTP_INTERNAL_SERVER_ERROR);
          } else if (!result) {
              res.sendStatus(code.HTTP_BAD_REQUEST);
          } else {
              res.sendStatus(code.HTTP_NO_CONTENT);
          }
      });
  });

export default router;
