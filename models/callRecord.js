const mongodb = require('mongodb');
const getDB = require('../util/database').getDb;


class CallRecord {
    constructor(source, sourceLocation, destination, destinationLocation, callDuration, roaming, callCharge, id){
        this.source = source;
        this.sourceLocation = sourceLocation;
        this.destination = destination;
        this.destinationLocation = destinationLocation;
        this.callDuration = callDuration;
        this.roaming = roaming;
        this.callCharge = callCharge;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save(){
        const db = getDB();
        let dbOp;
        if(this._id){
            dbOp = db.collection('callRecords').
                        updateOne({_id: this._id},{$set: this});
        }else{
            dbOp = db.collection('callRecords').insertOne(this);            
        }
        return dbOp
                .then(result => {
                    console.log(result);
                }).catch(err => {
                    console.log(err);
                });
    }

    static fetchAll(){
        const db = getDB();
        return db   
            .collection('callRecords')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(callRecordId){
        const db = getDB();
        return db.collection('callRecords')
            .find({_id: new mongodb.ObjectId(callRecordId)})
            .next()
            .then(callRecords =>{
                console.log(callRecords);
                return callRecords;
            }).catch(err => {
                console.log(err);
            });
    }

    static deleteById(callRecordId){
        const db = getDB();
        return db.collection('callRecords').deleteOne({_id: new mongodb.ObjectId(callRecordId)})
                .then(result => {
                    console.log("Deleted...");
                })
                .catch(err => {
                    console.log(err);
                });
    }
}

module.exports = CallRecord;