
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


const {
    BuyTicketsV3,
    BuyTicketsBETAV14,
} = require('./utils/http-functions.js');

const {
    sorteoAutomaticoDolarHoraV3,
    sorteoAutomaticoDolarHoraV4,
} = require('./utils/scheduled-functions/Sorteo-dolar/sorteoAutomatico');
const {
    DeleteReservedTickets,
} = require('./utils/scheduled-functions/delete/delete-bookingtickets');

const db = admin.firestore();


exports.BuyTicketsV3 = BuyTicketsV3;
exports.BuyTicketsBETAV14 = BuyTicketsBETAV14;
exports.sorteoAutomaticoDolarHoraV3 = sorteoAutomaticoDolarHoraV3;
exports.sorteoAutomaticoDolarHoraV4 = sorteoAutomaticoDolarHoraV4;
exports.DeleteReservedTickets = DeleteReservedTickets;


