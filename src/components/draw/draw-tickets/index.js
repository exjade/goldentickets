import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import styles from './css/drawtickets.module.css';

const UserDrawTickets = (props) => {

  const [randomNumbers, setRandomNumbers] = useState([]);


  // Esta función genera números aleatorios únicos en un rango específico
  const generateRandomNumbers = (min, max, count) => {
    const randomNumbers = [];

    while (randomNumbers.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

      // Verifica que el número generado no esté duplicado
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    return randomNumbers;
  };

  // Genera los números aleatorios cuando el componente se monta
  useEffect(() => {
    const numberOfNumbers = 5; // Número de números aleatorios que deseas generar
    const numbers = generateRandomNumbers(1, 100, numberOfNumbers);
    setRandomNumbers(numbers);
  }, []);


  const orderByDate = props?.filterTickets?.sort((a, b) => {
    return new Date(a.purchaseDate) - new Date(b.purchaseDate)
  })

  return (

    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper}`} >

        <div className={`${styles.dividerTop}`}  ></div>

        <div className={`${styles.titleContainer}`} >
          <h3>my tickets</h3>
          <span className={`${styles.ticketsAmount}`}>
            <p>{props?.filterTickets?.length}</p>
          </span>
        </div>

        <div className={`${styles.ticketsContainer}`}>

          {
            orderByDate?.map((ticket, index) => (
              <div
                key={index}
                className={`${styles.tickets}`}
              >

                {/* Top title */}
                <div className={`${styles.top}`}>
                  <p>ticket #{index + 1}
                    <b className='ml-3 text-light'>
                      ( {ticket?.numeroTicket})
                    </b>
                  </p>
                </div>


                <div className={`${styles.middle}`}>
                  <span className={`${styles.middleLeft}`}></span>
                  <ul className={`${styles.middleDots}`}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <span className={`${styles.middleRight}`}></span>

                </div>

                {/* bottom  ticket */}
                <div className={`${styles.bottom}`} >

                  <span className={`${styles.ticketBall}`}>
                    <p>{randomNumbers[0]}</p>
                  </span>
                  <span className={`${styles.ticketBall}`}>
                    <p>{randomNumbers[1]}</p>
                  </span>
                  <span className={`${styles.ticketBall}`}>
                    <p>{randomNumbers[2]}</p>
                  </span>
                  <span className={`${styles.ticketBall}`}>
                    <p>{randomNumbers[3]}</p>
                  </span>
                  <span className={`${styles.ticketBall}`}>
                    <p>{randomNumbers[4]}</p>
                  </span>


                  < span className={`${styles.ticketOwned}`}>
                    <p>{ticket?.numeroTicket}</p>
                  </span>
                </div>
              </div>
            ))
          }

        </div>

      </div>
    </div >

  )
}

export default UserDrawTickets
UserDrawTickets.propTypes = {
  filterTickets: PropTypes.array,
}