import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import styles from './css/lotteries.module.css';
import * as ROUTES from '../../../constants/routes'
import TicketNumber from '../ticket/ticket-number';
import useWeeklyLottery from '../../../hooks/draw/weekly-prize/use-weeklyPrize';
import useWeeklyTickets from '../../../hooks/draw/weekly-prize/use-weeklyTickets';

const WeeklyPrize = () => {

    const { loterry } = useWeeklyLottery()
    const { tickets } = useWeeklyTickets()

    const [date, setDate] = useState({
        hours: null,
        minutes: null,
        period: null,
    })

    useEffect(() => {
        const getNextFriday = () => {
            let now = new Date();
            let daysUntilFriday = 5 - now.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
            if (daysUntilFriday <= 0) {
                daysUntilFriday += 7; // If today is Friday or later, get the next Friday
            }

            let nextFriday = new Date(now.getTime() + daysUntilFriday * 24 * 60 * 60 * 1000);
            nextFriday.setHours(20, 0, 0, 0); // Set to 8:00 PM

            const hours = nextFriday.getHours();
            const minutes = nextFriday.getMinutes();
            const period = hours >= 12 ? 'pm' : 'am';

            setDate({
                hours: hours > 12 ? hours - 12 : hours,
                minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
                period: period,
            });
        };

        getNextFriday();
    }, []);

    return (
        <Link
            to={ROUTES.BUY_TICKETS_1000}
            className={styles.containerLink}
        >
            <div className={`${loterry[0]?.numeroGanador === 0 && loterry[0]?.numeroNoGanador > 0 ? `${styles.lotteryAccumulator}` : `${styles.lotteryHistory}`}  `}  >

                <div className={`${loterry[0]?.numeroGanador === 0 && loterry[0]?.numeroNoGanador > 0 ? `${styles.lotteryAccumulatorWrapper}` : `${styles.lotteryHistoryWrapper}`}  `} >

                    {/* NOMBRE DE LOTERIA */}
                    <span className={`${styles.lotteryHistoryName}`}>
                        <p>Classic</p>
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
                                    <span className='flex flex-col text-white-normal font-semibold'>
                                        <p className='sm:text-xs'>Friday at</p>
                                        <p className='sm:text-xs'>{date.hours}:{date.minutes} {date.period}</p>
                                    </span>
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
                                        $1,000
                                    </p>
                                )
                        }
                    </span>

                </div>
            </div>
        </Link>
    )
}

export default WeeklyPrize

WeeklyPrize.propTypes = {
    loterry: PropTypes.array,
    date: PropTypes.object,
    tickets: PropTypes.array,

}