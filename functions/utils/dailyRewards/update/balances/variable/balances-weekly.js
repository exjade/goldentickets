const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

const {
    calculateRoi,
    getRandomTasa,
} = require("../../../calculate-roi.js");

const {
    addDailyYieldRecord
} = require("../../../create/add-firestore.js");


//=========== INVESTMENT 1 - 50 ================//

async function handleVariableBalanceBronze(user, doc) {
    try {
        let applied = user.Applied;
        let profit = user.Profit;
        const initialInvestment = user.Applied;

        const limitContract = applied >= 1 && applied < 50 && parseInt(profit) < 200 / 100 * parseInt(applied);

        const tasa = getRandomTasa(0.002, 0.015);
        const dailyRoi = calculateRoi(initialInvestment, tasa);

        const batch = db.batch();
        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Balance: parseFloat(user?.Balance) + parseFloat(dailyRoi),
                lastBalanceUpdate: Date.now()
            });

            // CREATE HISTORICAL PAYMENT HISTORY
            await addDailyYieldRecord(user, tasa, dailyRoi)

            return batch.commit();
        } else {
            console.log(
                `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
            );
        }

    } catch (error) {
        console.log(error)
    }
}

//=========== INVESTMENT 50 - 100 ================//
async function handleVariableBalanceStarter(user, doc) {
    try {
        let applied = user.Applied;
        let profit = user.Profit;
        const initialInvestment = user.Applied;

        const limitContract = applied >= 50 && applied < 100 && parseInt(profit) < 200 / 100 * parseInt(applied);

        const tasa = getRandomTasa(0.002, 0.015);
        const dailyRoi = calculateRoi(initialInvestment, tasa);

        const batch = db.batch();
        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Balance: parseFloat(user?.Balance) + parseFloat(dailyRoi),
                lastBalanceUpdate: Date.now()
            });

            // CREATE HISTORICAL PAYMENT HISTORY
            await addDailyYieldRecord(user, tasa, dailyRoi)

            return batch.commit();
        } else {
            console.log(
                `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
            );
        }

    } catch (error) {
        console.log(error)
    }
}

//=========== INVESTMENT 100 - 250 ================//
async function handleVariableBalanceInitial(user, doc) {
    try {
        let applied = user.Applied;
        let profit = user.Profit;
        const initialInvestment = user.Applied;

        const limitContract = applied >= 100 && applied < 250 && parseInt(profit) < 200 / 100 * parseInt(applied);

        const tasa = getRandomTasa(0.002, 0.015);
        const dailyRoi = calculateRoi(initialInvestment, tasa);

        const batch = db.batch();
        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Balance: parseFloat(user?.Balance) + parseFloat(dailyRoi),
                lastBalanceUpdate: Date.now()
            });

            // CREATE HISTORICAL PAYMENT HISTORY
            await addDailyYieldRecord(user, tasa, dailyRoi)

            return batch.commit();
        } else {
            console.log(
                `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
            );
        }

    } catch (error) {
        console.log(error)
    }
}
//=========== INVESTMENT 250 - 1000 ================//
async function handleVariableBalanceTail(user, doc) {
    try {
        let applied = user.Applied;
        let profit = user.Profit;
        const initialInvestment = user.Applied;

        const limitContract = applied >= 250 && applied < 1000 && parseInt(profit) < 200 / 100 * parseInt(applied);

        const tasa = getRandomTasa(0.002, 0.015);
        const dailyRoi = calculateRoi(initialInvestment, tasa);

        const batch = db.batch();
        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Balance: parseFloat(user?.Balance) + parseFloat(dailyRoi),
                lastBalanceUpdate: Date.now()
            });

            // CREATE HISTORICAL PAYMENT HISTORY
            await addDailyYieldRecord(user, tasa, dailyRoi)

            return batch.commit();
        } else {
            console.log(
                `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
            );
        }

    } catch (error) {
        console.log(error)
    }
}
//=========== INVESTMENT 1000 - 5000 ================//
async function handleVariableBalanceGold(user, doc) {
    try {
        let applied = user.Applied;
        let profit = user.Profit;
        const initialInvestment = user.Applied;

        const limitContract = applied >= 1000 && applied < 5000 && parseInt(profit) < 200 / 100 * parseInt(applied);

        const tasa = getRandomTasa(0.002, 0.015);
        const dailyRoi = calculateRoi(initialInvestment, tasa);

        const batch = db.batch();
        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Balance: parseFloat(user?.Balance) + parseFloat(dailyRoi),
                lastBalanceUpdate: Date.now()
            });

            // CREATE HISTORICAL PAYMENT HISTORY
            await addDailyYieldRecord(user, tasa, dailyRoi)

            return batch.commit();
        } else {
            console.log(
                `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
            );
        }

    } catch (error) {
        console.log(error)
    }
}
//=========== INVESTMENT 5000 - 10000 ================//
async function handleVariableBalancePremium(user, doc) {
    try {
        let applied = user.Applied;
        let profit = user.Profit;
        const initialInvestment = user.Applied;

        const limitContract = applied >= 5000 && applied < 10000 && parseInt(profit) < 200 / 100 * parseInt(applied);

        const tasa = getRandomTasa(0.002, 0.015);
        const dailyRoi = calculateRoi(initialInvestment, tasa);

        const batch = db.batch();
        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Balance: parseFloat(user?.Balance) + parseFloat(dailyRoi),
                lastBalanceUpdate: Date.now()
            });

            // CREATE HISTORICAL PAYMENT HISTORY
            await addDailyYieldRecord(user, tasa, dailyRoi)

            return batch.commit();
        } else {
            console.log(
                `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
            );
        }

    } catch (error) {
        console.log(error)
    }
}
//=========== INVESTMENT 10000 - 100000 ================//
async function handleVariableBalanceDiamond(user, doc) {
    try {
        let applied = user.Applied;
        let profit = user.Profit;
        const initialInvestment = user.Applied;

        const limitContract = applied >= 10000 && applied < 100000 && parseInt(profit) < 200 / 100 * parseInt(applied);

        const tasa = getRandomTasa(0.002, 0.015);
        const dailyRoi = calculateRoi(initialInvestment, tasa);

        const batch = db.batch();
        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Balance: parseFloat(user?.Balance) + parseFloat(dailyRoi),
                lastBalanceUpdate: Date.now()
            });

            // CREATE HISTORICAL PAYMENT HISTORY
            await addDailyYieldRecord(user, tasa, dailyRoi)

            return batch.commit();
        } else {
            console.log(
                `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
            );
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleVariableBalanceBronze, // 1 - 50 USD
    handleVariableBalanceStarter, // 50 - 100 USD
    handleVariableBalanceInitial, // 100 - 250 USD
    handleVariableBalanceTail, // 250 - 1000 USD
    handleVariableBalanceGold, // 1000 - 5000 USD
    handleVariableBalancePremium, // 5000 - 10000 USD
    handleVariableBalanceDiamond, // 10000 - 100000 USD
};
