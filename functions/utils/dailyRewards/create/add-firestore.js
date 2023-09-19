const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

const {
    generateId,
    getResidual,
    getFixedResidual,
    calculateRoi
} = require("../calculate-roi.js");

const {
    addDailyResidualRecord,
} = require("./residual.js");


async function addDailyYieldRecord(user, tasa, rendimiento) {
    try {
        //get the corresponding residual
        const redisual = getResidual(rendimiento)

        const monetization = user?.fixedMonetization ? 'variable' : 'fixed';

        const data = {
            investment: user?.Applied,
            date: Date.now(),
            tasa: tasa,
            rendimiento: rendimiento,
            residual: redisual,
            id: generateId(),
            username: user?.username,
            userId: user?.userId,
            monetization: monetization,
            referralBy: user?.referral?.referrerBy || '',
        };

        // Creates the document in the residual history collection 
        await addDailyResidualRecord(data, user)

        return db
            .collection('b-history')
            .add(data)
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


async function addFixedDailyYieldRecord(user) {
    try {
        const initialInvestment = user?.Applied;
        const tasa = 0.018;
        const rendimiento = calculateRoi(initialInvestment, tasa)
        const redisual = getFixedResidual(rendimiento)

        const monetization = user?.fixedMonetization ? 'variable' : 'fixed';

        const data = {
            investment: user?.Applied,
            date: Date.now(),
            tasa: tasa,
            rendimiento: rendimiento,
            residual: redisual,
            id: generateId(),
            username: user?.username,
            userId: user?.userId,
            monetization: monetization,
            referralBy: user?.referral?.referrerBy || '',
        };

        // Creates the document in the residual history collection 
        await addDailyResidualRecord(data, user)

        return db
            .collection('b-history')
            .add(data)
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
    addDailyYieldRecord,
    addFixedDailyYieldRecord
};