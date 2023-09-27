
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


const {
    BuyTickets,
    BuyTicketsV2,
} = require('./utils/scheduled-functions.js');

const db = admin.firestore();


exports.BuyTickets = BuyTickets; 
exports.BuyTicketsV2 = BuyTicketsV2; 


