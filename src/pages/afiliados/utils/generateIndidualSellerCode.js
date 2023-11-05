import axios from 'axios';

const GenerateIndividualSellerCode = async (sellerId) => {
    try {
        // Verificar si se proporciona el sellerId
        if (!sellerId) {
            throw new Error('Por favor, proporciona el sellerId');
        }

        const response = await axios.post(
            `${process.env.REACT_APP_GENERATE_SELLER_CODE}`,
            { sellerId }
        );

        if (response.status === 200) {
            console.log(response.data);
            return 'Código generado con éxito';
        } else {
            console.error('Error al llamar a la función:', response.statusText);
            throw new Error('Error al generar el código');
        }
    } catch (error) {
        console.error('Error de red:', error.message);
        throw new Error('Error de red al generar el código');
    }
};

export default GenerateIndividualSellerCode;
