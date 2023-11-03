import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import styles from '../css/lotteries.module.css';
import * as ROUTES from '../../../constants/routes'
import TicketNumber from '../ticket/ticket-number';
import useLastWinner from '../../../hooks/draw/use-lastWinner';
import useUserTickets from '../../../hooks/draw/use-userTickets';

const Accumulator = () => {

    const { loterry } = useLastWinner()
    const { tickets } = useUserTickets()
  
    const [date, setDate] = useState({
      hours: null,
      minutes: null,
      period: null,
    })
  
    useEffect(() => {
  
      const getHours = () => {
  
        let fecha = new Date(loterry[0]?.date)
        fecha.setHours(fecha.getHours() + 1);
        // Obtiene la hora y los minutos
        const hours = fecha.getHours();
        const minutes = fecha.getMinutes();
        const periodo = hours >= 12 ? 'pm' : 'am';
  
        setDate({
          hours: hours,
          minutes: `${minutes}0`,
          period: periodo,
        })
      }
  
      getHours()
    }, [loterry])

    return (
        <Link
            to={ROUTES.BUY_TICKETS}
            className={styles.containerLink}
        >
            <div className={`${loterry[0]?.numeroGanador === 0 && loterry[0]?.numeroNoGanador > 0 ? `${styles.lotteryAccumulator}` : `${styles.lotteryHistory}`}  `}  >

                <div className={`${loterry[0]?.numeroGanador === 0 && loterry[0]?.numeroNoGanador > 0 ? `${styles.lotteryAccumulatorWrapper}` : `${styles.lotteryHistoryWrapper}`}  `} >

                    {/* NOMBRE DE LOTERIA */}
                    <span className={`${styles.lotteryHistoryName}`}>
                        {
                            loterry[0]?.numeroGanador === 0 && loterry[0]?.numeroNoGanador > 0 ?
                                (
                                    <p>Accumulator</p>
                                )
                                :
                                (

                                    <p>Classic</p>
                                )
                        }
                    </span>
                    {/* NUMBERS */}
                    <TicketNumber />
                    {/* TIME */}
                    <span className={`${styles.lotteryHistoryName}`}>
                        {
                            isNaN(date.hours) || isNaN(date.minutes) ?
                                (
                                    <p className='bg-gray-primary border-md h-4 w-14 animate-pulse'></p>
                                ) :
                                (
                                    <p>{date.hours}:{date.minutes} {date.period}</p>
                                )
                        }
                    </span>
                    {/* AMOUNT PLAYERS */}
                    <span className={`${styles.lotteryHistoryName}`}>
                        {
                            tickets?.length === undefined || tickets?.length === null ?
                                (
                                    <p className='bg-gray-primary border-md h-4 w-14 animate-pulse'></p>
                                ) :
                                (
                                    <p>{tickets?.length}/300</p>
                                )
                        }
                    </span>
                    {/* PRIZE */}
                    <span className={`${styles.lotteryHistoryPrize}`}>

                        {
                            loterry[0]?.premioAcumulado === undefined ?
                                (
                                    <p className='bg-gray-primary border-md h-4 w-14 animate-pulse'></p>
                                ) :
                                (
                                    <p>
                                        {`$${loterry[0]?.premioAcumulado}`}
                                    </p>
                                )
                        }
                    </span>

                </div>
            </div>
        </Link>
    )
}

export default Accumulator

Accumulator.propTypes = {
    loterry: PropTypes.array,
    date: PropTypes.object,
    tickets: PropTypes.array,

}