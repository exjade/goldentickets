import React, { useState } from 'react';
import styles from './css/buytickets.module.css';
import NumberSelector from './number-selector';
import useUser from '../../../hooks/use-user';
import { functions } from '../../../lib/firebase';

const Tickets = () => {

    const { user } = useUser()

    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [price, setPrice] = useState(0);
    const [fee, setFee] = useState(0);
    const [mensaje, setMensaje] = useState('');


    const comprarTickets = async () => {
        try {
          const userId = user?.userId; // Reemplaza con el ID del usuario autenticado
          const costoTicket = 1; // Reemplaza con el costo del ticket
            
          // Llama a la función comprarTickets en el backend
          const ComprarTickets = functions.httpsCallable('BuyTicketsV2'); // Ajusta el nombre de la función
          const response = await ComprarTickets({
            selectedNumbers,
            userId,
            costoTicket,
          });
          

          if (response.data && response.data.message) {

            setMensaje('Compra exitosa');

            setTimeout(() => {
                setSelectedNumbers([])
                setPrice(0)
                setFee(0)
                setMensaje('') 
            }, 2000);

        } else if (response.data && response.data.error) {
              console.log('error')
            setMensaje(response.data.error);
          }
        } catch (error) {
          console.error('Error al comprar tickets:', error);
        }
      };



    const handleNumberClick = (number) => {
        if (selectedNumbers.includes(number)) {
            // Si el número ya está seleccionado, lo deseleccionamos
            setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
            // Restamos $1 al costo cuando se deselecciona un número
            setPrice(price - 1);

            handleRemoveFee()
        } else {
            // Si el número no está seleccionado, lo agregamos a la lista
            setSelectedNumbers([...selectedNumbers, number]);
            // Sumamos $1 al costo cuando se selecciona un número
            setPrice(price + 1);

            handleAddFee()
        }
    };

    const handleRemoveFee = () => {
        // Resta la comisión de servicio
        if (user?.rol === 'Member' || user?.rol === 'admin') {
            setFee(selectedNumbers.length >= 2 ? fee - 0.8 : 0);
        } else if (user?.rol === 'afiliado') {
            setFee(selectedNumbers.length >= 2 ? fee - 1 : 0);
        }
    };

    const handleAddFee = () => {
        // Suma la comisión de servicio
        if (user?.rol === 'Member' || user?.rol === 'admin') {
            setFee(selectedNumbers.length >= 1 ? fee + 0.8 : 1);
        } else if (user?.rol === 'afiliado') {
            setFee(selectedNumbers.length >= 1 ? fee + 1 : 1);
        }
    };


    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`} >


                {/*================ Sección izquierda ================*/}
                <section className={`${styles.leftContainer}`} >
                    <h2>Pick your <b className={`${styles.leftBold}`}>lucky</b> number</h2>


                </section>


                {/*================ Sección central ================*/}
                <section className={`${styles.middleContainer}`} >
                    <div className={`${styles.middleWrapper}`}>

                        {Array.from({ length: 100 }, (_, index) => (
                            <NumberSelector
                                key={index + 1}
                                number={index + 1}
                                isSelected={selectedNumbers.includes(index + 1)}
                                onClick={handleNumberClick}
                            />
                        ))}

                    </div>
                </section>

                {/*================ Sección derecha ================*/}
                <section className={`${styles.rightContainer}`} >
                    <div className={`${styles.rightWrapper}`}>

                        {/* TITLE */}
                        <span className={`${styles.rightTitle}`}>
                            Lotto ticket's
                        </span>

                        {/* TICKET SELECCIONADO */}
                        <div className={`${styles.rightTicket}`} >
                            {
                                selectedNumbers?.map((number) => (
                                    <span
                                        key={number}
                                        className={`${styles.middleCircle}`}
                                    >
                                        <p className={`${styles.middleNumber}`}>{number}</p>
                                    </span>
                                ))
                            }
                        </div>

                        {/* DETALLES DE COMPRA */}
                        <div className={`${styles.rightSummary}`} >
                            <span className={`${styles.rightDetails}`}>
                                <p>Costo de ticket</p>
                                <p>
                                    {parseFloat(`${price}`).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    })} USD
                                </p>
                            </span>
                            <span className={`${styles.rightDetails}`}>
                                <p>Comisión</p>
                                <p>
                                    {parseFloat(`${fee}`).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    })} USD
                                </p>
                            </span>
                            <span className={`${styles.rightDetails}`}>
                                <p>Total</p>
                                <p>
                                    {parseFloat(`${fee + price}`).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    })} USD
                                </p>
                            </span>
                        </div>  

                        {
                            mensaje !== '' &&
                            <p className='text-lg font-semibold font-Nunito text-green-secondary text-center'>{mensaje}</p>
                        }

                        {/* BUTÓN DE COMPRAR */}
                        <button
                            type='button'
                            className={`${styles.rightButton}`}
                            onClick={comprarTickets}
                        >
                            Comprar
                        </button>
                    </div>
                </section>


            </div>
        </div>
    )
}

export default Tickets