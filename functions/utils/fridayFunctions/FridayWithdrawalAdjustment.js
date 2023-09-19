const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

// =================================== FRIDAY WITHDRAWAL: STARTER ================================================ //
exports.FridayWithdrawalAdjustmentStarter = functions.pubsub
    .schedule('5 4 * * FRI') //“At 04:05 on Friday.” 
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(

            db.collection('users')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const user = doc.data();
                        //Limite del 200%
                        const limitContract = user?.Applied >= 1 && user?.Applied < 50 && user?.Profit < user?.Applied * 200 / 100;
                        // El balance debe tener más del 12% 
                        const batch = db.batch();
                        // La inversión y el balance es mayor 
                        if (user?.Applied > 0 && user?.Balance > 0) {
                            // Sí el Balance está dentro del limite de contrato
                            if (limitContract) {
                                // Eliminar el Saldo General después de actualizar el Withdrawal
                                if (user?.Balance > 0 && user?.Withdrawal > 0) {
                                    db.collection('users')
                                        .doc(doc.id)
                                        .update({
                                            Balance: 0,
                                        });
                                } else {
                                    console.log('El usuario no tiene Balance:', user?.username)
                                }
                                return batch.commit();
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
exports.FridayWithdrawalAdjustmentInitial = functions.pubsub
    .schedule('15 4 * * FRI') //“At 04:15 on Friday.” 
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(

            db.collection('users')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const user = doc.data();
                        //Limite del 200%
                        const limitContract = user?.Applied >= 50 && user?.Applied < 100 && user?.Profit < user?.Applied * 200 / 100;
                        // El balance debe tener más del 12% 
                        const batch = db.batch();
                        // La inversión y el balance es mayor 
                        if (user?.Applied > 0 && user?.Balance > 0) {
                            // Sí el Balance está dentro del limite de contrato
                            if (limitContract) {
                                // Eliminar el Saldo General después de actualizar el Withdrawal
                                if (user?.Balance > 0 && user?.Withdrawal > 0) {
                                    db.collection('users')
                                        .doc(doc.id)
                                        .update({
                                            Balance: 0,
                                        });
                                } else {
                                    console.log('El usuario no tiene Balance:', user?.username)
                                }
                                return batch.commit();
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
exports.FridayWithdrawalAdjustmentTail = functions.pubsub
    .schedule('25 4 * * FRI') //“At 07:25 on Friday.” 
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(

            db.collection('users')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const user = doc.data();
                        //Limite del 200%
                        const limitContract = user?.Applied >= 100 && user?.Applied < 250 && user?.Profit < user?.Applied * 200 / 100;
                        // El balance debe tener más del 12% 
                        const batch = db.batch();
                        // La inversión y el balance es mayor 
                        if (user?.Applied > 0 && user?.Balance > 0) {
                            // Sí el Balance está dentro del limite de contrato
                            if (limitContract) {
                                // Eliminar el Saldo General después de actualizar el Withdrawal
                                if (user?.Balance > 0 && user?.Withdrawal > 0) {
                                    db.collection('users')
                                        .doc(doc.id)
                                        .update({
                                            Balance: 0,
                                        });
                                } else {
                                    console.log('El usuario no tiene Balance:', user?.username)
                                }
                                return batch.commit();
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
exports.FridayWithdrawalAdjustmentGold = functions.pubsub
    .schedule('35 4 * * FRI') //“At 04:35 on Friday.” 
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(

            db.collection('users')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const user = doc.data();
                        //Limite del 200%
                        const limitContract = user?.Applied >= 250 && user?.Applied < 1000 && user?.Profit < user?.Applied * 200 / 100;
                        // El balance debe tener más del 12% 
                        const batch = db.batch();
                        // La inversión y el balance es mayor 
                        if (user?.Applied > 0 && user?.Balance > 0) {
                            // Sí el Balance está dentro del limite de contrato
                            if (limitContract) {
                                // Eliminar el Saldo General después de actualizar el Withdrawal
                                if (user?.Balance > 0 && user?.Withdrawal > 0) {
                                    db.collection('users')
                                        .doc(doc.id)
                                        .update({
                                            Balance: 0,
                                        });
                                } else {
                                    console.log('El usuario no tiene Balance:', user?.username)
                                }
                                return batch.commit();
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

exports.FridayWithdrawalAdjustmentPremium = functions.pubsub
    .schedule('45 4 * * FRI') //“At 04:45 on Friday.” 
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(

            db.collection('users')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const user = doc.data();
                        //Limite del 200%
                        const limitContract = user?.Applied >= 1000 && user?.Applied < 10000 && user?.Profit < user?.Applied * 200 / 100;
                        // El balance debe tener más del 12% 
                        const batch = db.batch();
                        // La inversión y el balance es mayor 
                        if (user?.Applied > 0 && user?.Balance > 0) {
                            // Sí el Balance está dentro del limite de contrato
                            if (limitContract) {
                                // Eliminar el Saldo General después de actualizar el Withdrawal
                                if (user?.Balance > 0 && user?.Withdrawal > 0) {
                                    db.collection('users')
                                        .doc(doc.id)
                                        .update({
                                            Balance: 0,
                                        });
                                } else {
                                    console.log('El usuario no tiene Balance:', user?.username)
                                }
                                return batch.commit();
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
exports.FridayWithdrawalAdjustmentDiamond = functions.pubsub
    .schedule('55 4 * * FRI') //“At 04:55 on Friday.” 
    .timeZone('America/Mexico_City')
    .onRun(async () => {
        const _data = []
        _data.push(

            db.collection('users')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const user = doc.data();
                        //Limite del 200%
                        const limitContract = user?.Applied >= 10000 && user?.Applied < 100000 && user?.Profit < user?.Applied * 200 / 100;
                        // El balance debe tener más del 12% 
                        const batch = db.batch();
                        // La inversión y el balance es mayor 
                        if (user?.Applied > 0 && user?.Balance > 0) {
                            // Sí el Balance está dentro del limite de contrato
                            if (limitContract) {
                                // Eliminar el Saldo General después de actualizar el Withdrawal
                                if (user?.Balance > 0 && user?.Withdrawal > 0) {
                                    db.collection('users')
                                        .doc(doc.id)
                                        .update({
                                            Balance: 0,
                                        });
                                } else {
                                    console.log('El usuario no tiene Balance:', user?.username)
                                }
                                return batch.commit();
                            } else {
                                console.log('FRIDAY-WITHDRAWAL-The user has exceeded the contract limit')
                            }
                        }

                    });
                })
        )
        await Promise.all(_data);
    });