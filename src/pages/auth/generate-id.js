function generarCodigoReferido() {
    const longitud = 6;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigoReferido = '';
    for (let i = 0; i < longitud; i++) {
        codigoReferido += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigoReferido;
}


module.exports = {
    generarCodigoReferido
};