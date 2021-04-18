const mongodb = require('mongodb');
const path = require('path');
const CallRecord = require("../models/callRecord");

const express = require('express');

const router = express.Router();


router.get('/callRecords', (req, res, next) => {
    CallRecord.fetchAll()
        .then(callRecords => {
                res.render('callRecords-list', {
                callRecords: callRecords,
                pageTitle: 'All CallRecords',
                path: '/callRecords'
            });
        })
        .catch(err => {
            console.log(err);
        });
});


router.get('/', (req, res, next) => {
    res.render('add-callRecord', {
      pageTitle: 'Add Call Record',
      path: '/'
    });
  });



router.post('/add-callRecord', (req, res, next) => {
    const source = req.body.source;
    const sourceLocation = req.body.sourceLocation;
    const destination = req.body.destination;
    const destinationLocation = req.body.destinationLocation;
    const callDuration = req.body.callDuration;
    const roaming = req.body.roaming;
    const callCharge = req.body.callCharge;


    const product = new CallRecord(source, sourceLocation, destination, destinationLocation, callDuration, roaming, callCharge);
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created CallRecord');
            res.redirect('/callRecords');
        })
        .catch(err => {
            console.log(err);
        });
  });


  router.get('/edit-callRecord/:callRecordId', (req, res, next) => {
      const callRecordId = req.params.callRecordId;
      CallRecord.findById(callRecordId)
        .then(callRecord =>{
            if(!callRecord){
                return res.redirect('/');
            }
            res.render('edit-callRecord', {
                pageTitle: 'Edit Call Record',
                path: '/edit-callRecord',
                cr: callRecord
                });
        }).catch(err => {
            console.log(err);
        });
    
  });

  router.post('/edit-callRecord', (req, res, next) => {
      const callRecordId = req.body.callRecordId;
      const source = req.body.source;
      const sourceLocation = req.body.sourceLocation;
      const destination = req.body.destination;
      const destinationLocation = req.body.destinationLocation;
      const callDuration = req.body.callDuration;
      const roaming = req.body.roaming;
      const callCharge = req.body.callCharge;

      const callRec = new CallRecord(source, sourceLocation, destination, 
                destinationLocation, callDuration, roaming, callCharge, callRecordId);

      callRec
        .save()
        .then(result => {
            console.log("Updating the CallRecord...");
            res.redirect('/callRecords');
        })
        .catch(err => {
            console.log(err);
        });
  });


  router.post('/delete-callRecord', (req, res, next) => {
    const callRecordId = req.body.callRecordId;
    CallRecord.deleteById(callRecordId)
        .then(() => {
            console.log("Deleting the CallRecord...");
            res.redirect('/callRecords');
        }).catch(err => {
            console.log(err);
        });
  });



module.exports = router;