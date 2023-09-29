import React, { useEffect, useState } from 'react';
import styles from './css/lotteries.module.css';
import TicketNumber from './ticket/ticket-number';
import LuckyNumbers from './lucky-numbers';
import useLastWinner from '../../hooks/draw/use-lastWinner';
import { sub } from 'date-fns'

const Lotteries = () => {

  const { loterry } = useLastWinner()

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
    <>



      <div className={`${styles.container}`} >
        <div className={`${styles.wrapper}`} >

          <div className={`${styles.lotteryCard}`} >
            <div className={`${styles.lotteryCardWrapper}`} >

              <div className={`${styles.luckyNumbers}`} >
                <LuckyNumbers />
              </div>

              <div className={`${styles.lotteryCardHeader}`} >
                <span className={`${styles.lotteryCardHeaderTitle}`} >
                  <p>Lottery</p>
                  <p>Numbers</p>
                  <p>Time</p>
                  <p>Players</p>
                  <p>Prize</p>
                </span>
              </div>

              <div className={`${styles.lotteryCardBreadcrumb}`} >
                <span className={`${styles.lotteryCardBreadcrumbTitle}`} >
                  <span className={`${styles.lotteryCardBreadcrumbHistory}`}>
                    <p>History</p>
                  </span>
                  <p>My Winnings</p>
                  <p>My Tickets</p>
                </span>
              </div>

              <div className={`${styles.lotteryHistory}`} >
                <div className={`${styles.lotteryHistoryWrapper}`} >

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
                          <p>{date.hours}:{date.minutes} {date.period}</p>
                        )
                    }
                  </span>
                  {/* AMOUNT PLAYERS */}
                  <span className={`${styles.lotteryHistoryName}`}>
                    <p>3/100</p>
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
                            {`${parseFloat(loterry[0]?.premioAcumulado).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })}`}
                          </p>
                        )
                    }
                  </span>

                </div>
              </div>




            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Lotteries