const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

const {
    addFixedDailyYieldRecord
} = require("../../../create/add-firestore.js");


//=========== INVESTMENT 1 - 50 ================//
async function handleFixedBalanceBronze(user, doc) {
    let applied = user.Applied;
    let profit = user.Profit;
    const limitContract = applied >= 1 && applied < 50 && parseInt(profit) < 200 / 100 * parseInt(applied)
    const rendimiento = 1.8 / 100 * parseInt(applied);

    const batch = db.batch();
    if (limitContract) {
        var sfRef = db.collection('users')
            .doc(doc.id);
        batch.update(sfRef, {
            Balance: parseFloat(user?.Balance) + parseFloat(rendimiento),
            lastBalanceUpdate: Date.now()
        });

        // CREATE HISTORICAL PAYMENT HISTORY
        await addFixedDailyYieldRecord(user)

        return batch.commit();
    } else {
        console.log(
            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
        );
    }
}
//=========== INVESTMENT 50 - 100 ================//
async function handleFixedBalanceStarter(user, doc) {
    let applied = user.Applied;
    let profit = user.Profit;
    const limitContract = applied >= 50 && applied < 100 && parseInt(profit) < 200 / 100 * parseInt(applied)
    const rendimiento = 1.8 / 100 * parseInt(applied);

    const batch = db.batch();
    if (limitContract) {
        var sfRef = db.collection('users')
            .doc(doc.id);
        batch.update(sfRef, {
            Balance: parseFloat(user?.Balance) + parseFloat(rendimiento),
            lastBalanceUpdate: Date.now()
        });

        // CREATE HISTORICAL PAYMENT HISTORY
        await addFixedDailyYieldRecord(user)

        return batch.commit();
    } else {
        console.log(
            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
        );
    }
}
//=========== INVESTMENT 100 - 250 ================//
async function handleFixedBalanceInitial(user, doc) {
    let applied = user.Applied;
    let profit = user.Profit;
    const limitContract = applied >= 100 && applied < 250 && parseInt(profit) < 200 / 100 * parseInt(applied)
    const rendimiento = 1.8 / 100 * parseInt(applied);

    const batch = db.batch();
    if (limitContract) {
        var sfRef = db.collection('users')
            .doc(doc.id);
        batch.update(sfRef, {
            Balance: parseFloat(user?.Balance) + parseFloat(rendimiento),
            lastBalanceUpdate: Date.now()
        });

        // CREATE HISTORICAL PAYMENT HISTORY
        await addFixedDailyYieldRecord(user)

        return batch.commit();
    } else {
        console.log(
            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
        );
    }
}
//=========== INVESTMENT 250 - 1000 ================//
async function handleFixedBalanceTail(user, doc) {
    let applied = user.Applied;
    let profit = user.Profit;
    const limitContract = applied >= 250 && applied < 1000 && parseInt(profit) < 200 / 100 * parseInt(applied)
    const rendimiento = 1.8 / 100 * parseInt(applied);

    const batch = db.batch();
    if (limitContract) {
        var sfRef = db.collection('users')
            .doc(doc.id);
        batch.update(sfRef, {
            Balance: parseFloat(user?.Balance) + parseFloat(rendimiento),
            lastBalanceUpdate: Date.now()
        });

        // CREATE HISTORICAL PAYMENT HISTORY
        await addFixedDailyYieldRecord(user)

        return batch.commit();
    } else {
        console.log(
            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
        );
    }
}
//=========== INVESTMENT 1000 - 5000 ================//
async function handleFixedBalanceGold(user, doc) {
    let applied = user.Applied;
    let profit = user.Profit;
    const limitContract = applied >= 1000 && applied < 5000 && parseInt(profit) < 200 / 100 * parseInt(applied)
    const rendimiento = 1.8 / 100 * parseInt(applied);

    const batch = db.batch();
    if (limitContract) {
        var sfRef = db.collection('users')
            .doc(doc.id);
        batch.update(sfRef, {
            Balance: parseFloat(user?.Balance) + parseFloat(rendimiento),
            lastBalanceUpdate: Date.now()
        });

        // CREATE HISTORICAL PAYMENT HISTORY
        await addFixedDailyYieldRecord(user)

        return batch.commit();
    } else {
        console.log(
            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
        );
    }
}
//=========== INVESTMENT 5000 - 10000 ================//
async function handleFixedBalancePremium(user, doc) {
    let applied = user.Applied;
    let profit = user.Profit;
    const limitContract = applied >= 5000 && applied < 10000 && parseInt(profit) < 200 / 100 * parseInt(applied)
    const rendimiento = 1.8 / 100 * parseInt(applied);

    const batch = db.batch();
    if (limitContract) {
        var sfRef = db.collection('users')
            .doc(doc.id);
        batch.update(sfRef, {
            Balance: parseFloat(user?.Balance) + parseFloat(rendimiento),
            lastBalanceUpdate: Date.now()
        });

        // CREATE HISTORICAL PAYMENT HISTORY
        await addFixedDailyYieldRecord(user)

        return batch.commit();
    } else {
        console.log(
            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
        );
    }
}
//=========== INVESTMENT 10000- 100000 ================//
async function handleFixedBalanceDiamond(user, doc) {
    let applied = user.Applied;
    let profit = user.Profit;
    const limitContract = applied >= 10000 && applied < 100000 && parseInt(profit) < 200 / 100 * parseInt(applied)
    const rendimiento = 1.8 / 100 * parseInt(applied);

    const batch = db.batch();
    if (limitContract) {
        var sfRef = db.collection('users')
            .doc(doc.id);
        batch.update(sfRef, {
            Balance: parseFloat(user?.Balance) + parseFloat(rendimiento),
            lastBalanceUpdate: Date.now()
        });

        // CREATE HISTORICAL PAYMENT HISTORY
        await addFixedDailyYieldRecord(user)

        return batch.commit();
    } else {
        console.log(
            `Balance: ${user?.Balance} exceeded contract limit, the ${user?.username} must renew his contract :(`
        );
    }
}

module.exports = {
    handleFixedBalanceBronze, // 1 - 50 USD
    handleFixedBalanceStarter, // 50 - 100 USD
    handleFixedBalanceInitial, // 100 - 250 USD
    handleFixedBalanceTail, // 250 - 1000 USD
    handleFixedBalanceGold, // 1000 - 5000 USD
    handleFixedBalancePremium, // 5000 - 10000 USD
    handleFixedBalanceDiamond, // 10000 - 100000 USD
};
