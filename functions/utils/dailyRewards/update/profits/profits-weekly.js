const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();


//===================================  BRONZE =================================================== //
//===================================  INVESTMENT 1 - 50 ======================================== //

async function handleProfitBronze(user, doc, rendimiento) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 1 && applied < 50 && profit < 200 / 100 * parseInt(applied)

        const variableProfit = (parseFloat(user?.Profit) + parseFloat(rendimiento)) - parseFloat(user?.Profit);

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: variableProfit,
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleProfitBronzeFixed(user, doc) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 1 && applied < 50 && profit < 200 / 100 * parseInt(applied)

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: parseFloat(user?.Profit) + 1.8 / 100 * parseInt(applied),
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}

//===================================  STARTER ==================================================== //
//===================================  INVESTMENT 50 - 100 ======================================== //


async function handleProfitStarter(user, doc, rendimiento) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 50 && applied < 100 && profit < 200 / 100 * parseInt(applied)

        const variableProfit = (parseFloat(user?.Profit) + parseFloat(rendimiento)) - parseFloat(user?.Profit);

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: variableProfit,
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleProfitStarterFixed(user, doc) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 50 && applied < 100 && profit < 200 / 100 * parseInt(applied)

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: parseFloat(user?.Profit) + 1.8 / 100 * parseInt(applied),
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}
//===================================  INITIAL ===================================================== //
//===================================  INVESTMENT 100 - 250 ======================================== //


async function handleProfitInitial(user, doc, rendimiento) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 100 && applied < 250 && profit < 200 / 100 * parseInt(applied)

        const variableProfit = (parseFloat(user?.Profit) + parseFloat(rendimiento)) - parseFloat(user?.Profit);

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: variableProfit,
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleProfitInitialFixed(user, doc) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 100 && applied < 250 && profit < 200 / 100 * parseInt(applied)

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: parseFloat(user?.Profit) + 1.8 / 100 * parseInt(applied),
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}
//===================================  TAIL ===================================================== //
//===================================  INVESTMENT 250 - 1000 ===================================== //


async function handleProfitTail(user, doc, rendimiento) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 250 && applied < 1000 && profit < 200 / 100 * parseInt(applied)

        const variableProfit = (parseFloat(user?.Profit) + parseFloat(rendimiento)) - parseFloat(user?.Profit);

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: variableProfit,
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleProfitTailFixed(user, doc) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 250 && applied < 1000 && profit < 200 / 100 * parseInt(applied)

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: parseFloat(user?.Profit) + 1.8 / 100 * parseInt(applied),
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}
//===================================  Gold ===================================================== //
//===================================  INVESTMENT 1000 - 5000 ==================================== //


async function handleProfitGold(user, doc, rendimiento) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 1000 && applied < 5000 && profit < 200 / 100 * parseInt(applied)

        const variableProfit = (parseFloat(user?.Profit) + parseFloat(rendimiento)) - parseFloat(user?.Profit);

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: variableProfit,
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleProfitGoldFixed(user, doc) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 1000 && applied < 5000 && profit < 200 / 100 * parseInt(applied)

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: parseFloat(user?.Profit) + 1.8 / 100 * parseInt(applied),
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}
//===================================  Premium ===================================================== //
//===================================  INVESTMENT 5000 - 10000 ===================================== //


async function handleProfitPremium(user, doc, rendimiento) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 5000 && applied < 10000 && profit < 200 / 100 * parseInt(applied)

        const variableProfit = (parseFloat(user?.Profit) + parseFloat(rendimiento)) - parseFloat(user?.Profit);

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: variableProfit,
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleProfitPremiumFixed(user, doc) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 5000 && applied < 10000 && profit < 200 / 100 * parseInt(applied)

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: parseFloat(user?.Profit) + 1.8 / 100 * parseInt(applied),
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}
//===================================  Diamond ===================================================== //
//===================================  INVESTMENT 10000 - 100000 =================================== //


async function handleProfitDiamond(user, doc, rendimiento) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 10000 && applied < 100000 && profit < 200 / 100 * parseInt(applied)

        const variableProfit = (parseFloat(user?.Profit) + parseFloat(rendimiento)) - parseFloat(user?.Profit);

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: variableProfit,
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}

async function handleProfitDiamondFixed(user, doc) {
    try {
        let applied = user?.Applied;
        let profit = user?.Profit;

        const limitContract = applied >= 10000 && applied < 100000 && profit < 200 / 100 * parseInt(applied)

        const batch = db.batch();

        if (limitContract) {
            var sfRef = db.collection('users')
                .doc(doc.id);
            batch.update(sfRef, {
                Profit: parseFloat(user?.Profit) + 1.8 / 100 * parseInt(applied),
                lastProfitUpdate: Date.now()
            });
            return batch.commit();
        } else {
            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    // 1 - 50 USD
    handleProfitBronze, 
    handleProfitBronzeFixed, 
    // 50 - 100 USD
    handleProfitStarter,
    handleProfitStarterFixed,
    // 100 - 250 USD
    handleProfitInitial,
    handleProfitInitialFixed,
    // 250 - 1000 USD
    handleProfitTail,
    handleProfitTailFixed,
    // 1000 - 5000 USD
    handleProfitGold,
    handleProfitGoldFixed,
    // 5000 - 10000 USD
    handleProfitPremium,
    handleProfitPremiumFixed,
    // 10000- 100000 USD
    handleProfitDiamond,
    handleProfitDiamondFixed,
};
