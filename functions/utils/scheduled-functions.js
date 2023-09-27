const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

exports.BuyTicketsV2 = functions.https.onCall(async (data, context) => {

  const { selectedNumbers, userId, costoTicket, totalPrice } = data;

  try {
    // Verifica que el usuario esté autenticado
    if (!context.auth) {
      throw new Error('Usuario no autenticado');
    }

    const userRef = db.collection('users').doc(userId);
    const userData = await userRef.get();

    // Condición para conocer sí el saldo del usuario es mayor o igual que el costo total del ticket + fee
    const doesUserHaveSufficientBalance = userData?.data()?.Balance >= totalPrice && totalPrice <= userData?.data()?.Balance;

    if (userData.exists) { // Verificamos que el usuario exista
      if (doesUserHaveSufficientBalance) { // Verificamos que el saldo del usuario sea mayor o igual al total del costo de los tickets 

        const estadoLoteriaRef = db.collection('loteria').doc('estado');

        // Inicializa un array para almacenar las compras
        const comprasPromises = [];

        // Recorre los números de tickets y agrega cada compra como un documento independiente
        for (const numeroTicket of selectedNumbers) {
          const compraData = {
            numeroTicket: numeroTicket,
            userId: userId,
            costoTicket: costoTicket,
          };

          // Agrega la compra del ticket como un documento en la subcolección "compras"
          const compraPromise = estadoLoteriaRef.collection('compras').add(compraData);
          // Registro de cada ticket 
          const saveTickets = db.collection('vault-tickets').add(compraData);
          comprasPromises.push(compraPromise);
        }

        // Espera a que se completen todas las compras
        await Promise.all(comprasPromises);

        // Calcula el premio acumulado sumando el costo total de los tickets
        const costoTotalTickets = parseFloat(costoTicket) * selectedNumbers.length;
        const estadoActual = (await estadoLoteriaRef.get()).data();
        const premioAcumuladoActual = estadoActual.premioAcumulado || 0;
        const nuevoPremioAcumulado = premioAcumuladoActual + costoTotalTickets;

        // Actualiza el premio acumulado y el número ganador en Firestore
        await estadoLoteriaRef.update({
          premioAcumulado: nuevoPremioAcumulado,
        });



        // Actaliza el documento del usuario que compro los tickets
        // restando el costo del ticket del saldo del usuario
        await userRef.update({
          Balance: userData?.data()?.Balance - totalPrice,
        });
      } else {
        console.log('doesnt have sufficient balance!')
      }
    } else {
      console.log('No such document!')
    }

    return { message: 'Compra exitosa' };
  } catch (error) {
    return { error: error.message };
  }
});