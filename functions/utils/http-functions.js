const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

exports.BuyTicketsV3 = functions.https.onCall(async (data, context) => {

  const {
    selectedNumbers,
    userId,
    costoTicket,
    totalPrice,
    purchaseDate,
    id,
    username,
    drawType,
  } = data;

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
            purchaseDate: purchaseDate,
            id: id,
            username: username,
            drawType: drawType,
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


// ========================== ============================================= ========================= //
// ========================== LOTERIA DE $300 PREMIO, COSTO DE $3 DOLARES ========================= //
// ========================== ============================================= ========================= //


exports.BuyTicketsBETAV14 = functions.https.onCall(async (data, context) => {

  const {
    selectedNumbers,
    userId,
    costoTicket,
    totalPrice,
    purchaseDate,
    id,
    username,
    drawType,
    sellerCode
  } = data;

  try {
    // Verifica que el usuario esté autenticado
    if (!context.auth) {
      throw new Error('Usuario no autenticado');
    }

    const userRef = db.collection('users').doc(userId);
    const userData = await userRef.get();

    // Condición para conocer sí el saldo del usuario es mayor o igual que el costo total del ticket + fee
    const doesUserHaveSufficientBalance = userData?.data()?.Balance >= totalPrice && totalPrice <= userData?.data()?.Balance;

    if (userData.exists && doesUserHaveSufficientBalance) {

      // Referencias a colecciones
      const estadoLoteriaRef = db.collection('loteria').doc('estado');
      const bookingCollectionRef = db.collection('booking-tickets');

      // Inicializa un array para almacenar las compras
      const comprasPromises = [];

      await db.runTransaction(async (transaction) => {
        const updatePromises = [];


        let disponibilidadEnProcesoMap = {};

        // Realiza una consulta para obtener los documentos con el campo 'numeroTicket' igual a los números seleccionados
        const querySnapshot = await transaction.get(bookingCollectionRef.where('numeroTicket', 'in', selectedNumbers));

        querySnapshot.forEach(doc => {
          const numeroTicket = doc.data().numeroTicket;
          const enProceso = doc.data().enProceso;
          const disponible = doc.data().disponible;

          // Almacena los valores de enProceso y disponible en el mapa
          disponibilidadEnProcesoMap[numeroTicket] = { enProceso, disponible };
        });

        // Recorre los números de tickets y agrega cada compra como un documento independiente
        for (const numeroTicket of selectedNumbers) {

          const { enProceso } = disponibilidadEnProcesoMap[numeroTicket];

          if (enProceso) {
            const compraData = {
              numeroTicket: numeroTicket,
              userId: userId,
              costoTicket: costoTicket,
              purchaseDate: purchaseDate,
              id: id,
              username: username,
              drawType: drawType,
              sellerCode: sellerCode?.trim(),
            };

            // Agrega la compra del ticket como un documento en la subcolección "compras"
            const compraPromise = estadoLoteriaRef.collection('compras').add(compraData);
            // Registro de cada ticket 
            const saveTickets = db.collection('vault-tickets').add(compraData);
            comprasPromises.push(compraPromise);

          } else {
            return { msgticketVendido: 'Error durante la transacción: Ticket vendido' };
          }
        }
        // Espera a que se completen todas las compras
        await Promise.all(updatePromises);
      })

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

      return { message: 'Compra exitosa' };
    } else {
      console.log('Usuario no existe o saldo insuficiente');
      return { ventaMessageError: 'Usuario no existe o saldo insuficiente' };
    }
  } catch (error) {
    return { error: error.message };
  }
});


// ========================== ============================================= ========================= //
// ========================== LOTERIA DE $1000 PREMIO, COSTO DE $15 DOLARES ========================= //
// ========================== ============================================= ========================= //

exports.WeeklyBuyTicketsBETAV3 = functions.https.onCall(async (data, context) => {

  const {
    selectedNumbers,
    userId,
    costoTicket,
    totalPrice,
    purchaseDate,
    id,
    username,
    drawType,
    sellerCode
  } = data;

  try {
    // Verifica que el usuario esté autenticado
    if (!context.auth) {
      throw new Error('Usuario no autenticado');
    }

    const userRef = db.collection('users').doc(userId);
    const userData = await userRef.get();

    // Condición para conocer sí el saldo del usuario es mayor o igual que el costo total del ticket + fee
    const doesUserHaveSufficientBalance = userData?.data()?.Balance >= totalPrice && totalPrice <= userData?.data()?.Balance;

    if (userData.exists && doesUserHaveSufficientBalance) {

      // Referencias a colecciones
      const estadoLoteriaRef = db.collection('loteria').doc('weekly-prize');
      const bookingCollectionRef = db.collection('weekly-booking-tickets');

      // Inicializa un array para almacenar las compras
      const comprasPromises = [];

      await db.runTransaction(async (transaction) => {
        const updatePromises = [];


        let disponibilidadEnProcesoMap = {};

        // Realiza una consulta para obtener los documentos con el campo 'numeroTicket' igual a los números seleccionados
        const querySnapshot = await transaction.get(bookingCollectionRef.where('numeroTicket', 'in', selectedNumbers));

        querySnapshot.forEach(doc => {
          const numeroTicket = doc.data().numeroTicket;
          const enProceso = doc.data().enProceso;
          const disponible = doc.data().disponible;

          // Almacena los valores de enProceso y disponible en el mapa
          disponibilidadEnProcesoMap[numeroTicket] = { enProceso, disponible };
        });

        // Recorre los números de tickets y agrega cada compra como un documento independiente
        for (const numeroTicket of selectedNumbers) {

          const { enProceso } = disponibilidadEnProcesoMap[numeroTicket];

          if (enProceso) {
            const compraData = {
              numeroTicket: numeroTicket,
              userId: userId,
              costoTicket: costoTicket,
              purchaseDate: purchaseDate,
              id: id,
              username: username,
              drawType: drawType,
              sellerCode: sellerCode?.trim(),
            };

            // Agrega la compra del ticket como un documento en la subcolección "compras"
            const compraPromise = estadoLoteriaRef.collection('compras').add(compraData);
            // Registro de cada ticket 
            const saveTickets = db.collection('weekly-vault-tickets').add(compraData);
            comprasPromises.push(compraPromise);

          } else {
            return { msgticketVendido: 'Error durante la transacción: Ticket vendido' };
          }
        }
        // Espera a que se completen todas las compras
        await Promise.all(updatePromises);
      })

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

      return { message: 'Compra exitosa' };
    } else {
      console.log('Usuario no existe o saldo insuficiente');
      return { ventaMessageError: 'Usuario no existe o saldo insuficiente' };
    }
  } catch (error) {
    return { error: error.message };
  }
});
