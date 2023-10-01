const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();

exports.DeleteReservedTickets = functions.pubsub.schedule('0 * * * *').timeZone('America/Mexico_City').onRun((context) => {
    const collectionRef = db.collection('booking-tickets');

    // Obtén todos los documentos de la colección
    return collectionRef.get()
        .then(snapshot => {
            // Elimina cada documento
            const promises = [];
            snapshot.forEach(doc => {
                promises.push(doc.ref.delete());
            });
            return Promise.all(promises);
        })
        .then(() => {
            console.log('Documentos eliminados correctamente.');
            return null;
        })
        .catch(error => {
            console.error('Error al eliminar documentos:', error);
            return null;
        });
});