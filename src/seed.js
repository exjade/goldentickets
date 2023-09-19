/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
    const users = [
        {
            userId: '8x43g7cKNKOfjZqu02lWgplp9r93',
            username: 'Adrian',
            fullName: 'Adrian Zamora',
            emailAddress: 'imadrianzamora@gmail.com',
            wallet: ' ',
            balance: 0,
            dateCreated: Date.now()
        },
        {
            userId: '2',
            username: 'Prueba',
            fullName: 'Usuario de prueba',
            emailAddress: 'test@test.com',
            wallet: ' ',
            balance: 0,
            dateCreated: Date.now()
        },
    ];

    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('users').add(users[k]);
    }
  
    for (let i = 1; i <= 5; ++i) {
        firebase
          .firestore()
          .collection('photos')
          .add({
            photoId: i,
            userId: '8x43g7cKNKOfjZqu02lWgplp9r93',
            imageSrc: '',
            dateCreated: Date.now()
          });
      }
}