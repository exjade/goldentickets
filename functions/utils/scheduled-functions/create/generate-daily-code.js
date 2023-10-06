const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

exports.generateDailyCodeV4 = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        // Generar código único diario
        const dailyCode = generateUniqueCode();

        try {
            // Guardar el código en Firestore
            const dailyCodeRef = await admin.firestore().collection('dailyCodes').add({
                code: dailyCode,
                timestamp: Date.now(),
            });

            // Obtener la lista de vendedores
            const sellersSnapshot = await admin.firestore().collection('sellers').get();

            // Asociar el código con cada vendedor
            const associatePromises = sellersSnapshot.docs.map(async sellerDoc => {
                const sellerData = sellerDoc.data();
                const sellerId = sellerDoc.id;

                const userData = {
                    username: sellerData.username,
                    email: sellerData.emailAddress,
                    referralCode: sellerData.referral.referralCode,
                    rol: sellerData.rol,
                    date: Date.now()
                };

                await admin.firestore().collection('dailyCodesAssociations').add({
                    sellerId,
                    dailyCodeId: dailyCodeRef.id,
                    userData
                });
            });

            await Promise.all(associatePromises);

            return res.status(200).send(`Código generado con éxito: ${dailyCode}`);
        } catch (error) {
            console.error('Error al generar el código:', error);
            return res.status(500).send('Error interno al generar el código');
        }
    });
});

function generateUniqueCode() {
    // Implementa tu lógica para generar códigos únicos (puedes usar UUID o cualquier otra estrategia)
    // Aquí hay un ejemplo simple utilizando la fecha actual y un número aleatorio
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
    const year = date.getFullYear();

    const longitud = 6;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigoReferido = '';
    for (let i = 0; i < longitud; i++) {
        codigoReferido += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return `${year}${month}${day}-${codigoReferido}`;
}