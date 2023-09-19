const admin = require("firebase-admin");
const stakingRef = admin.firestore().collection("staking");

// ================================= BITCOIN ================================= //
function getTotalStakingValuesBitcoin30(userId) {
  return stakingRef
    .where("userId", "==", userId)
    .where("name", "==", 'Bitcoin')
    .where("percentage", "==", 7)
    .get()
    .then((querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
        const value = doc.data().earningAmount;
        total += value;
      });
      return total;
    });
}

// ================================= Ethereum ================================= //
function getTotalStakingValuesEthereum30(userId) {
  return stakingRef
    .where("userId", "==", userId)
    .where("name", "==", 'Ethereum')
    .where("percentage", "==", 5)
    .get()
    .then((querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
        const value = doc.data().earningAmount;
        total += value;
      });
      return total;
    });
}

// ================================= Tether ================================= //
function getTotalStakingValuesTether30(userId) {
  return stakingRef
    .where("userId", "==", userId)
    .where("name", "==", 'Tether')
    .where("percentage", "==", 8)
    .get()
    .then((querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
        const value = doc.data().earningAmount;
        total += value;
      });
      return total;
    });
}
// ================================= Polkadot ================================= //
function getTotalStakingValuesPolkadot30(userId) {
  return stakingRef
    .where("userId", "==", userId)
    .where("name", "==", 'Polkadot')
    .where("percentage", "==", 16)
    .get()
    .then((querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
        const value = doc.data().earningAmount;
        total += value;
      });
      return total;
    });
}
// ================================= Solana ================================= //
function getTotalStakingValuesSolana30(userId) {
  return stakingRef
    .where("userId", "==", userId)
    .where("name", "==", 'Solana')
    .where("percentage", "==", 14)
    .get()
    .then((querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
        const value = doc.data().earningAmount;
        total += value;
      });
      return total;
    });
}

module.exports = {
  getTotalStakingValuesBitcoin30,
  getTotalStakingValuesEthereum30,
  getTotalStakingValuesTether30,
  getTotalStakingValuesPolkadot30,
  getTotalStakingValuesSolana30,
};