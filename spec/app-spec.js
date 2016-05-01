import bodyParser from 'body-parser';
import express from 'express';
import log from '../logger/logger.js';
import peopleRouter from '../routes/peopleRoutes.js';
import personRouter from '../routes/personRoutes.js';
import request from 'supertest';
import swagger from '../swagger.json';
import SwaggerValidator from 'swagger-model-validator';
import _ from 'underscore';

const app = express();
const swaggerValidator = new SwaggerValidator();

app.use((req, res, next) => {
    req.log = log;
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/people', peopleRouter);
app.use('/person', personRouter);

describe('integration tests', () => {
    let data = {
        first: 'Sonia',
        last: 'Albrecht',
        pictureFileName: 'alb3498.png',
        department: 'Marketing',
        email: 'soniaalbrecht@northwesternmutual.com',
        phone: '414-665-4293',
        manager: 'gre4782',
        location: 'VB06'
    };
    it('should add a person to the database with generated ID', done => {
        request(app)
            .post('/people')
            .send(data)
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                // Verify that all properties match swagger schema and no extra properties are present
                swagger.definitions.Person.required = _.keys(swagger.definitions.Person.properties);
                const validation = swaggerValidator.validate(res.body, swagger.definitions.Person, null, true, true);
                if (!validation.valid) {
                    console.log(validation.GetFormattedErrors());
                }
                expect(validation.valid).toBe(true);
                done();
            });
    });
    it('should add a person to the database with custom ID', done => {
        data._id = '12345';
        request(app)
            .post('/people')
            .send(data)
            .expect(201)
            .expect('Content-Type', /json/)
            //.expect('location', '/12345')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                // Verify that all properties match swagger schema and no extra properties are present
                swagger.definitions.Person.required = _.keys(swagger.definitions.Person.properties);
                const validation = swaggerValidator.validate(res.body, swagger.definitions.Person, null, true, true);
                if (!validation.valid) {
                    console.log(validation.GetFormattedErrors());
                }
                expect(validation.valid).toBe(true);
                done();
            });
    });
    it('should give an error when adding a person with invalid data', done => {
        Reflect.deleteProperty(data, 'first');
        request(app)
            .post('/people')
            .send(data)
            .expect(400)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should retrieve all people in the database', done => {
        request(app)
            .get('/people')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.body.forEach(person => {
                    // Verify that all properties match swagger schema and no extra properties are present
                    swagger.definitions.Person.required = _.keys(swagger.definitions.Person.properties);
                    const validation = swaggerValidator.validate(person, swagger.definitions.Person, null, true, true);
                    if (!validation.valid) {
                        console.log(validation.GetFormattedErrors());
                    }
                    expect(validation.valid).toBe(true);
                });
                done();
            });
    });
    it('should retrieve all person by ID', done => {
        request(app)
            .get('/person/12345')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                // Verify that all properties match swagger schema and no extra properties are present
                swagger.definitions.Person.required = _.keys(swagger.definitions.Person.properties);
                const validation = swaggerValidator.validate(res.body, swagger.definitions.Person, null, true, true);
                if (!validation.valid) {
                    console.log(validation.GetFormattedErrors());
                }
                expect(validation.valid).toBe(true);
                done();
            });
    });
    it('should not find person for ID that doesn\'t exist', done => {
        request(app)
            .get('/person/123456')
            .expect(204)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should update person by ID', done => {
        request(app)
            .post('/person/12345')
            .send({first: 'frank'})
            .expect(200)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should delete person by ID', done => {
        request(app)
            .delete('/person/12345')
            .expect(204)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should delete all people', done => {
        request(app)
            .delete('/people')
            .expect(204)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should retrieve no people', done => {
        request(app)
            .get('/people')
            .expect(204)
            .end(err => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});
