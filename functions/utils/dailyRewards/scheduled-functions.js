const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

const {
    handleVariableBalanceBronze, // 1-50 USD
    handleVariableBalanceStarter, // 50-100 USD
    handleVariableBalanceInitial, // 100-250 USD
    handleVariableBalanceTail, // 250-1000 USD
    handleVariableBalanceGold, // 1000-5000 USD
    handleVariableBalancePremium, // 5000-10000 USD
    handleVariableBalanceDiamond, // 10000-100000 USD
} = require("./update/balances/variable/balances-weekly.js");

const {
    handleFixedBalanceBronze,  // 1-50 USD
    handleFixedBalanceStarter, // 50-100 USD
    handleFixedBalanceInitial, // 100-250 USD
    handleFixedBalanceTail, // 250-1000 USD
    handleFixedBalanceGold, // 1000-5000 USD
    handleFixedBalancePremium, // 5000-10000 USD
    handleFixedBalanceDiamond, // 10000-100000 USD
} = require("./update/balances/fixed/fixed-balances-weekly.js");

const {
    //1-50 USD
    handleProfitBronze,
    handleProfitBronzeFixed,
    //50-100 USD
    handleProfitStarter,
    handleProfitStarterFixed,
    //100-250 USD
    handleProfitInitial,
    handleProfitInitialFixed,
    //250-1000 USD
    handleProfitTail,
    handleProfitTailFixed,
    //1000-5000 USD
    handleProfitGold,
    handleProfitGoldFixed,
    //5000-10000 USD
    handleProfitPremium,
    handleProfitPremiumFixed,
    //10000-100000 USD
    handleProfitDiamond,
    handleProfitDiamondFixed,
} = require("./update/profits/profits-weekly.js");


//=================================== BALANCE & PROFIT: BRONZE ============================//
//=================================== INVESTMENT 1 - 50 ===================================//
//=================================== BALANCE & PROFIT: BRONZE ============================//

exports.DailyBalanceMondayToFridayBronze = functions.pubsub
    .schedule('25 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization

                        if (variableMonetization) {
                            handleVariableBalanceBronze(user, doc)
                        } else {
                            handleFixedBalanceBronze(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });

exports.DailyProfitMondayToFridayBronze = functions.pubsub
    .schedule('30 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization
                        const rendimiento = user?.Balance;

                        if (variableMonetization) {
                            handleProfitBronze(user, doc, rendimiento)
                        } else {
                            handleProfitBronzeFixed(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });




//=================================== BALANCE & PROFIT: STARTER ============================//
//=================================== INVESTMENT 50 - 100 ==================================//
//=================================== BALANCE & PROFIT: STARTER ============================//

exports.DailyBalanceMondayToFridayStarter = functions.pubsub
    .schedule('20 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization

                        if (variableMonetization) {
                            handleVariableBalanceStarter(user, doc)
                        } else {
                            handleFixedBalanceStarter(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });

exports.DailyProfitMondayToFridayStarter = functions.pubsub
    .schedule('40 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization
                        const rendimiento = user?.Balance;

                        if (variableMonetization) {
                            handleProfitStarter(user, doc, rendimiento)
                        } else {
                            handleProfitStarterFixed(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });

//=================================== BALANCE & PROFIT: INITIAL ============================//
//=================================== INVESTMENT 100-250 USD ==================================//
//=================================== BALANCE & PROFIT: INITIAL ============================//

exports.DailyBalanceMondayToFridayInitial = functions.pubsub
    .schedule('20 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization

                        if (variableMonetization) {
                            handleVariableBalanceInitial(user, doc)
                        } else {
                            handleFixedBalanceInitial(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });

exports.DailyProfitMondayToFridayInitial = functions.pubsub
    .schedule('40 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization
                        const rendimiento = user?.Balance;

                        if (variableMonetization) {
                            handleProfitInitial(user, doc, rendimiento)
                        } else {
                            handleProfitInitialFixed(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });
//=================================== BALANCE & PROFIT: TAIL ============================//
//=================================== INVESTMENT 250-1000 USD ==================================//
//=================================== BALANCE & PROFIT: TAIL ============================//

exports.DailyBalanceMondayToFridayTail = functions.pubsub
    .schedule('20 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization

                        if (variableMonetization) {
                            handleVariableBalanceTail(user, doc)
                        } else {
                            handleFixedBalanceTail(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });

exports.DailyProfitMondayToFridayTail = functions.pubsub
    .schedule('40 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization
                        const rendimiento = user?.Balance;

                        if (variableMonetization) {
                            handleProfitTail(user, doc, rendimiento)
                        } else {
                            handleProfitTailFixed(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });
//=================================== BALANCE & PROFIT: GOLD ============================//
//=================================== INVESTMENT 1000-5000 USD ==================================//
//=================================== BALANCE & PROFIT: GOLD ============================//

exports.DailyBalanceMondayToFridayGold = functions.pubsub
    .schedule('20 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization

                        if (variableMonetization) {
                            handleVariableBalanceGold(user, doc)
                        } else {
                            handleFixedBalanceGold(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });

exports.DailyProfitMondayToFridayGold = functions.pubsub
    .schedule('40 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization
                        const rendimiento = user?.Balance;

                        if (variableMonetization) {
                            handleProfitGold(user, doc, rendimiento)
                        } else {
                            handleProfitGoldFixed(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });
//=================================== BALANCE & PROFIT: PREMIUM ============================//
//=================================== INVESTMENT 5000-10000 USD ==================================//
//=================================== BALANCE & PROFIT: PREMIUM ============================//

exports.DailyBalanceMondayToFridayPremium = functions.pubsub
    .schedule('20 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization

                        if (variableMonetization) {
                            handleVariableBalancePremium(user, doc)
                        } else {
                            handleFixedBalancePremium(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });

exports.DailyProfitMondayToFridayPremium = functions.pubsub
    .schedule('40 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization
                        const rendimiento = user?.Balance;

                        if (variableMonetization) {
                            handleProfitPremium(user, doc, rendimiento)
                        } else {
                            handleProfitPremiumFixed(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });
//=================================== BALANCE & PROFIT: DIAMOND ============================//
//=================================== INVESTMENT 5000-10000 USD ==================================//
//=================================== BALANCE & PROFIT: DIAMOND ============================//

exports.DailyBalanceMondayToFridayDiamond = functions.pubsub
    .schedule('20 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            await db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization

                        if (variableMonetization) {
                            handleVariableBalanceDiamond(user, doc)
                        } else {
                            handleFixedBalanceDiamond(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });

exports.DailyProfitMondayToFridayDiamond = functions.pubsub
    .schedule('40 0 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    try {
                        const variableMonetization = user?.fixedMonetization
                        const rendimiento = user?.Balance;

                        if (variableMonetization) {
                            handleProfitDiamond(user, doc, rendimiento)
                        } else {
                            handleProfitDiamondFixed(user, doc)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                });
            })
        )
        return Promise.all(_data);
    });