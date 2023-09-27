const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();


exports.BuyTickets = functions.https.onCall(async (data, context) => {

  const { selectedNumbers, userId, costoTicket } = data;

  try {
    // Verifica que el usuario esté autenticado
    if (!context.auth) {
      throw new Error('Usuario no autenticado');
    }

    const estadoLoteriaRef = db.collection('loteria').doc('estado');

    // Inicializa un array para almacenar las compras
    const compras = [];

    // Recorre los números de tickets y agrega cada compra al array
    for (const numeroTicket of selectedNumbers) {
      // Agrega la compra del ticket al array
      compras.push({
        numeroTicket: numeroTicket,
        userId: userId,
        costoTicket: costoTicket,
      });
    }

    // Agrega el array de compras a la subcolección "compras" en Firestore
    await estadoLoteriaRef.collection('compras').add({ compras });

    // Calcula el premio acumulado sumando el costo total de los tickets
    const costoTotalTickets = parseFloat(costoTicket) * selectedNumbers.length;
    const estadoActual = (await estadoLoteriaRef.get()).data();
    const premioAcumuladoActual = estadoActual.premioAcumulado || 0;
    const nuevoPremioAcumulado = premioAcumuladoActual + costoTotalTickets;

    // Actualiza el premio acumulado y el número ganador en Firestore
    await estadoLoteriaRef.update({
      premioAcumulado: nuevoPremioAcumulado,
    });

    return { message: 'Compra exitosa' };
  } catch (error) {
    return { error: error.message };
  }
});

exports.BuyTicketsV2 = functions.https.onCall(async (data, context) => {

  const { selectedNumbers, userId, costoTicket } = data;

  try {
    // Verifica que el usuario esté autenticado
    if (!context.auth) {
      throw new Error('Usuario no autenticado');
    }

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

    return { message: 'Compra exitosa' };
  } catch (error) {
    return { error: error.message };
  }
});