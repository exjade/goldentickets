import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'
import styles from './css/buytickets.module.css';
import NumberSelector from './number-selector';
import useUser from '../../../hooks/use-user';
import shortid from 'shortid';
import DrawCountDown from '../../countdown';
import useBookingTickets from '../../../hooks/draw/use-bookingTickets';
import Lottie from 'lottie-react';
import AnimationLoader from './lottie/animation_loader.json'
import { motion } from 'framer-motion'
import useUnavailableTicketNumbers from './utils/getUnavailableNumbers';
import { functions, firebase } from '../../../lib/firebase';
import { getDoc, doc } from 'firebase/firestore';
const db = firebase.firestore();

const Tickets = (props) => {


    const { user } = useUser()
    const { bookingTickets } = useBookingTickets()
    const { tickets } = useUnavailableTicketNumbers();
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [price, setPrice] = useState(0);
    const [fee, setFee] = useState(0);
    const [unavailableNumbers, setUnavailableNumbers] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [messageUnavailableNumbers, setMessageUnavailableNumbers] = useState('');
    const [reservaMensaje, setReservaMensaje] = useState('');
    const [processingPayment, setProcessingPayment] = useState(false);
    const [processingSuccesfull, setProcessingSuccesfull] = useState(false);


    useEffect(() => {
        const loadUnavailableNumbers = async () => {
            try {
                setUnavailableNumbers(tickets);
            } catch (error) {
                console.log(error)
            }
        };

        loadUnavailableNumbers();
    }, [tickets])



    const addBookingTicket = async (numeroTicket) => {
        try {
            const userId = user?.userId; // Reemplaza con el ID del usuario autenticado
            const username = user?.username; // Nombre de usuario
            const purchaseDate = Date.now(); // fecha de compra
            const id = shortid.generate().trim(); // ID de ticket
            const drawType = 'Lotería de $1 USD'; // Nombre de la loteria
            const costoTicket = 1; // Reemplaza con el costo del ticket
            // Llama a la función comprarTickets en el backend
            try {
                // Verifica que el usuario esté autenticado

                const isBooked = await checkTicket(numeroTicket)
                const enProceso = await checkReserva(numeroTicket)

                await db.runTransaction(async (transaction) => {

                    const userRef = db.collection('users').doc(userId);
                    const userData = await transaction.get(userRef);
                    if (userData.exists) {
                        if (isBooked === undefined && !isBooked) {
                            if (!enProceso && enProceso === undefined) {
                                // Marcar el documento como en proceso

                                const bookingCollectionRef = db.collection('booking-tickets');
                                const newBookingDocRef = bookingCollectionRef.doc()
                                transaction.set(newBookingDocRef, {
                                    numeroTicket: Number(numeroTicket),
                                    userId: userId,
                                    costoTicket: costoTicket,
                                    purchaseDate: purchaseDate,
                                    id: id,
                                    username: username,
                                    drawType: drawType,
                                    disponible: true,
                                    fechaReserva: Date.now(),
                                    enProceso: true,
                                });



                                setMensaje('Reserva exitosa');
                                setTimeout(() => {
                                    setMensaje('')
                                    setMessageUnavailableNumbers('')
                                    setReservaMensaje('')
                                }, 2000);
                            } else {
                                setReservaMensaje('Otro usuario reservo este ticket');
                                setTimeout(() => {
                                    setMensaje('')
                                    setMessageUnavailableNumbers('')
                                    setReservaMensaje('')
                                }, 2000);
                            }

                        } else {
                            setReservaMensaje('Ticket Reservado');
                            setTimeout(() => {
                                setMensaje('')
                                setMessageUnavailableNumbers('')
                                setReservaMensaje('')
                            }, 2000);
                        }
                    } else {
                        console.log('No such document!');
                    }
                }) // END Atomic Operation
            } catch (error) {
                console.error(error);
                setReservaMensaje('Vuelve a intentarlo en unos segundos');
                setTimeout(() => {
                    setSelectedNumbers([])
                    setPrice(0)
                    setFee(0)
                    setMensaje('')
                    setMessageUnavailableNumbers('')
                    setReservaMensaje('')
                }, 2000);
            }


        } catch (error) {
            console.log(error)
        }
    }

    const comprarTickets = async () => {
        try {
            const userId = user?.userId; // Reemplaza con el ID del usuario autenticado
            const username = user?.username; // Nombre de usuario
            const purchaseDate = Date.now(); // fecha de compra
            const id = shortid.generate().trim(); // ID de ticket
            const drawType = 'Lotería de $3 USD'; // Nombre de la loteria
            const costoTicket = 3; // Reemplaza con el costo del ticket
            const totalPrice = price + fee; // Costo total del ticket

            const doesUserHaveSufficientBalance = user?.Balance >= totalPrice && totalPrice <= user?.Balance;
            const isReservedByMe = await isTicketReservedByUser(selectedNumbers, bookingTickets, username, userId);
            // Recorrer cada número seleccionado y realizar la transacción


            setProcessingPayment(true) // Procesamiento de pagos
            if (isReservedByMe) {
                if (user?.Balance > 0 && doesUserHaveSufficientBalance) {
                    // Llama a la función comprarTickets en el backend
                    const ComprarTickets = functions.httpsCallable('BuyTicketsBETAV14'); // Ajusta el nombre de la función
                    const response = await ComprarTickets({
                        selectedNumbers,
                        userId,
                        costoTicket,
                        totalPrice,
                        purchaseDate,
                        id,
                        username,
                        drawType,
                    });

                    if (response.data && response.data.message) {
                        setTimeout(() => {
                            setSelectedNumbers([])
                            setPrice(0)
                            setFee(0)
                            setMessageUnavailableNumbers('')
                            setProcessingPayment(false)

                            // successfull payment message & loader
                            setMensaje(response.data.message);
                            setProcessingSuccesfull(true);
                            // CLEAR PAYMENT SUCCESSFULL
                            setTimeout(() => {
                                setMensaje('')
                                setProcessingSuccesfull(false)
                            }, [2500])
                        }, 2000);

                    } else if (response.data && response.data.error) {
                        setMensaje(response.data.error);
                        setTimeout(() => {
                            setSelectedNumbers([])
                            setPrice(0)
                            setFee(0)
                            setMessageUnavailableNumbers('')
                            setProcessingPayment(false)
                            // CLEAR PAYMENT SUCCESSFULL
                            setTimeout(() => {
                                setMensaje('')
                                setProcessingSuccesfull(false)
                            }, [2500])
                        }, 2000);

                    }

                } else {
                    setMensaje('Insufficient balance');
                    setTimeout(() => {
                        setSelectedNumbers([])
                        setPrice(0)
                        setFee(0)
                        setMensaje('')
                        setMessageUnavailableNumbers('')
                    }, 2000);
                }
            } else {
                const userRef = doc(db, 'users', userId);
                const userData = await getDoc(userRef);
                if (!userData?.exists) {
                    setReservaMensaje('Error durante la transacción: Registrate');

                } else {
                    setReservaMensaje('Error durante la transacción: Ticket reservado');
                }
            }

        } catch (error) {
            console.log('Error al comprar tickets:', error);
        }
    };


    const handleNumberClick = async (number) => {
        try {
            // REVISAR SI EL NÚMERO SE ENCUENTRA EN LA DB, SINO LO RESERVA
            const isBooked = await checkTicket(number)

            if (isBooked === undefined && !isBooked) {
                await addBookingTicket(number)
            } else {
                setTimeout(() => {
                    setReservaMensaje('')
                }, 2500);
            }

            if (selectedNumbers.includes(number)) {
                // Si el número ya está seleccionado, lo deseleccionamos
                setSelectedNumbers(selectedNumbers.filter((n) => n !== number));

                // Restamos al costo cuando se deselecciona un número
                setPrice(price - 3);

                handleRemoveFee()
            } else {

                // Si el número no está seleccionado, verificamos si está comprado
                const estaComprado = await checkNumeroComprado(number);


                if (!estaComprado) {
                    // Si el número no está seleccionado, lo agregamos a la lista
                    setSelectedNumbers([...selectedNumbers, number]);

                    // Sumamos al costo cuando se selecciona un número
                    setPrice(price + 3);
                    handleAddFee()

                    setTimeout(() => {
                        setReservaMensaje('')
                    }, 2500);
                } else {
                    // Si está comprado, agregamos el número a los no disponibles
                    setUnavailableNumbers([...unavailableNumbers, number]);
                    setMessageUnavailableNumbers('Ticket no disponible')
                    setTimeout(() => {
                        setMessageUnavailableNumbers('')
                    }, 2500);
                }
            }
        } catch (error) {
            // Maneja el error de la transacción
            console.error('Error durante la transacción:', error.message);

            // Aquí puedes tomar acciones adicionales, como mostrar un mensaje de error al usuario
            setMessageUnavailableNumbers('Error durante la transacción: ' + error.message);
        }
    };


    const checkTicket = async (number) => {
        const findBookedTicket = bookingTickets?.find(ticket => ticket.numeroTicket === number)
        return findBookedTicket?.disponible
    }

    const checkReserva = async (number) => {
        const findBookedTicket = bookingTickets?.find(ticket => ticket.numeroTicket === number)
        return findBookedTicket?.enProceso
    }

    const findTicket = async (selectedNumbers, bookingTickets, reservedBy, uid) => {
        return bookingTickets.some(ticket =>
            selectedNumbers.includes(ticket.numeroTicket) &&
            ticket.username === reservedBy &&
            ticket.userId === uid
        );
    };

    const isTicketReservedByUser = async (selectedNumbers, bookingTickets, reservedBy, uid) => {
        const doesTicketExistInDatabase = await findTicket(selectedNumbers, bookingTickets, reservedBy, uid);
        return doesTicketExistInDatabase;
    }

    // Función para verificar si un número de ticket está comprado
    const checkNumeroComprado = async (numero) => {
        try {
            const estadoLoteriaRef = db.collection('loteria').doc('estado');
            const querySnapshot = await estadoLoteriaRef.collection('compras').where('numeroTicket', '==', numero).get();
            return !querySnapshot.empty;
        } catch (error) {
            // Aquí puedes tomar acciones adicionales, como mostrar un mensaje de error al usuario
            setMessageUnavailableNumbers('Error durante la transacción: ' + error.message);
        }

    };

    const handleRemoveFee = () => {
        // Resta la comisión de servicio
        if (user?.rol === 'Member' || user?.rol === 'admin') {
            setFee(selectedNumbers.length >= 2 ? fee - 0 : 0);
        } else if (user?.rol === 'afiliado') {
            setFee(selectedNumbers.length >= 2 ? fee - 0 : 0);
        }
    };

    const handleAddFee = () => {
        // Suma la comisión de servicio
        if (user?.rol === 'Member' || user?.rol === 'admin') {
            setFee(selectedNumbers.length >= 1 ? fee + 0 : 0);
        } else if (user?.rol === 'afiliado') {
            setFee(selectedNumbers.length >= 1 ? fee + 0 : 0);
        }
    };


  
    return (
        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`} >


                {/*================ Sección izquierda ================*/}
                <section className={`${styles.leftContainer}`} >
                    <h2>Pick your <b className={`${styles.leftBold}`}>lucky</b> number</h2>
                    <Link to={ROUTES.DRAW}>
                        <p
                            type='button'
                            className='bg-blue-button text-white-normal w-48 h-4 flex justify-center items-center p-6 rounded-md font-semibold'
                        >
                            Last lottery winner
                        </p>
                    </Link>
                    <DrawCountDown />
                </section>


                {/*================ Sección central ================*/}
                <section className={`${styles.middleContainer}`} >
                    <div className={`${styles.middleWrapper}`}>

                        {Array.from({ length: 300 }, (_, index) => (
                            <NumberSelector
                                key={index + 1}
                                number={index + 1}
                                isSelected={selectedNumbers.includes(index + 1)}
                                isUnavailable={unavailableNumbers.includes(index + 1)}
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
                                <p className='line-through text-gray-secondary opacity-90 font-light'>
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
                            processingPayment &&
                            <Lottie
                                animationData={AnimationLoader}
                                style={{ width: '100px', height: '100px' }}
                            />
                        }
                        {
                            processingSuccesfull &&
                            <iframe
                                src="https://lottie.host/?file=477ecf19-6466-4253-a19d-6e0b91a389d2/3NHY2yiZDt.json"
                                style={{ width: '90px' }}
                            ></iframe>
                        }

                        {
                            mensaje !== '' &&
                            <p className='text-lg font-extrabold font-Nunito text-green-secondary text-center uppercase'>{mensaje}</p>
                        }

                        {
                            reservaMensaje !== '' &&
                            <p className='text-lg font-semibold font-Nunito text-pink-primary text-center'>{reservaMensaje}</p>
                        }
                        {
                            messageUnavailableNumbers !== '' &&
                            <p className='text-lg font-semibold font-Nunito text-pink-primary text-center'>{messageUnavailableNumbers}</p>
                        }

                        {
                            !props?.authUser?.uid &&
                            <span>
                                <p className='text-sm font-normal font-Nunito text-white-normal text-center'>
                                    Participation requires an active account
                                </p>
                            </span>
                        }


                        {
                            !props?.authUser?.uid ?
                                (
                                    <Link to={ROUTES.SIGNUP}>
                                        <motion.button
                                            type='button'
                                            className={`${styles.rightButton}  ${props?.authUser?.uid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            Register
                                        </motion.button>
                                    </Link>
                                ) :
                                (
                                    <motion.button
                                        type='button'
                                        className={`${styles.rightButton}  ${!props?.authUser?.uid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        onClick={comprarTickets}
                                        disabled={!props?.authUser?.uid}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Comprar
                                    </motion.button>
                                )
                        }

                    </div>
                </section>


            </div>
        </div>
    )
}

export default Tickets

Tickets.propTypes = {
    authUser: PropTypes.object,
}