const shallowValidate = (data, callback) => {
    if (data === undefined) {
        return callback(new Error('field is undefined'));
    } else if (data === null) {
        return callback(new Error('field is null'));
    } else if (data.length <= 1) {
        return callback(new Error('field does not meet the minimum length requirement'));
    }
    return callback(null, data);
};

export function id(id, callback) {
    return shallowValidate(id, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function first(first, callback) {
    return shallowValidate(first, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function last(last, callback) {
    return shallowValidate(last, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function pictureFileName(path, callback) {
    return shallowValidate(path, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function department(dept, callback) {
    return shallowValidate(dept, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function email(email, callback) {
    return shallowValidate(email, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function phone(phone, callback) {
    return shallowValidate(phone, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function manager(manager, callback) {
    return shallowValidate(manager, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function location(location, callback) {
    return shallowValidate(location, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}
