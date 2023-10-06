const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

exports.trackReferrals = functions.auth.user().onCreate(async (user) => {

  const { uid, customClaims } = user;

  const referralCode = customClaims?.referralCode;

  if (referralCode) {
    const usersCollection = admin.firestore().collection('users');

    try {
      const referrerQuery = await usersCollection
        .where('referralCode', '==', referralCode)
        .limit(1)
        .get();

      if (!referrerQuery.empty) {
        const referrerDoc = referrerQuery.docs[0].ref;

        // Actualiza la lista de referidos del referidor
        await referrerDoc.update({
          referral: {
            userReferrals: admin.firestore.FieldValue.arrayUnion(uid),
          }
        });

        console.log('Referido añadido con éxito al referidor:', referralCode);
      } else {
        console.error('El referidor no existe en Firestore con el referralCode:', referralCode);
      }
    } catch (error) {
      console.error('Error al actualizar referidos:', error);
    }
  } else {
    console.log('Usuario registrado sin código de referencia.');
  }
});





exports.trackReferralsV7 = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { uid, customClaims } = req.body; // Cambiado de user a req.body

    const referralCode = customClaims?.referralCode;

    console.log('UID', uid, 'REFERRALCODE', referralCode)

    if (referralCode && referralCode?.length > 6) {
      const usersCollection = admin.firestore().collection('users');

      try {
        const referrerQuery = await usersCollection
          .where('referral.referralCode', '==', referralCode)
          .limit(1)
          .get();

        if (!referrerQuery.empty) {
          const referrerDoc = referrerQuery.docs[0].ref;

          await referrerDoc.set({
            referral: {
              userReferrals: admin.firestore.FieldValue.arrayUnion(uid),
            }
          },
            { merge: true }
          );

          console.log('Referido añadido con éxito al referidor:', referralCode);
          res.status(200).send('Referido añadido con éxito al referidor');
        } else {
          console.error('El referidor no existe en Firestore con el referralCode:', referralCode);
          res.status(404).send('El referidor no existe en Firestore con el referralCode');
        }
      } catch (error) {
        console.error('Error al actualizar referidos:', error);
        res.status(500).send('Error al actualizar referidos');
      }
    } else {
      console.log('Usuario registrado sin código de referencia. ', referralCode);
      res.status(400).send('Usuario registrado sin código de referencia ', referralCode);
    }
  });
});
