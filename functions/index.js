
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


const {
    BuyTicketsV3,
    BuyTicketsBETAV14,
    WeeklyBuyTicketsBETAV1
} = require('./utils/http-functions.js');

const {
    sorteoAutomaticoDolarHoraV3,
    sorteoAutomaticoDolarHoraV6,
    WeeklySorteoAutomaticoDolarHoraV3
} = require('./utils/scheduled-functions/Sorteo-dolar/sorteoAutomatico');
const {
    DeleteReservedTickets,
    WeeklyDeleteReservedTickets,
} = require('./utils/scheduled-functions/delete/delete-bookingtickets');
const {
    trackReferrals,
    trackReferralsV7
} = require('./utils/scheduled-functions/update/track-referrals');

const {
    generateDailyCodeV4
} = require('./utils/scheduled-functions/create/generate-daily-code');


const db = admin.firestore();


exports.BuyTicketsV3 = BuyTicketsV3;
exports.BuyTicketsBETAV14 = BuyTicketsBETAV14;
exports.sorteoAutomaticoDolarHoraV3 = sorteoAutomaticoDolarHoraV3;
exports.sorteoAutomaticoDolarHoraV6 = sorteoAutomaticoDolarHoraV6;
exports.DeleteReservedTickets = DeleteReservedTickets;
// Weekly lotto
exports.WeeklyBuyTicketsBETAV1 = WeeklyBuyTicketsBETAV1;
exports.WeeklyDeleteReservedTickets = WeeklyDeleteReservedTickets;
exports.WeeklySorteoAutomaticoDolarHoraV3 = WeeklySorteoAutomaticoDolarHoraV3;
// Track referral users
exports.trackReferrals = trackReferrals;
exports.trackReferralsV7 = trackReferralsV7;
// Generate seller code
exports.generateDailyCodeV4 = generateDailyCodeV4;



