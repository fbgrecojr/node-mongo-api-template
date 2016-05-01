import bunyan from 'bunyan';
import path from 'path';

let projectName;
const defaultLevel = 'info';

try {
    projectName = require(path.join(path.dirname(require.main.filename), 'package.json')).name;
}
catch (exception) {
    projectName = 'unknown';
}

const log = bunyan.createLogger({
    name: projectName,
    streams: [{
        level: defaultLevel,
        stream: process.stdout
    }]
});

// Adding custom level function so you don't have to specify stream outside module.
log.setLevel = level => {
    log.levels(0, level);
    log.info('Logging level overridden, logging level set to ' + level);
};

log.info(`Created new logger for ${projectName} with logging level ${defaultLevel}`);

export default log;
