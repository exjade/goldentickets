const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

// =================================== FRIDAY WITHDRAWAL: STARTER ================================================ //
exports.FridayWithdrawalFunctionStarter = functions.pubsub
    .schedule('0 4 * * FRI') //“At 04:00 AM on Friday.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {

        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const user = doc.data();

                    //Limite del 200%
                    const limitContract = user?.Applied >= 1 && user?.Applied < 50 && user?.Profit < user?.Applied * 200 / 100
                    // El balance debe tener más del 8% 
                    const conditionForWithdrawal = user?.Balance > 10;

                    // La inversión y el balance es mayor 
                    if (user?.Applied > 0 && user?.Balance > 0) {
                        // Sí el Balance está dentro del limite de contrato
                        if (limitContract) {
                            if (conditionForWithdrawal) {
                                console.log('EXECUTE: PAGADONDO $1 - 50 USD')
                                db.collection('users')
                                    .doc(doc.id)
                                    .update({
                                        Withdrawal: user?.Withdrawal + user?.Balance,
                                    });
                            }
                        } else {
                            console.log('FRIDAY-WITHDRAWAL-The user has exceeded the contract limit')
                        }
                    }

                });
            })
        )
        await Promise.all(_data);
    });

// =================================== FRIDAY WITHDRAWAL: INITIAL ================================================ //

exports.FridayWithdrawalFunctionInitial = functions.pubsub
    .schedule('10 4 * * FRI') //“At 04:10 AM on Friday.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {

        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const user = doc.data();

                    //Limite del 200%
                    const limitContract = user?.Applied >= 50 && user?.Applied < 100 && user?.Profit < user?.Applied * 200 / 100
                    // El balance debe tener más del 8% 
                    const conditionForWithdrawal = user?.Balance > 10;

                    // La inversión y el balance es mayor 
                    if (user?.Applied > 0 && user?.Balance > 0) {
                        // Sí el Balance está dentro del limite de contrato
                        if (limitContract) {
                            if (conditionForWithdrawal) {
                                console.log('EXECUTE: PAGADONDO $50 - 100 USD')
                                db.collection('users')
                                    .doc(doc.id)
                                    .update({
                                        Withdrawal: user?.Withdrawal + user?.Balance,
                                    });
                            }
                        } else {
                            console.log('FRIDAY-WITHDRAWAL-The user has exceeded the contract limit')
                        }
                    }

                });
            })
        )
        await Promise.all(_data);
    });

// =================================== FRIDAY WITHDRAWAL: TAIL =================================================== //
exports.FridayWithdrawalFunctionTail = functions.pubsub
    .schedule('20 4 * * FRI') //“At 04:20 AM on Friday.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {

        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const user = doc.data();

                    //Limite del 200%
                    const limitContract = user?.Applied >= 100 && user?.Applied < 250 && user?.Profit < user?.Applied * 200 / 100
                    // El balance debe tener más del 8% 
                    const conditionForWithdrawal = user?.Balance > 10;

                    // La inversión y el balance es mayor 
                    if (user?.Applied > 0 && user?.Balance > 0) {
                        // Sí el Balance está dentro del limite de contrato
                        if (limitContract) {
                            if (conditionForWithdrawal) {
                                console.log('EXECUTE: PAGADONDO $100 - 250 USD')
                                db.collection('users')
                                    .doc(doc.id)
                                    .update({
                                        Withdrawal: user?.Withdrawal + user?.Balance,
                                    });
                            }
                        } else {
                            console.log('FRIDAY-WITHDRAWAL-The user has exceeded the contract limit')
                        }
                    }

                });
            })
        )
        await Promise.all(_data);
    });
// =================================== FRIDAY WITHDRAWAL: GOLD =================================================== //
exports.FridayWithdrawalFunctionGold = functions.pubsub
    .schedule('30 4 * * FRI') //“At 04:30 AM on Friday.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {

        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const user = doc.data();

                    //Limite del 200%
                    const limitContract = user?.Applied >= 250 && user?.Applied < 1000 && user?.Profit < user?.Applied * 200 / 100
                    // El balance debe tener más del 8% 
                    const conditionForWithdrawal = user?.Balance > 10;

                    // La inversión y el balance es mayor 
                    if (user?.Applied > 0 && user?.Balance > 0) {
                        // Sí el Balance está dentro del limite de contrato
                        if (limitContract) {
                            if (conditionForWithdrawal) {
                                console.log('EXECUTE: PAGADONDO $250 - 1,000 USD')
                                db.collection('users')
                                    .doc(doc.id)
                                    .update({
                                        Withdrawal: user?.Withdrawal + user?.Balance,
                                    });
                            }
                        } else {
                            console.log('FRIDAY-WITHDRAWAL-The user has exceeded the contract limit')
                        }
                    }

                });
            })
        )
        await Promise.all(_data);
    });
// =================================== FRIDAY WITHDRAWAL: PREMIUM =================================================== //
exports.FridayWithdrawalFunctionPremium = functions.pubsub
    .schedule('40 4 * * FRI') //“At 04:40 AM on Friday.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {

        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const user = doc.data();

                    //Limite del 200%
                    const limitContract = user?.Applied >= 1000 && user?.Applied < 10000 && user?.Profit < user?.Applied * 200 / 100;
                    // El balance debe tener más del 8% 
                    const conditionForWithdrawal = user?.Balance > 10;

                    // La inversión y el balance es mayor 
                    if (user?.Applied > 0 && user?.Balance > 0) {
                        // Sí el Balance está dentro del limite de contrato
                        if (limitContract) {
                            if (conditionForWithdrawal) {
                                console.log('EXECUTE: PAGADONDO $1,000 - 10,000 USD')
                                db.collection('users')
                                    .doc(doc.id)
                                    .update({
                                        Withdrawal: user?.Withdrawal + user?.Balance,
                                    });
                            }
                        } else {
                            console.log('FRIDAY-WITHDRAWAL-The user has exceeded the contract limit')
                        }
                    }

                });
            })
        )
        await Promise.all(_data);
    });
// =================================== FRIDAY WITHDRAWAL: Diamond =================================================== //
exports.FridayWithdrawalFunctionDiamond = functions.pubsub
    .schedule('50 4 * * FRI') //“At 04:50 AM on Friday.”
    .timeZone('America/Mexico_City')
    .onRun(async () => {

        const _data = []
        _data.push(
            db.collection('users').get().then(snapshot => {
                snapshot.forEach(doc => {
                    const user = doc.data();

                    //Limite del 200%
                    const limitContract = user?.Applied >= 10000 && user?.Applied < 100000 && user?.Profit < user?.Applied * 200 / 100;
                    // El balance debe tener más del 8% 
                    const conditionForWithdrawal = user?.Balance > 10;

                    // La inversión y el balance es mayor 
                    if (user?.Applied > 0 && user?.Balance > 0) {
                        // Sí el Balance está dentro del limite de contrato
                        if (limitContract) {
                            if (conditionForWithdrawal) {
                                console.log('EXECUTE: PAGADONDO $10,000 - 100,000 USD')
                                db.collection('users')
                                    .doc(doc.id)
                                    .update({
                                        Withdrawal: user?.Withdrawal + user?.Balance,
                                    });
                            }
                        } else {
                            console.log('FRIDAY-WITHDRAWAL-The user has exceeded the contract limit')
                        }
                    }

                });
            })
        )
        await Promise.all(_data);
    });