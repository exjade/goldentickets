
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


const {
    BuyTicketsV3,
} = require('./utils/scheduled-functions.js');

const db = admin.firestore();


exports.BuyTicketsV3 = BuyTicketsV3; 


