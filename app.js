import bodyParser from 'body-parser';
import express from 'express';
import log from './logger/logger.js';
import memwatch from 'memwatch-next';
import peopleRouter from './routes/peopleRoutes.js';
import personRouter from './routes/personRoutes.js';

const app = express();

//watch for memory leaks
memwatch.on('leak', info => {
    log.warn(info, 'Memory leak was detected');
});

//log incoming request
app.use((req, res, next) => {
    req.log = log.child({
        requestPath: req.url,
        httpVerb: req.method,
        params: req.params
    });
    req.log.info('Request received');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router
app.use('/people', peopleRouter);
app.use('/person', personRouter);

app.use((req, res, next) => {
    const err = new Error('InvalidUri or InvalidHttpVerb');
    err.status = 400;
    next(err);
}, (err, req, res, next) => {
    req.log.error(err);
    res.status(err.status || 500).end();
    next();
});

export default app;
