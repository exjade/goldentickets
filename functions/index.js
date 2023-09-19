
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const {
    getTotalStakingValuesBitcoin30,
    getTotalStakingValuesEthereum30,
    getTotalStakingValuesTether30,
    getTotalStakingValuesPolkadot30,
    getTotalStakingValuesSolana30,
} = require("./utils");

const {
    FridayWithdrawalFunctionStarter,
    FridayWithdrawalFunctionInitial,
    FridayWithdrawalFunctionTail,
    FridayWithdrawalFunctionGold,
    FridayWithdrawalFunctionPremium,
    FridayWithdrawalFunctionDiamond,
} = require('./utils/fridayFunctions/index');

const {
    FridayWithdrawalAdjustmentStarter,
    FridayWithdrawalAdjustmentInitial,
    FridayWithdrawalAdjustmentTail,
    FridayWithdrawalAdjustmentGold,
    FridayWithdrawalAdjustmentPremium,
    FridayWithdrawalAdjustmentDiamond,
} = require('./utils/fridayFunctions/FridayWithdrawalAdjustment');

const {
    DailyBalanceMondayToFridayBronze,
    DailyProfitMondayToFridayBronze,
    DailyBalanceMondayToFridayStarter,
    DailyProfitMondayToFridayStarter,
    DailyBalanceMondayToFridayInitial,
    DailyProfitMondayToFridayInitial,
    DailyBalanceMondayToFridayTail,
    DailyProfitMondayToFridayTail,
    DailyBalanceMondayToFridayGold,
    DailyProfitMondayToFridayGold,
    DailyBalanceMondayToFridayPremium,
    DailyProfitMondayToFridayPremium,
    DailyBalanceMondayToFridayDiamond,
    DailyProfitMondayToFridayDiamond,
} = require('./utils/dailyRewards/scheduled-functions.js');

const db = admin.firestore();

// =========================================================================  ===================================================================================== //
// ========================================================================= DAILY ROI (1.8%)  ==================================================================== //
// ========================================================================= ====================================================================================== //
exports.DailyBalanceMondayToFridayBronze = DailyBalanceMondayToFridayBronze; //1-50 USD
exports.DailyBalanceMondayToFridayStarter = DailyBalanceMondayToFridayStarter; //50-100 USD
exports.DailyBalanceMondayToFridayInitial = DailyBalanceMondayToFridayInitial; //100-250 USD
exports.DailyBalanceMondayToFridayTail = DailyBalanceMondayToFridayTail;  //250-1000 USD
exports.DailyBalanceMondayToFridayGold = DailyBalanceMondayToFridayGold; //1000-5000 USD
exports.DailyBalanceMondayToFridayPremium = DailyBalanceMondayToFridayPremium; //5000-10000 USD
exports.DailyBalanceMondayToFridayDiamond = DailyBalanceMondayToFridayDiamond;  //10000-100000 USD


// ================================================================================================================================================================ //
// ========================================================================= DAILY PROFIT (1.8%)  ================================================================= //
// ================================================================================================================================================================ //
exports.DailyProfitMondayToFridayBronze = DailyProfitMondayToFridayBronze; //1-50 USD
exports.DailyProfitMondayToFridayStarter = DailyProfitMondayToFridayStarter; //50-100 USD
exports.DailyProfitMondayToFridayInitial = DailyProfitMondayToFridayInitial; //100-250 USD
exports.DailyProfitMondayToFridayTail = DailyProfitMondayToFridayTail;  //250-1000 USD
exports.DailyProfitMondayToFridayGold = DailyProfitMondayToFridayGold; //1000-5000 USD
exports.DailyProfitMondayToFridayPremium = DailyProfitMondayToFridayPremium; //5000-10000 USD
exports.DailyProfitMondayToFridayDiamond = DailyProfitMondayToFridayDiamond;  //10000-100000 


// ========================================================================================================================== //
// ========================================================================================================================== //
// This function is used to check if a user has exceeded the investment limit, and resets his Balance & Initial Investment.   //
// ========================================================================================================================== //
// ========================================================================================================================== //

exports.DailyLimitContractMondayToFriday = functions.pubsub
    .schedule('40 1 * * 1-5') // MONDAY TO FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const limitContract = profit >= 200 / 100 * parseInt(applied)


                    if (limitContract) {
                        db.collection('users')
                            .doc(doc.id)
                            .update({
                                Profit: 0,
                                Applied: 0,
                                lastBalanceUpdate: admin.firestore.FieldValue.delete(),
                                lastProfitUpdate: admin.firestore.FieldValue.delete()
                            });
                    } else {
                        console.log(`Without a contract,the ${user?.username} doesnt have an active investment.`);
                    }

                    if (profit >= applied) {
                        console.log(`This contract has expired ${user?.username}`)
                    }

                });
            })
        )
        return Promise.all(_data);
    });



// ================================================================== ================================= ======================================= //
// ================================================================== RETIROS========================== ======================================= //
// ================================================================== ================================= ======================================= //

// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 1 At 04:00 AM on Friday ================//
exports.FridayWithdrawalFunctionStarter = FridayWithdrawalFunctionStarter;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 2 At 04:10 AM on Friday ================//
exports.FridayWithdrawalFunctionInitial = FridayWithdrawalFunctionInitial;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 3 At 04:20 AM on Friday ================//
exports.FridayWithdrawalFunctionTail = FridayWithdrawalFunctionTail;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 4 At 04:30 AM on Friday ================//
exports.FridayWithdrawalFunctionGold = FridayWithdrawalFunctionGold;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 5 At 04:40 AM on Friday ================//
exports.FridayWithdrawalFunctionPremium = FridayWithdrawalFunctionPremium;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 6 At 04:50 AM on Friday ================//
exports.FridayWithdrawalFunctionDiamond = FridayWithdrawalFunctionDiamond;

// ======================================================================================================================= //
// RESET DE BALANCE SÍ EL USUARIO YA HA SIDO PAGADO Y AÚN TIENE SALDO EN SU CUENTA                                         //
// SI EL USUARIO TIENE DINERO DISPONIBLE PARA RETIRO, NO SE EJECUTA                                                        //
// ======================================================================================================================= //

// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 1 At 04:05 AM on Friday ================//
exports.FridayWithdrawalAdjustmentStarter = FridayWithdrawalAdjustmentStarter;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 2 At 04:15 AM on Friday ================//
exports.FridayWithdrawalAdjustmentInitial = FridayWithdrawalAdjustmentInitial;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 3 At 04:25 AM on Friday ================//
exports.FridayWithdrawalAdjustmentTail = FridayWithdrawalAdjustmentTail;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 4 At 04:35 AM on Friday ================//
exports.FridayWithdrawalAdjustmentGold = FridayWithdrawalAdjustmentGold;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 4 At 04:45 AM on Friday ================//
exports.FridayWithdrawalAdjustmentPremium = FridayWithdrawalAdjustmentPremium;
// ================ FRIDAY: BALANCE TO WITHDRAWAL.  EXECUTION 4 At 04:55 AM on Friday ================//
exports.FridayWithdrawalAdjustmentDiamond = FridayWithdrawalAdjustmentDiamond;

// ===================================================================================================================== //
// ============================================  CRON JOBS: STAKING 30 DAYS ============================================ //
// ===================================================================================================================== //
exports.BitcoinThirtyDaysPeriod = functions.pubsub
    .schedule('0 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Bitcoin');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 7);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (107 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 30) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

exports.EthereumThirtyDaysPeriod = functions.pubsub
    .schedule('0 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Ethereum');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 5);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (105 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 30) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

exports.TetherThirtyDaysPeriod = functions.pubsub
    .schedule('0 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Tether');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 8);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (108 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 30) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });
exports.PolkadotThirtyDaysPeriod = functions.pubsub
    .schedule('0 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Polkadot');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 16);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (116 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 30) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });
exports.SolanaThirtyDaysPeriod = functions.pubsub
    .schedule('0 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Solana');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 14);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (114 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 30) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

// ==================================================================================================== //
// ============================  ACTUALIZAR EL WITHDRAWAL: 30 DÍAS       ===================== //
// ==================================================================================================== //

const usersRef = admin.firestore().collection("users");

exports.updateUserWithdrawalBitcoin30Days = functions.pubsub
    .schedule("5 0 1 * *")
    .onRun(() => {
        const usersQuery = usersRef.get();

        return usersQuery.then((querySnapshot) => {
            const promises = [];
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                const updatePromise = getTotalStakingValuesBitcoin30(user?.userId).then((total) => {
                    return usersRef.doc(doc.id).update({
                        Withdrawal: user?.Withdrawal + total
                    });
                });
                promises.push(updatePromise);
            });

            return Promise.all(promises);
        });
    });

exports.updateUserWithdrawalEthereum30Days = functions.pubsub
    .schedule("5 0 1 * *")
    .onRun(() => {
        const usersQuery = usersRef.get();

        return usersQuery.then((querySnapshot) => {
            const promises = [];
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                const updatePromise = getTotalStakingValuesEthereum30(user?.userId).then((total) => {
                    return usersRef.doc(doc.id).update({
                        Withdrawal: user?.Withdrawal + total
                    });
                });
                promises.push(updatePromise);
            });

            return Promise.all(promises);
        });
    });

exports.updateUserWithdrawalTether30Days = functions.pubsub
    .schedule("5 0 1 * *")
    .onRun(() => {
        const usersQuery = usersRef.get();

        return usersQuery.then((querySnapshot) => {
            const promises = [];
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                const updatePromise = getTotalStakingValuesTether30(user?.userId).then((total) => {
                    return usersRef.doc(doc.id).update({
                        Withdrawal: user?.Withdrawal + total
                    });
                });
                promises.push(updatePromise);
            });

            return Promise.all(promises);
        });
    });

exports.updateUserWithdrawalPolkadot30Days = functions.pubsub
    .schedule("5 0 1 * *")
    .onRun(() => {
        const usersQuery = usersRef.get();

        return usersQuery.then((querySnapshot) => {
            const promises = [];
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                const updatePromise = getTotalStakingValuesPolkadot30(user?.userId).then((total) => {
                    return usersRef.doc(doc.id).update({
                        Withdrawal: user?.Withdrawal + total
                    });
                });
                promises.push(updatePromise);
            });

            return Promise.all(promises);
        });
    });
exports.updateUserWithdrawalSolana30Days = functions.pubsub
    .schedule("5 0 1 * *")
    .onRun(() => {
        const usersQuery = usersRef.get();

        return usersQuery.then((querySnapshot) => {
            const promises = [];
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                const updatePromise = getTotalStakingValuesSolana30(user?.userId).then((total) => {
                    return usersRef.doc(doc.id).update({
                        Withdrawal: user?.Withdrawal + total
                    });
                });
                promises.push(updatePromise);
            });

            return Promise.all(promises);
        });
    });




// ===================================================================================================================== //
// ============================================  CRON JOBS: STAKING 60 DAYS ============================================ //
// ===================================================================================================================== //

exports.BitcoinSixtyDaysPeriod = functions.pubsub
    .schedule('15 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Bitcoin');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 14);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    //14% monthly rewards
                    const APR = (114 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 60) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

exports.EthereumSixtyDaysPeriod = functions.pubsub
    .schedule('15 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Ethereum');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 10);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (110 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 60) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

exports.TetherSixtyDaysPeriod = functions.pubsub
    .schedule('15 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Tether');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 16);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (116 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 60) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });
exports.PolkadotSixtyDaysPeriod = functions.pubsub
    .schedule('15 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Polkadot');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 32);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (132 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 60) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });
exports.SolanaSixtyDaysPeriod = functions.pubsub
    .schedule('15 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Solana');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 28);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (128 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 60) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

// ===================================================================================================================== //
// ============================================  CRON JOBS: STAKING 120 DAYS ============================================ //
// ===================================================================================================================== //
exports.BitcoinHundredTwentyDaysPeriod = functions.pubsub
    .schedule('30 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Bitcoin');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 28);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    //28% monthly rewards
                    const APR = (128 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 120) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

exports.EthereumHundredTwentyDaysPeriod = functions.pubsub
    .schedule('30 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Ethereum');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 20);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (120 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 120) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

exports.TetherHundredTwentyDaysPeriod = functions.pubsub
    .schedule('30 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Tether');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 32);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (132 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 120) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });
exports.PolkadotHundredTwentyDaysPeriod = functions.pubsub
    .schedule('30 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();

                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Polkadot');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 64);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (164 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


                    // Update Doc
                    const batch = db.batch();
                    if (differenceinDays >= 120) {
                        if (Stakinglimit) {
                            if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                                db.collection('staking')
                                    .doc(doc.id)
                                    .update({
                                        earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                        status: 'Finished'
                                    });
                            } else {
                                console.log('No initial Investment:', InitialInvestment);
                            }
                        } else {
                            console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                        }
                    } else {
                        console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    }
                    return batch.commit();

                });
            })
        )
        await Promise.all(_data);
    });

exports.SolanaHundredTwentyDaysPeriod40 = functions.pubsub
    .schedule('30 0 1 * *') //“At 00:00 on day-of-month 1.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const coleccionDestino = db.collection('users');
        const _data = [];
        _data.push(
            db.collection('staking').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const currency = doc.data();
                    // Filter cryptocurrencies
                    const filterCurrency = [currency]?.filter((c) => c.name === 'Solana');
                    const filterStatus = filterCurrency?.filter((c) => c.status === 'inProgress');
                    const filterPercentage = filterStatus?.filter((p) => p.percentage === 56);
                    // make a Map Initial Invest Amount
                    const mapAllEarningInitialInvestment = filterPercentage?.map((v) => parseFloat(v.initialInvestment));
                    const mapAllEarningAmount = filterPercentage?.map((v) => parseFloat(v.earningAmount));
                    //Sum Staking Initial Invest in each crypto
                    const InitialInvestment = mapAllEarningInitialInvestment?.reduce((acc, numero) => { return acc + numero }, 0);
                    const EarningAmount = mapAllEarningAmount?.reduce((acc, numero) => { return acc + numero }, 0);
                    // 7% monthly rewards
                    const APR = (156 / 12) / 100;
                    // Get reward aamount
                    const stakingReward = parseFloat(InitialInvestment) * parseFloat(APR);
                    const Stakinglimit = parseFloat(EarningAmount) < parseFloat(InitialInvestment) + parseFloat(stakingReward)
                    // Execute every 30 días since initial invest
                    const startDate = currency.startDate;
                    const today = Date.now();
                    const timeDifference = today - startDate;
                    const differenceinDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                    // Update Doc
                    const batch = db.batch();
                    // if (differenceinDays >= 1) {
                    if (Stakinglimit) {
                        if (parseFloat(EarningAmount) > 0 && parseFloat(InitialInvestment) > 0) {
                            db.collection('staking')
                                .doc(doc.id)
                                .update({
                                    earningAmount: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                    earningTotal: parseFloat(EarningAmount) + parseFloat(stakingReward),
                                    status: 'Finished'
                                });
                        } else {
                            console.log('No initial Investment:', InitialInvestment);
                        }
                    } else {
                        console.log('STAKING COMPLETE: Ha obtenido un resultado de' + '' + stakingReward + '' + 'de ganancia');
                    }
                    // } else {
                    //     console.log('Sólo han transacurrido' + differenceinDays + 'días')
                    // }

                    return batch.commit();
                });
            }),

        );
        await Promise.all(_data);

    });


// ================================================================================================================================= //
// ============================================  CRON JOBS: UNILEVEL BALANCE ======================================================== //
// ================================================================================================================================= //


// Función para transferir el Balance de Unilevel al Withdrawal
// 0. Verifica que el usuario tenga una inversión && no exceda el limite del contrato
// 1. Sí el usuario ha cumplido su limite de contrato, no debe transferir todo el balance
// 2. Debe restar el ReferralBalance del LastPaymentBalance para así obtener lo trabajado después del último pago de su unilevel
// 3. Transfiere el ReferralBalance al Withdrawal 
// 4. Debe almacenar en Firestore un campo "LastPaymentBalance" con el Referral Balance que se pagó
// 5. Debe pasar el restante para completar el contrato y dejar el saldo restante en el ReferralBalance 

exports.UnilevelTransferBalance = functions.pubsub
    .schedule('0 0 * * 1-5') // FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const ReferralBalance = user.referral.ReferralBalance;
                    const LastPaymentBalance = user.referral.LastPaymentBalance;

                    const doesUserHasAnInvestment = parseInt(applied) > 0;
                    const doesntExceedContractLimit = parseInt(profit) < 200 / 100 * parseInt(applied);

                    // El total de todos los nodos siempre se almacena en el ReferralBalance
                    // Por lo que cada día de pago se almacena el balance del último pago (LastPaymentBalance) 
                    // En la próxima fecha de pago, el ReferralBalance será mayor sí el usuario trabajo su Unilevel 
                    // Por lo que se resta el último pago con el saldo del Unilevel actual para obtener lo que debemos pagar
                    const calculateUnilevelProfit = parseInt(ReferralBalance) <= 0 ? 0 : parseInt(ReferralBalance) - parseInt(LastPaymentBalance);

                    const batch = db.batch();

                    if (doesUserHasAnInvestment) {
                        if (doesntExceedContractLimit) {
                            var sfRef = db.collection('users')
                                .doc(doc.id);
                            batch.update(sfRef, {
                                Withdrawal: user.Withdrawal + parseInt(calculateUnilevelProfit),
                                referral: {
                                    ...user.referral,
                                    LastPaymentBalance: calculateUnilevelProfit
                                }
                            });
                            return batch.commit();
                        } else {
                            //Sí el usuario ha cumplido su limite de contrato, no debe transferir todo el balance
                            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                        }
                    } else {
                        console.log(`USER DOESNT HAVE AN INVESTMENT: ${applied} `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });




// Función para añadir al Profit la ganancia del Balance de Unilevel
// 0. Verifica que el usuario tenga una inversión && no exceda el limite del contrato
// 1. Al añadir el ReferralBalance al Profit acelerá el limite del contrato
exports.UnilevelUpdateProfit = functions.pubsub
    .schedule('5 0 * * 1-5') // FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;
                    const ReferralBalance = user.referral.ReferralBalance;
                    const LastPaymentBalance = user.referral.LastPaymentBalance;

                    const doesUserHasAnInvestment = parseInt(applied) > 0;
                    const doesntExceedContractLimit = parseInt(profit) < 200 / 100 * parseInt(applied);

                    // El total de todos los nodos siempre se almacena en el ReferralBalance
                    // Por lo que cada día de pago se almacena el balance del último pago (LastPaymentBalance) 
                    // En la próxima fecha de pago, el ReferralBalance será mayor sí el usuario trabajo su Unilevel 
                    // Por lo que se resta el último pago con el saldo del Unilevel actual para obtener lo que debemos pagar
                    const calculateUnilevelProfit = parseInt(LastPaymentBalance);

                    const batch = db.batch();

                    if (doesUserHasAnInvestment) {
                        if (doesntExceedContractLimit) {
                            var sfRef = db.collection('users')
                                .doc(doc.id);
                            batch.update(sfRef, {
                                Profit: parseInt(user.Profit) + parseInt(calculateUnilevelProfit),
                                lastProfitUpdate: Date.now()
                            });
                            return batch.commit();
                        } else {
                            //Sí el usuario ha cumplido su limite de contrato, no debe transferir todo el balance
                            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                        }
                    } else {
                        console.log(`USER DOESNT HAVE AN INVESTMENT: ${applied} `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });

// Función para reset de balance de Unilevel el día de pago
// 1. Después de actualizar el Profit & transferir el Balance de Referido, debe eliminar el ReferralBalance
// 2. Sí el limite del contrato se completó, hace reset del Applied & Profit

exports.UnilevelResetReferralBalance = functions.pubsub
    .schedule('10 0 * * 1-5') // FRIDAY
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    let applied = user.Applied;
                    let profit = user.Profit;

                    const doesUserHasAnInvestment = parseInt(applied) > 0;
                    const doesntExceedContractLimit = parseInt(profit) < 200 / 100 * parseInt(applied);

                    const batch = db.batch();

                    if (doesUserHasAnInvestment) {
                        if (doesntExceedContractLimit) {
                            var sfRef = db.collection('users')
                                .doc(doc.id);
                            batch.update(sfRef, {
                                referral: {
                                    ...user.referral,
                                    ReferralBalance: 0
                                }
                            });
                            return batch.commit();
                        } else {
                            //Sí el usuario ha cumplido su limite de contrato, no debe transferir todo el balance
                            console.log(`INVESTMENT: ${applied}, TOTAL: ${profit} = exceeded the contract limit `)
                        }
                    } else {
                        console.log(`USER DOESNT HAVE AN INVESTMENT: ${applied} `)
                    }

                });
            })
        )
        return Promise.all(_data);
    });




// check & reset earning amount & initial investment
//   if (parseFloat(mapAllEarningAmount) > parseFloat(mapAllEarningInitialInvestment) + stakingReward) {
//     db.collection('staking')
//         .doc(doc.id)
//         .update({
//             earningAmount: 0,
//             earningTotal: 0,
//             initialInvestment: 0,
//         });
// }else{
//     console.log('No need to reset')
// }

