function calculateRoi(initialInvestment, tasa) {
  return initialInvestment * tasa;
}

function getRandomTasa(min, max) {
  return Math.random() * (max - min) + min;
}

function getResidual(rendimiento) {
  const comision = 0.10;
  return rendimiento * comision;
}
function getFixedResidual(rendimiento) {
  const comision = 0.02;
  return rendimiento * comision;
}


function generateId() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const longitudId = 6; 
  let idAleatorio = '';

  for (let i = 0; i < longitudId; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    idAleatorio += caracteres.charAt(indiceAleatorio);
  }

  return idAleatorio;
}

module.exports = {
  calculateRoi,
  getRandomTasa,
  generateId,
  getResidual,
  getFixedResidual,
};