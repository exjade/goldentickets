const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

exports.sorteoAutomaticoDolarHoraV3 = functions.pubsub.schedule('0 * * * *').timeZone('America/Mexico_City').onRun(async (context) => {
    try {
        // 1. Genera un número aleatorio como el número ganador
        const nuevoNumeroGanador = Math.floor(Math.random() * 100) + 1;

        // 2. Consulta todas las compras que coinciden con el número ganador
        const comprasSnapshot = await db.collection('loteria').doc('estado').collection('compras')
            .where('numeroTicket', '==', nuevoNumeroGanador)
            .get();

        // 3. Obtiene el premio acumulado sumando el costo de los tickets
        const premioRef = db.collection('loteria').doc('estado');
        const premioData = await premioRef.get();

        const estadoLoteriaRef = db.collection('loteria').doc('estado');

        if (!comprasSnapshot.empty) {
            // Si hay compras con el número ganador, otorga el premio acumulado al usuario
            const ganadorId = comprasSnapshot.docs[0].data().userId;

            // 5. Entregar el premio al ganador
            const userRef = db.collection('users').doc(ganadorId);
            const userData = await userRef.get();

            await userRef.update({
                Balance: userData?.data()?.Balance + premioData?.data()?.premioAcumulado,
                Withdrawal: userData?.data()?.Withdrawal + premioData?.data()?.premioAcumulado,
            });
            const id = Math.floor(Math.random() * 450343) + 45;


            const informaciónGanador = {
                username: userData?.data()?.username,
                userId: userData?.data()?.userId,
                emailAddress: userData?.data()?.emailAddress,
                numeroGanador: nuevoNumeroGanador,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
                id: id,
            }

            const informaciónSorteo = {
                username: userData?.data()?.username,
                userId: userData?.data()?.userId,
                emailAddress: userData?.data()?.emailAddress,
                numeroGanador: nuevoNumeroGanador,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
                id: id,
            }

            // Actualiza el premio acumulado y el número ganador en Firestore
            await estadoLoteriaRef.update({
                numeroGanador: nuevoNumeroGanador,
                numeroNoGanador: 0,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
                ultimoGanador: {
                    userId: userData?.data()?.userId,
                    username: userData?.data()?.username,
                }
            });

            // 9-10. Almacenar un registro de ganadores y úlimas loterias
            const winnersLogs = db.collection('lottery-winners').add(informaciónGanador);
            const lotteryLogs = db.collection('last-lotteries').add(informaciónSorteo);


            // 12. Después del sorteo, elimina la colección "compras"
            await db.collection('loteria').doc('estado').collection('compras').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });


            // Notifica al ganador o realiza las acciones necesarias
            console.log(`¡Tenemos un ganador! Usuario ID: ${ganadorId}`);
        } else {
            // Si nadie compró el número ganador, acumula el premio
            // Actualiza solo el premio acumulado y el número ganador en Firestore
            await estadoLoteriaRef.update({
                numeroGanador: 0,
                numeroNoGanador: nuevoNumeroGanador,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
            });

            // 9-10. Almacenar un registro de las loterias acumuladas
            const id = Math.floor(Math.random() * 450343) + 45;
            const informaciónSorteo = {
                numeroGanador: nuevoNumeroGanador,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
                id: id,
            }

            const cumulativePrize = db.collection('accumulated-prize').add(informaciónSorteo);

              // 12. Después del sorteo, elimina la colección "compras"
              await db.collection('loteria').doc('estado').collection('compras').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });


            console.log(`Nadie compró el número ganador. Premio acumulado: $${premioData?.data()?.premioAcumulado}`);
        }

        return null;
    } catch (error) {
        console.error('Error en el sorteo automático:', error);
        return null;
    }
});

exports.sorteoAutomaticoDolarHoraV6 = functions.pubsub.schedule('0 * * * *').timeZone('America/Mexico_City').onRun(async (context) => {
    try {
        // 1. Genera un número aleatorio como el número ganador
        const nuevoNumeroGanador = Math.floor(Math.random() * 100) + 1;

        // 2. Consulta todas las compras que coinciden con el número ganador
        const comprasSnapshot = await db.collection('loteria').doc('estado').collection('compras')
            .where('numeroTicket', '==', nuevoNumeroGanador)
            .get();

        // 3. Obtiene el premio acumulado sumando el costo de los tickets
        const premioRef = db.collection('loteria').doc('estado');
        const premioData = await premioRef.get();

        const estadoLoteriaRef = db.collection('loteria').doc('estado');

        if (!comprasSnapshot.empty) {
            // Si hay compras con el número ganador, otorga el premio acumulado al usuario
            const ganadorId = comprasSnapshot.docs[0].data().userId;

            // 5. Entregar el premio al ganador
            const userRef = db.collection('users').doc(ganadorId);
            const userData = await userRef.get();

            await userRef.update({
                Balance: userData?.data()?.Balance + premioData?.data()?.premioAcumulado,
                Withdrawal: userData?.data()?.Withdrawal + premioData?.data()?.premioAcumulado,
            });
            const id = Math.floor(Math.random() * 450343) + 45;


            const informaciónGanador = {
                username: userData?.data()?.username,
                userId: userData?.data()?.userId,
                emailAddress: userData?.data()?.emailAddress,
                numeroGanador: nuevoNumeroGanador,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
                id: id,
            }

            const informaciónSorteo = {
                username: userData?.data()?.username,
                userId: userData?.data()?.userId,
                emailAddress: userData?.data()?.emailAddress,
                numeroGanador: nuevoNumeroGanador,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
                id: id,
            }

            // Actualiza el premio acumulado y el número ganador en Firestore
            await estadoLoteriaRef.update({
                numeroGanador: nuevoNumeroGanador,
                numeroNoGanador: 0,
                premioAcumulado: 0,
                premioEntregado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
                ultimoGanador: {
                    userId: userData?.data()?.userId,
                    username: userData?.data()?.username,
                }
            });

            // 9-10. Almacenar un registro de ganadores y úlimas loterias
            const winnersLogs = db.collection('lottery-winners').add(informaciónGanador);
            const lotteryLogs = db.collection('last-lotteries').add(informaciónSorteo);


            // 12. Después del sorteo, elimina la colección "compras"
            await db.collection('loteria').doc('estado').collection('compras').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });


            // Notifica al ganador o realiza las acciones necesarias
            console.log(`¡Tenemos un ganador! Usuario ID: ${ganadorId}`);
        } else {
            // Si nadie compró el número ganador, acumula el premio
            // Actualiza solo el premio acumulado y el número ganador en Firestore
            await estadoLoteriaRef.update({
                numeroGanador: 0,
                numeroNoGanador: nuevoNumeroGanador,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                premioEntregado: 0,
                date: Date.now(),
            });

            // 9-10. Almacenar un registro de las loterias acumuladas
            const id = Math.floor(Math.random() * 450343) + 45;
            const informaciónSorteo = {
                numeroGanador: nuevoNumeroGanador,
                premioAcumulado: premioData?.data()?.premioAcumulado,
                date: Date.now(),
                id: id,
            }

            const cumulativePrize = db.collection('accumulated-prize').add(informaciónSorteo);

              // 12. Después del sorteo, elimina la colección "compras"
              await db.collection('loteria').doc('estado').collection('compras').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });


            console.log(`Nadie compró el número ganador. Premio acumulado: $${premioData?.data()?.premioAcumulado}`);
        }

        return null;
    } catch (error) {
        console.error('Error en el sorteo automático:', error);
        return null;
    }
});