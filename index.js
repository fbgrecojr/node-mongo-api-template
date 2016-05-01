import app from './app.js';
import http from 'http';
import log from './logger/logger.js';

let httpListenerPort = 80;

// Override default ports when running on windows or mac
if (process.platform === 'darwin' || process.platform === 'win32') {
    httpListenerPort = 8080;
}

const httpServer = http.createServer(app).listen(httpListenerPort, () => {
    log.info(`app is listening at localhost: ${httpListenerPort}`);
});

process.on('SIGTERM', () => {
    httpServer.close(() => {
        log.info('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
});
