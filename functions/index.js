
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


const {
    BuyTicketsV3,
} = require('./utils/http-functions.js');
const {
    sorteoAutomaticoDolarHoraV3,
} = require('./utils/scheduled-functions/Sorteo-dolar/sorteoAutomatico');

const db = admin.firestore();


exports.BuyTicketsV3 = BuyTicketsV3; 
exports.sorteoAutomaticoDolarHoraV3 = sorteoAutomaticoDolarHoraV3; 


