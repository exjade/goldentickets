import {
    firebase,
    // FielValue
} from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((user) => user.data().length > 0)
}


export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return user;
}
export async function getInvestments(userId) {
    const result = await firebase
        .firestore()
        .collection('investments')
        .where('customerId', '==', userId)
        .get();
    const investment = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return investment;
}
export async function getInvestmentPackages(userId) {
    const result = await firebase
        .firestore()
        .collection('investment-payments')
        .where('userId', '==', userId)
        .get();
    const investment = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    return investment;
}
export async function getWithdrawals(userId) {
    const result = await firebase
        .firestore()
        .collection('Withdrawals')
        .where('CustomerId', '==', userId)
        .get();
    const investment = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
    return investment;
}

export async function getUserByUsername(username) {
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', username.toLowerCase())
      .get();
  
      return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
      }))
    }
  