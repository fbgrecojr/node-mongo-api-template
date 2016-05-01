import {
  department,
  email,
  first,
  id,
  last,
  location,
  manager,
  phone,
  pictureFileName
} from './rules.js';
import async from 'async';

const isNew = (data, tasks, callback) => {
    if (!data._id) {
        Reflect.deleteProperty(tasks, '_id');
    }
    return callback(null, tasks);
};

const isUpdate = (data, tasks, callback) => {
    if (data.id) {
        return callback({message: 'cannot modify the id field'});
    }
    Reflect.deleteProperty(tasks, '_id');
    //almost everything is optional when doing an update so only keep the pending validation calls for the paramters that do
    if (!data.first) {
        Reflect.deleteProperty(tasks, 'first');
    }
    if (!data.last) {
        Reflect.deleteProperty(tasks, 'last');
    }
    if (!data.pictureFileName) {
        Reflect.deleteProperty(tasks, 'pictureFileName');
    }
    if (!data.department) {
        Reflect.deleteProperty(tasks, 'department');
    }
    if (!data.email) {
        Reflect.deleteProperty(tasks, 'email');
    }
    if (!data.phone) {
        Reflect.deleteProperty(tasks, 'phone');
    }
    if (!data.manager) {
        Reflect.deleteProperty(tasks, 'manager');
    }
    if (!data.location) {
        Reflect.deleteProperty(tasks, 'location');
    }
    return callback(null, tasks);
};

export default function validate(data, update, callback) {

    const tasks = {
        _id: callback => {
            id(data._id, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        },
        first: callback => {
            first(data.first, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        },
        last: callback => {
            last(data.last, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        },
        pictureFileName: callback => {
            pictureFileName(data.pictureFileName, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        },
        department: callback => {
            department(data.department, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        },
        email: callback => {
            email(data.email, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        },
        phone: callback => {
            phone(data.phone, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        },
        manager: callback => {
            manager(data.manager, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        },
        location: callback => {
            location(data.location, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        }
    };

    if (!update) {
        isNew(data, tasks, (err, result) => {
            if (err) {
                return callback(err);
            }
            async.parallel(result, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        });
    } else {
        isUpdate(data, tasks, (err, result) => {
            if (err) {
                return callback(err);
            }
            async.parallel(result, (err, result) => {
                return callback(err ? err : null, err ? null : result);
            });
        });
    }
}
