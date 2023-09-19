const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

const {
    generateId,
} = require("../calculate-roi.js");


async function addDailyResidualRecord(data, user, ) {
    try {
        const residual = {
            investment: data?.investment,
            date: data.date,
            tasa: data.tasa,
            rendimiento: data.rendimiento,
            residual: data.residual,
            id: generateId(),
            username: user?.username,
            userId: user?.userId,
            monetization: data.monetization,
            referralBy: user?.referral?.referrerBy || '',
        };

        return db
            .collection('residual-history')
            .add(residual)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addDailyResidualRecord,
};