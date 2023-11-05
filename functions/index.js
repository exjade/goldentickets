
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


const {
    BuyTicketsV3,
    BuyTicketsBETAV14,
    WeeklyBuyTicketsBETAV3
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
    generateDailyCodeV5,
    generateIndidualSellerCodeV1,
} = require('./utils/scheduled-functions/create/generate-daily-code');


const db = admin.firestore();

// Buy tickets
exports.BuyTicketsV3 = BuyTicketsV3;
exports.BuyTicketsBETAV14 = BuyTicketsBETAV14;
//Sorteos
exports.sorteoAutomaticoDolarHoraV3 = sorteoAutomaticoDolarHoraV3;
exports.sorteoAutomaticoDolarHoraV6 = sorteoAutomaticoDolarHoraV6;
// Delete booked tickets
exports.DeleteReservedTickets = DeleteReservedTickets;
exports.WeeklyDeleteReservedTickets = WeeklyDeleteReservedTickets;
// Cron job: Weekly lotto
exports.WeeklyBuyTicketsBETAV3 = WeeklyBuyTicketsBETAV3;
exports.WeeklySorteoAutomaticoDolarHoraV3 = WeeklySorteoAutomaticoDolarHoraV3;
// Track referral users
exports.trackReferrals = trackReferrals;
exports.trackReferralsV7 = trackReferralsV7;
// Generate seller code
exports.generateDailyCodeV5 = generateDailyCodeV5;
exports.generateIndidualSellerCodeV1 = generateIndidualSellerCodeV1;



