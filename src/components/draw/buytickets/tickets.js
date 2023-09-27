import React, { useState } from 'react';
import styles from './css/buytickets.module.css';
import NumberSelector from './number-selector';

const Tickets = () => {

    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [price, setPrice] = useState(0);
    const [fee, setFee] = useState(0);


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
        setFee(selectedNumbers.length >= 2 ? fee - 0.50 : 0);
    };

    const handleAddFee = () => {
        // Suma la comisión de servicio
        setFee(selectedNumbers.length >= 1 ? fee + 0.50 : 1);
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

                        {/* BUTÓN DE COMPRAR */}
                        <button
                            type='button'
                            className={`${styles.rightButton}`}
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