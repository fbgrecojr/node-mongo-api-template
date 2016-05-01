import log from '../logger/logger.js';
import mongo from 'mongodb';

const {
	MongoClient,
	ObjectID
} = mongo;

export default class Mongo {
    constructor(db = 'test', collection = 'test') {
        this.db = db;
        this.collection = collection;
        this.url = `mongodb://localhost:27017/${this.db}`;
        log.info('new instance of Mongo created');
    }

    getOne(id, callback) {
        const self = this;
        MongoClient.connect(self.url, (err, db) => {
            if (err) {
                return callback(err);
            }
            db.collection(self.collection).findOne({_id: id}, (err, document) => {
                db.close();
                return callback(err ? err : null, err ? null : document);
            });
        });
    }

    getAll(callback) {
        const self = this;
        MongoClient.connect(self.url, (err, db) => {
            if (err) {
                return callback(err);
            }
            db.collection(self.collection).find({}).toArray((err, docs) => {
                db.close();
                return callback(err ? err : null, err ? null : docs);
            });
        });
    }

    insertOne(document, callback) {
        const self = this;
        document._id = document._id ? document._id : new ObjectID().toString();
        MongoClient.connect(self.url, (err, db) => {
            if (err) {
                return callback(err);
            }
            db.collection(self.collection).insertOne(document, (err, result) => {
                db.close();
                return callback(err ? err : null, err ? null : result.ops[0]);
            });
        });
    }

    updateOne(id, data, callback) {
        const self = this;
        MongoClient.connect(self.url, (err, db) => {
            if (err) {
                return callback(err);
            }
            db.collection(self.collection).updateOne({
                '_id': id
            }, {
                $set: data //things to update
            }, (err, result) => {
                db.close();
                return callback(err ? err : null, err ? null : result.result.n === 1);
            });
        });
    }

    deleteOne(id, callback) {
        const self = this;
        MongoClient.connect(self.url, (err, db) => {
            if (err) {
                return callback(err);
            }
            db.collection(self.collection).deleteOne({_id: id}, (err, result) => {
                db.close();
                return callback(err ? err : null, err ? null : result.result.n === 1);
            });
        });
    }

    deleteAll(callback) {
        const self = this;
        MongoClient.connect(self.url, (err, db) => {
            if (err) {
                return callback(err);
            }
            db.collection(self.collection).deleteMany({}, (err, result) => {
                db.close();
                return callback(err ? err : null, err ? null : result);
            });
        });
    }
}
